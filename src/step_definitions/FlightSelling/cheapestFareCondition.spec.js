const { expect } = require('chai');
const { Given, When, Then } = require('@cucumber/cucumber')
const HomePage = require('../../page_objects/FlightSelling/homePage/home_page.page');
const SelectionFlight = require('../../page_objects/FlightSelling/flightSelection/flight_Selection.page');

// Object definitions
const obj_homePage = new HomePage();
const obj_SelectionFlight = new SelectionFlight();

Given('I am on ba.com homepage for {string}', async (countryOfResidence) => {
    await obj_homePage.gotoHomePage();
    await obj_SelectionFlight.selectCountryOfResidence(countryOfResidence);
});

When('I navigate to Find your cheapest fare link', async function () {
    await obj_SelectionFlight.selectCheapestFlightLink();
});

Then('cheapest fare page is displayed', async function () {
    await obj_SelectionFlight.validateCheaptestFareQuotePage();
});

Then('Cheapest fares from {string} to various destinations are displayed', async function (City) {
    await obj_SelectionFlight.lowestFaredestinationsList(City);
});

Given('I select COR as UK', async function () {
    await obj_homePage.gotoHomePage();
});

Then('I am offered an option to enter destination on cheapest fare page', async function () {
    await obj_SelectionFlight.OfferDestinationToEnterOnLowestFarePage();
});
Given('I am searching for lowest fares', async function () {
    await obj_homePage.gotoHomePage();
    await obj_SelectionFlight.cheapestFarePage();
});

When('number of nights is selected', async function () {
    await obj_SelectionFlight.selectNumberOfNightsDrpDwn();
});

Then('it gives an option to see lowest fares for 14 nights at max', async function () {
    await obj_SelectionFlight.checkMaxNightOptDrpdwn();
});
Given('I am on cheapest fares page', async function () {
    await obj_homePage.gotoHomePage();
    await obj_SelectionFlight.cheapestFarePage();
});
When("I select cabin {string}", async function (cabin) {
    await obj_SelectionFlight.selectCheapestFarePageCabin(cabin);
});

Then(/^I can see cheapest fares for that particular selected "([^"]*)"$/, async function (cabin) {
    await obj_SelectionFlight.validatedSelectedOptionFromDrpDn(cabin);
});