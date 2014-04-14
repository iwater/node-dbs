exports.resetHeaders = function( headers ){
    return headers.map(function(v){
      v.name = v.name.replace(/^HQ/, '');
      v.raw = (v.type != 'N');
      return v;
    });
  };

exports.getTimestamp = function( time ){
    test = time['CJSL'] > 9;
    //market.state = ( time['CJSL'] == 0 ) ? 'open' : 'closed';
    return String(Number(time['ZQJC'])) + lpad(Number(time['CJBS']), 6);
  };

exports.getStockType = function( stockCode ){
    return (stockCode < 400000 && stockCode >= 390000) ? 2 :1;
  };

var isIndex = exports.isIndex = function( security ){
  return ( security.ZQDM < 400000 && security.ZQDM >= 390000);
};

exports.isEquity = function( security ){
  return !isIndex( security );
};

exports.marketName = 'ShenZhen';

var lpad = function(str, len){
  if(Buffer.byteLength(String(str)) >= len) return str;
  var prefix = '0000000000';
  return prefix.concat(str).substr(-len);
};
