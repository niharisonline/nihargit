'use strict';

var emailHelper = require('../test-utility/email-helper');
var path = require("path");

class CustomCommands {

    /**
     * @param  {} callback
     */
    add(specs) {

       browser.addCommand('getNewEmail', function async() {
            return emailHelper.getNewEmail();
        });

        browser.addCommand('getEmailConfirmationLink', function async(sessionId) {
            return emailHelper.getEmailConfirmationLink(sessionId);
        });

        browser.addCommand("isFirefox", function () {
            return browser.desiredCapabilities.browserName.toUpperCase() === 'FIREFOX';
        });

        browser.addCommand("isiPhone", function () {
            return browser.desiredCapabilities.browserName.toUpperCase() === 'IPHONE';
        });

         browser.addCommand("isiPad", function () {
            return browser.desiredCapabilities.browserName.toUpperCase() === 'IPAD';
        });

        browser.addCommand("isSafari", function () {
            return browser.desiredCapabilities.browserName.toUpperCase() === 'SAFARI';
        });

        browser.addCommand("isIE", function () {
            return browser.desiredCapabilities.browserName.toUpperCase() === 'IE';
        });

         browser.addCommand("isChrome", function () {
            return browser.desiredCapabilities.browserName.toUpperCase() === 'CHROME';
        });

        browser.addCommand("isPhantom", function () {
            return browser.desiredCapabilities.browserName.toUpperCase() === 'PHANTOMJS';
        });

        browser.addCommand("canHandleSecurityError", function () {
            return !(browser.isFirefox() || browser.isSafari());
        });

        browser.addCommand("isAppleBrowser", function () {
            return (browser.isSafari()
                || browser.isiPad() 
                || browser.isiPhone());
        });

        browser.addCommand("isDesktopBrowser", function () {
            return (browser.isFirefox()
                || browser.isSafari()
                || browser.isIE() 
                || browser.isChrome()
                || browser.isPhantom());
        });

         browser.addCommand("isMobileBrowser", function () {
            return (browser.isiPhone());
        });

        browser.addCommand("moveToElement", function (selector) {
            browser.selectorExecute(selector, function (element) {
                 element[0].scrollIntoView();
            });
        });
        
         browser.addCommand("endSession", function () {
            return new Promise(
                (resolve, reject) => {
                    browser.requestHandler.create({
                        path: '/session/' + browser.sessionId,
                        method: 'DELETE',
                        requiresSession: false
                    }).then((res) => {
                        /*!
                         * delete sessionID in RequestHandler
                         */
                        this.requestHandler.sessionID = null;
                        process.removeAllListeners();
                        global.browser.removeAllListeners();
                        process.exit();
                    });
                });
        });
    }
}
module.exports = new CustomCommands();