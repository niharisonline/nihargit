const merge = require('deepmerge');
const wdioConf = require('./wdio.conf.js');

exports.config = merge(wdioConf.config, {

  exclude: [],

  commonCapabilities: {
    name: 'fabric-automation-tests',
    build: 'fabric-automation-tests-parallel',
    'project': 'fabric-automation-tests-project',
    'browserstack.video': 'true',
  }
});
exports.config.cucumberOpts.timeout = 180000;


