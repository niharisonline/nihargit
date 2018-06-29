var merge = require('deepmerge');
var wdioConf = require('./wdio.conf.js');

exports.config = merge(wdioConf.config, {

  exclude: [],

  maxInstances: 4,
  commonCapabilities: {
    name: 'fabric-automation-tests-mobile',
    build: 'fabric-automation-tests-mobile',
    'project': 'fabric-automation-tests-project',
    'browserstack.video': 'true',
  },

  capabilities: [
    {
      'browserName': 'iPhone',
      'platform': 'MAC',
      'device': 'iPhone 6S',
      'acceptSslCerts': 'true'
    },
    {
      'browserName': 'android',
      'platform': 'ANDROID',
      'device': 'Samsung Galaxy S5',
      'acceptSslCerts': 'true'
    }
  ]
});

exports.config.cucumberOpts.tags.push('@mobile');
exports.config.cucumberOpts.timeout = 180000;

// Code to support common capabilities
exports.config.capabilities.forEach(function (caps) {
  for (var i in exports.config.commonCapabilities) caps[i] = caps[i] || exports.config.commonCapabilities[i];
});

