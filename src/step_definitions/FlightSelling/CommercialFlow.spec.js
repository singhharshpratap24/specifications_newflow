const { Given, When, Then, defineStep, And } = require('@cucumber/cucumber');
const HomePage = require('../../page_objects/FlightSelling/homePage/home_page.page');
const SelectionFlight = require('../../page_objects/FlightSelling/flightSelection/flight_Selection.page');
const FareQuote = require('../../page_objects/FlightSelling/farequote/farequote.page');
const PassengerDetails = require('../../page_objects/FlightSelling/passenger/passenger_details.page');
const Payment = require('../../page_objects/FlightSelling/payment/payment.page');
const FlightConfirmation = require('../../page_objects/FlightSelling/Confirmation/Confirmation.page');
const SeatItenary = require('../../page_objects/FlightSelling/SeatSelection/SeatItenary.page');
const Donations = require('../../page_objects/FlightSelling/Donations/Donations.page');
const SeatMapping = require('../../page_objects/FlightSelling/SeatSelection/SeatMapping.page')
const DisabilityAssistance = require('../../page_objects/FlightSelling/DisabilityAssistance/disabilityassistance.page')
const EC_Cash_flow_Pax_Details = require('../../page_objects/ExecutiveClub/ECCashFlow/EC_Cash_flow_Pax_Details.page');

const obj_EC_Cash_flow_Pax_Details = new EC_Cash_flow_Pax_Details();
const obj_homePage = new HomePage();
const obj_SelectionFlight = new SelectionFlight();
const obj_fareQuote = new FareQuote();
const obj_passenger = new PassengerDetails();
const obj_Payment = new Payment();
const obj_Confirmation = new FlightConfirmation();
const obj_seating = new SeatItenary();
const obj_selectSeat = new SeatMapping();
const obj_Donations = new Donations();
const obj_Disabilityassistance = new DisabilityAssistance();

Given("I create a booking departing from {string}", async function (country) {
  await obj_homePage.gotoHomePageForDifferentCountry(country);
  await obj_homePage.continueToFlightSearchPage(route = null, cabin = null, "1A,0Y,1I,1C");
});

defineStep('I land on flight booking confirmation page with PNR details', async function () {
  await obj_Confirmation.assertConfirmation();
});

defineStep('booking using voucher created successfully', async function () {
  await obj_Confirmation.assertConfirmation();
});


defineStep("User selects choose seats later", async () => {
  await obj_seating.chooseSeatsLaterButton();
});

defineStep("I click on Add link for 'Apply an eVoucher' option", async () => {
  await obj_fareQuote.clickApplyEVoucherButton();
});

defineStep("voucher discount is applied to total cost of flight and pay by card {string}", async (cardName) => {
  var eVoucherCodeData = await obj_fareQuote.goToCreateVoucherPage();
  await obj_fareQuote.setVoucherDetails(eVoucherCodeData);
  await obj_fareQuote.continueNextToPassengerPage();
  await obj_passenger.continueNextToSeatingPage();
  await obj_seating.continueNextToPaymentPage();
  await obj_Payment.continueNextToConfirmationPage(cardName);
});

//@pnrbooking_farequoteSaveWithAvios
defineStep("User click on 'login' button", async () => {
  await obj_fareQuote.saveWithAvios();
});

defineStep("User enter the following details ec member {string} password {string}", async (ecMember, password) => {
  await obj_fareQuote.setEcLoginDetails(ecMember, password);
});

defineStep("I click on 'disability assistance' button", async () => {
  await obj_fareQuote.disabilityAssistance();
});

defineStep("disability assistance page is displayed", async () => {
  await obj_Disabilityassistance.disabilityAssistancePageDisplayed();

});

defineStep("I navigate to farequote page and validates the Hold Booking pod", async () => {
  await obj_fareQuote.asserHoldBookingButton();
})

defineStep("User selects seats for return journey", async () => {
  //oneway seat selection
  await obj_seating.outboundSegmentSeatSelection();
  await obj_selectSeat.seatMapAssertions();
  await obj_selectSeat.chooseSeats();
  await obj_seating.seatsAgreeAndContinueButton();

  //return seat selection
  await obj_seating.inboundSegmentSeatSelection();
  await obj_selectSeat.seatMapAssertions();
  await obj_selectSeat.chooseSeats();
  await obj_seating.seatsAgreeAndContinueButton();
}
);

defineStep('I search and select my roundtrip flight with {string}', async (paxmixType) => {
  await obj_homePage.continueToFlightSearchPage(route = null, cabin = null, paxmixType);
  await obj_SelectionFlight.continueNextToFareQuote();
});

defineStep('I search and select my oneway flight with {string}', async (paxmixType) => {
  await obj_homePage.continueToFlightSearchPage(paxmixType);
  await obj_SelectionFlight.continueNextToFareQuote();
});

defineStep('Payment surcharge is being charged according to currency with {string}', async (cardName) => {
  await obj_Payment.paymentDetailsSurcharge(cardName);
  await obj_Payment.continueNextToConfirmationPage(cardName);
});

