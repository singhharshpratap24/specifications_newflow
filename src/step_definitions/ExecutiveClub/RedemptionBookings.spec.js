const { Given, When, Then, defineStep } = require('@cucumber/cucumber');

const ECLogin = require('../../page_objects/ExecutiveClub/ECLogin/ECLogin.page')
const ECMember_Account = require('../../page_objects/ExecutiveClub/ecmember/ecmember_account.page')
const ECFlightSearch = require('../../page_objects/ExecutiveClub/ECFlightSearch/ECFlightSearch.page');
const EC_Flight_Selection = require('../../page_objects/ExecutiveClub/ECFlightSelection/ECFlightSelection.page');
const EC_Price_Quote = require('../../page_objects/ExecutiveClub/ECPriceQuote/ECPriceQuote.page');
const EC_Passenger = require('../../page_objects/ExecutiveClub/ECPassengerDetails/ECPassenger.page');
const ECPayment = require('../../page_objects/ExecutiveClub/ECPayment/ECPayment.page');
const EC_Booking_Confirmation = require('../../page_objects/ExecutiveClub/EC_Booking_Confirmation/EC_Booking_Confirmation.page');
const HomePage = require('../../page_objects/FlightSelling/homePage/home_page.page');
const PageElements = require("../../PageElements/ExecutiveClub/ECPriceQuote.pagelements");

const obj_ECLogin = new ECLogin();
const obj_ECMember_Account = new ECMember_Account();
const obj_ECFlightSearch = new ECFlightSearch();
const obj_EC_Flight_Selection = new EC_Flight_Selection();
const obj_ECPrice_Quote = new EC_Price_Quote();
const obj_ECPassengerPage = new EC_Passenger();
const obj_ECPayment = new ECPayment();
const obj_EC_BookingConfirmation = new EC_Booking_Confirmation();
const obj_homePage = new HomePage();
var pymtType;

defineStep("I am making a shorthaul {string} redemption booking using {string}", async (routeType, bookingType) => {
  await obj_ECLogin.navigateToECHomepage();
  await obj_ECMember_Account.continueToFlighSearchPage(routeType, bookingType);
  await obj_ECFlightSearch.continueToEcFlightListPage(bookingType);
});

defineStep("I am making a longhaul {string} redemption booking using {string}", async (route, payment_type) => {
  pymtType = payment_type;
  await obj_ECLogin.navigateToECHomepage();
  await obj_ECMember_Account.continueToFlighSearchPage(route, payment_type);
  await obj_ECFlightSearch.continueToEcFlightListPage(payment_type);
});

defineStep("I pay for my redemption booking with card as {string}", async (cardName) => {
  await obj_EC_Flight_Selection.continueNextToFareQuote();
  if(pymtType === "PartAvios PartCash"){
    await page.waitForSelector(PageElements.ECPriceQuote.locate_change_avios_price_option,20000);
    await page.locator(PageElements.ECPriceQuote.locate_change_avios_price_option).click();
  }
  await obj_ECPrice_Quote.continueToPassengerPage();
  await obj_ECPassengerPage.continueToPaymentPage();
  await obj_ECPayment.continueNextToConfirmationPage(cardName);
});

defineStep("the confirmation page is displayed with booking reference", async () => {
  await obj_EC_BookingConfirmation.getBookedPNR();
});

When(/^I go to see my fare quote$/, async function () {
  await obj_EC_Flight_Selection.continueNextToFareQuote();
});

Then(/^Price quote shows total avios in an account$/, async function () {
  await obj_ECPrice_Quote.VerifyYourAviosInAccount();
});

defineStep("following {string} gets displayed in Price Breakdown section", async function (details) {
   await obj_ECPrice_Quote.verifyAllOptionsInPriceBreakdown(details);
   
});

Then(/^itinerary is displayed as selected on flight list page$/, async function () {
  await obj_ECPrice_Quote.isCorrectIteneryDisplayed();
});

defineStep("I change avios price option on Fare Quote", async function () {
  await obj_ECPrice_Quote.ChangeAviosPriceOption();
});

defineStep("avios fare and tfc's per person under price breakdown section also change", async function () {
  await obj_ECPrice_Quote.VerifyAviosPerPersonInAccount();
  await obj_ECPrice_Quote.VerifyTaxesFeesAndCarrierChargesPerPersonInAccount();
  await obj_ECPrice_Quote.VerifyPricePerPersonInAccount();
  await obj_ECPrice_Quote.verifyInclusiveTotalPrice();
});

Then("correct infant seating {string} is displayed", async (message) => {
  await obj_ECPrice_Quote.verifyCorrectSeatingMessageForInfant(message)
})

defineStep("I view my profile", async () => {
  await obj_ECLogin.navigateToECHomepage();
});

defineStep("following {string} displayed are correct for {string}", async (Details, Member_Type) => {
  await obj_EC_BookingConfirmation.assertConfirmationDetails(Details, Member_Type);
});

  defineStep("Following fields {string} are displayed as Mandatory fields", async function(fields){
    await obj_ECPayment.verifyfields(fields);
  });

  defineStep("I select a {string}", async function(cardName){
    await obj_EC_Flight_Selection.continueNextToFareQuote();
    await obj_ECPrice_Quote.continueToPassengerPage();
    await obj_ECPassengerPage.continueToPaymentPage();
  });

  defineStep("I am making {string} a redemption booking using {string}", async (routeType, bookingType) => {
    await obj_ECLogin.navigateToECHomepage();
    await obj_ECMember_Account.ClickOnBookFlightWithAvios();
    await obj_ECMember_Account.continueToFlighSearchPage(routeType, bookingType);
    await obj_ECFlightSearch.continueToEcFlightListPage(bookingType); 
    })
    defineStep("Avios deducted is displayed under price breakdown section", async () => {
      await obj_ECPrice_Quote.verifyAviosDeducted();
    })

  defineStep("that I am logged in as a {string}", async (ecMember)=> {
    await obj_homePage.continueNextToECLogin(ecMember);
  });
  
  defineStep("I create {string} booking travelling on {string}", async (payment_type,route)=>  {
    await obj_ECLogin.navigateToECHomepage();
    await obj_ECMember_Account.continueToFlighSearchPage(route, payment_type);
    await obj_ECFlightSearch.continueToEcFlightListPage(payment_type);
  });
  
  defineStep("I selected myself as person paying is traveling on Passenger page and submit the passenger details", async ()=> {
  await obj_EC_Flight_Selection.continueNextToFareQuote();
  await obj_ECPrice_Quote.continueToPassengerPage();
  await obj_ECPassengerPage.continueToPaymentPage();
  });
  
  defineStep('my name is displayed as text in the payment details as the person paying', async ()=> {
    await obj_ECPayment.verifyNameOnCard();
  })

  Then("following {string} gets displayed correctly on fare quote ",async function(details){
  });

  defineStep("following gets displayed in Price Breakdown section for {string}", async function (details) {
    await obj_ECPrice_Quote.VerifyTaxesFeesAndCarrierChargesPerPersonInAccount();
    await obj_ECPrice_Quote.VerifyPricePerPersonInAccount();
    await obj_ECPrice_Quote.verifyInclusiveTotalPrice();
  });

  defineStep("following {string} gets displayed correctly on farequote page", async function (details) {
    await obj_ECPrice_Quote.VerifyAviosPerPersonInAccount();
    await obj_ECPrice_Quote.verifyInclusiveTotalPrice();
    await obj_ECPrice_Quote.verifyFareRules();
    await obj_ECPrice_Quote.verifyPriceBreakdownInPopUp(details);
  });