Buffer.prototype.xor = function(buf) {
  var self = this;
  var ret = new Buffer(self.length);
  var i = 0,
    len = self.length;
  for (i = 0; i < len; i++) {
    ret[i] = self[i] ^ buf[i];
  }
  return ret;
};

Buffer.prototype.exist = function(buf) {
  var self = this;
  var i = 0,
    len = self.length;
  for (i = 0; i < len; i++) {
    if (self[i] > 0) return true;
  }
  return false;
};

Buffer.prototype.compress = function() {
  var self = this;
  var ret = [];
  var count = 0;
  Array.prototype.forEach.call(self, function(v, i) {
    if (v == 0) {
      count++;
      if (i == 0 || self[i - 1] > 0) ret.push(0);
    } else {
      if (i > 0 && self[i - 1] == 0) {
        ret = ret.concat(encode7bit(count));
        count = 0;
      }
      ret.push(v);
    }
  });
  if (count > 0)
    ret = ret.concat(encode7bit(count));
  var buf = new Buffer(ret.length);
  Array.prototype.forEach.call(ret, function(v, i) {
    buf[i] = v;
  });
  return buf;
};

Buffer.prototype.unCompress = function() {
  var self = this;
  var i = 0,
    j = 0;
  var changes = [];

  var decode7bit = function() {
    var value = 0;
    var shift = 0;
    var last;
    for (; i < self.length; i++) {
      var byteval = self[i];
      if ((byteval & 128) == 0) break;
      value |= ((byteval & 0x7F) << shift)
      shift += 7
    }
    return (value | (byteval << shift));
  };

  for (; i < self.length; i++) {
    var v = self[i];
    if (i > 0 && last == 0) {
      var size = decode7bit();
      while (size-- > 0) {
        j++;
      }
    } else {
      if (v > 0)
        changes.push([j++, v])
    }
    last = v;
  }
  var ret = new Buffer(j);
  ret.fill(0);
  var m = 0,
    n = changes.length;
  for (m = 0; m < n; m++)
    ret[changes[m][0]] = changes[m][1];
  return ret;
};

var encode7bit = function(value) {
  var temp = value;
  var bytes = [];
  while (temp >= 128) {
    bytes.push(0x000000FF & (temp | 0x80));
    temp >>= 7;
  }
  bytes.push(temp);
  return bytes;
};
