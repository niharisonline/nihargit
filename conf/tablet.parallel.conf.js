var merge = require('deepmerge');
var wdioConf = require('./wdio.conf.js');

exports.config = merge(wdioConf.config, {

  exclude: [],

  maxInstances: 4,
  commonCapabilities: {
    name: 'fabric-automation-tests-tablet',
    build: 'fabric-automation-tests-tablet',
    'project': 'fabric-automation-tests-project',
    'browserstack.video': 'true',
  },

  capabilities: [
    {
      'browserName': 'iPad',
      'platform': 'MAC',
      'device': 'iPad Air 2',
      'acceptSslCerts': 'true'
    },
    {
      'browserName': 'android',
      'platform': 'ANDROID',
      'device': 'Samsung Galaxy Tab 4 10.1',
      'acceptSslCerts': 'true'
    }
  ]
});

exports.config.cucumberOpts.tags.push('@tablet');
exports.config.cucumberOpts.timeout = 180000;

// Code to support common capabilities
exports.config.capabilities.forEach(function (caps) {
  for (var i in exports.config.commonCapabilities) caps[i] = caps[i] || exports.config.commonCapabilities[i];
});

