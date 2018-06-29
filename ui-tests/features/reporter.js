var Reporter = require(__base + 'custom-reporter/custom-allure-reporter');
Reporter.config(
    {'targetDir':'allure-results'}
);
module.exports = Reporter;