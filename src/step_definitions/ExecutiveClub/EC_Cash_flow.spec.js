const { Given, When, Then, defineStep } = require('@cucumber/cucumber')
const EC_Cash_flow_Pax_Details = require('../../page_objects/ExecutiveClub/ECCashFlow/EC_Cash_flow_Pax_Details.page');

const obj_EC_Cash_flow_Pax_Details = new EC_Cash_flow_Pax_Details();

defineStep("User enter passenger details for pax adult {string} YoungAdults {string} Children {string} Infants {string} and title {string} FirstName {string} lastname {string} phoneNumber {string} gender {string}", async function (adult, youngAdult, children, infant, Title, FirstName, lastname, phoneNumber, gender) {
  await obj_EC_Cash_flow_Pax_Details.EnterPassengerDetails(adult, youngAdult, children, infant, Title, FirstName, lastname, phoneNumber, gender);
});

defineStep("User choose Agree and Continue option on farequote page", async function () {
  await obj_EC_Cash_flow_Pax_Details.clickAgreeAndContinue();
});