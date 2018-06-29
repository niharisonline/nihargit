var merge = require('deepmerge');
var base = require('./base.conf.js');

var port = process.env.npm_config_port || 4444;

exports.config = merge(base.config, {
    capabilities: [{
        browserName: 'phantomjs'
    }],
    services: ['selenium-standalone'],
    seleniumArgs: {
        seleniumArgs: ["-port", port],
    },
    port: port,
});

exports.config.cucumberOpts.tags =['@P1'];

