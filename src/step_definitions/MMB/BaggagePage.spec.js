const { Given, When, Then } = require('@cucumber/cucumber');

const xsb = require("../../page_objects/MMB/Manage/xsb.page");

const obj_xsb = new xsb();

Then('User click on MMB tab', async function () {
    await obj_xsb.clickOnMmbBtn();
});

Then('User proceed to add bags', async function () {
    await obj_xsb.performXsb();
})

When(/^User selects the number of bags "([^"]*)" to be added on Baggage page$/, async function (numberofbags) {
    await obj_xsb.selectBaggageForPassengersDynamic(numberofbags);
})

Then('user proceeds for selection of person paying', async function () {
    await obj_xsb.selectPersonPaying();
})

Then('user lands on confirmation page of extra baggage purchase', async function () {
    await obj_xsb.assertXsbConfirmationPage();
})
Then('user select country {string} cardType {string} cardNo {string} CVV {string} address1 {string} address2 {string} postcode {string} and proceed for payment', async function (country, cardType, cardNo, CVV, address1, address2, postcode) {
    await obj_Payment.MMB_Payment(country, cardType, cardNo, CVV, address1, address2, postcode);
 })
 