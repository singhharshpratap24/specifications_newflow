const { Given, When, Then, defineStep } = require('@cucumber/cucumber');

const ECEnrollment = require('../../page_objects/ExecutiveClub/ECEnrollment/ECEnrollment.page.js');
const obj_ecEnrollment= new ECEnrollment();

const ECLogin = require('../../page_objects/ExecutiveClub/ECLogin/ECLogin.page');
const obj_ECLogin= new ECLogin();

 When("I fill in details along with allowed password format on Join the Club form.", async function () {
    await obj_ecEnrollment.validateJoinTheClubForm();
    await obj_ecEnrollment.fillInDetailsWithAllowedPassword(); 
   
  });
  Then("I am able to successfully enrolled for EC program.", async () => {
    await obj_ecEnrollment.assertMembershipNumber();
  });

  When("I click on Login Button on top right corner to navigate to IDP page", async () => {
    await obj_ECLogin.clickOnLoginButton();
  });

  Then("I click on Sign Up link to navigate to Register or join the Executive Club for free page", async () => {
    await obj_ecEnrollment.clickOnSignup();
  });

  When("I fill in all details along with allowed password format to", async () => {
    await obj_ecEnrollment.fillInDetailsWithAllowedPasswordforInet();
  });

  Then("I am able to successfully enrolled for Inet program", async () => {
    await obj_ecEnrollment.joinNow();
  });

