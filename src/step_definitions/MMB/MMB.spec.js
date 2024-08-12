const { Given, When, Then, And, defineStep } = require('@cucumber/cucumber');

const HomePage = require('../../page_objects/FlightSelling/homePage/home_page.page');
const PNRSearch = require('../../page_objects/FlightSelling/homePage/pnr_search.page.js');
const ChangeYourBooking = require('../../page_objects/MMB/Manage/change_your_booking.page.js');
const CSVReader = require('../../Helpers/csv_read.js');
const MMBApis = require('../../page_objects/MMB/Manage/mmb_APIS.page.js');
const MmbOperation = require('../../page_objects/MMB/Manage/mmb_operation.page.js')
const APISPaxDetails = require('../../page_objects/MMB/Manage/mmb_APIS_detail_form.page.js');
const MMBSeat = require('../../page_objects/MMB/Manage/mmb_seat.page.js');
const MMB_PaidSeat_Payment = require('../../page_objects/MMB/Manage/mmb_Paid_seat_Payment.page.js');
const MMB_PaidSeat_Confirmation = require('../../page_objects/MMB/Manage/MMB_PaidSeat_Confirmation.page.js');
const EC_Login_Avios_Seat_Booking = require('../../page_objects/MMB/Manage/EC_MMB_Seating_booking_Avios.page.js');
const FlightConfirmation = require("../../page_objects/FlightSelling/Confirmation/Confirmation.page.js");
const MMBPage = require("../../page_objects/MMB/Manage/MMB.page.js");

const obj_mmbOpertaions = new MmbOperation();
const obj_CSVReader = new CSVReader();
const obj_changebooking = new ChangeYourBooking();
const obj_homePage = new HomePage();
const obj_searchpnr = new PNRSearch();
const obj_MMBApis = new MMBApis();
const obj_APISPaxDetails = new APISPaxDetails();
const obj_MMBSeat = new MMBSeat();
const obj_MMB_PaidSeat_Payment = new MMB_PaidSeat_Payment();
const obj_MMB_PaidSeat_Confirmation = new MMB_PaidSeat_Confirmation();
const obj_EC_Login_Avios_Seat_Booking = new EC_Login_Avios_Seat_Booking();
const obj_FlightConfirmation = new FlightConfirmation();
const obj_betaMMB = new MMBPage();


addflightAndCalenderLink = ".add-to-calendar__link__text";

defineStep("I retreive my booking", async()=> {
  await obj_homePage.retrieveBooking();
});

defineStep("verify my booking reference", async function () {
  await obj_betaMMB.verifyBookingReference();
});

Given("User is on MMB Page", async function () {
  await obj_homePage.gotoMMBPage();
});

defineStep(/^I am on MMB Page and search for my PNR "([^"]*)"$/, async function (TestCaseName) {
  await obj_homePage.gotoMMBPage();
  let pnrname = await obj_CSVReader.getPNRName(TestCaseName);
  console.log("searching for pnr :" + pnrname);
  await obj_searchpnr.searchPNRinManage(pnrname[0], pnrname[1]);
});

Then("User go for change Booking", async function () {
  await obj_changebooking.changeYourBooking();
});

Then("Change booking options are available", async function () {
  await obj_changebooking.cancelflightchanges();
});

defineStep("User verify passenger details header {string} displayed based on APIs status", async function (HeaderMessage) {
  await obj_MMBApis.APISHeaderMsg(HeaderMessage);
})

defineStep("User verify passenger_1 has APIs {string}", async function (Warning_Message) {
  await obj_MMBApis.APISWaringMsg(Warning_Message);
})

defineStep("User verify the list of passengers names in my booking", async function () {
  await obj_MMBApis.APISPassengerName();
})

defineStep("User verify passenger_1 name is clickable and it navigates to APIs form page", async function () {
  await obj_MMBApis.APISFormPage();

})
Given(/^I navigate to ba and retrieve my booking in new beta pages "([^"]*)"$/, async function (Linkverify) {
  await obj_homePage.gotoMMBPage();
  let pnrname = await obj_CSVReader.getPNRName(Linkverify);
  console.log("searching for pnr :" + pnrname);
  await obj_searchpnr.searchPNRinManage(pnrname[0], pnrname[1]);
});

