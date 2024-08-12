const { Given, When, Then, defineStep } = require('@cucumber/cucumber')

const PassengerDetails = require('../../page_objects/FlightSelling/passenger/passenger_details.page');
const Payment = require('../../page_objects/FlightSelling/payment/payment.page');
const HomePage = require('../../page_objects/FlightSelling/homePage/home_page.page');

const obj_passenger = new PassengerDetails();
const obj_Payment = new Payment();
const obj_homePage = new HomePage();

defineStep('I enter incorrect security code details on the Payment page for card name {string}', async function (cardName) {
    await obj_Payment.UpdatedpaymentDetails(cardName);
});

defineStep('Error message for invalid security number details is displayed', async function () {
    await obj_Payment.cvvErrorMessage();
});

defineStep('Error message {string} for skipping address details is displayed', async function (AddressError) {
    await obj_Payment.AddressErrorMessage(AddressError);
})

defineStep("I select age of young adult not between 12-15 years and error message {string} is displayed", async (AgeError) => {
    await obj_passenger.ErrorVerficationForYoungAdult(AgeError);
});
defineStep("I enter invalid postal code details more than 10 digits on the Payment page", async () => {
    await obj_Payment.enterErrorPOstalcode();
});
defineStep("Error message {string} for invalid postalcode details is displayed", async (PostalcodeError) => {
    await obj_Payment.postalcodeErrorMessage(PostalcodeError);
});
defineStep("I submit the search form with paxmix {string}",async(paxmixType) =>{
    await obj_homePage.continueToFlightsearchForWrongPax(paxmixType);
});
defineStep("Correct error message {string} should be displayed on plan your journey page",async(NumberOfPassengerError) =>{
    await obj_homePage.numberOfPassengerError(NumberOfPassengerError);

});
defineStep('Error message {string} for Missing cardExpiryDate is displayed', async function(CardExpiryError){
    await obj_Payment.missingCardExpErrMsg(CardExpiryError);
   });

defineStep("I enter invalid postal code details on the Payment page and Error message {string} for invalid postalcode details is displayed", async (PostalcodeError) => {
    await obj_Payment.postalcodeErrorMessage(PostalcodeError);
});

defineStep('I enter incomplete card details on the Payment page for card name {string}', async function(cardName){
    await obj_Payment.UpdatedpaymentDetails(cardName);
})

defineStep('I enter invalid card details on the Payment page for card name {string}', async function(cardName){
    await obj_Payment.UpdatedpaymentDetails(cardName);
})

defineStep('Error message {string} for skipping card details is displayed', async function(CardErrorType1){
    await obj_Payment.CardErrorMessageTypeOne(CardErrorType1);

})

defineStep('Error message {string} for incomplete card details is displayed', async function(CardErrorType2){
    await obj_Payment.CardErrorMessageTypeTwo(CardErrorType2);

})

defineStep('Error message {string} for invalid card details is displayed', async function(CardErrorType3){
    await obj_Payment.CardErrorMessageTypeThree(CardErrorType3);
})

defineStep('the payment card images {string} displayed', async function(Images){
    await obj_Payment.getAvailablePaymentCard(Images);
    });

