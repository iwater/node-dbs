var moment = require('moment');

var getSecurityChangingPackage = exports.getSecurityChangingPackage = function(market) {
    var tools = require('./market/' + market);
    return function(dbf) {
        var now = moment(dbf.time, 'YYYYMMDDHHmmss');
        var equities = dbf.records.filter(tools.isEquity).map(function(stock) {
            return [stock.ZQDM, stock.ZQJC, +stock.ZJCJ, +stock.CJSL, +stock.CJJE, +stock.ZRSP, +stock.JRKP, +stock.ZGCJ, +stock.ZDCJ, [+stock.BJW1, +stock.BJW2, +stock.BJW3, +stock.BJW4, +stock.BJW5], [+stock.SJW1, +stock.SJW2, +stock.SJW3, +stock.SJW4, +stock.SJW5], [+stock.BSL1, +stock.BSL2, +stock.BSL3, +stock.BSL4, +stock.BSL5], [+stock.SSL1, +stock.SSL2, +stock.SSL3, +stock.SSL4, +stock.SSL5]];
        });

        var indices = dbf.records.filter(tools.isIndex).map(function(stock) {
            return [stock.ZQDM, stock.ZQJC, +stock.ZJCJ, +stock.CJSL, +stock.CJJE, +stock.ZRSP, +stock.JRKP, +stock.ZGCJ, +stock.ZDCJ];
        });
        return {
            type: 'SecurityChanging',
            market: dbf.name,
            timestamp: now.format('YYYYMMDDHHmmss'),
            version: 1.0,
            equities: equities,
            indices: indices
        };
    };
};

var getSecurityListingPackage = exports.getSecurityListingPackage = function(market) {
    var tools = require('./market/' + market);
    return function(dbf) {
        var equities = dbf.records.filter(tools.isEquity).map(function(stock) {
            return [stock.ZQDM, stock.ZQJC]
        });
        var indices = dbf.records.filter(tools.isIndex).map(function(stock) {
            return [stock.ZQDM, stock.ZQJC]
        });
        return {
            type: 'SecurityListing',
            market: dbf.name,
            timestamp: now.format('YYYYMMDDHHmmss'),
            version: 1.0,
            equities: equities,
            indices: indices
        };
    }
};
