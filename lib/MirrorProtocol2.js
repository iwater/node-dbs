var util = require('util');

var Transform = require('stream').Transform;
util.inherits(MirrorProtocol, Transform);

function MirrorProtocol(options) {
  if (!(this instanceof MirrorProtocol))
    return new MirrorProtocol(options);

  Transform.call(this, options);
  this._buf = null;
}

MirrorProtocol.prototype._transform = function (chunk, encoding, done) {
  var buf = this._buf ? Buffer.concat([this._buf, chunk]) : chunk;
  var cmd, len;
  while (buf.length >= 6) {
    cmd = buf.readUInt16LE(0);
    len = buf.readUInt32LE(2);
    if(buf.length < len) break;
    var _buf = buf.slice(0, len);
    buf = buf.slice(len);
    this.push(_buf);
  }
  this._buf = buf;
  done();
};

MirrorProtocol.prototype.flush = function () {
  this._buf = null;
};

exports.MirrorProtocol = MirrorProtocol;

exports.getDecoder = function () {
  var instance = new MirrorProtocol();
  instance.on('pipe', function () {
    instance.flush();
  });
  return instance;
};
