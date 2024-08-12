const reporter = require('cucumber-html-reporter')
var date = new Date ();
var currentDate = date.getDate() + '-' + (date.getMonth()+1) + '-' + date.getFullYear() + '_' + date.getHours() +  date.getMinutes() ;

const options = {
  theme: 'bootstrap',
  jsonFile: 'test_results/json/cucumber-report_'+currentDate+'.json',
  jsonDir: './test_results/json/',
  output: './test_results/html/cucumber_report_'+currentDate+'.html',
  reportSuiteAsScenario: true,
  scenarioTimestamp: true,
  launchReport: true,
  storeScreenshots: true,
  screenshotsDirectory: './test_results/screenshots',
  noInlineScreenshots: false,
  metadata: {
    'Report': 'Playwright Report',
    'Test Environment': 'Pre-Live',
    'Browser': 'Chrome 104.0',
    'Regression': 'CAP sanity Test Cases',
  },
}

reporter.generate(options)
