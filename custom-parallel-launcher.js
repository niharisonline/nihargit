const Launcher = require('webdriverio').Launcher;
const configFolder = 'conf/parallel-browsers';
const fs = require('fs');
const path = require("path");
const Q = require('q');

let files = fs.readdirSync(configFolder);
var lastPromise = files.reduce(function(promise, filename) {
    return promise.then(function() {
        let wdio = new Launcher(path.join(configFolder, filename));
        return wdio.run();
    })
    .catch(function(error) {
        console.log("Caught an error but continuing with the other test run.");
    });
}, Q.resolve());

lastPromise
    .then(function() {
        console.log("Successfully completed parallel run");
        process.exit();
    })
    .catch(function(error) {
        console.error("Error during parallel test run: " + error);
        process.exit(1);
    });