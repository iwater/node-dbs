var util = require('util');
var toolkit = require('toolkit');
var DBFParser = require('./dbf/quotedParser.js');

exports.getDecoder = function(type) {
  return function(chunk, encoding, done) {
    var buf, cmd, len, digest;
    if (chunk.length >= 22) {
      cmd = chunk.readUInt16LE(0);
      len = chunk.readUInt32LE(2);
      digest = chunk.slice(6, 22).toString('hex');
      if (chunk.length < len) return done();

      if (cmd === 1020) {
        console.log('live');
      }

      if (cmd !== 1000 && cmd !== 1010) return done();

      if (cmd === 1000) {
        buf = chunk.slice(22);
        mask = new Buffer(buf.length);
        mask.fill(0xff);
      }

      if (cmd === 1010) {
        mask = chunk.slice(22).unCompress();
        buf = mask.xor(this._buf);
      }

      if (toolkit.md5(buf) === digest) {
        var ppp = new DBFParser(buf, mask, type);
        this.push(ppp.parse());
      }

      this._buf = buf;
    }
    done();
  };
};
