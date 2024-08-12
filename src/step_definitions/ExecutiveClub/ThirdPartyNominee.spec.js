const { Given, When, Then, And, defineStep } = require('@cucumber/cucumber')
const EC_ThirdPartyNominee = require('../../page_objects/ExecutiveClub/ECManageMyAcoount/EC_ThirdPartyNominee.page');
const ECHomepage = require('../../page_objects/ExecutiveClub/ecmember/ecmember_account.page');
// const EC_Friends_And_Family = require('../../page_objects/ExecutiveClub/FriendsAndFamily/EC_Friends_And_Family.page');

const obj_third_party_nominee = new EC_ThirdPartyNominee();
const obj_ECHomepage = new ECHomepage();
// const obj_FnF_details = new EC_Friends_And_Family();

defineStep('I add third party nominee', async () => {
    await obj_ECHomepage.goToThirdPartyNomineePage();
    await obj_third_party_nominee.assertThirdPartyNominee();
    await obj_third_party_nominee.addThirdPartyNominee();
    
})

defineStep('I should be able to add successfully', async () => {
    await obj_third_party_nominee.assertConfirmationMessagetoAddThirdPartyNominee();
    
})