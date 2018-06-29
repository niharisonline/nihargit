var merge = require('deepmerge');
var base = require('./base.conf.js');

exports.config = merge(base.config, {
    capabilities: [
        {
            'browserName': 'phantomjs',
        }
        // If you want to use other browsers,
        // you may need local Selenium standalone server.
    ],
    services: ['phantomjs']
});
