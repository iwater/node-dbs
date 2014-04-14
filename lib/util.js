var fs = require('fs');
var moment = require('moment');

var getClosingDays = function( market ){
  return fs.readFileSync(__dirname + '/../etc/closing.' + market + '.txt', 'ascii').split("\n");
};

var closingDays = {
  'sh': getClosingDays('sh'),
  'sz': getClosingDays('sz'),
  'hk': getClosingDays('hk')
};

var isTradingDay = function( market, day ){
//console.log(market);
  // 默认日期为今天
  day = day || new Date();

  // 周六日都不是交易日
  var weekday = day.getDay();
  if( weekday == 0 || weekday == 6 ) {
    return false;
  }

  // 如果在非交易日清单中也不是交易日
  if( closingDays[ market ].indexOf( moment().format('YYYY-MM-DD') ) > -1 ) {
    return false;
  }

  // 是交易日
  return true;
};

exports.isTradingDay = isTradingDay;
