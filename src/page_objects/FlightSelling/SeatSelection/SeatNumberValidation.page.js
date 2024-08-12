"use strict";
const { expect } = require("chai");
const LOGGER = require('../../../setup/logger');
const SeatNumberValidationPageElements = require('../../../PageElements/FlightSelling/SeatNumberValidation_page.js')
class SeatNumberValidation {
    SeatNumberonseatitenary = "";
    SeatNumberonmmb = "";
    async fetchSeatNumber() {
        let SeatNumber = await page.locator(SeatNumberValidationPageElements.seatNumberValidation.locate_SeatNumber).textContent();
        this.SeatNumberonseatitenary = "0" + SeatNumber;

    }
    async clickonMmb() {
        let MmbButton = await page.locator(SeatNumberValidationPageElements.seatNumberValidation.locate_MMB_btn);
        await MmbButton.click();
    }

    async select_ChooseSeat() {
        await page.locator(SeatNumberValidationPageElements.seatNumberValidation.locate_chooseSeat).click();
        let SeatNumber = await page.locator(SeatNumberValidationPageElements.seatNumberValidation.locate_seatSelected).textContent();
        this.SeatNumberonmmb = SeatNumber;
    }

    async validateSeatNumberonmmb() {
        let SeatNumber = await page.locator(SeatNumberValidationPageElements.seatNumberValidation.locate_seatSelected).textContent();
        this.SeatNumberonmmb = SeatNumber;
        expect(this.SeatNumberonseatitenary.trim()).to.equal(this.SeatNumberonmmb.trim());
    }
}

module.exports = SeatNumberValidation;