"use strict";
const HoldBookingElement = require('../../../PageElements/FlightSelling/HoldBooking_page.js')

class HoldBooking {

    async enterDetailsOnHoldBookingPage () {

        await page.locator(HoldBookingElement.holdBooking.locate_title_input_box).selectOption("Mr");
        await page.locator(HoldBookingElement.holdBooking.locate_first_name_input_box).fill("Harsha");
        await page.locator(HoldBookingElement.holdBooking.locate_last_name_input_box).fill("Wardhana");
        await page.locator(HoldBookingElement.holdBooking.locate_email_address_input_box).fill("test@ba.com");
        await page.locator(HoldBookingElement.holdBooking.locate_continue_button).click();
    }
}