const { Given, When, Then, defineStep } = require ("@cucumber/cucumber");

const HomePage = require('../../page_objects/FlightSelling/homePage/home_page.page');
const Farequote = require('../../page_objects/FlightSelling/farequote/farequote.page');
const Payment = require('../../page_objects/FlightSelling/payment/payment.page');
const FlightHelper = require('../..//Helpers/flightdatahelper.js');
const FlightConfirmation = require("../../page_objects/FlightSelling/Confirmation/Confirmation.page.js");
const SelectionFlight = require("../../page_objects/FlightSelling/flightSelection/flight_Selection.page.js");
const MmbOperation = require('../../page_objects/MMB/Manage/mmb_operation.page.js');
const EC_Cash_flow_Pax_Details = require('../../page_objects/ExecutiveClub/ECCashFlow/EC_Cash_flow_Pax_Details.page');
const SeatItenary = require('../../page_objects/FlightSelling/SeatSelection/SeatItenary.page');

const obj_HomePage = new HomePage();
const obj_Farequote = new Farequote();
const obj_Payment = new Payment();
const obj_Confirmation = new FlightConfirmation();
const obj_SelectionFlight = new SelectionFlight();
const obj_mmbOpertaions = new MmbOperation();
const obj_EC_Cash_flow_Pax_Details = new EC_Cash_flow_Pax_Details();
const obj_seating = new SeatItenary();
var pymtType;

defineStep("I am holding my flights for EC Cash booking", async () => {
    await obj_SelectionFlight.continueNextToFareQuote();
    await page.waitForTimeout(12000);
    await obj_Farequote.asserHoldBookingButton();
});

defineStep("I am holding my flights", async () => {
    await obj_SelectionFlight.continueNextToFareQuote();
    await obj_Farequote.asserHoldBookingButton();
    await obj_Farequote.holdBooking();
});

defineStep("I complete held booking with {string}", async (cardName) => {
    pymtType=cardName;
    await obj_SelectionFlight.continueNextToFareQuote();
    await obj_Farequote.holdBooking();
    await obj_Payment.UpdatedpaymentDetails(cardName);
    await obj_Confirmation.clickMmbButton();
	await obj_mmbOpertaions.clickOnPayAndCompleteHoldBooking();
    await obj_Farequote.clickAgreeAndContinue();
    await obj_Farequote.fillInPassportDetails();
    await obj_Payment.Credit_offer_skip_page();  
  });


defineStep ("I should be allowed to hold a booking", async () => {
        await obj_Confirmation.holdBookingConfirmation();
    });

defineStep("Hold Booking Pod is Displayed",async ()=>{
    await obj_Farequote.asserHoldBookingButton();
});

defineStep("Hold Booking Pod is not Displayed",async ()=>{
    await obj_Farequote.asserHoldBookingButtonAvailablity();
});

defineStep("I choose to hold the booking for a fee", async () => {
    await obj_SelectionFlight.continueNextToFareQuote();
    await obj_Farequote.asserHoldBookingButton();
});

defineStep("payment {string} surcharge is not displayed on Payment page to hold bookings", async (cardName)=>{
    await obj_Payment.paymentDetailsSurcharge(cardName);
});

defineStep("hold booking option is not offered for flexible cabin route", async () => {
    await obj_Farequote.asserHoldBookingButtonAvailablity();
});

defineStep("Offline payment option i.e. Pay In person is not displayed on payment page", async () => {
    await obj_Payment.verifyPayInPersonPaymentOption();
});

When("I click on hold booking link and enter the passenger details and navigate to payment page", async () => {
    await obj_SelectionFlight.continueNextToFareQuote();
    await obj_Farequote.holdBooking();
});

defineStep("hold booking option should not be offered on booking summary page", async () => {
    await obj_Payment.verifyPayInPersonPaymentOption();
});

defineStep("information about the fee and terms and conditions for holding the booking is displayed correctly on Hold Booking page", async () => {
    await obj_Farequote.verifyHoldBookingTermsAndConditon();
});

defineStep("User is on Home Page for {string}", async (country) => {
    await obj_HomePage.gotoHomePageForDifferentCountry(country);
});

defineStep("{string} radio button option is shown on Payment page", async (paymentOption) => {
    await obj_Payment.paymentMethodVerification(paymentOption);
});

defineStep("the appropriate cancellation message is displayed", async () => {
    await obj_Confirmation.verifyHoldBookingCancellationMessage();
});

defineStep("I am unable to pay for and complete the booking", async () => {
    await obj_Confirmation.HBFFPayAndComplete();
});

defineStep("I add {string} discount on farequote page and the discount is successfully applied", async (discountType) => {
    await obj_Farequote.addDiscountOnHBFF(discountType);
});

defineStep("I add donation {string} and the amount gets removed from the total amount", async (donation) => {
    await obj_Farequote.verifyDonationAmountOnHBFF(donation,flightSearchRequest);
});

defineStep("correct {string} are getting dislayed on {string} for EC Cash Booking", async (hbffDetails, hbffPage) => {
    await obj_Farequote.holdBookingEcCash();
    await page.waitForTimeout(12000);
    await obj_Farequote.verifyHBFFDetailsAndPageEcCashFlow(hbffDetails, hbffPage);
})

defineStep("correct {string} are getting dislayed on {string}", async (hbffDetails, hbffPage) => {
    await obj_Farequote.asserHoldBookingButton();
    await obj_Farequote.verifyHBFFDetailsAndPage(hbffDetails, hbffPage);
})

defineStep("I am planning my journey whose date of departure is greater or equal to 21 days with {string}", async (paxmixType) => {
    await obj_HomePage.gotoHomePage();
    await obj_HomePage.continueToFlightSearchPage(route = null, cabin = null, paxmixType);
})

defineStep('I proceed till MMB Page', async () => {
    await obj_Confirmation.assert_Manage_My_Booking_button();
    await obj_Confirmation.clickMmbButton();
})

defineStep('{string} link is shown on MMB page', async (PayandCompleteBooking) => {
await obj_mmbOpertaions.assert_PayandCompleteBooking_Link(PayandCompleteBooking)
})

defineStep('I pay and complete hold booking', async () => {
    await obj_mmbOpertaions.clickOnPayAndCompleteHoldBooking()
    }) 
defineStep('I create a booking on any route with {string}', async (paxmixType) => {
    await obj_HomePage.continueToFlightSearchPage(route = null, cabin = null, paxmixType)
})

defineStep('I add {string} discount on farequote page and amount should get removed from the total hold booking amount', async (discountType) => {
    await obj_Farequote.addDiscountOnHBFF(discountType)
})

defineStep('I proceed till Confirmation page for Hold booking with BA Better World donation completed successfully', async () => {
    await obj_Payment.UpdatedpaymentDetails(pymtType);
    await obj_Confirmation.completeHoldBookingConfirmation(); 
});

   
  