defineStep("I am planning my short haul journey for flexible cabin with {string}", async (paxmixType) => {
  await obj_homePage.gotoHomePage();
  await obj_homePage.selectFlexbileClass();
  await obj_homePage.continueToFlightSearchPage(route = null, cabin = null, paxmixType);
});

defineStep("I am making an Economy Flexible booking departing from {string} with {string}", async (country,paxmixType) => {
  await obj_homePage.gotoHomePageForDifferentCountry(country);
  await obj_homePage.selectFlexbileClass();
  await obj_homePage.continueToFlightSearchPage(route = null, cabin = null, paxmixType);
});

defineStep('I pay for my booking with {string} for hold booking', async function (cardName) {
  await obj_Payment.UpdatedpaymentDetails(cardName);
});

defineStep('I pay for my booking with {string} without seat selection', async function (cardName) {
  await obj_SelectionFlight.continueNextToFareQuote();
  await obj_fareQuote.continueNextToPassengerPage();
  await obj_passenger.continueNextToSeatingPage();
  await obj_seating.continueNextToPaymentPage();
  await obj_Payment.continueNextToConfirmationPage(cardName);
});

defineStep('I pay for my booking with {string}', async function (cardName) {
  await obj_SelectionFlight.continueNextToFareQuote();
  await obj_fareQuote.continueNextToPassengerPage();
  await obj_passenger.continueNextToSeatingPage();
  await obj_seating.continueNextToPaymentPageAfterSeatSelection();
  await obj_Payment.continueNextToConfirmationPage(cardName);
});

defineStep('I pay for the booking with {string}', async function (cardName) {
  await obj_Payment.continueNextToConfirmationPage(cardName);
});

defineStep('I pay for my booking', async function () {
  await obj_SelectionFlight.continueNextToFareQuote();
  await obj_fareQuote.continueNextToPassengerPage();
  await obj_passenger.continueNextToSeatingPage();
  await obj_seating.continueNextToPaymentPage();
});


defineStep('I continue till Passenger page.', async () => {
  await obj_SelectionFlight.continueNextToFareQuote();
  await obj_fareQuote.continueNextToPassengerPage();
});

defineStep("I continue till Payment page", async () => {
  await obj_SelectionFlight.continueNextToFareQuote();
  await obj_fareQuote.continueNextToPassengerPage();
  await obj_passenger.continueNextToSeatingPage();
  await obj_seating.continueNextToPaymentPage();
});

defineStep("I book my journey on {string} in {string} with {string}", async (route, cabin, paxmixType) => {
  await obj_homePage.gotoHomePage();
  await obj_homePage.continueToFlightSearchPage(route, cabin, paxmixType);
})

defineStep("I continue till Booking summary page", async () => {
  await obj_SelectionFlight.continueNextToFareQuote();
})

defineStep("I click on your breakdown link", async () => {
  await obj_fareQuote.selectBreakDownTable();
});

defineStep("correct APD taxes are displayed", async () => {
  await obj_fareQuote.assertAPDTaxes();
});

defineStep("I am planning commercial booking with {string} where passenger is not payer", async (paxmixType) => {
  await obj_homePage.gotoHomePage();
  await obj_homePage.continueToFlightSearchPage(route = null, cabin = null, paxmixType);
  await obj_SelectionFlight.continueNextToFareQuote();
  await obj_fareQuote.continueNextToPassengerPage();
  await obj_passenger.continueNextToSeatingPage();
  await obj_seating.continueNextToPaymentPage();
});

defineStep("I am planning commercial booking with {string}", async (paxmixType) => {
  await obj_homePage.gotoHomePage();
  await obj_homePage.continueToFlightSearchPage(route = null, cabin = null, paxmixType);
});

defineStep("I navigated till Payment Page with {string}", async (paxmixType) => {
  await obj_homePage.continueToFlightSearchPage(route = null, cabin = null, paxmixType);
  await obj_SelectionFlight.continueNextToFareQuote();
  await obj_fareQuote.continueNextToPassengerPage();
  await obj_EC_Cash_flow_Pax_Details.continueNextToSeatingPage();
  await obj_seating.continueNextToPaymentPage();
});

defineStep("Confirmation Page is Displayed", async () => {
  await obj_Payment.ECPaymentDetails();
  await obj_Confirmation.assertConfirmation();
});

defineStep("adding payer details for booking with {string}", async (cardName) => {
  await obj_Payment.thirdPartyPayerPayment(cardName);
});

defineStep("upgrade my ticket flexiblity {string} on Booking summary page for {string}", async (section, ticketType) => {
  await obj_fareQuote.assertMoreFareOptionsAccordion();
});

defineStep("the correct number of Paxmix should be displayed on Booking Summary page as selected", async () => {
  await obj_fareQuote.assertPaxMixCount();
});

defineStep("I add {string} membership details", async (member) => {

  await obj_Payment.addOnBusinessMembershipDetails(member);
});

defineStep('I should be able to add membership details to the booking with {string}', async function (cardName) {
  await obj_Payment.continueNextToConfirmationPage(cardName);
  await obj_Confirmation.assertConfirmation();
});

