const merge = require('deepmerge');
const wdioConf = require('./wdio.conf.js');
const browserstack = require('browserstack-local');


exports.config = merge(wdioConf.config, {
  exclude: [],
  commonCapabilities: {
    name: 'fabric-automation-tests',
    build: 'fabric-automation-tests-parallel',
    'project': 'fabric-automation-tests-project',
    'browserstack.video': 'true',
    'browserstack.local': 'true',
  },

  capabilities: [
    {
      'os': 'Windows',
      'os_version': '7',
      'browserName': 'Chrome',
      'acceptSslCerts': 'true',
      'resolution': '1600x1200'
    },
    {
      'os': 'Windows',
      'os_version': '7',
      'browserName': 'Firefox',
      'acceptSslCerts': 'true',
      'resolution': '1600x1200'
    },
    {
      'browserName': 'Safari',
      'os': 'OS X',
      'os_version': 'Yosemite',
      'acceptSslCerts': 'true',
      'resolution': '1600x1200'
    },
    {
      'os': 'Windows',
      'os_version': '7',
      'browserName': 'IE',
      'browser_version': '11.0',
      'acceptSslCerts': 'true',
      'resolution': '1600x1200'
    },
    {
      'browserName': 'iPad',
      'platform': 'MAC',
      'device': 'iPad Air 2',
      'acceptSslCerts': 'true'
    },
    {
      'browserName': 'iPhone',
      'platform': 'MAC',
      'device': 'iPhone 6S'
    }
  ],
  // Code to start browserstack local before start of test
  onPrepare: function (config, capabilities) {
    console.log("Connecting local");
    return new Promise(function (resolve, reject) {
      exports.bs_local = new browserstack.Local();
      exports.bs_local.start({ 'key': browserStackKey }, function (error) {
        if (error) return reject(error);
        console.log('Connected. Now testing...');

        resolve();
      });
    });
  },

  // Code to stop browserstack local after end of test
  onComplete: function (capabilities, specs) {
    exports.bs_local.stop(function () { });
  }
});

let browserStackKey  = exports.config.key;

// Code to support common capabilities
exports.config.capabilities.forEach(function (caps) {
  for (var i in exports.config.commonCapabilities) caps[i] = caps[i] || exports.config.commonCapabilities[i];
});


