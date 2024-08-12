"use strict";

const PageElementHelper = require('../../../Helpers/PageElementHelper.js')
const LOGGER = require('../../../setup/logger');
const SeatMappingPageElements = require('../../../PageElements/FlightSelling/SeatMapping_page.js')
const obj_PageElementHelper = new PageElementHelper();

class SeatMapping {

    async chooseSeats() {
        await page.locator(SeatMappingPageElements.seatMappting.locate_available_seats).waitFor();

        await obj_PageElementHelper.checkElementVisibility(SeatMappingPageElements.seatMappting.locate_available_seats);
        await obj_PageElementHelper.checkElementVisibility(SeatMappingPageElements.seatMappting.locate_seat_per_pax);
        let noOfPax = await page.$$(SeatMappingPageElements.seatMappting.locate_seat_per_pax);
        let paxCount = 0;

        for (let i = 1; i <= noOfPax.length; i++) {
            paxCount++;
            await page.locator(SeatMappingPageElements.seatMappting.locate_available_seats).click();
        }

        await page.getByRole("button", { name: "Confirm seats" }).click();

        LOGGER.info('chooseSeats Successful.', { classname: 'SeatMapping' });

    }

    async seatMapAssertions() {
        await page.locator(SeatMappingPageElements.seatMappting.locate_seats_info_pod).waitFor();
        await obj_PageElementHelper.checkElementVisibility(SeatMappingPageElements.seatMappting.locate_seats_info_pod);
    }
}
module.exports = SeatMapping;