const LOGGER = require('../../../setup/logger');
const { expect } = require('chai');
const myuserdata = require("../../../models/passengerDetails.json");
const PageElements = require("../../../PageElements/ExecutiveClub/TravelCompanion.pagelements.js");

class EC_My_Travel_Companions {

    async assertMytravelCompanionsPage() {
        await page.waitForTimeout(5000);
        const title = await page.locator(PageElements.TravelCompanion.locate_page_tile).textContent();
        expect(title).to.equal(PageElements.TravelCompanion.My_Travel_Companions_Title);
        LOGGER.info('Navigate to My Travel Companions Page', { classname: 'EC_My_Travel_Companions' });
    }

    async addNewPersonName() {
        let disabledAddNewPerson = await page.locator(PageElements.TravelCompanion.locate_add_new_person_button_disable);
        let addNewPerson = await page.locator(PageElements.TravelCompanion.locate_add_new_person_button_enable);
        let travelCompanionDetailsHeading = await page.locator(PageElements.TravelCompanion.locate_Add_travel_companion_details_heading);
        let title = await page.locator(PageElements.TravelCompanion.locate_title);
        let firstName = await page.locator(PageElements.TravelCompanion.locate_firstname);
        let lastname = await page.locator(PageElements.TravelCompanion.locate_lastname);
        let submit = await page.locator(PageElements.TravelCompanion.locate_submit_button);
        
        if (await disabledAddNewPerson.isVisible()) {
            await page.locator(PageElements.TravelCompanion.locate_companion_button).click();
            await page.waitForTimeout(2000);
            await page.locator(PageElements.TravelCompanion.locate_confirm_removal_button).click();
        }
        await addNewPerson.waitFor();
        await addNewPerson.click();
        await travelCompanionDetailsHeading.waitFor();
        await title.type(myuserdata.companiontitle);
        await firstName.type(myuserdata.companionfirstName);
        await lastname.type(myuserdata.companionlastName);
        await submit.click();

    }

    async assertSucessMessage(){
        let successMessage = await page.locator(PageElements.TravelCompanion.locate_success_message)
        await page.waitForTimeout(5000); 
        try{
            await successMessage.isVisible();
            LOGGER.info('User successfully saved to My Travel Companion');
        }
        catch{
            LOGGER.info('User is not added to  My Travel Companion');
        }
    }
}

module.exports = EC_My_Travel_Companions;
