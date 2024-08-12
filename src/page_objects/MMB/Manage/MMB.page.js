const MmbPageTitle = 'British Airways - MMB';
const { expect } = require("chai");
const PageElements = require("../../../PageElements/MMB/MMB.pagelements")

class MMBPage {

    async assertBetaMmbPage() {
        let pagetitle = await page.title();
        expect(pagetitle).to.equal(MmbPageTitle);
    }

    async verifyBookingReference(){
        let bookingReference = await page.locator(PageElements.MMB.locate_booking_reference);
        await bookingReference.waitFor();
        let isVisible = await bookingReference.isVisible();
        expect(isVisible).to.be.true;
    }  
}
module.exports = MMBPage;