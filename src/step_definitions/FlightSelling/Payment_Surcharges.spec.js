const { expect } = require('chai');
const { Given, When, Then } = require('@cucumber/cucumber');
const HomePage = require('../../page_objects/FlightSelling/homePage/home_page.page');
const SelectionFlight = require('../../page_objects/FlightSelling/flightSelection/flight_Selection.page');
const FareQuote = require('../../page_objects/FlightSelling/farequote/farequote.page');
const PassengerDetails = require('../../page_objects/FlightSelling/passenger/passenger_details.page');
const Payment = require('../../page_objects/FlightSelling/payment/payment.page');
const SeatItenary = require('../../page_objects/FlightSelling/SeatSelection/SeatItenary.page');

// Object definitions
const obj_homePage = new HomePage();
const obj_SelectionFlight = new SelectionFlight();
const obj_fareQuote = new FareQuote();
const obj_passenger = new PassengerDetails();
const obj_Payment = new Payment();


Given("I have flights departing {string} attracting country in my booking with {string}", async(NonSurchargeCountry,paxmixType) => {
    await obj_homePage.gotoHomePage();
    console.log(NonSurchargeCountry)
    await obj_SelectionFlight.selectCountryOfResidence(NonSurchargeCountry);
    await obj_homePage.continueToFlightSearchPage(null, null, paxmixType);
    await obj_SelectionFlight.continueNextToFareQuote();
    await obj_fareQuote.continueNextToPassengerPage();
    await obj_passenger.continueNextToSeatingPage();
    
});

 When("I paid for my booking with {string}", async(cardName)=> {
    await obj_Payment.cardDetails(cardName);
 });

Then("Payment surcharge is not being charged", async()=> {
    await obj_Payment.isSurchargeApplied();
    
});
