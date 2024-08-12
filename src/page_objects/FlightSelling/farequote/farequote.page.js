"use strict";
const { expect } = require("chai");
const PageElementHelper = require('../../../Helpers/PageElementHelper.js')
const LOGGER = require('../../../setup/logger');
const PASSENGER = require('../passenger/passenger_details.page')
const PAXHELPER = require('../../../Helpers/passenger');
const Donations = require("../Donations/Donations.page");
const Payment = require("../payment/payment.page");

const obj_PageElementHelper = new PageElementHelper();
const myuserdata = require("../../../models/passengerDetails.json");
const FlightConfirmation = require("../Confirmation/Confirmation.page");
const flightSearchRequest = require('../../../Helpers/flightSearchRequest.js')
const FareQuotePageElement = require('../../../PageElements/FlightSelling/Farequote_page.js')
const EVoucherPageElement = require('../../../PageElements/FlightSelling/EVoucherCode_page.js')
const UTILS = require('../../../Helpers/utils.js');
const LoginHelper = require('../../../Helpers/LoginHelper.js');
const ECLogin = require('../../../page_objects/ExecutiveClub/ECLogin/ECLogin.page');
const obj_Payment = new Payment();
const utils= new UTILS();

/* FARE QUOTE == FLIGHT SUMMARY == BOOKING SUMMARY */

FareQuotePageElement.farequote
EVoucherPageElement.EVoucherCode

const obj_ECLogin = new ECLogin();

class FareQuote {

    obj_passenger_page = new PASSENGER();
    obj_pax_helper = new PAXHELPER();
    obj_Donation = new Donations();
    obj_Payment = new Payment();
    obj_Confirmation = new FlightConfirmation();


    async assertFareQuotePage() {
        await this.validate_farequote();
        await this.compareTotalpricefarequote(paxMixType);

        await this.assertyourFairConditions();
        await this.assertyourBaggageAlloance();
        await this.assertFoodandDrink();

        await this.asserBackToFlightSelectionButton();
        await this.assertAgreeAndContinue();
        await this.assertClickApplyEVoucherButton();
        await this.assertSaveWithAvios();

        LOGGER.info('Fare Quote assertion successfull.', { classname: 'FareQuote' });
    }

    async asserBackToFlightSelectionButton() {
        await page.getByRole('link', { name: 'Back to flight selection' }).isEnabled();
    }

    async backToFlightSelection() {
        let back_to_flight_selection_button = page.getByRole('link', { name: 'Back to flight selection' });
        await back_to_flight_selection_button.click();
    }

    async assertAgreeAndContinue() {
        await page.getByRole('button', { name: 'Agree and Continue' }).isEnabled();
    }

    async clickAgreeAndContinue() {
        await page.getByRole('button', { name: 'Agree and Continue' }).waitFor();
        await page.getByRole('button', { name: 'Agree and Continue' }).click();
        await this.continueAsGuest();
        LOGGER.info('Agree And Continue click successfull.', { classname: 'FareQuote' });
        await page.waitForLoadState('domcontentloaded');
        await utils.confirmPageLoad();
    }

    async assertContinueAsGuest() {
        await page.getByRole('button', { name: 'Continue as guest' }).isEnabled();
    }

    async continueAsGuest() {
        if (await page.url().includes("execclub")) {
            console.log("[Logged in with EC Member]")
        } else {
            let continue_as_guest = page.getByRole('button', { name: 'Continue as guest' });
            await continue_as_guest.click();
        }
    }

    async assertClickApplyEVoucherButton() {
        await obj_PageElementHelper.assertLinkEnabled("//*[text()=' ADD ']/..");
    }

    async RetryAndClick(locator) {
        let counter = 5
        const element = await page.locator(locator)
        await element.click();

        do {
            await page.waitForTimeout(5000);
            let click_log_in_button = await page.locator(FareQuotePageElement.farequote.locate_apply_voucher_button);

            console.log(await element.isVisible());
            console.log(await click_log_in_button.isVisible());

            if (await element.isVisible() && await click_log_in_button.isVisible()) {
                console.log("log buton" + counter)
                counter = 0;
                break;
                //await element.click();
            }
            else {
                await element.click();
                console.log("log buton not visible" + counter)
            }
            await counter--;
        } while (counter > 0)

        console.log("counter : " + counter)
    }

    async clickApplyEVoucherButton() {
        await page.locator(FareQuotePageElement.farequote.locate_apply_eVoucher_button).waitFor();
        await this.RetryAndClick(FareQuotePageElement.farequote.locate_apply_eVoucher_button)       
        LOGGER.info('ApplyEVoucherButton click successfull.', { classname: 'FareQuote' });

    }

    async assertSetVoucherDetails() {
        await obj_PageElementHelper.assertLinkEnabled(FareQuotePageElement.farequote.locate_add_email_for_voucher);
        await obj_PageElementHelper.assertLinkEnabled(FareQuotePageElement.farequote.locate_add_lastName_for_voucher);
        await obj_PageElementHelper.assertLinkEnabled(FareQuotePageElement.farequote.locate_add_eVoucher_code);
        await obj_PageElementHelper.assertLinkEnabled(FareQuotePageElement.farequote.locate_apply_voucher_button);
    }

