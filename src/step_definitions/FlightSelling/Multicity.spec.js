const { Given, When, Then } = require('@cucumber/cucumber')

const { assert } = require('chai');
const HomePage = require('../../page_objects/FlightSelling/homePage/home_page.page');
const Multicity = require('../../page_objects/FlightSelling/Multicity/multicity.page.js');
const MulticityFlightList = require('../../page_objects/FlightSelling/Multicity/multicityFlightList.page.js');
const FareQuote = require('../../page_objects/FlightSelling/farequote/farequote.page.js');
const Passenger = require("../../page_objects/FlightSelling/passenger/passenger_details.page.js");
const Seating = require("../../page_objects/FlightSelling/SeatSelection/SeatItenary.page.js");
const Payment = require("../../page_objects/FlightSelling/payment/payment.page.js");
const FlightConfirmation = require('../../page_objects/FlightSelling/Confirmation/Confirmation.page');
const FlightHelper = require('../..//Helpers/flightdatahelper.js');

const obj_Homepage = new HomePage();
const obj_Multicity = new Multicity();
const obj_MulticityFlightList = new MulticityFlightList();
const obj_Farequote = new FareQuote();
const obj_Passenger = new Passenger();
const obj_Seating = new Seating();
const obj_Payment = new Payment();
const obj_Confirmation = new FlightConfirmation();

Given ("I am on british airways home page", async () => {
  await obj_Homepage.gotoHomePage();
});

When ("I see my journey plan fragment", async () => {
  await page.waitForSelector("app-searchbar");
  const isSearchBar = await page.locator("app-searchbar").isVisible();
  assert.isOk(isSearchBar, "Search bar is not visible");
});

Then ("multicity link is displayed", async () => {
  const isMulticityLink = obj_Multicity.verifyMulticityLink();
  assert.isOk(isMulticityLink, "Multicity link is not visible");
});

Given ("I am planning for complex journey", async () => {
  await obj_Homepage.gotoHomePage();
  const isSearchBar = await page.locator("app-searchbar").isVisible();
  assert.isOk(isSearchBar, "Search bar is not visible");
});

Given ("I am planning for openjaw journey", async () => {
  await obj_Homepage.gotoHomePage();
  const isSearchBar = await page.locator("app-searchbar").isVisible();
  assert.isOk(isSearchBar, "Search bar is not visible");
});

When ("I click on multicity link", async () => {
  const isMulticityLink = obj_Multicity.verifyMulticityLink();
  assert.isOk(isMulticityLink, "Multicity link is not visible");
  await obj_Multicity.clickOnMulticityLink();
});

Then ("Plan your travel page on new flow is displayed", async () => {
  await obj_Multicity.verifyMulticityPage();
});

When ("I go to Plan your travel page on new flow", async () => {
  await obj_Multicity.clickOnMulticityLink();
  await obj_Multicity.verifyMulticityPage();
});

Then ("I am allowed to enter at max six segments per journey in new flow", async () => {
  await obj_Multicity.asserrtAddAnotherFlightButton();
  await obj_Multicity.clickAddAnotherFlightButtonMax();
  await obj_Multicity.countNumberOfFlightSegments();
});

Then ("It only allow me to create flight only journeys in new flow", async () => {
  await obj_Multicity.verifyMulticityPage();
  await obj_Multicity.verifyMulticitySubmitButton();
});

When ("I go to flight list page in new multicity flow", async () => {
  const caseName = await obj_Homepage.getScenarioTag();
  const flightSearchRequestMulticity = FlightHelper.get(caseName);
  await obj_Multicity.clickOnMulticityLink();
  await obj_Multicity.verifyMulticityPage();
  await obj_Multicity.setArrivalDepartureMulticity(flightSearchRequestMulticity);
  await obj_Multicity.setDateForEachFlightSegment(flightSearchRequestMulticity);
  await obj_Multicity.selectPax(flightSearchRequestMulticity);
  await obj_Multicity.continue();
});

Then ("Multicity flight list page is visible", async () => {
  await obj_MulticityFlightList.verifyMulticityFlightList();
});

Then ("Flight prices are displayed in new flow", async () => {
  await obj_MulticityFlightList.verifyFlightPriceForMulticity();
});

Given ("I am planning my journey", async () => {
  await obj_Homepage.gotoHomePage();
});

Then ("I am offered direct flights and flights with connections as per route in new flow", async () => {
  await obj_MulticityFlightList.checkFlightTypesForMulticity();
});

Then ("I can create {string} journey in new flow", async (type) => {
  await obj_Multicity.verifyMulticityPage();
  if (type === "Complex") {
    const caseName = await obj_Homepage.getScenarioTag();
    const flightSearchRequestMulticity = FlightHelper.get(caseName);
    await obj_Multicity.setArrivalDepartureMulticity(flightSearchRequestMulticity);
    await obj_Multicity.setDateForEachFlightSegment(flightSearchRequestMulticity);
    await obj_Multicity.selectPax(flightSearchRequestMulticity);
  } else if (type === "Open Jaw") {
    const caseName = await obj_Homepage.getScenarioTag();
    const flightSearchRequestMulticity = FlightHelper.get(caseName);
    await obj_Multicity.setArrivalDepartureMulticity(flightSearchRequestMulticity);
    await obj_Multicity.setDateForEachFlightSegment(flightSearchRequestMulticity);
    await obj_Multicity.selectPax(flightSearchRequestMulticity);
  }
  await obj_Multicity.continue();
});

Given ("I book a multicity new flow journey on {string} in {string} with {string}", async (route, cabin, paxMixType) => {
  await obj_Homepage.gotoHomePage();
  await obj_Homepage.continueToMulticityFlightSearchPage(route,cabin,paxMixType);
  await obj_Multicity.continueToFlightListPageMulticity();
  await obj_MulticityFlightList.selectingFlightsForMulticity();
});

When ("I pay for my booking in new flow with {string}", async (cardName) => {
  await obj_Farequote.continueNextToPassengerPage();
  await obj_Passenger.continueNextToSeatingPage();
  await obj_Seating.continueNextToPaymentPage();
  await obj_Payment.continueNextToConfirmationPage(cardName);
});

Then ("new flow confirmation page is displayed", async () => {
  await obj_Confirmation.assertConfirmation();
});

Then ("I click on {string} link in new flow", async (weekType) => {
  await obj_MulticityFlightList.selectWeekOption(weekType);
});

Then ("{string} flights are displayed as per the selected departure date", async (weekType) => {
  await obj_MulticityFlightList.verifySelectedWeekOption(weekType);
});

Then ("7 day calender functionality is available", async () =>{
  await obj_MulticityFlightList.verifySevenDayCalender();
});

Given ("I navigate to Multicity search Page", async () => {
  await obj_Homepage.gotoHomePage();
});

When ("I search complex journey on {string} in {string} with {string}", async (route, cabin, paxMixType) => {
  await obj_Homepage.continueToMulticityFlightSearchPage(route,cabin,paxMixType);
  await obj_Multicity.continueToFlightListPageMulticity();
});

Then ("Flight Selection page for a multi-city journey is displayed", async () => {
  await obj_MulticityFlightList.verifyMulticityFlightList();
});

Then ("a minimum {string} is shown as mandatory information in new flow", async (flightInformation) => {
  await obj_MulticityFlightList.verifyFlightDetails(flightInformation);
});