const playwright = require('playwright');
const logger = require ('./logger');
const { Before, After, BeforeAll, AfterAll, setDefaultTimeout, Status } = require('@cucumber/cucumber')

var tagName;

setDefaultTimeout(60000 * 10);
//setDefaultNavigationTimeout(60000 * 10);

const logsarray = [];

BeforeAll(async () => {
  //logger.info('Launch Browser', { classname : 'Hooks'})
  global.browser = await playwright['chromium'].launch({ headless: process.env.PLAYWRIGHT_HEADLESS === 'true' ? true : false})
})

AfterAll(async () => {
  //logger.info('Close Browser', { classname : 'Hooks'})
  await global.browser.close()
  
  console.log('Printing network errors identified during execution:')
  //console.log (logsarray);
  logsarray.length = 0;
})

Before(async (Scenario) => {
  // logger.info('Create new context and page', { classname : 'Hooks'})
  global.context = await global.browser.newContext();
  global.page = await global.context.newPage();

  const tags = Scenario.pickle.tags.map(tag => tag.name.split("@")[1]);

  const nonRegressionTags = tags.filter(tag => tag !== 'Regression');

  tagName = nonRegressionTags.length > 0 ? nonRegressionTags[0] : null;

  console.log(`[Scenario TagName] : ${tagName}`);

  await global.page.setDefaultTimeout(60000 * 10);

  global.page.on('console', msg => {
    let page_console_log;

    // Log message based on type
    if (msg.type() === 'error') {
      page_console_log = "[NETWORK ERROR]: " + msg.text();
      // logger.error(page_console_log, { classname: 'NETWORK' });
    } else if (msg.type() === 'log') {
      page_console_log = "[LOG]: " + msg.text();
    } else if (msg.type() === 'info') {
      page_console_log = "[INFO]: " + msg.text();
    } else if (msg.type() === 'warning') {
      page_console_log = "[WARNING]: " + msg.text();
    } else {
      page_console_log = "[" + msg.type() + "]: " + msg.text();
    }

    logsarray.push(page_console_log);
  });
});


After(async function (Scenario) {
  let tagName = Scenario.pickle.tags[0].name.split("@")[1];

  if (Scenario.result?.status == Status.FAILED) {
    logger.info('[RESULT]: TC FAILED', { classname: 'Hooks' })
    this.attach(await page.screenshot({ path: `./test_results/screenshots/${tagName}_${new Date().getTime()}.png`, fullPage: true }), "image/png");
  } else {
    logger.info('[RESULT]: TC PASSED', { classname: 'Hooks' })
  }
  await global.page.close()
  await global.context.close()
})

function getTagName() {
  return tagName;
}

module.exports = { getTagName }