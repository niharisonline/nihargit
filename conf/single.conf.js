var merge = require('deepmerge');
var wdioConf = require('./wdio.conf.js');

exports.config = merge(wdioConf.config, {
    exclude: [],

    capabilities: [{
        'browserName': 'Chrome',
        'os': 'Windows',
        'os_version': '7',
        'resolution': '1600x1200',
        'acceptSslCerts': 'true',
        'name': 'fabric_chrome_test',
        'build': 'fabric-automation-tests-single',
        'project': 'fabric-automation-tests-project'
    }]
});

