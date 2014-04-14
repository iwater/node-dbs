var reconnect = require('reconnect-net');
var moment = require('moment');
var app = require('./app');
var asStream = require('./asStream');

var checkDBF = function(dbf) {
  if (dbf.records.length > 0) {
    console.log(moment(dbf.time, 'YYYYMMDDHHmmss').format());
    console.log('%s %d changed', dbf.name, dbf.records.length);
  }
  return dbf;
};

var pipe = function(stream, market, outStream) {

  var MirrorProtocol2 = require('./MirrorProtocol2');
  var dbf = require('./MirrorProtocol4');

  var mirrorStream2 = MirrorProtocol2.getDecoder();

  stream.pipe(mirrorStream2)
    .pipe(asStream.run(dbf.getDecoder(market)))
    .pipe(asStream.runAs(checkDBF))
    .pipe(asStream.runAs(app.getSecurityChangingPackage(market)))
    .pipe(outStream);

};

exports.createConnection = function(port, host, type) {
  var PassThrough = require('stream').PassThrough;
  var outStream = new PassThrough({
    objectMode: true
  });
  reconnect(function(stream) {
    pipe(stream, type, outStream);
  }).connect(port, host);
  return outStream;
};

var logger = console.log;

console.log = function(str) {
  str = arguments[0];
  if (typeof str != 'string') str = JSON.stringify(str);
  arguments[0] = moment().format() + ' - ' + str;
  logger.apply(null, arguments);
};
