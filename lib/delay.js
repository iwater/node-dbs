var moment = require('moment');

exports.delay = function(delay) {
  return function(chunk, x, done) {
    var diff = (chunk.timestamp + delay) * 1000 - Date.now();
    var push = this.push.bind(this, chunk);
    setTimeout(push, diff)
    done();
  };
};
