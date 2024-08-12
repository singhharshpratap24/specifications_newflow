const { defineStep } = require('@cucumber/cucumber')
const { assert } = require('chai')

const HomePage = require('../../page_objects/FlightSelling/homePage/home_page.page')
const ECLogin = require('../../page_objects/ExecutiveClub/ECLogin/ECLogin.page')
const ECMember_Account = require('../../page_objects/ExecutiveClub/ecmember/ecmember_account.page')
const ECFlightSearch = require('../../page_objects/ExecutiveClub/ECFlightSearch/ECFlightSearch.page')
const EC_Flight_Selection = require('../../page_objects/ExecutiveClub/ECFlightSelection/ECFlightSelection.page')
const EC_Price_Quote = require('../../page_objects/ExecutiveClub/ECPriceQuote/ECPriceQuote.page')

const obj_homePage = new HomePage()
const obj_ECLogin = new ECLogin()
const obj_ECMember_Account = new ECMember_Account()
const obj_ECFlightSearch = new ECFlightSearch()
const obj_EC_Flight_Selection = new EC_Flight_Selection()
const obj_ECPrice_Quote = new EC_Price_Quote()

defineStep(
  'I am an EC Member {string} logged in to my account',
  async (ecMember) => {
    await obj_homePage.continueNextToECLogin(ecMember)
    // await page.waitForTimeout(10000);
    await obj_ECLogin.navigateToECHomepage()
  },
)

defineStep(
  'I am planning a {string} journey using {string}',
  async (routeType, payment_type) => {
    await obj_ECMember_Account.continueToFlighSearchPage(
      routeType,
      payment_type,
    )
    await obj_ECFlightSearch.continueToEcFlightListPage(payment_type)
  },
)

defineStep('I proceed till Fare Quote page', async () => {
  await obj_EC_Flight_Selection.continueNextToFareQuote()
})

defineStep(
  'Upgrade my Ticket flexiblity section is not available on Fare Quote page',
  async () => {
    const isNotUpgradeOptions = await obj_ECPrice_Quote.verifyUpgradeOptions()
    assert.isNotOk(
      isNotUpgradeOptions,
      'Upgrade options is present and displayed',
    )
  },
)
