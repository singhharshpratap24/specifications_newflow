const { Given, When, Then, And, defineStep } = require('@cucumber/cucumber')
const EC_Friends_And_Family = require('../../page_objects/ExecutiveClub/ECManageMyAcoount/EC_Friends_And_Family.page');
const ECHomepage = require('../../page_objects/ExecutiveClub/ecmember/ecmember_account.page')

const obj_FnF_details = new EC_Friends_And_Family();
const obj_ECHomepage = new ECHomepage();

defineStep('I add a new member under My Family and Friends', async () => {
    await obj_ECHomepage.goToFriendsAndFamilyPage();
    await obj_FnF_details.assertFriendsAndFamily();
    await obj_FnF_details.addNewFnFMember();
})

defineStep('I can see newly added FnF member details', async () => {
    await obj_FnF_details.newlyAddedFnFMemberConfirmation()
})

defineStep('User should be allowed to change within 24hr window', async function () {
    await obj_FnF_details.verifyEditButton();
})

defineStep('User click on the Remove button and Error message {string} is displayed', async function (errorMessage) {
    await obj_FnF_details.verifyRemovingFnFErrorMessage(errorMessage);
})