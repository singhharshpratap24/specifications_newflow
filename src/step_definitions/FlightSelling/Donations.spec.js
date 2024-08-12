const { defineStep } = require("@cucumber/cucumber");

const HomePage = require('../../page_objects/FlightSelling/homePage/home_page.page');
const SelectionFlight = require('../../page_objects/FlightSelling/flightSelection/flight_Selection.page');
const FareQuote = require('../../page_objects/FlightSelling/farequote/farequote.page');
const PassengerDetails = require('../../page_objects/FlightSelling/passenger/passenger_details.page');
const SeatItenary = require('../../page_objects/FlightSelling/SeatSelection/SeatItenary.page');
const Donations = require('../../page_objects/FlightSelling/Donations/Donations.page');
const FlightConfirmation = require("../../page_objects/FlightSelling/Confirmation/Confirmation.page.js");


const obj_HomePage = new HomePage();
const obj_SelectionFlight = new SelectionFlight();
const obj_FareQuote = new FareQuote();
const obj_Passenger = new PassengerDetails();
const obj_seating = new SeatItenary();
const obj_Donations = new Donations();
const obj_Confirmation = new FlightConfirmation();


defineStep("I select {string} donation",async(donationType)=>{
  await obj_Donations.donations(donationType);
});

defineStep('charity donation amount is added total price.', async () => {
  assert.equal(
    await obj_Donations.getPriceSummary(),
    await obj_Donations.getPriceAFterDonation(),
    'Expected: Correct Donation is reflected.' +
      'Actual: Correct Donation is not reflected.',
  )
})

defineStep("I am on Payment page having  {string} charity donation already selected with {string}", async (donationType, paxmixType) => {
  await obj_HomePage.gotoHomePage();
  await obj_HomePage.continueToFlightSearchPage(route = null, cabin = null, paxmixType);
  await obj_SelectionFlight.continueNextToFareQuote();
  await obj_FareQuote.continueNextToPassengerPage();
  await obj_Passenger.continueNextToSeatingPage();
  await obj_seating.continueNextToPaymentPage();
  await obj_Donations.donations(donationType);
  assert.equal(
    await obj_Donations.getPriceSummary(),
    await obj_Donations.getPriceAFterDonation(),
    'Expected: Correct amount after donation is reflected.' +
      'Actual: Correct amount after donation is not reflected.',
  );
});

defineStep("I select {string} option for BA Better World charity donation", async (donationType) => {
  await obj_Donations.donations(donationType);
});

defineStep("the donation is removed from journey", async () => {
  assert.notEqual(
    await obj_Donations.getPriceSummary(),
    await obj_Donations.getPriceAFterDonation(),
    'Expected: Donation amount should not be added.' +
      'Actual: Donation amount is added..',
  );
});

defineStep('I search my journey on route which is eligible for hold booking with {string}', async (paxmixType) => {
  await obj_HomePage.gotoHomePage();
  await obj_HomePage.continueToFlightSearchPage(route = null, cabin = null, paxmixType);
});

defineStep('I selects flights and click on Hold your flights and Price button on Booking Summary page', async () => {
  await obj_SelectionFlight.continueNextToFareQuote();
  await obj_FareQuote.holdBooking();
});

defineStep('the selected charity donation amount should be shown along with the booking amount', async () => {
  await obj_Donations.getCharityDonationAmount();
});

defineStep('I proceed till Confirmation page and Hold booking completed successfully', async () => {
  await obj_Confirmation.holdBookingConfirmation(); 
 });






