
'use strict';

const request = require('request-promise-native');
const syncRequest = require('sync-request');

class BrowserStackHelper {

    /**
     * @param  {} callback
     */
    setSessionStatus(sessionId, auth, sessionStatus, reason) {

        request({
            method: 'PUT',
            uri: `https://www.browserstack.com/automate/sessions/${sessionId}.json`,
            json: true,
            auth: auth,
            body: {
                status: sessionStatus,
                reason: reason
            }
        }).then(function (response) {
            console.log(response);
        }).catch(function (err) {
            console.log(err);
        });
    }

    getPlanDetails(auth) {
        try {
            let res = syncRequest('GET', 'https://www.browserstack.com/automate/plan.json', {
                headers: {
                    "authorization": 'Basic ' + new Buffer(auth, 'ascii').toString('base64')
                }
            });
            return JSON.parse(res.getBody('utf8'));

        } catch (error) {
            console.log('Error getting BrowserStack plan details: ' +error);
            return null;
        }
    }
}
module.exports = new BrowserStackHelper();

