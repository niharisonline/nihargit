Feature: Performing API Search on WebDriverIo

    As a user on the WebDriverIo
    I want to search APIs for WebdriverIO
    Because I want to learn more about it

    @P1 @all
    Scenario: Performing API filter
        Given I am on WebdriverIO API page
        When I search "getT" into the search box
        Then I should see a list of search results


            