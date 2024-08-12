const { Given, When, Then, defineStep } = require('@cucumber/cucumber');
const HomePage = require('../../page_objects/FlightSelling/homePage/home_page.page');
const FlightSelection = require('../../page_objects/FlightSelling/flightSelection/flight_Selection.page');

const obj_homePage = new HomePage();
const obj_FlightSelection = new FlightSelection();

Given('I am on ba.com homepage', async () => {
  await obj_homePage.gotoHomePage();
});

When("I see booking section on homepage", async function () {
  await obj_homePage.isBookingSectionDisplayed();
});

Then("all the options {string} must be available", async function (options) {
  await obj_homePage.fieldsAreAvailableOnHomePage(options);
});

Then("fields {string} must be available", async (fields) => {
  await obj_homePage.fieldsAreAvailableOnHomePage(fields);
});

Then("links {string} should be available", async (links) => {
  await obj_homePage.verifyLinks(links);
});

defineStep("I am an EC {string} logged in to my account", async (ecMember) => {
  await obj_homePage.continueNextToECLogin(ecMember);
});

defineStep("I click on Join the Club link displayed under Manage tab", async () => {
  await obj_homePage.selectJoinTheClubLink();
});

defineStep("I Click Edit Search option on Flight Selection page", async () => {
  await obj_FlightSelection.clickOnEditSearchButton();
});

defineStep("Edit search pop up displays", async () => {
  await obj_FlightSelection.verifyEditSearchPopUp();
});

defineStep("correct paxmix is displayed", async () => {
  await obj_FlightSelection.verifyPaxInEditSearchPopUp();
});