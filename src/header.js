// Generated by CoffeeScript 1.7.1
(function() {
  var Header,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Header = (function() {
    function Header(buffer) {
      this.buffer = buffer;
      this.parseFieldSubRecord = __bind(this.parseFieldSubRecord, this);
      this.parseDate = __bind(this.parseDate, this);
      return this;
    }

    Header.prototype.parse = function() {
      var buffer, i;
      buffer = this.buffer;
      this.type = (buffer.slice(0, 1)).toString('utf-8');
      this.dateUpdated = this.parseDate(buffer.slice(1, 4));
      this.numberOfRecords = this.convertBinaryToInteger(buffer.slice(4, 8));
      this.start = this.convertBinaryToInteger(buffer.slice(8, 10));
      this.recordLength = this.convertBinaryToInteger(buffer.slice(10, 12));
      return this.fields = ((function() {
        var _i, _ref, _results;
        _results = [];
        for (i = _i = 32, _ref = this.start - 32; _i <= _ref; i = _i += 32) {
          _results.push(buffer.slice(i, i + 32));
        }
        return _results;
      }).call(this)).map(this.parseFieldSubRecord);
    };

    Header.prototype.parseDate = function(buffer) {
      var day, month, year;
      year = 1900 + this.convertBinaryToInteger(buffer.slice(0, 1));
      month = (this.convertBinaryToInteger(buffer.slice(1, 2))) - 1;
      day = this.convertBinaryToInteger(buffer.slice(2, 3));
      return new Date(year, month, day);
    };

    Header.prototype.parseFieldSubRecord = function(buffer) {
      var header;
      return header = {
        name: ((buffer.slice(0, 11)).toString('utf-8')).replace(/[\u0000]+$/, ''),
        type: (buffer.slice(11, 12)).toString('utf-8'),
        displacement: this.convertBinaryToInteger(buffer.slice(12, 16)),
        length: this.convertBinaryToInteger(buffer.slice(16, 17)),
        decimalPlaces: this.convertBinaryToInteger(buffer.slice(17, 18))
      };
    };

    Header.prototype.convertBinaryToInteger = function(buffer) {
      return buffer.readInt32LE(0, true);
    };

    return Header;

  })();

  module.exports = Header;

}).call(this);
