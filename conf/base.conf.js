const commands = require('../commands/custom-commands');
const path = require("path");
const tagHelper = require('../test-utility/tag-helper');

global.__base = path.join(__dirname, '../');
//let pluginName = process.env.npm_config_plugin || '**';
// let baseUrl = process.env.npm_config_baseurl;
// let specPath = path.join('..', '..', 'wordpress', '**', pluginName, 'ui-tests', 'features', '*.feature');

///Get tags
let priorityTags = process.env.npm_config_tags ? [process.env.npm_config_tags] : [];

exports.config = {

    updateJob: false,

    logLevel: 'silent',
    coloredLogs: true,
    screenshotPath: './error-shots/',
    baseUrl: 'http://webdriver.io',
    waitforTimeout: 15000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    reporters: ['spec', 'junit', 'teamcity'],
    reporterOptions: {
        junit: {
            outputDir: './reports'
        },
    },
    specs: [
         './ui-tests/features/**/*.feature'
    ],
    framework: 'cucumber',
    //
    // Test reporter for stdout.
    // The only one supported by default is 'dot'
    // see also: http://webdriver.io/guide/testrunner/reporters.html
    //reporters: ['spec'],
    //
    // If you are using Cucumber you need to specify the location of your step definitions.
    cucumberOpts: {
        require: [
        ],        // <string[]> (file/dir) require files before executing features
        backtrace: false,   // <boolean> show full backtrace for errors
        // <string[]> ("extension:module") require files with the given EXTENSION after requiring MODULE (repeatable)
        dryRun: false,      // <boolean> invoke formatters without executing steps
        failFast: false,    // <boolean> abort the run on first failure
        format: ['pretty'], // <string[]> (type[:path]) specify the output format, optionally supply PATH to redirect formatter output (repeatable)
        colors: true,       // <boolean> disable colors in formatter output
        snippets: false,     // <boolean> hide step definition snippets for pending steps
        source: true,       // <boolean> hide source uris
        profile: [],        // <string[]> (name) specify the profile to use
        strict: false,      // <boolean> fail if there are any undefined or pending steps
        tags: priorityTags,           // <string[]> (expression) only execute the features or scenarios with tags matching the expression
        timeout: 120000,     // <number> timeout for step definitions
        ignoreUndefinedDefinitions: true, // <boolean> Enable this config to treat undefined definitions as warnings.
    },

    // Gets executed before test execution begins. At this point you can access to all global
    // variables like `browser`. It is the perfect place to define custom commands.
    before: function (capabilities, specs) {
        browser.timeouts('script', 60000);
        
        commands.add(specs);
        if (browser.isDesktopBrowser()) {
            browser.setViewportSize({
                width: 1600,
                height: 1200
            }, false);
            browser.pause(1000);
        }
        browser.refresh();
    },

    beforeSession: function (config, capabilities, specs) {
        const fs = require('fs');
        let featureFile = fs.readFileSync(specs[0]).toString();
        let cucumberTags = config.cucumberOpts.tags[0];
        let isTagPresent = true;
        if(cucumberTags){
            let tagNames = cucumberTags.split(',');
            isTagPresent = tagNames.some((tag) =>{
               return featureFile.includes(tag);
            });
        }
        if(isTagPresent){
            let featureName = featureFile.split("\n")[0];
            capabilities.name = featureName;
        }else{
            process.exit();
        }

        //Set browser specific tags
        let browserTags = tagHelper.getBrowserSpecificTags(capabilities.browserName);
        config.cucumberOpts.tags.push(browserTags);
        config.cucumberOpts.tags.push('~@ignore');
    }
};

