const { Given, When, Then, And, defineStep } = require('@cucumber/cucumber');

const ECMember_Account = require('../../page_objects/ExecutiveClub/ecmember/ecmember_account.page');

const obj_ECMember_Account = new ECMember_Account();

defineStep("I have chose to access EStore from Collecting Avios on EC HomePage" , async () =>{
    await page.waitForTimeout(5000);
    await obj_ECMember_Account.selectExecClubTab();
})

defineStep("I am shown the Collecting Avios link on EC HomePage", async () =>{

    await obj_ECMember_Account.VerifyCollectingAviosLink();
})