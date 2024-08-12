const { Given, When, Then, defineStep } = require('@cucumber/cucumber');

const HomePage = require('../../page_objects/FlightSelling/homePage/home_page.page');
const ECLogin = require('../../page_objects/ExecutiveClub/ECLogin/ECLogin.page');
const ECMember_Account = require('../../page_objects/ExecutiveClub/ecmember/ecmember_account.page');
const ECFlightSearch = require('../../page_objects/ExecutiveClub/ECFlightSearch/ECFlightSearch.page');
const EC_Flight_Selection = require('../../page_objects/ExecutiveClub/ECFlightSelection/ECFlightSelection.page');

const obj_homePage = new HomePage();
const obj_ECLogin = new ECLogin();
const obj_ECMember_Account = new ECMember_Account();
const obj_ECFlightSearch = new ECFlightSearch();
const obj_EC_Flight_Selection = new EC_Flight_Selection();

defineStep("I am logged in with {string} EC Member and making a booking for {string} having voucher and route type {string}", async (ecMember, payment_type, routeType) => {
  await obj_homePage.continueNextToECLogin(ecMember);
  await obj_ECLogin.navigateToECHomepage();
  await obj_ECMember_Account.continueToFlighSearchPage(routeType, payment_type);
  await obj_ECFlightSearch.clickOnAmexVoucherRadioButton();
  await obj_ECFlightSearch.ECFlightSearch();
});

defineStep ("I go to Flight List page", async () => {
  await obj_EC_Flight_Selection.verifyFlightListPage();
});

defineStep ("{string} message will be displayed on Flight list page", async (banner) => {
  await obj_EC_Flight_Selection.verifySoloTraveller(banner);
});
