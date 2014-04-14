var map = exports.map = { S1: 'ZQDM',
  S2: 'ZQJC',
  S3: 'ZRSP',
  S4: 'JRKP',
  S5: 'CJJE',
  S6: 'ZGCJ',
  S7: 'ZDCJ',
  S8: 'ZJCJ',
  S9: 'BJW1',
  S10: 'SJW1',
  S11: 'CJSL',
  S13: 'SYL1',
  S15: 'BSL1',
  S16: 'BJW2',
  S17: 'BSL2',
  S18: 'BJW3',
  S19: 'BSL3',
  S21: 'SSL1',
  S22: 'SJW2',
  S23: 'SSL2',
  S24: 'SJW3',
  S25: 'SSL3',
  S26: 'BJW4',
  S27: 'BSL4',
  S28: 'BJW5',
  S29: 'BSL5',
  S30: 'SJW4',
  S31: 'SSL4',
  S32: 'SJW5',
  S33: 'SSL5',
  S34: 'STOP' };

exports.resetHeaders = function( headers ){
    return headers.map(function(v){
      v.name = map[v.name];
      v.raw = (v.type != 'N');
      return v;
    });
  };

exports.getTimestamp = function( time ){
    //market.state = ( time['CJSL'] == 0 ) ? 'open' : 'closed';
    return String(time['ZGCJ']) + lpad(time['ZQJC'].toString('ascii').replace(/\s+$/, ''), 6);
  };

exports.getStockType = function( stockCode ){
    return (stockCode > 100000) ? 2 :1;
  };

var lpad = function(str, len){
  if(Buffer.byteLength(String(str)) >= len) return str;
  var prefix = '0000000000';
  return prefix.concat(str).substr(-len);
};

var isIndex = exports.isIndex = function (security) {
  return !isEquity(security);
};

var isEquity = exports.isEquity = function (security) {
  return (security.ZQDM < 100000 && security.ZQDM > 0);
};

exports.transCharset = function (security) {
  if (security.ZQDM == 100001) security.ZQDM = 'HSI';
  return security;
};

exports.marketName = 'HongKong';
