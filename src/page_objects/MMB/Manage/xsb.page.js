class xsb {
    locate_mmb_btn = "//h2[text()='Manage my booking']";
    locate_add_bag_btn = "(//p[text()='Add bags'])[2]/..";
    locate_new_allowance = "//div[@class='new-baggage']/span/following-sibling::span";
    locate_extra_bag_btn = "(//*[@class='stepper stepperTab'])";
    locate_pax_count = "[class=personaldata]";
    locate_who_is_paying_drop_down = "//select[@class='input-primary personaldata']";
    locate_person_paying = "//*[@id='leadPassenger']/option[2]";
    locate_checkbox = "(//div[@class='mfInlineError'])[3]/../label/span";
    locate_continue_btn = "//input[@id='primaryButton']";
    locate_baggage_purchase_text = "(//*[@class='personaldata'])[1]/.."

    async clickOnMmbBtn() {
        await page.pause()
        let mmb_btn = page.locator(this.locate_mmb_btn);
        await mmb_btn.click();
        console.log("MMB tab is clicked");
    }

    async performXsb() {
        let bag_btn = page.locator(this.locate_add_bag_btn);
        await bag_btn.click();
        await page.waitForTimeout(5000);
        console.log("add bags button is clicked");

    }

    async selectBaggageForPassengersDynamic(numberofbags) {
        let numberOfPaxCount = await page.$$(this.locate_extra_bag_btn);
        let intnumberofbags = parseInt(numberofbags);

        for (let i = 1; i <= intnumberofbags; i++) {

            for (let j = 1; j <= numberOfPaxCount.length; j++) {
                await page.locator("(//button[@class='stepper plus'])[" + j + "]").click();
                await page.waitForTimeout(5000);
            }
        }
        console.log("added bags for all passengers");
    }


    async selectPersonPaying() {

        let person_paying_dropdown = page.locator(this.locate_who_is_paying_drop_down);
        let checkbox = page.locator(this.locate_checkbox);
        let continue_btn = page.locator(this.locate_continue_btn);

        await person_paying_dropdown.selectOption('2');
        await page.waitForTimeout(5000);
        await checkbox.click();
        await page.waitForTimeout(5000);
        await continue_btn.click();
    }

    async assert_baggage_confirmation() {
        let baggage_purchase_text = page.locator(this.locate_baggage_purchase_text);
        try {
            await baggage_purchase_text.isVisible();
        } catch (error) {
            console.error("[ASSERTION ERROR] Baggage Confirmation: Assert Baggage Confirmation");
        }
    }

    async assertXsbConfirmationPage() {
        await page.waitForTimeout(20000);
        await this.assert_baggage_confirmation();
    }
}
module.exports = xsb;