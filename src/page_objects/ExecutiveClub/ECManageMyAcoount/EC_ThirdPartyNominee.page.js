const { expect } = require('chai');
const LOGGER = require('../../../setup/logger');
const myuserdata = require("../../../models/passengerDetails.json");
const PageElements = require("../../../PageElements/ExecutiveClub/ThirdPartyNominee.pagelements.js");
class EC_ThirdPartyNominee {

    async assertThirdPartyNominee() {
        await page.waitForTimeout(10000);
        let page_title=await page.locator(PageElements.ThirdPartyNominee.locate_page_title).textContent();
        
         let pagetitle= await page.title();
         console.log(pagetitle);
         
         expect(pagetitle).to.equal(page_title);
    }

    async addThirdPartyNominee() {
            let nomineeTitle = page.locator(PageElements.ThirdPartyNominee.locate_nomineeTitle);
            let nomineeFirstName = page.locator(PageElements.ThirdPartyNominee.locate_nomineeFirstName);
            let nomineeLastName = page.locator(PageElements.ThirdPartyNominee.locate_nomineeLastName);
            let nomineePassword = page.locator(PageElements.ThirdPartyNominee.locate_nomineePassword);
            let nomineeConfirmPassword = page.locator(PageElements.ThirdPartyNominee.locate_nomineeConfirmPassword);
            
            await page.locator(PageElements.ThirdPartyNominee.locate_add_third_party_nominee).click();
            await page.waitForTimeout(2000);
            await nomineeTitle.type(myuserdata.title, { delay: 100 });
            await nomineeFirstName.type(myuserdata.firstName, { delay: 100 });
            await nomineeLastName.type(myuserdata.lastName, { delay: 100 });
            
            await page.locator(PageElements.ThirdPartyNominee.locate_nominee_male).click();
            
            await nomineePassword.type(myuserdata.password, { delay: 100 });
            await nomineeConfirmPassword.type(myuserdata.password, { delay: 100 });
            await page.locator(PageElements.ThirdPartyNominee.locate_terms_and_conditions_checkbox).click(); 
            await page.locator(PageElements.ThirdPartyNominee.locate_submitButton).click();
            await page.waitForTimeout(7000);

    }

    async assertConfirmationMessagetoAddThirdPartyNominee(){
        let nomineeFullName = myuserdata.title + " " + myuserdata.firstName + " " + myuserdata.lastName;
        let actualMessage = await page.locator(PageElements.ThirdPartyNominee.locate_successfullConfirmationMessage).textContent()
        let expectedMessage = `CongratulationsYou have successfully added ${nomineeFullName} as a third party nominee to manage your Executive Club account on your behalf.`

        expect(actualMessage.trim()).to.equal(expectedMessage.trim())

        await page.locator(PageElements.ThirdPartyNominee.locate_closeSuccessFullAdditionPopUp).click();
    }
           
        
    }

    
module.exports = EC_ThirdPartyNominee;