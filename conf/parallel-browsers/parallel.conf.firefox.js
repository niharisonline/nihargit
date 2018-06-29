const merge = require('deepmerge');
const baseConf = require('../parallel.base.conf..js');

exports.config = merge(baseConf.config, {

  capabilities: [
    {
      'os': 'Windows',
      'os_version': '7',
      'browserName': 'Firefox',
      'acceptSslCerts': 'true',
      'resolution': '1600x1200'
    }
  ]
});
// Code to support common capabilities
exports.config.capabilities.forEach(function (caps) {
  for (var i in exports.config.commonCapabilities) caps[i] = caps[i] || exports.config.commonCapabilities[i];
});