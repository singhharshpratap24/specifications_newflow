var date = new Date ();
var currentDate = date.getDate() + '-' + (date.getMonth()+1) + '-' + date.getFullYear() + '_' + date.getHours() +  date.getMinutes() ;
module.exports = {
  default: {
    paths: [`src/features/**/*.feature`],
    require: [`src/setup/assertions.js`,`src/setup/hooks.js`,`src/step_defitions/**/*.step.js`],
    format:  [`json:test_results/json/cucumber-report_`+currentDate+`.json`,
              `html:test_results/html-report/cucumber-report`+currentDate+`.html`, 
              `summary:test_results/runresult/runresult`+currentDate+`.txt`, 
              `rerun:test_results/rerun/rerun`+currentDate+`.txt`,
              `usage:test_results/usage/usage`+currentDate+`.txt`,
              `message:test_results/messages/messages`+currentDate+`.json`,
              `./allure-reporter.config.js`,
              `junit:test_results/junit/junit`+currentDate+`.xml`],
    parallel: 4,
    retry: 2,
    retryTagFilter: "@flaky",
    publishQuiet: true

  }
}