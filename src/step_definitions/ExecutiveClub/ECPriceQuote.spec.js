const { When, Then, defineStep } = require('@cucumber/cucumber');
const EC_Price_Quote = require('../../page_objects/ExecutiveClub/ECPriceQuote/ECPriceQuote.page');

const obj_EC_Price_Quote = new EC_Price_Quote();

defineStep("Passenger category wise Adult, child, Infant prices are displayed", async function () {
    await obj_EC_Price_Quote.isPassengerWisePriceDisplayed();
});
