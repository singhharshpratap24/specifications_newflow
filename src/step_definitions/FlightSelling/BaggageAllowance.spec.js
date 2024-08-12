const { Given, When, Then, defineStep } = require('@cucumber/cucumber');


const BaggageAllowance = require('../../page_objects/FlightSelling/BaggageAllowance/baggageallowance.page');
const SelectionFlight = require('../../page_objects/FlightSelling/flightSelection/flight_Selection.page');
const HomePage = require('../../page_objects/FlightSelling/homePage/home_page.page');
const FareQuote = require('../../page_objects/FlightSelling/farequote/farequote.page');

const obj_fareQuote = new FareQuote();
const obj_baggageAllowance = new BaggageAllowance();
const obj_SelectionFlight = new SelectionFlight();
const obj_homePage = new HomePage();

When('fare quote page is displayed', async function () {
    await obj_baggageAllowance.farequotePageDisplayed();
});

Then('the correct checked baggage allowance is displayed', async function () {
    await obj_baggageAllowance.checkedBaggageDisplayed();
})

defineStep('I continue till farequote page',async function(){
    await obj_SelectionFlight.continueNextToFareQuote();
})

defineStep('I view the baggage allowance and I dont have checked allowance', async function () {
    await obj_baggageAllowance.verifyNoCheckedbaggageAllowance();
})

defineStep("I create commercial booking  on {string} in {string} with {string}", async (route, cabin, paxmixType) => {
    await obj_homePage.gotoHomePage();
    await obj_homePage.continueToFlightSearchPage(route, cabin, paxmixType);
})

defineStep('I created commercial booking on Business class with {string}', async (paxmixType) => {
    await obj_homePage.gotoHomePage();
    await obj_homePage.continueToFlightSearchPage(route = null, cabin = null, paxmixType);
})

defineStep('I am on fare quote page for a short haul, economy flight with {string}', async (paxmixType) => {
    await obj_homePage.gotoHomePage();
    await obj_homePage.continueToFlightSearchPage(route = null, cabin = null, paxmixType);
});

defineStep('I view your ticket features disclosure', async () => {
    await obj_SelectionFlight.continueNextToFareQuote();
});

defineStep('following {string} and {string} should be presented', async (feature,value) => {
    await obj_fareQuote.verifyMoreFareOptions(feature,value);
});