defineStep('I am not logged-in and my country of residence is Ghana {string}', async (country) => {
  await obj_homePage.gotoHomePageForDifferentCountry(country);
});

defineStep('I am making a booking with money departing from Ghana', async () => {
  await obj_homePage.continueToFlightSearchPage(route = null, cabin = null, "1A,0Y,0I,0C");
});

defineStep('I proceed till Payment Page', async () => {
  await obj_SelectionFlight.continueNextToFareQuote();
  if (await obj_fareQuote.verifyAirportMismatch()) {
    await obj_fareQuote.airportMismatchContinueButton();
  }
  await obj_fareQuote.continueNextToPassengerPage();
  await obj_passenger.continueNextToSeatingPage();
  await obj_seating.continueNextToPaymentPage();
});

defineStep('Payment cards {string} available are as follows', async (icons) => {
  await obj_Payment.getAvailablePaymentCard(icons);
});

Then("I have selected all details on Flight search selection", async function () {
  await obj_SelectionFlight.continueNextToFareQuote();
  await obj_fareQuote.continueNextToPassengerPage();
  await obj_passenger.enterPassengerDetails();
});

When(/^continue till Payment page$/, async function () {
  await obj_seating.chooseSeatsLaterButton();
  await obj_Payment.Credit_offer_skip_page();
});

Then("I pay for the booking with Secure online {string}", async function (PaymentCard) {
  await obj_Payment.UpdatedpaymentDetails(PaymentCard);
});

Then('user is prompted to authenticate with their bank before payment is taken', async function () {
  await obj_Payment.validatePaymentCardAuthorisationPage();
});

defineStep("I am creating any multi-Leg booking with {string}", async (paxmixType) => {
  await obj_homePage.gotoHomePage();
  await obj_homePage.continueToFlightSearchPage(route = null, cabin = null, paxmixType);
});

defineStep("I have selected flights for all legs on Flight search selection", async ()=> {
  await obj_SelectionFlight.continueNextToFareQuote();
});

defineStep("I compare the price on farequote with final price on payment page", async () => {
let farequoteprice = await obj_fareQuote.getPriceOnFarequote();
await obj_fareQuote.continueNextToPassengerPage();
await obj_passenger.continueNextToSeatingPage();
await obj_seating.continueNextToPaymentPage();
let paymentprice = await obj_Payment.getPriceOnPayment();
expect(farequoteprice.trim()).to.equal(paymentprice.trim());
});

defineStep('I have flights departing Surcharge attracting {string} in my booking', async (country)=> {
  await obj_homePage.gotoHomePageForDifferentCountry(country);
  await obj_homePage.continueToFlightSearchPage(route = null, cabin = null, "1A,0Y,0I,1C")
});

defineStep('I select same country as my billing country', async ()=> {
  await obj_SelectionFlight.continueNextToFareQuote();
  await obj_fareQuote.continueNextToPassengerPage();
  await obj_passenger.continueNextToSeatingPage();
  await obj_Payment.getPriceOnPayment();
});

defineStep('I change billing country to another billing country', async ()=> {
  await obj_Payment.getPriceOnPaymentAfterCountryChange();
});

defineStep('surcharge is removed from my booking', async () => {
  await obj_Payment.surchargeRemoved();
});

defineStep('I am searching for flights with {string}', async (paxmixType) => {
  await obj_homePage.gotoHomePage();
  await obj_homePage.continueToFlightSearchPage(route = null, cabin = null, paxmixType);
});

defineStep('I proceed till Booking Summary page', async () => {
  await obj_SelectionFlight.continueNextToFareQuote();
});

defineStep('I click on Back to flight selection link', async () => {
  await obj_fareQuote.verifyGoBackToFlightSelection();
});

defineStep('Flight Selection page is displayed', async () => {
  obj_SelectionFlight.verifyFlightSelectionPageLoaded();
});

defineStep('It allows us to change flights', async () => {
  await obj_SelectionFlight.verifyCloseFlightSelectionBtn();
  await obj_SelectionFlight.continueNextToFareQuote();
});

defineStep('I am a Pre-pin customer on ba.com homepage with {string}', async (paxmixType) => {
  await obj_homePage.gotoHomePage();
  await obj_homePage.continueToFlightSearchPage(route = null, cabin = null, paxmixType);
});

defineStep('I am viewing the flight list for an Economy Lowest commercial booking on a short-haul route', async () => {
  await obj_SelectionFlight.assertFlightSelectionPage();
});

defineStep('I click on the Flight Details link displayed below any flight', async () => {
  await obj_SelectionFlight.clickFlightDetails();
});

defineStep('Flight attributes should be displayed', async () => {
  await obj_SelectionFlight.assertFlightAttributes();
});

defineStep('I am on Flight Selection page', async () => {
  await obj_homePage.gotoHomePage();
  await obj_homePage.continueToFlightSearchPage(route = null, cabin = null, "One Adult");
});

defineStep('I click on Edit Search link', async () => {
  await obj_SelectionFlight.clickOnEditSearchButton();
});

defineStep('Edit Search section is displayed', async () => {
  await obj_SelectionFlight.verifyEditSearchPopUp();
});
