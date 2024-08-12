const { Given, When, Then, defineStep } = require('@cucumber/cucumber')
const SeatItenary = require('../../page_objects/FlightSelling/SeatSelection/SeatItenary.page');
const SeatMapping = require('../../page_objects/FlightSelling/SeatSelection/SeatMapping.page')
const Seatnumbervalidation = require("../../page_objects/FlightSelling/SeatSelection/SeatNumberValidation.page");
const SelectionFlight = require('../../page_objects/FlightSelling/flightSelection/flight_Selection.page');
const PassengerDetails = require('../../page_objects/FlightSelling/passenger/passenger_details.page');
const FareQuote = require('../../page_objects/FlightSelling/farequote/farequote.page');
const HomePage = require('../../page_objects/FlightSelling/homePage/home_page.page');

// Object definitions
const obj_seatItenary = new SeatItenary();
const obj_selectSeat = new SeatMapping();
const obj_seatNumberValidation = new Seatnumbervalidation();
const obj_SelectionFlight = new SelectionFlight();
const obj_fareQuote = new FareQuote();
const obj_passenger = new PassengerDetails();
const obj_homePage = new HomePage();

defineStep("continue till seating page", async () => {
  await obj_SelectionFlight.continueNextToFareQuote();
  await obj_fareQuote.continueNextToPassengerPage();
  await obj_passenger.continueNextToSeatingPage();
  await obj_seatItenary.assertChooseYourSeatsHeading();
  await obj_seatItenary.outboundSegmentSeatSelection();
  await obj_selectSeat.chooseSeats();
  await obj_seatNumberValidation.fetchSeatNumber();
  await obj_seatItenary.seatsAgreeAndContinueButton();
});

defineStep("I reserve the seats from passenger details page", async () => {
  await obj_seatItenary.assertChooseYourSeatsHeading();
  await obj_seatItenary.outboundSegmentSeatSelection();
  await obj_selectSeat.chooseSeats();
  await obj_seatNumberValidation.fetchSeatNumber();
  await obj_seatItenary.seatsAgreeAndContinueButton();
});

defineStep("confirmed seats during booking should match with seating on MMB", async () => {
  await obj_seatNumberValidation.clickonMmb();
  await obj_seatNumberValidation.select_ChooseSeat();
  await obj_seatNumberValidation.validateSeatNumberonmmb();
});  

defineStep("I travel as a Standard customer in Club Class with departure date greater than 14 days with {string}", async (paxmixType) => {
  await obj_homePage.gotoHomePage();
  await obj_homePage.continueToFlightSearchPage(route = null, cabin = null, paxmixType);
})