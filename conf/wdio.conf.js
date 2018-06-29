
var browserStackHelper = require('../test-utility/browserstack-helper');
var merge = require('deepmerge');
var base = require('./base.conf.js');

exports.config = merge(base.config, {
    services: ['browserstack'],
    user: process.env.BROWSERSTACK_USERNAME || 'rajeshantappan2',
    key: process.env.BROWSERSTACK_ACCESS_KEY || 'TneCumCuE39gtpCs2Nt8',
    server: 'hub-cloud.browserstack.com',
    onPrepare: function (config, capabilities) {
        //Set maxInstances dynamically using BrowserStack data
        let planDetails = browserStackHelper.getPlanDetails(`${config.user}:${config.key}`);
        config.maxInstances = planDetails === null ? 4 : planDetails.team_parallel_sessions_max_allowed * 2;
    },
    afterStep: function (testResult) {
        let testStatus = testResult.getStatus();
        if (testStatus === 'failed') {
            let auth = browser.requestHandler.auth || {};
            browserStackHelper.setSessionStatus(browser.requestHandler.sessionID, auth,
                testStatus, 'assertion failed');
        }
    },
});
