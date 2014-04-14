var request = require('request');
var colors = require("colors")
var servers = require('../etc/servers.json');
var util = require('./util');
var winston = require('winston');
  var debugLogger = new (winston.Logger)({
    transports: [
      new (winston.transports.File)({ filename: 'debug.log' })
    ]
  });


var post = function(url, body) {
  request.post({
    url: url,
    json: body,
    timeout: 30000,
    pool: {
      maxSockets: 20
    }
  }, function(e, r, body) {
    if (e) {
      console.log(('充数据错误: (' + url.yellow + ')').red);
      console.log(e);
    } else {
      console.log(('收到 AppServer 返回(' + url.yellow + ')').green);
      console.log(body);
      //console.log('Request OK');
    }
  });
};

/*exports.post = function(body) {
  return;
  servers.forEach(function(url) {
    post(url, body);
  });
};*/

var markets = {
  'HongKong' : 'hk',
  'ShangHai' : 'sh',
  'ShenZhen' : 'sz'
};

var superPost = exports.post = function(body) {
  console.log('数据时间：' + body.timestamp);
//console.log(body);
  if (util.isTradingDay(markets[body.market])) {
    console.log('充行情');
    //console.log('数据延迟 %s', dataDate.lang('zh-cn').fromNow(true));
    servers.forEach(function(url) {
      post(url, body);
    });
  } else {
    console.log('非交易日，不充行情'.red);
  }
};
