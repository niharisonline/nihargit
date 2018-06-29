const merge = require('deepmerge');
const baseConf = require('../parallel.base.conf..js');

exports.config = merge(baseConf.config, {

  capabilities: [
    {
      'browserName': 'iPhone',
      'platform': 'MAC',
      'device': 'iPhone 6S'
    }
  ]
});
// Code to support common capabilities
exports.config.capabilities.forEach(function (caps) {
  for (var i in exports.config.commonCapabilities) caps[i] = caps[i] || exports.config.commonCapabilities[i];
});

