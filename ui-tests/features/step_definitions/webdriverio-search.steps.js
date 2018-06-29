'use strict';

var expect = require('chai').expect;
var assert = require('chai').assert;
var examplePage = require('../../pageobjects/example.page');
var testData = require('../../data/test-data.json');

module.exports = function () {

    this.Given(/^I am on WebdriverIO API page$/, () => {
        examplePage.navigateToWebdriverIoPage(testData.apiPagePath);
    });

    this.When(/^I search "([^"]*)" into the search box$/, (arg1) => {
       examplePage.searchGoogle(arg1);
    });

    this.Then(/^I should see a list of search results$/, () => {
        expect(examplePage.isisResultsVisible()).to.be.true;
    });
};
