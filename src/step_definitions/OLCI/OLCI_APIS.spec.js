const { Given, When, Then, And, defineStep } = require('@cucumber/cucumber');
const OLCIAPIS = require('../../page_objects/OLCI/checkin/OLCI_APIS_Check.page');
const OLCIAPISPaxDetails = require('../../page_objects/OLCI/checkin/OLCI_APIS_detail_form.page');

const obj_OLCIAPIS = new OLCIAPIS();
const obj_OLCIAPISPaxDetails = new OLCIAPISPaxDetails();

When("User Lands on mmb page with OLCI enabled button and clicked", async function () {
    await obj_OLCIAPIS.OLCI_MMB_Page();
})

Then("User lands on Online checkin page with APIs enable and User click APIs button", async function () {
    await obj_OLCIAPIS.OLCI_MMB_Checkin_Page();
})

When("User Lands on APIs Page and fill APIS form with passport number {string} Nationality {string} government {string}", async function (PassNo, Nationality, Gov) {
    await obj_OLCIAPISPaxDetails.OLCIAPISPaxDetailsForm(PassNo, Nationality, Gov);
})
