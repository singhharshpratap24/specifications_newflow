const { assert } = require('chai')
const LOGGER = require('../../../setup/logger')
const MemberDetails = require('../../../Helpers/MemberHelper.json') 
const PageElements = require("../../../PageElements/ExecutiveClub/EConfirmation.pagelements.js");
const UTILS = require('../../../Helpers/utils.js');
const utils= new UTILS();

class EC_Booking_Confirmation {

    async getBookedPNR ()
    { 
        await page.waitForLoadState('domcontentloaded');
        await utils.confirmPageLoad();
        await page.getByText('Your booking is confirmed').isVisible();
        let pnr = await page.locator(PageElements.EConfirmation.locate_bookingReference).textContent();
      
        LOGGER.info('PNR Booking Successfull. Your booking reference is : ' + pnr);
    }

    async assertConfirmationDetails(Details, ecMember) {

        let totalAmount = await page.locator(PageElements.EConfirmation.locate_totalAmount);
        let totalAviosDebited = await page.locator(PageElements.EConfirmation.locate_totalAvios);
        const passengerName = await page.locator(PageElements.EConfirmation.locate_passengerName).textContent();
        let departingAirport = await page.locator(PageElements.EConfirmation.locate_fro);
        let arrivalAirport = await page.locator(PageElements.EConfirmation.locate_to);
        const passengerEmailAddress = await page.locator(PageElements.EConfirmation.locate_emailAddress).textContent();

        const memberTypeHelper = {
            US_Gold: "US Gold",
            UK_Silver: "UK Silver",
            UK_Premier: "UK Premier",
            Austria_Gold: "Austria Gold"
        }
        if (memberTypeHelper.US_Gold.includes(ecMember)) {
            assert.equal(MemberDetails.TIER_MEMBER.US_Gold.name, passengerName);
            assert.equal(MemberDetails.TIER_MEMBER.US_Gold.email, passengerEmailAddress);
        } else if (memberTypeHelper.UK_Silver.includes(ecMember)) {
            assert.equal(MemberDetails.TIER_MEMBER.UK_Silver.name, passengerName);
            assert.equal(MemberDetails.TIER_MEMBER.UK_Silver.email, passengerEmailAddress);
        } else if (memberTypeHelper.UK_Premier.includes(ecMember)) {
            assert.equal(MemberDetails.TIER_MEMBER.UK_Premier.name, passengerName);
            assert.equal(MemberDetails.TIER_MEMBER.UK_Premier.email, passengerEmailAddress);
        } else if (memberTypeHelper.Austria_Gold.includes(ecMember)) {
            assert.equal(MemberDetails.TIER_MEMBER.Austria_Gold.name, passengerName);
            assert.equal(MemberDetails.TIER_MEMBER.Austria_Gold.email, passengerEmailAddress);
        }
        await totalAmount.isVisible();
        await totalAviosDebited.isVisible();
        await departingAirport.isVisible();
        await arrivalAirport.isVisible();
    }
}
module.exports = EC_Booking_Confirmation ;