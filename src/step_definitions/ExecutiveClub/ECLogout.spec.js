const { Given, When, Then } = require('@cucumber/cucumber');

const HomePage = require('../../page_objects/FlightSelling/homePage/home_page.page');
const ECFlightSearch = require('../../page_objects/ExecutiveClub/ECFlightSearch/NewECFlightSearch.page');
const ECMember_Account = require('../../page_objects/ExecutiveClub/ecmember/ecmember_account.page');

const obj_homePage = new HomePage();
const obj_ECFlightSearch = new ECFlightSearch();
const obj_ecmemberaccount = new ECMember_Account();

Given(/^I am an EC member logged in to my account "([^"]*)" "([^"]*)"$/, async function (ECMember, Password) {
    await obj_homePage.gotoHomePage();
    await obj_ECFlightSearch.ECFlightSearchCredentials(ECMember, Password);
});

When("I view My Account link on homepage", async function () {
    await page.waitForTimeout(20000);
    await obj_ecmemberaccount.isMyAccountLinkDisplayed();  
});
When("I select logout option", async function () {
    await obj_ecmemberaccount.ecMemberLogout();   
});

Then("Home page gets displayed", async function () {
    await page.waitForTimeout(5000);
    await obj_ECFlightSearch.isLoginBtnDisplayed();
});