    async goToCreateVoucherPage() {
        const context = await browser.newContext();

        const page = await context.newPage();
        await page.goto('https://testwebuser:weblogic123@ecp-prelive.baplc.com/captools/createVoucher.jsp');

        let LastName = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        let charactersLength = characters.length;
        for (let i = 0; i < 5; i++) {
            LastName += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        let randomEmail = `${LastName}@ba.com`;
        let amount = Math.floor(Math.random() * 10) + 1000;

        await page.locator(EVoucherPageElement.EVoucherCode.locate_Name).type(LastName);
        await page.locator(EVoucherPageElement.EVoucherCode.locate_amount).type(amount.toString());
        await page.locator(EVoucherPageElement.EVoucherCode.locate_endorse_no_btn).click();
        await page.locator(EVoucherPageElement.EVoucherCode.locate_email).type(randomEmail);
        await page.locator(EVoucherPageElement.EVoucherCode.locate_submit_btn).click();
        await page.waitForTimeout(5000);

        let eVoucherText = await page.locator(EVoucherPageElement.EVoucherCode.locate_Evoucher).innerText();
        console.log(eVoucherText);
        let eVoucherCode = eVoucherText.slice(23, 33);
        console.log(eVoucherCode);

        let data = {
            'name': LastName,
            'amount': amount,
            'email': randomEmail,
            'eVoucherCode': eVoucherCode
        };

        console.log(data);
        await page.close();
        let jsonStringData = JSON.stringify(data);;
        return jsonStringData;
    }

    async setVoucherDetails(VoucherDetails) {
        let eVoucherLink = await page.locator(FareQuotePageElement.farequote.locate_eVoucher_Link);
        let jsonString = JSON.parse(VoucherDetails);
        let email = jsonString.email
        let LastName = jsonString.name
        let eVoucherCode = jsonString.eVoucherCode

        await eVoucherLink.waitFor();

        let add_email_for_voucher = await page.locator(FareQuotePageElement.farequote.locate_add_email_for_voucher);
        let add_lastName_for_voucher = await page.locator(FareQuotePageElement.farequote.locate_add_lastName_for_voucher);
        let add_eVoucher_code = await page.locator(FareQuotePageElement.farequote.locate_add_eVoucher_code);
        let click_on_apply_voucher_button = await page.locator(FareQuotePageElement.farequote.locate_apply_voucher_button);
        await page.waitForTimeout(4000);
        await add_email_for_voucher.fill(email, { delay: 200 });
        await add_lastName_for_voucher.fill(LastName, { delay: 200 });
        await add_eVoucher_code.clear();

        await add_eVoucher_code.fill("125-"+eVoucherCode, { delay: 1000 });
        await click_on_apply_voucher_button.click();
        LOGGER.info('setVoucherDetails successfull.', { classname: 'FareQuote' });

    }

    async assertSaveWithAvios() {
        await obj_PageElementHelper.assertLinkEnabled(FareQuotePageElement.farequote.locate_save_with_avios_button);
    }

    async saveWithAvios() {

        await this.RetryAndClick(FareQuotePageElement.farequote.locate_save_with_avios_button)

        LOGGER.info('saveWithAvios click successfull.', { classname: 'FareQuote' });

    }

    async assertSetEcLoginDetails() {
        await obj_PageElementHelper.assertLinkEnabled(FareQuotePageElement.farequote.locate_enter_ec_membership);
        await obj_PageElementHelper.assertLinkEnabled(FareQuotePageElement.farequote.locate_enter_password);
        await obj_PageElementHelper.assertLinkEnabled(FareQuotePageElement.farequote.locate_click_log_in_button);
    }

    async setEcLoginDetails(ecMember, password) {
        //await this.assertSetEcLoginDetails();

        let enter_ec_membership = await page.locator(FareQuotePageElement.farequote.locate_enter_ec_membership);
        let enter_password = await page.locator(FareQuotePageElement.farequote.locate_enter_password);
        let click_log_in_button = await page.locator(FareQuotePageElement.farequote.locate_click_log_in_button);
        await click_log_in_button.waitFor();

        await enter_ec_membership.fill(ecMember);
        await enter_password.fill(password);
        await click_log_in_button.click();
        //await page.waitForTimeout(10000);

        await this.clickAgreeAndContinue();
        LOGGER.info('setEcLoginDetails successfull.', { classname: 'FareQuote' });

    }

    async assertDisabilityAssistance() {
        await obj_PageElementHelper.assertLinkEnabled(FareQuotePageElement.farequote.locate_disability_assistance_button);
    }

    async disabilityAssistance() {
        await this.assertDisabilityAssistance();
        let disability_assistance_button = await page.locator(FareQuotePageElement.farequote.locate_disability_assistance_button);
        disability_assistance_button.click();
    }

    async disabhilityPageDisplayed() {
        let disability_PageTitle = await page.locator(FareQuotePageElement.farequote.locate_disability_Pagetitle).textContent;
        await page.waitForTimeout(5000);
        expect(disability_PageTitle).to.equal("What assistance is available?");
    }

    async asserHoldBookingButton() {
        let holdBookingButton = await page.locator(FareQuotePageElement.farequote.locate_hold_booking_button);
        await holdBookingButton.waitFor();
        await obj_PageElementHelper.assertLinkEnabled(holdBookingButton);
    }

    async holdBookingEcCash() {
        let flightData = flightSearchRequest.getDefaultData();
        let hbffFareQuotePagePrice = await this.getHoldBookingPriceOnFareQuotePage(flightData);

        await obj_PageElementHelper.checkElementVisibility(FareQuotePageElement.farequote.locate_hold_booking_card);
        await obj_PageElementHelper.checkElementVisibility(FareQuotePageElement.farequote.locate_hold_booking_heading);
        await page.locator(FareQuotePageElement.farequote.locate_hold_booking_button).click();
        await page.waitForTimeout(5000)

        let hbffSummaryPagePrice = await this.getHoldBookingPriceOnSummaryPage();
        expect(hbffFareQuotePagePrice).to.equal(hbffSummaryPagePrice);
    }

    async holdBooking() {
        const holdBookingLink = await page.locator(FareQuotePageElement.farequote.locate_hold_booking_button);
        await holdBookingLink.waitFor();   

        const continue_button = await page.locator(FareQuotePageElement.farequote.locate_continue_button);
        let flightData = flightSearchRequest.getDefaultData();
       

        let hbffFareQuotePagePrice = await this.getHoldBookingPriceOnFareQuotePage(flightData);

        await obj_PageElementHelper.checkElementVisibility(FareQuotePageElement.farequote.locate_hold_booking_card);
        await obj_PageElementHelper.checkElementVisibility(FareQuotePageElement.farequote.locate_hold_booking_heading);
        await holdBookingLink.click();
        await page.waitForTimeout(5000)

        let hbffSummaryPagePrice = await this.getHoldBookingPriceOnSummaryPage();

        expect(hbffFareQuotePagePrice).to.equal(hbffSummaryPagePrice);
        await this.fillInBasicDetails();
        if (await continue_button.isVisible()) {
            await continue_button.click();
        }
        
    }
    async fillInBasicDetails(){
        const holdBookingTitle = myuserdata.title;
        const holdBookingFirstName = myuserdata.firstName;
        const holdBookingLastName = myuserdata.lastName;
        const holdBookingEmail = myuserdata.emailAddress;
        
        await page.locator(FareQuotePageElement.farequote.locate_title_input_box).selectOption(holdBookingTitle);
        await page.locator(FareQuotePageElement.farequote.locate_first_name_input_box).fill(holdBookingFirstName);
        await page.locator(FareQuotePageElement.farequote.locate_last_name_input_box).fill(holdBookingLastName);
        await page.locator(FareQuotePageElement.farequote.locate_email_address_input_box).fill(holdBookingEmail);
    }
    async fillInPassportDetails(){
        const holdBookingTitle = myuserdata.title;
        const holdBookingFirstName = myuserdata.firstName;
        const holdBookingLastName = myuserdata.lastName;
        const holdBookingEmail = myuserdata.emailAddress;
        const holdBookingPhoneNumber=myuserdata.phoneNumber;
        await page.locator(FareQuotePageElement.farequote.locate_title_input_box).selectOption(holdBookingTitle);
        await page.locator(FareQuotePageElement.farequote.locate_first_name_passport).fill(holdBookingFirstName);
        await page.locator(FareQuotePageElement.farequote.locate_last_name_passport).fill(holdBookingLastName);
        await page.locator(FareQuotePageElement.farequote.locate_email_passport).fill(holdBookingEmail);
        await page.locator(FareQuotePageElement.farequote.locate_phone_passport).fill(holdBookingPhoneNumber);
        const continue_button = await page.locator(FareQuotePageElement.farequote.locate_pax_continue_btn);
        if (await continue_button.isVisible()) {
            await continue_button.click();
        }
    }
async completeHeldBooking(cardName){
    await this.clickOnHoldBooking();
    await this.fillInBasicDetails();
    await obj_Payment.UpdatedpaymentDetails(cardName);  
}
async clickOnHoldBooking(){
    const holdBookingLink = await page.locator(FareQuotePageElement.farequote.locate_hold_booking_button);
    await holdBookingLink.waitFor(); 
    await obj_PageElementHelper.checkElementVisibility(FareQuotePageElement.farequote.locate_hold_booking_card);
    await obj_PageElementHelper.checkElementVisibility(FareQuotePageElement.farequote.locate_hold_booking_heading);
    await holdBookingLink.click();
    console.log("Hold your booking clicked");
}
    async getHoldBookingPriceOnFareQuotePage(flightSearchRequest) {
        let intAdult = parseInt(flightSearchRequest.adult);
        let intYoungAdult = parseInt(flightSearchRequest.youngAdult);
        let intChildrens = parseInt(flightSearchRequest.child);
        let passengerCount = intAdult + intYoungAdult + intChildrens;

        let holdBookingText = await page.locator(FareQuotePageElement.farequote.locate_hold_booking_button).textContent();
        let matchesPricePerPersonForHoldBooking = holdBookingText.match(/(\d+)/);
        let getHoldBookingFee = (matchesPricePerPersonForHoldBooking[0] * passengerCount);

        return getHoldBookingFee;
    }

    async getHoldBookingPriceOnSummaryPage() {
        let holdBookingFinalPrice = await page.locator(FareQuotePageElement.farequote.locate_hold_booking_summary_page_price).textContent();
        let matchesFinalPriceForHoldBooking = await holdBookingFinalPrice.match(/(\d+)/);
        let getFinalHoldBookingPrice = await matchesFinalPriceForHoldBooking[0];
        let intGetFinalHoldBookingPrice = parseInt(getFinalHoldBookingPrice);

        return intGetFinalHoldBookingPrice;
    }

    async validatePassengerPage() {
        await obj_PageElementHelper.checkElementVisibility(FareQuotePageElement.farequote.locate_validate_passenger_page);
    }

    async validate_farequote() {
        await obj_PageElementHelper.checkElementVisibility(FareQuotePageElement.farequote.locate_baHotelOffer);
        await obj_PageElementHelper.checkElementVisibility(FareQuotePageElement.farequote.locate_baCarOffer);

    }

    async compareTotalpricefarequote(paxMixType) {
        //await page.pause();
        this.obj_pax_helper.splitPaxMixType(paxMixType);
        await page.locator(FareQuotePageElement.farequote.locate_breakdown_table_dropdown).click({ force: true });

        let intAdult = parseInt(FareQuotePageElement.farequote.obj_pax_helper.getNumOfAdults);
        let intyoungAdult = parseInt(this.obj_pax_helper.getNumOfYoungAdults);
        let intchildren = parseInt(this.obj_pax_helper.getNumOfChildren);
        let Intinfant = parseInt(this.obj_pax_helper.getNumOfInfants);


        await page.waitForTimeout(3000);

        const totalpassenger = intAdult + intyoungAdult + intchildren + Intinfant + 1;

        //  let breakdown_table_total_price = ".hydrated > table:nth-child {"+totalpassenger+"} > tfoot > tr > td:nth-child(2)";

        let breakdowntable_total_price = await page.locator("//table[" + totalpassenger + "]/tfoot/tr/td[2]").textContent();
        //  loggers.log(breakdowntable_total_price);
        let total_price = await page.locator(FareQuotePageElement.farequote.locate_total_price).textContent();

        try {

            expect(total_price.trim()).to.equal(breakdowntable_total_price);

        } catch (error) {

            LOGGER.error('[ASSERTION ERROR] farequote: compareTotalpricefarequote', { classname: 'FareQuote' });


        }

    }
    async assertyourFairConditions() {
        try {


            await page.locator(this.locate_yourfairconditions_dropdown).click({ force: true });
            let changesToYourTicket = await page.locator("ba-accordion[id='fareRulesAccordion'] h3:nth-child(1)").textContent();
            expect(changesToYourTicket).to.equal("Changes to your ticket");


        } catch (error) {


            LOGGER.error('[ASSERTION ERROR] farequote : assertyourFairConditions ', { classname: 'FareQuote' });

        }

    }

    async assertyourBaggageAlloance() {
        try {
            await page.locator(FareQuotePageElement.farequote.locate_yourBaggageallowance_dropdown).click({ force: true });
            let baggageallowance = await page.locator("#baggageSegment > ba-grid > ba-content > h4:nth-child(2)").textContent();
            console.log(baggageallowance);
            expect(baggageallowance).to.equal(" Hand baggage ");



        } catch (error) {

            LOGGER.error('[ASSERTION ERROR] farequote : assertBaggageAlloance', { classname: 'FareQuote' });
        }
    }
    async assertFoodandDrink() {
        try {

            await page.locator(FareQuotePageElement.farequote.locate_foodanddrink_dropdown).click({ force: true });
            let foodanddrinks = await page.locator("#mealInfo > ba-content > ul > li").textContent();
            expect(foodanddrinks).to.equal("Food and Beverges for Purchase");

        } catch (error) {

            LOGGER.error('[ASSERTION ERROR] farequote : assertFoodandDrink', { classname: 'FareQuote' });
        }


    }

    async selectBreakDownTable() {
        await page.locator(FareQuotePageElement.farequote.locate_breakdown_table_dropdown).waitFor();
        await page.locator(FareQuotePageElement.farequote.locate_breakdown_table_dropdown).click({ force: true });
        await page.waitForTimeout(3000);
        await page.locator(FareQuotePageElement.farequote.locate_price_breakdown_table).isVisible();
    }

    async assertAPDtaxesForYoungAdult() {
        try{
        let airPassengerDutyText = await page.locator(FareQuotePageElement.farequote.locate_air_passenger_duty_for_YA).textContent();
        let airPassengerDutyFee = airPassengerDutyText.match(/\d+(?:\.\d+)?/g);
        let airPassengerDutyFeeText = airPassengerDutyFee[0];
        console.log(airPassengerDutyFeeText);
        if (parseInt(airPassengerDutyFeeText) === 0) {
            LOGGER.info('Air Passenger Duty for Young Adult is zero', { classname: 'FareQuote' });
        }
        else {
            LOGGER.info('Air Passenger Duty for Young Adult is greater then zero', { classname: 'FareQuote' });
        }
    }
    catch(error){
        LOGGER.info('unable to fetch Air Passenger Duty for Young Adult', { classname: 'FareQuote' });
    }
    }

    async assertAPDtaxesForAdult() {
        try{
        let airPassengerDutyTextForAdult = await page.locator(FareQuotePageElement.farequote.locate_air_passenger_duty_for_Adult).textContent();
        let airPassengerDutyFeeAdult = airPassengerDutyTextForAdult.match(/\d+(?:\.\d+)?/g);
        let airPassengerDutyFeeTextadult = airPassengerDutyFeeAdult[0];
        console.log(airPassengerDutyFeeTextadult)
        if (parseInt(airPassengerDutyFeeTextadult) > 0) {
            LOGGER.info('Air Passenger Duty for  Adult is greater then zero', { classname: 'FareQuote' });
        }
    }
    catch(error){
        LOGGER.info('Unable to fetch Air Passenger Duty for  Adult', { classname: 'FareQuote' });
    }
    }

    async assertAPDTaxes() {
        let flightData = flightSearchRequest.getDefaultData();
        if (flightData.youngAdult > 0) {
            this.assertAPDtaxesForYoungAdult();
        } else {
            this.assertAPDtaxesForAdult();
        }
    }

    async asserHoldBookingButtonAvailablity() {
        await page.getByRole('button', { name: 'Agree and Continue' }).waitFor();
        let holdBookingButton = page.locator(FareQuotePageElement.farequote.locate_hold_booking_button);
        expect(await holdBookingButton.isVisible()).to.be.false;
    }

    async addDiscountOnHBFF(discountType) {
        let ecLoginLink = await page.locator(FareQuotePageElement.farequote.locate_save_with_avios_button);
        let holdBookingButton = await page.locator(FareQuotePageElement.farequote.locate_hold_booking_button);
        
        await holdBookingButton.waitFor();

        let holdBookingFareQuoteText = await page.locator(FareQuotePageElement.farequote.locate_hold_booking_button).textContent();
        let beforeDiscountedPrice = holdBookingFareQuoteText.match(/(\d+)/);

        if (discountType == "Avios") {
            await ecLoginLink.waitFor();
            await ecLoginLink.click();
            const ecMemberDetails = LoginHelper.get("Gold R");
            await obj_ECLogin.loginOnFareQuotePage(ecMemberDetails);
        } else {
            await this.clickApplyEVoucherButton();
            const eVoucherCodeData = await this.goToCreateVoucherPage();
            await this.setVoucherDetails(eVoucherCodeData);
        }
        await holdBookingButton.waitFor();
        await holdBookingButton.click();
        await page.waitForTimeout(6000);
        let holdBookingSummaryPageText = await page.locator(FareQuotePageElement.farequote.locate_hold_booking_summary_page_price).textContent();
        let afterDiscountedPrice = holdBookingSummaryPageText.match(/(\d+)/);

        expect(parseInt(beforeDiscountedPrice)).to.equal(parseInt(afterDiscountedPrice));
    }

    async verifyHoldBookingTermsAndConditon() {
        let hBFF_TermsAndCondtion_Link = await page.locator(FareQuotePageElement.farequote.locate_termsAndConditionLink);
        let hBFF_TermsAndCondtion_Heading = await page.locator(FareQuotePageElement.farequote.locate_termsAndConditionHeading);

        await obj_PageElementHelper.checkElementVisibility(FareQuotePageElement.farequote.locate_hold_booking_card);
        await obj_PageElementHelper.checkElementVisibility(FareQuotePageElement.farequote.locate_hold_booking_heading);
        await page.locator(FareQuotePageElement.farequote.locate_hold_booking_button).click();

        await hBFF_TermsAndCondtion_Link.waitFor();
        await hBFF_TermsAndCondtion_Link.click();
        
        try {
            if (await hBFF_TermsAndCondtion_Heading.isVisible()) {
                let termAndCondition = await page.getByRole('document', { name: hBFF_TermsAndCondtion_Heading }).isVisible();
                expect(termAndCondition).to.be.true;
            }
        } catch (error) {
            console.log("[ERROR] : " + error + "")
        }
    }

    async verifyDonationAmountOnHBFF(donation) {
        let flightData = flightSearchRequest.getDefaultData();
        let hbffFareQuotePagePrice = await this.getHoldBookingPriceOnFareQuotePage(flightData);
        await page.waitForTimeout(3000);
        await this.obj_Donation.donations(donation);
        await page.waitForTimeout(3000);
        let hbffSummaryPagePrice = await this.getHoldBookingPriceOnSummaryPage();

        expect(parseInt(hbffFareQuotePagePrice)).to.equal(parseInt(hbffSummaryPagePrice));
    }

    async verifyHBFFDetailsAndPage(hbffDetails, hbffPage) {
        const { title, firstName, lastName, emailAddress } = myuserdata;
        let hbffPrice_and_duration = await page.locator(FareQuotePageElement.farequote.locate_hold_booking_price_and_duration).textContent();
        let fareQuoteItinenary = await this.getFlightItinenaryFareQuote();

        if (await hbffPage.includes("Price")) {
            await this.verifyHoldBookingDurationAndPriceOnFareQuote(hbffPrice_and_duration, hbffDetails);
        } else {

            await page.locator(FareQuotePageElement.farequote.locate_hold_booking_button).click();
            await page.waitForTimeout(5000);
            await page.locator(FareQuotePageElement.farequote.locate_title_input_box).selectOption(title);
            await page.locator(FareQuotePageElement.farequote.locate_first_name_input_box).fill(firstName);
            await page.locator(FareQuotePageElement.farequote.locate_last_name_input_box).fill(lastName);
            await page.locator(FareQuotePageElement.farequote.locate_email_address_input_box).fill(emailAddress);

            let hbffSummaryPagePrice = await this.getHoldBookingPriceOnSummaryPage();
            let summaryPageItinenary = await this.getFlightItinenarySummaryPage();
            let duration = await page.locator(FareQuotePageElement.farequote.locate_HBFF_duration).textContent();

            if (await hbffPage.includes("Summary")) {
                try {
                    expect(hbffPrice_and_duration.includes("72 hours")).to.equal(duration.includes("72 hours"))
                    expect(summaryPageItinenary).to.deep.equal(fareQuoteItinenary);
                    expect(fareQuoteItinenary).to.have.all.members(summaryPageItinenary);
                } catch (error) {
                    console.error('[ERROR] :' + hbffDetails + '' + ":" + error)
                }
            }
            else if (await hbffPage.includes("Payment")) {
                let continue_btn = await page.locator(FareQuotePageElement.farequote.locate_continue_button);
                if (await continue_btn.isVisible()) {
                    await continue_btn.click();
                }
                await page.waitForTimeout(4000);
                let hbffPaymentPagePrice = await page.locator(FareQuotePageElement.farequote.locate_hold_booking_price_paymentPage).textContent();
                let matchesFinalPriceForHoldBooking = hbffPaymentPagePrice.match(/(\d+)/);
                let getPaymentPrice = matchesFinalPriceForHoldBooking[0];
                try {
                    expect(parseInt(hbffSummaryPagePrice)).to.equal(parseInt(getPaymentPrice));
                } catch (error) {
                    console.error('[ERROR] :' + hbffDetails + '' + ":" + error)
                }
            }
            else if (hbffPage.includes("Confirmation")) {
                let continue_btn = page.locator(FareQuotePageElement.farequote.locate_continue_button);
                if (await continue_btn.isVisible()) {
                    await continue_btn.click();
                }
                await this.obj_Payment.UpdatedpaymentDetails("VISA Personal");
                await page.waitForTimeout(15000);
                try {
                    await this.obj_Confirmation.holdBookingConfirmation();
                    await this.obj_Confirmation.assert_PNR();
                    await page.locator(FareQuotePageElement.farequote.obj_Confirmation.locate_Manage_My_booking_button).click();
                    await page.waitForTimeout(20000);
                    await this.obj_Confirmation.HBFFPayAndComplete();
                } catch (error) {
                    console.error('[ERROR] :' + hbffDetails + '' + ":" + error)
                }
            }
        }
    }

    async verifyHBFFDetailsAndPageEcCashFlow(hbffDetails, hbffPage) {
        const hbffPrice_and_duration = await page.locator(FareQuotePageElement.farequote.locate_HBFF_duration).textContent();
        await this.verifyHoldBookingDurationAndPriceOnFareQuoteForEcCash(hbffPrice_and_duration, hbffDetails);
    }

    async verifyHoldBookingDurationAndPriceOnFareQuote(hbffPrice_and_duration, hbffDetails) {
        try {
            let expectedPrice = (await hbffDetails.includes("ShortHaul")) ? "£5.00" : "£10.00"
            expect(hbffPrice_and_duration).includes("72 hours")
            expect(hbffPrice_and_duration).includes(expectedPrice)
        } catch (error) {
            console.error('[ERROR] :' + hbffDetails + '' + ":" + error)
        }
        return hbffPrice_and_duration;
    }

    async verifyHoldBookingDurationAndPriceOnFareQuoteForEcCash(hbffPrice_and_duration, hbffDetails) {
        try {
            expect(hbffPrice_and_duration).includes("72 hours")
        } catch (error) {
            console.error('[ERROR] :' + hbffDetails + '' + ":" + error)
        }
        return hbffPrice_and_duration;
    }

    async getFlightItinenaryFareQuote() {
        let fareQuoteFlightDetails = [];

        let flightDetailsLink = await page.locator(FareQuotePageElement.farequote.locate_flight_itinerary_button);
        let flightDetailsClosePopUp = await page.locator(FareQuotePageElement.farequote.locate_flight_details_close_popup);

        await page.waitForTimeout(5000);
        if(await flightDetailsLink.isVisible()){
            await flightDetailsLink.click();
        }
        
        let flightNumber = await page.locator(FareQuotePageElement.farequote.locate_flight_itinerary_flightNumber).textContent();
        let travelClass = await page.locator(FareQuotePageElement.farequote.locate_flight_itinerary_travelClass).textContent();
        let departAirport = await page.locator(FareQuotePageElement.farequote.locate_flight_itinerary_depart_airport).textContent();
        let arrivalAirport = await page.locator(FareQuotePageElement.farequote.locate_flight_itinerary_arrival_airport).textContent();
        let departDateTime = await page.locator(FareQuotePageElement.farequote.locate_flight_itinerary_depart_date_and_time).textContent();
        let arrivalDateTime = await page.locator(FareQuotePageElement.farequote.locate_flight_itinerary_arrival_date_and_time).textContent();

        fareQuoteFlightDetails.push(flightNumber.trim());
        fareQuoteFlightDetails.push(travelClass.trim());
        fareQuoteFlightDetails.push(departAirport.trim().toLowerCase());
        fareQuoteFlightDetails.push(arrivalAirport.trim().toLowerCase());
        fareQuoteFlightDetails.push(departDateTime.split(',')[0].trim());
        fareQuoteFlightDetails.push(departDateTime.split(',')[1].trim());
        fareQuoteFlightDetails.push(arrivalDateTime.split(',')[0].trim());
        fareQuoteFlightDetails.push(arrivalDateTime.split(',')[1].trim());

        if(await flightDetailsClosePopUp.isVisible()){
            await flightDetailsClosePopUp.click();
        }

        return fareQuoteFlightDetails;

    }

    async assertMoreFareOptionsAccordion() {
        let bookedCabin = await page.locator(".cabin > ba-content > h3").nth(0).textContent();
        let moreOptionsAccordion = await page.locator(FareQuotePageElement.farequote.locate_more_fare_options_pod);
        if (bookedCabin === "Economy Basic") {
            await moreOptionsAccordion.isVisible();
        } else {
            await page.waitForTimeout(1500);
            !(await moreOptionsAccordion.isVisible());
        }
    }

    async getFlightItinenarySummaryPage() {
        let summaryDetailsFlightDetails = [];

        let flightDetails_Pod = await page.locator(FareQuotePageElement.farequote.locate_flight_details_pod);
        await page.waitForTimeout(5000);

        if (await flightDetails_Pod.isVisible()) {
            await flightDetails_Pod.click();
        }
        let departAirpot = await page.locator(FareQuotePageElement.farequote.locate_flight_itinerary_depart_airport_summaryPage).textContent();
        let arrivalAirpot = await page.locator(FareQuotePageElement.farequote.locate_flight_itinerary_arrival_airport_summaryPage).textContent();
        let departDate = await page.locator(FareQuotePageElement.farequote.locate_flight_itinerary_depart_date_summaryPage).textContent();
        let arrivalDate = await page.locator(FareQuotePageElement.farequote.locate_flight_itinerary_arrival_date_summaryPage).textContent();
        let travelClass = await page.locator(FareQuotePageElement.farequote.locate_flight_itinerary_travelClass_summaryPage).textContent();
        let departTime = await page.locator(FareQuotePageElement.farequote.locate_flight_itinerary_depart_time_summaryPage).textContent();
        let arrivalTime = await page.locator(FareQuotePageElement.farequote.locate_flight_itinerary_arrival_time_summaryPage).textContent();
        let moreDetailsLink = await page.locator(FareQuotePageElement.farequote.locate_flight_more_details_link);

        await moreDetailsLink.click();
        await page.waitForTimeout(2000);

        let flightNumber = await page.locator(FareQuotePageElement.farequote.locate_flight_itinerary_flightNumber_summaryPage).textContent();

        summaryDetailsFlightDetails.push(flightNumber.trim());
        summaryDetailsFlightDetails.push(travelClass.trim());
        summaryDetailsFlightDetails.push(departAirpot.split("(")[0].trim().toLowerCase());
        summaryDetailsFlightDetails.push(arrivalAirpot.split("(")[0].trim().toLowerCase());

        let departTimeText = departTime.split(" ")[3].trim();
        let arrivalTimeText = arrivalTime.split(" ")[3].trim();


        if (departTimeText.split(":")[0] < 10) {
            departTimeText = "0" + departTimeText;
        }
        if (arrivalTimeText.split(":")[0] < 10) {
            arrivalTimeText = "0" + arrivalTimeText;
        }
        summaryDetailsFlightDetails.push(departTimeText);
        summaryDetailsFlightDetails.push(departDate.replace(",", "").trim());
        summaryDetailsFlightDetails.push(arrivalTimeText);
        summaryDetailsFlightDetails.push(arrivalDate.replace(",", "").trim().split("Arrives ")[1]);

        return summaryDetailsFlightDetails;
    }

    async verifyAirportMismatch() {
        const isAirportMismatch = page.locator(FareQuotePageElement.farequote.locate_airport_mismatch_continue_button).isVisible();
        return isAirportMismatch;
    }

    async airportMismatchContinueButton() {
        await page.locator(FareQuotePageElement.farequote.locate_airport_mismatch_continue_button).click();
    }

    async continueNextToPassengerPage() {
        await this.clickAgreeAndContinue();
    }

    async verifyMoreFareOptions(feature, value) {
        let expectedFeatureList = feature.split(",");
        let expectedValueList = value.split(",");

        let fare_table = await page.locator(FareQuotePageElement.farequote.locate_more_fare_options_table);
        await fare_table.waitFor();
        expect(fare_table.isVisible());

        await this.getTicketTypefeatureValue(expectedFeatureList, expectedValueList);
    }

    async getTicketTypefeatureValue(expectedFeatureList, expectedValueList) {
        const FEATURES = await this.getBasicTicketFeatures();

        let fare_table_feature_text = await page.$$(FareQuotePageElement.farequote.locate_more_fare_options_table_rows_feature);
        let fare_table_feature_value_text = await page.$$(FareQuotePageElement.farequote.locate_more_fare_options_table_rows_feature_value);

        let actualFeatureList = [];
        let actualValueList = [];

        for (let i = 1; i < fare_table_feature_text.length; i++) {
            const featureElement = fare_table_feature_text[i];
            const featureText = await featureElement.textContent();
            actualFeatureList.push(featureText);
        }

        for (let i = 1; i < fare_table_feature_value_text.length; i++) {
            const featureValueElement = fare_table_feature_value_text[i];
            const featureValueText = await featureValueElement.textContent();
            actualValueList.push(featureValueText);
        }

        async function getActualFeatureIndex(actualFeatureList, expectedFeatureName) {
            for (let i = 0; i < actualFeatureList.length; i++) {
                if (await actualFeatureList[i].includes(expectedFeatureName)) {
                    return i;
                }
            }
            return -1;
        }

        for (let i = 0; i < expectedFeatureList.length; i++) {
            let expectedFeatureName = await FEATURES.get(`${expectedFeatureList[i]}`)
            const getFeatureIndex = await getActualFeatureIndex(actualFeatureList, expectedFeatureName)

            if (getFeatureIndex === -1) {
                console.log(`[ERROR] : Feature ${expectedFeatureList[i]} is not Present`);
            } else {
                const actualValue = actualValueList[getFeatureIndex];
                if (expectedValueList[i] === actualValue) {
                    console.log(`[INFO] : Feature ${expectedFeatureList[i]} conatains the value ${expectedValueList[i]} `);
                } else {
                    console.log(`[ERROR] : Expected value of Feature ${expectedFeatureList[i]} is ${expectedValueList[i]} but found ${actualValue}`);
                }
            }
        }

    }

    async getBasicTicketFeatures() {
        const TICKET_FEATURE_MAP = new Map();
        TICKET_FEATURE_MAP.set("checked baggage", "checked");
        TICKET_FEATURE_MAP.set("seating", "seats");
        TICKET_FEATURE_MAP.set("change flight on the day of travel", "day of travel");
        TICKET_FEATURE_MAP.set("change flight", "at anytime");
        TICKET_FEATURE_MAP.set("refund if you cancel", "refund");

        return TICKET_FEATURE_MAP;
    }
    async assertPaxMixCount() {
        let see_your_breakdown = await page.locator(FareQuotePageElement.farequote.locate_see_your_breakdown);
        await see_your_breakdown.click();
        let allPaxs = await page.$$(".price-breakdown-table caption");
        let adultCount = 0;
        let YACount = 0;
        let childCount = 0;
        let infantCount = 0;
        for (let i = 0; i < allPaxs.length; i++) {
            const paxText = await allPaxs[i].textContent();
            if (paxText.trim().startsWith('Adult')) {
                adultCount = adultCount + 1;
            }
            if (paxText.trim().startsWith('Young')) {
                YACount = YACount + 1;
            }
            if (paxText.trim().startsWith('Child')) {
                childCount = childCount + 1;
            }
            if (paxText.trim().startsWith('Infant')) {
                infantCount = infantCount + 1;
            }
        }
        const expPaxCount = [PAXHELPER.getNumOfAdults, PAXHELPER.getNumOfYoungAdults, PAXHELPER.getNumOfChildren, PAXHELPER.getNumOfInfants];
        const acPaxCount = [adultCount, YACount, childCount, infantCount];
        expect((acPaxCount.toString())).to.equal((expPaxCount.toString()));
        LOGGER.info('Actual Pax Count : ' + acPaxCount + ' equals to the Expected : ' + expPaxCount + ' Pax Count on Booking summary page', { classname: 'Booking Summary' });
    }

    async getPriceOnFarequote() {
        let price = await page.locator(FareQuotePageElement.farequote.locate_total_price).textContent();
        return price;
    }

    async verifyGoBackToFlightSelection() {
        let backToFlightSelection = await page.locator(FareQuotePageElement.farequote.locate_back_to_flight_selection);
        if (await backToFlightSelection.isVisible()) {
            await backToFlightSelection.click();
        }
    }
    
}

module.exports = FareQuote;