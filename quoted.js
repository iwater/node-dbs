/*require('nodetime').profile({
  accountKey: '32e6615fe497d1763d2e344f274f32c92d4dbea3',
  appName: 'Quoted Server'
});*/

var asStream = require('./lib/asStream');
var delay = require('./lib/delay').delay;
var poster = require('./lib/poster2012');
var dbs = require('./lib/show2012');

dbs.createConnection(8124, '172.16.62.21', 'sh').pipe(asStream.runAs(poster.post));
dbs.createConnection(8125, '172.16.62.21', 'sz').pipe(asStream.runAs(poster.post));
dbs.createConnection(8126, '172.16.62.21', 'hk').pipe(asStream.run(delay(14*60))).pipe(asStream.runAs(poster.post));
