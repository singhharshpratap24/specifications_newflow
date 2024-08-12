const { defineStep } = require('@cucumber/cucumber')
const ECHomepage = require('../../page_objects/ExecutiveClub/ecmember/ecmember_account.page')
const ECTravelCompanions = require('../../page_objects/ExecutiveClub/ECManageMyAcoount/EC_My_Travel_Companions.page')

const obj_ECHomepage = new ECHomepage();
const obj_ECTravelCompanions = new ECTravelCompanions();

defineStep('I click on My travel companions under manage my booking tab', async function () {
    await obj_ECHomepage.goToMyTravelCompanionsPage();
});

defineStep('I add a new person and add their name details to my account', async function () {
    await obj_ECTravelCompanions.assertMytravelCompanionsPage();
    await obj_ECTravelCompanions.addNewPersonName();
});

defineStep('their details are successfully added to my account', async function () {
    await obj_ECTravelCompanions.assertSucessMessage();
});
