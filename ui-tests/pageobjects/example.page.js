"use strict";
var Page = require('../pageobjects/page');
var exampleMap = require('../uimap/example.uimap');


class ExamplePage extends Page {
    get searchInput() { return $( exampleMap.searchInput); }
    get resultsList() { return $$( exampleMap.resultsList); }

    navigateToWebdriverIoPage(url){
        browser.url(url);
    }

    searchGoogle(searchTerm){
        this.searchInput.waitForExist();
        this.searchInput.clearElement();
        this.searchInput.setValue(searchTerm);
    }

    isisResultsVisible(){
        this.resultsList[0].waitForExist();
        // get all results that are displayed
        let results = this.resultsList.filter((link) =>{
            return link.isVisible();
        });

        return results.length > 0;
    }

}
module.exports = new ExamplePage();