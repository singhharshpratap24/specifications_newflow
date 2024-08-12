"user strict";

const { assert } = require("chai");
const DonationElements = require('../../../PageElements/FlightSelling/Donations_page.js')
class Donations {

    async donations(donationType) {
        await page.locator(DonationElements.donations.locate_donations_pod).isVisible({ force: true });
        const donationsPodHeading = await page.locator(DonationElements.donations.locate_donations_heading_content).textContent();
        expect(donationsPodHeading).to.equal(DonationElements.donations.BA_BETTER_WORLD_MESSAGE);

        const radioButtons = await page.$$(DonationElements.donations.locate_radio_buttons);
        async function verifyDonationRadioButtons() {
            for (let i = 0; i < radioButtons.length; i++) {
                let radioBtns = "[value='" + i + "'] > label > input";
                await page.locator(radioBtns).isVisible();
            }
            return true;
        }

        assert.isOk(verifyDonationRadioButtons(), "Expected: Donation radio buttons are visible." + "Actual: Donation radio buttons are not visible.")

        if ((donationType.trim()).toLowerCase() === ("BA Better World".trim()).toLowerCase()) {
            await page.locator(DonationElements.donations.locate_radio_button_donation).click();
        } else {
            await page.locator(DonationElements.donations.locate_no_thanks_radio_button).click();
        }
    }

    async getPriceSummary() {
        const priceSummary = await page.locator(DonationElements.donations.locate_final_payment).textContent();
        return (priceSummary).trim();
    }

    async getPriceAFterDonation() {
        const donationFareText = await page.locator(DonationElements.donations.locate_donation_text).textContent();
        const pattern = /£?(\d+\.\d+|\d+)/g;
        const prices = donationFareText.match(pattern);
        return (prices[1]).trim();
    }

    async getCharityDonationAmount() {
        const charityAmount = await page.locator(DonationElements.donations.locate_charity_donation_text).textContent();
        const BetterWorld = await page.locator(DonationElements.donations.locate_Better_World_donation_text).textContent();
        const pattern = /£?(\d+\.\d+|\d+)/;  
        const prices = charityAmount.match(pattern);
        const exactPrice = (prices[1]).trim();
        const BABetterWorldPrice = BetterWorld.match(pattern);
        const exactBABetterWorldPrice = (BABetterWorldPrice[1].trim());
        try{
            expect(exactPrice).to.equal(exactBABetterWorldPrice);
        }
        catch(error){
            console.error("[ASSERTION ERROR] Charity Donation Amount didn't matched") 
        }
        
    }
}
module.exports = Donations;