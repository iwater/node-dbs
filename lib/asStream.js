var util = require('util');

var Transform = require('stream').Transform;
util.inherits(AsStream, Transform);

function AsStream(handler, options) {
  if (!(this instanceof AsStream))
    return new AsStream(handler, options);

  Transform.call(this, {
    objectMode: true
  });
  this._transform = handler.bind(this);
}

exports.run = function(handler) {
  return new AsStream(handler);
};

exports.runAs = function(normalHandler) {
  var handler = function(chunk, encoding, done) {
    this.push(normalHandler(chunk));
    done();
  };
  return new AsStream(handler);
};
