var map = { ZSZSDM: 'ZQDM',
  ZSZSQC: 'ZQJC',
  ZSSSZS: 'ZRSP',
  ZSKSZS: 'JRKP',
  ZSCJJE: 'CJJE',
  ZSZGZS: 'ZGCJ',
  ZSZDZS: 'ZDCJ',
  ZSZJZS: 'ZJCJ',
  ZSCJSL: 'CJSL',
  ZSYWMC: 'ZSYWMC' };

exports.resetHeaders = function( headers ){
    return headers.map(function(v){
      v.name = map[v.name];
      return v;
    });
  };

exports.getTimestamp = function( time ){
  var now = new Date();
  now.setTime(now.getTime() - 915000);
  return now.toLocaleISOString().replace(/\D/g, '').substr(0,14);
};

exports.getStockType = function( stockCode ){
  return 2;
};

var isIndex = exports.isIndex = function( security ){
  return true;
};

exports.isEquity = function( security ){
  return false;
};

exports.marketName = 'HongKong';
