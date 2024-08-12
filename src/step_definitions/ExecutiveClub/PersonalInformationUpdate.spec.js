const { Given, When, Then, defineStep } = require('@cucumber/cucumber');
const HomePage = require('../../page_objects/FlightSelling/homePage/home_page.page');
const ECLogin = require('../../page_objects/ExecutiveClub/ECLogin/ECLogin.page');
const PersonalInfoUpdate=require('../../page_objects/ExecutiveClub/ECManageMyAcoount/PersonalInformationUpdate');

const obj_homePage = new HomePage();
const obj_ECLogin = new ECLogin();
const obj_ManageMyInfo=new PersonalInfoUpdate()

When("I update my personal information", async function(){
    await obj_ECLogin.navigateToECHomepage();
    await obj_ManageMyInfo.clickUpdateMyPersonalInfo();
});

defineStep("I view my personal information", async function(){
    await obj_ECLogin.navigateToECHomepage();
    await obj_ManageMyInfo.clickUpdateMyPersonalInfo();
});

Then ("Date of birth pop up should be prompted", async function(){
    await obj_ManageMyInfo.verifyMoreInformationPOP();
});

Given("I logged in to my account as a {string}", async (ecMember) => {
    await obj_homePage.continueNextToECLogin(ecMember);
    await page.waitForTimeout(10000);
});

When("I update meal preference", async () => {
    await obj_ManageMyInfo.clickUpdateMyPersonalInfo();
    await obj_ManageMyInfo.verifyMoreInformationPOP();
    await obj_ManageMyInfo.enterMoreInformationDOB();
    await obj_ManageMyInfo.clickUpdateYourPreferencesButton();
    await obj_ManageMyInfo.updateMealRequest();
});

Then("selected meal choice gets added to my profile", async () => {
    await obj_ManageMyInfo.verifyUpdateMealRequest();
});

defineStep("I uncheck for marketing communication", async () => {
    await obj_ManageMyInfo.clickUpdateMyPersonalInfo();
    await obj_ManageMyInfo.enterMoreInformationDOB();
    await obj_ManageMyInfo.deSelectCheckboxForMarketingCommunication();
    await obj_ManageMyInfo.saveAndExit();
});

defineStep("I should be be able to unsubscribe marketing mail", async () => {
    await obj_ManageMyInfo.selectUpdatePersonalInfoSidebar();
    await obj_ManageMyInfo.assertEmailCheckboxChecked();
});

defineStep("I go to EC member profile page", async function(){
    await obj_ECLogin.navigateToECHomepage();
    await obj_ManageMyInfo.clickUpdateMyPersonalInfo();
});

defineStep("enter DOB", async function(){
    await obj_ManageMyInfo.enterDOB();
});

defineStep("able to Validate email id and mobile number in contact details section of profile page.", async function(){
    await obj_ManageMyInfo.assertEmailIdAndMobileNumberInContactDetailsSection();
});