const Allure = require('allure-js-commons');
const allure = new Allure();

let configuration = {};

function Reporter() {

    allure.setOptions({ targetDir: configuration.targetDir ? configuration.targetDir : 'allure-results' });

    let lastResults = null;
    let failedResult = null;
    let isScenarioFailed = false;

    this.registerHandler('BeforeFeature', (feature, callback) => {
        allure.startSuite(feature.getName());
        callback();
    });

    this.registerHandler('BeforeFeature', (feature, callback) => {
        allure.startSuite(feature.getName());
        callback();
    });

    this.registerHandler('AfterFeature', (feature, callback) => {
        allure.endSuite();
        callback();
    });

    this.registerHandler('BeforeScenario', (scenario, callback) => {
        failedResult = null;
        isScenarioFailed = false;
        let tags = scenario.getTags().map((tag)=>{
             return tag.getName();
            }).join();

        allure.startCase(`${scenario.getName()}:  ${tags}`);

        let currentTest = allure.getCurrentSuite().currentTest;
        currentTest.setDescription(JSON.stringify(browser.options.desiredCapabilities));
        callback();
    });

    this.registerHandler('AfterScenario', (scenario, callback) => {
        allure.endCase(isScenarioFailed ? "failed" : getStepResult(lastResults),
            isScenarioFailed ? getScenarioFailure(failedResult) : getScenarioFailure(lastResults));
        callback();
    });

    this.registerHandler('BeforeStep', (step, callback) => {
        lastResults = null;

        allure.startStep(step.getName());
        callback();
    });

    this.registerHandler('AfterStep', (step, callback) => {
        let stepArguments = step.getArguments();
        if (stepArguments.length > 0) {
            for (let argument of stepArguments) {
                if (argument.getType() == 'DataTable') {
                    let rawTable = argument.raw();
                    let cellLength = [];
                    let result = '';

                    for (let column = 0; column < rawTable[0].length; column++) {
                        cellLength[column] = 0;
                        for (let row = 0; row < rawTable.length; row++) {
                            if (cellLength[column] < rawTable[row][column].length) {
                                cellLength[column] = rawTable[row][column].length;
                            }
                        }
                    }

                    for (let row = 0; row < rawTable.length; row++) {
                        result += "| ";
                        for (let column = 0; column < rawTable[row].length; column++) {
                            result += rawTable[row][column];
                            for (let i = 0; i < (cellLength[column] - rawTable[row][column].length); i++) {
                                result += ' ';
                            }
                            result += " |";
                        }
                        result += "\n";
                    }

                    allure.addAttachment('Step: \"' + step.getName() + '\" dataTable', result, 'text/plain');
                }

                if (argument.getType() == 'DocString') {
                    allure.addAttachment('Step: \"' + step.getName() + '\" docString', argument.getContent(), 'text/plain');
                }
            }

        }

        let stepResult = getStepResult(lastResults);

        if (stepResult === "failed") {
            isScenarioFailed = true;
            failedResult = lastResults;
        }

        allure.endStep(stepResult);
        callback();
    });

    this.registerHandler('StepResult', (stepResult, callback) => {
        lastResults = stepResult;
        callback();
    });
}

function getStepResult(stepResult) {

    switch (stepResult.getStatus()) {
        case 'passed':
            return 'passed';
        case 'failed':
            let error = stepResult.getFailureException();
            if (error && (error.message === 'Step cancelled' || error.message === 'Test cancelled')) {
                return 'skipped';
            } else {
                return 'failed';
            }
        case 'skipped':
            return 'skipped';
        case 'pending':
            return 'pending';
        case 'undefined':
            return 'broken';
        default:
            return 'broken';
    }
}

function getScenarioFailure(stepResult) {

    switch (stepResult.getStatus()) {
        case 'passed':
            return null;
        case 'failed':
            return stepResult.getFailureException();
        case 'undefined':
            return { message: 'Step not defined', 'stack-trace': '' };
        case 'pending':
            return { message: 'Step not implemented', 'stack-trace': '' };
        case 'skipped':
            return { message: 'Step not executed', 'stack-trace': '' };
        default:
            return { message: 'Unknown problem', 'stack-trace': '' };
    }
}

Reporter.config = function (params) {
    configuration = params;
};

module.exports = Reporter;
module.exports.allureReporter = allure;