Then("I verify ADD FLIGHTS TO MY CALENDAR link", async function () {
  await obj_mmbOpertaions.verifyLinks(page, addflightAndCalenderLink)

})
defineStep("User fill the details on APIS summary page with passport number {string} Nationality {string} government {string}", async function (PassNo, Nationality, Gov) {
  await obj_APISPaxDetails.APISPaxDetailsForm(PassNo, Nationality, Gov);
})

defineStep("User verify Choose seats link is shown and it is functional", async function () {
  await obj_MMBSeat.MMBSeatLinkVerification();
})

defineStep("User click on choose seats button and verify pax have choose seat clickable button", async function () {
  await obj_MMBSeat.MMBSeatSelection();
})

defineStep("User reach to summary page and agree terms and conditions", async function () {
  await obj_MMBSeat.SummaryPageT_C();
})

defineStep("User reach to payment page and provide details like Region {string} CardType {string} CardNo {string} SecurityNo {string} address1 {string} address2 {string} postcode {string} and click on pay button", async function (Region, CardType, CardNo, SecurityNo, address1, address2, postcode) {
  await obj_MMB_PaidSeat_Payment.MMBSeatPayment(Region, CardType, CardNo, SecurityNo, address1, address2, postcode);

})

defineStep("User reach to confirmation page where each pax get confirmed seat", async function () {
  await obj_MMB_PaidSeat_Confirmation.MMBPaidSeatPaymentConfirmation();
})

defineStep("User go to view all bookings and click on desired MMB button", async function () {
  await obj_EC_Login_Avios_Seat_Booking.ECLoginSelectMMB();
})

defineStep("User reach to payment page and select avios points and click on pay button", async function () {
  await obj_MMB_PaidSeat_Payment.AviosMMBSeatPayment();
})

defineStep("User provides EC login credentials username {string} password {string} to pay through AVIOS", async function (username, password) {
  await obj_MMB_PaidSeat_Payment.ECLoginthroughPaymentPage(username, password);

})

defineStep("User go to view all bookings perform add booking action and click on desired MMB button", async function () {
  await obj_EC_Login_Avios_Seat_Booking.ECLoginAddBookingandSelectMMB();
})

defineStep("User click on add frequent flyer link and provided flyer details", async function () {
  await obj_MMBApis.AddFrequentFlyer();
})

defineStep("User perform Seating through MMB", async function () {
  await obj_MMBSeat.MMBSeatLinkVerification();
})

defineStep("free seating should be performed through MMB for Bronze member", async function () {
  await obj_MMBSeat.ValidateFreeSeatText();
})

defineStep("free seating should be performed through MMB for Silver member", async function () {
  await obj_MMBSeat.ValidateFreeSeatText();
})

defineStep("free seating should be performed through MMB for Gold member", async function () {
  await obj_MMBSeat.ValidateFreeSeatText();
})

defineStep("paid seating should be performed through MMB for commercial customer", async function () {
  await obj_MMBSeat.ValidatePaidSeatText();
})

defineStep("paid seating should be performed through MMB for Blue member", async function () {
  await obj_MMBSeat.ValidatePaidSeatText();
})

defineStep("User try to choose exit seat for child will get Exit seat unavailable popup", async function () {
  await obj_MMBSeat.AdultandChildExitSeat();
})

defineStep("User try to choose exit seat with infant will get Exit seat unavailable popup", async function () {
  await obj_MMBSeat.AdultandInfantExitSeat();
})

defineStep("User try to choose exit seat with infant will get Exit seat", async function () {
  await obj_MMBSeat.AdultandYAExitSeat();
})

defineStep("MMB as Confirmation Page is displayed", async function () {
  await obj_FlightConfirmation.clickMmbButton();
  await obj_betaMMB.assertBetaMmbPage();
});