const { Given, When, Then, defineStep } = require('@cucumber/cucumber');
const HomePage = require('../../page_objects/FlightSelling/homePage/home_page.page');
const ECLogin = require('../../page_objects/ExecutiveClub/ECLogin/ECLogin.page');
const ECMember_Account = require('../../page_objects/ExecutiveClub/ecmember/ecmember_account.page');

// Object definitions
const obj_homePage = new HomePage();
const obj_ecmemberaccount = new ECMember_Account();
const obj_ECLogin = new ECLogin();

Given(/^A newly enrolled EC member logged in to my account "([^"]*)"$/, async function(ecMember){
    await obj_homePage.continueNextToECLogin(ecMember);
    await obj_ECLogin.navigateToECHomepage();
});

When("Navigate to Executive Club Items", async function() {
    await obj_ecmemberaccount.clickExecutiveClubItem();
    await obj_ecmemberaccount.selectMemberShipCardOption();
});

defineStep(/^I choose "([^"]*)" on a blue tier card image$/, async function(option){
    await obj_ecmemberaccount.executiveClubItemPageDisplayed();
    await obj_ecmemberaccount.selectDropdownMenuOption(option);
});

Then(/^The correct "([^"]*)" page is displayed$/, async function(option){
   await obj_ecmemberaccount.isCorrectPageIsDisplayed(option);
});