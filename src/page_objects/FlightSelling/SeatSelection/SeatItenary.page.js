"use strict";
const { assert, expect } = require('chai')
const PageElementHelper = require('../../../Helpers/PageElementHelper.js')
const LOGGER = require('../../../setup/logger');
const PAYMENT = require('../payment/payment.page');
const SeatItenaryPageElements = require('../../../PageElements/FlightSelling/SeatItenary_page.js')
const obj_PageElementHelper = new PageElementHelper();
const obj_Payment = new PAYMENT();
const SeatMapping = require('../SeatSelection/SeatMapping.page');

class SeatItenary {

    obj_selectSeat = new SeatMapping();

    async backToPassengerDetailsPage() {
        let back_to_passenger_details_button = page.getByRole('link', { name: ' Back to passenger details ' });
        await back_to_passenger_details_button.waitFor();
        await obj_PageElementHelper.checkElementVisibility(back_to_passenger_details_button);
        await back_to_passenger_details_button.click();
        LOGGER.info('backToPassengerDetailsPage click Successful.', { classname: 'SeatItenary' });
    }

    async assertChooseYourSeatsHeading() {
        const choose_your_seats_heading = await page.locator(SeatItenaryPageElements.seatItenary.locate_choose_your_seats_heading).textContent();
        await obj_PageElementHelper.checkElementVisibility(SeatItenaryPageElements.seatItenary.locate_choose_your_seats_heading);
        expect(choose_your_seats_heading).to.contain("Choose your seats");
    }

    async outboundSegmentSeatSelection() {
        const outbound_segment = page.locator(SeatItenaryPageElements.seatItenary.locate_outbound_segment);
        await outbound_segment.waitFor();
        await obj_PageElementHelper.checkElementVisibility(SeatItenaryPageElements.seatItenary.locate_outbound_segment);
        await obj_PageElementHelper.checkElementVisibility(SeatItenaryPageElements.seatItenary.locate_choose_seats_button);
        await page.locator(SeatItenaryPageElements.seatItenary.locate_outbound_segment).locator(SeatItenaryPageElements.seatItenary.locate_choose_seats_button).click();
        LOGGER.info('outboundSegmentSeatSelection Successful.', { classname: 'SeatItenary' });
    }

    async inboundSegmentSeatSelection() {
        const inbound_segment = page.locator(SeatItenaryPageElements.seatItenary.locate_inbound_segment);
        await inbound_segment.waitFor();
        await obj_PageElementHelper.checkElementVisibility(SeatItenaryPageElements.seatItenary.locate_inbound_segment);
        await obj_PageElementHelper.checkElementVisibility(SeatItenaryPageElements.seatItenary.locate_choose_seats_button);
        await page.locator(SeatItenaryPageElements.seatItenary.locate_inbound_segment).locator(SeatItenaryPageElements.seatItenary.locate_choose_seats_button).click();
        LOGGER.info('inboundSegmentSeatSelection Successful.', { classname: 'SeatItenary' });
    }

    async chooseSeatsLaterButton() {
        let choose_seats_later_button = page.getByRole("button", { name: "Choose seats later" });
        await choose_seats_later_button.waitFor();
        await obj_PageElementHelper.checkElementVisibility(choose_seats_later_button);
        await choose_seats_later_button.click();
        LOGGER.info('chooseSeatsLaterButton click Successful.', { classname: 'SeatItenary' });
    }

    async seatsAgreeAndContinueButton() {
        let seats_agree_and_continue_button = await page.getByRole('button', { name: 'Agree and Continue' });
        await seats_agree_and_continue_button.waitFor();
        await obj_PageElementHelper.checkElementVisibility(seats_agree_and_continue_button);
        await seats_agree_and_continue_button.click();
        LOGGER.info('seatsAgreeAndContinueButton click Successful.', { classname: 'SeatItenary' });

    }

    async whatHappensifYouDontChooseSeatsNowButton() {
        let what_happens_if_you_donot_choose_seats_now = await page.getByRole("button", { name: " What happens if you don't choose seats now? " });
        await what_happens_if_you_donot_choose_seats_now.waitFor();
        await obj_PageElementHelper.checkElementVisibility(what_happens_if_you_donot_choose_seats_now);
        await what_happens_if_you_donot_choose_seats_now.click();
        LOGGER.info('whatHappensifYouDontChooseSeatsNowButton click Successful.', { classname: 'SeatItenary' });
    }

    async helpWithDisabilityRequirementsButton() {
        let help_with_disability_requirements = await page.getByRole("button", { name: " Help with disability requirements " });
        await help_with_disability_requirements.waitFor();
        await obj_PageElementHelper.checkElementVisibility(help_with_disability_requirements);
        await help_with_disability_requirements.click();
        LOGGER.info('helpWithDisabilityRequirementsButton click Successful.', { classname: 'SeatItenary' });
    }

    async termsAndConditionsButton() {
        let terms_and_conditions = await page.getByRole("button", { name: "Terms & Conditions" });
        await terms_and_conditions.waitFor();
        await obj_PageElementHelper.checkElementVisibility(terms_and_conditions);
        await terms_and_conditions.click();
        LOGGER.info('termsAndConditionsButton click Successful.', { classname: 'SeatItenary' });
    }

    async disabiltyAssistanceLink() {
        let disability_assitance = await page.locator("link", { name: "Disability assistance" })
        await disability_assitance.waitFor();
        await obj_PageElementHelper.checkElementVisibility(disability_assitance);
        await disability_assitance.click();
        LOGGER.info('disabiltyAssistanceLink click Successful.', { classname: 'SeatItenary' });
    }

    async continueNextToPaymentPageAfterSeatSelection() {
        await this.assertChooseYourSeatsHeading();
        await this.outboundSegmentSeatSelection();
        await this.obj_selectSeat.chooseSeats();
        await this.seatsAgreeAndContinueButton();
    }

    async continueNextToPaymentPage() {
        await this.chooseSeatsLaterButton();
        await obj_Payment.Credit_offer_skip_page();
    }
}
module.exports = SeatItenary;