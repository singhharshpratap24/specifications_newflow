const { Given, When, Then, defineStep } = require('@cucumber/cucumber');
const HouseHoldAccount  = require('../../page_objects/ExecutiveClub/ECManageMyAcoount/houseHoldAccount.page')
const ECHomepage = require("../../page_objects/ExecutiveClub/ecmember/ecmember_account.page");

const obj_HHA = new HouseHoldAccount();
const obj_ECHomepage = new ECHomepage();

defineStep("I add Non EC member whose age is above 18 to HHA", async () => {
    await obj_ECHomepage.goToHouseHoldAccountPage();
    await obj_HHA.assertHHAPage();
    await obj_HHA.addNonECMemberToHHA();
    await obj_HHA.selectAddToHAAccount();
});

defineStep("Non EC member added to HHA account successfully", async () => {
    await obj_HHA.selectViewHHAAccount();
    await obj_HHA.verifyNewMemberDetails();
});