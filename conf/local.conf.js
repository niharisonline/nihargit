var merge = require('deepmerge');
var base = require('./base.conf.js');

exports.config = merge(base.config,{
    capabilities: [{
        browserName: 'chrome'
    }],
    services: ['selenium-standalone'],
});