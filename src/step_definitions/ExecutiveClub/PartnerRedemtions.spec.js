const { Given, When, Then, defineStep } = require('@cucumber/cucumber');

const ECFlightSearch = require('../../page_objects/ExecutiveClub/ECFlightSearch/ECFlightSearch.page');
const ECLogin = require('../../page_objects/ExecutiveClub/ECLogin/ECLogin.page');
const ECMemberAccount = require('../../page_objects/ExecutiveClub/ecmember/ecmember_account.page');
const ECFlightSelection = require('../../page_objects/ExecutiveClub/ECFlightSelection/ECFlightSelection.page');
const EC_Flight_Selection = require('../../page_objects/ExecutiveClub/ECFlightSelection/ECFlightSelection.page')

const obj_ECFlightSearch = new ECFlightSearch();
const obj_ECLogin = new ECLogin();
const obj_ECMemberAccount = new ECMemberAccount();
const obj_ECFlightSelection = new ECFlightSelection();
const obj_EC_Flight_Selection = new EC_Flight_Selection()

When(/^I am creating a "([^"]*)" only booking with"([^"]*)"$/, async function (routeType, paymentType) {
    await obj_ECLogin.navigateToECHomepage();
    await obj_ECMemberAccount.continueToFlighSearchPage(routeType, paymentType);
    await obj_ECFlightSearch.VerifyBookFlightWithAviosPage();
});

defineStep("I have selected partner airlines for my journey", async function ()
    {
        
        await obj_ECFlightSelection.continueNextToFareQuote()
     
});

defineStep("I am able to see the RFS symbol against the flights for both segment on flight selection page", async()=>{
    await obj_ECFlightSelection.assertRFSIndicator();
});

Then("I will be offered various {string}", async function (partnerAirlines) {
    await obj_ECFlightSearch.checkPartnerAirlinesOffered(partnerAirlines);
});

defineStep("only BA will be offered", async () => {
    await obj_ECFlightSelection.verifyOnlyBAFlightsAreOffered();
});

Then("I can see fare quote for partner Avios bookings",async function(){
 await obj_ECFlightSelection.verifyFareQuotePage();
})