const { expect } = require('chai');
const LOGGER = require('../../../setup/logger');
const myuserdata = require("../../../models/passengerDetails.json");
const PageElements = require("../../../PageElements/ExecutiveClub/FriendsAndFamily.pagelements.js");
class EC_Friends_And_Family {

    async assertFriendsAndFamily() {
        await page.waitForTimeout(5000);
        const title = await page.locator(PageElements.FnF.locate_page_title).textContent();
        expect(title).to.equal(PageElements.FnF.FRIENDS_AND_FAMILY_PAGE_TITLE)
        LOGGER.info('Navigate to Friends And Family Page', { classname: 'EC_Friends_And_Family' });
    }

    async addNewFnFMember() {
        let addNewCompanionToFnf = await page.locator(PageElements.FnF.locate_addNewPersonButton);
        let createFnFList = await page.locator(PageElements.FnF.locate_make_fnf_list);
        let non_eligile_member = await page.locator(PageElements.FnF.locate_non_eligible_create_Fnf_list_text);

        if (await non_eligile_member.isVisible()) {
            console.log("[ERROR] : Only House Hold Member can create FnF List")
        } else if (await addNewCompanionToFnf.isDisabled()) {
            console.log("[ERROR] : House Hold Member can add only 5 Friends or Family Members")
        } else {
            if (await createFnFList.isVisible()) {
                await createFnFList.click();
            } else if (await addNewCompanionToFnf.isVisible()) {
                await addNewCompanionToFnf.click();
            }
            let DOBA = new Date();
            DOBA.setDate(DOBA.getDate());
            let DOBPastDateA = String(DOBA.getDate());
            let DOBPastMonthA = DOBA.toLocaleDateString("default", { month: "long" });
            let DOBPastYearA = String((DOBA.getFullYear() - 24));
            let paxFullName = myuserdata.title + " " + myuserdata.firstName + " " + myuserdata.lastName;
            let paxTitle = await page.locator(PageElements.FnF.locate_paxTitle);
            let paxFirstName = await page.locator(PageElements.FnF.locate_paxFirstName);
            let paxLastName = await page.locator(PageElements.FnF.locate_paxLastName);
            let paxEmail = await page.locator(PageElements.FnF.locate_paxEmail);
            let paxConfirmEmail = await page.locator(PageElements.FnF.locate_paxConfirmEmail);
            let paxDayofBirth = await page.locator(PageElements.FnF.locate_paxDayofBirth);
            let paxMonthofBirth = await page.locator(PageElements.FnF.locate_paxMonthofBirth);
            let paxYearofBirth = await page.locator(PageElements.FnF.locate_paxYearofBirth);

            await page.waitForTimeout(2000);
            await paxTitle.type(myuserdata.title, { delay: 100 });
            await paxFirstName.type(myuserdata.firstName, { delay: 100 });
            await paxLastName.type(myuserdata.lastName, { delay: 100 });
            if (myuserdata.gender == "M") {
                await page.locator(PageElements.FnF.locate_paxGender_male).click();
            } else {
                await page.locator(PageElements.FnF.locate_paxGender_female).click();
            }
            await paxEmail.type(myuserdata.emailAddress, { delay: 100 });
            await paxConfirmEmail.type(myuserdata.emailAddress, { delay: 100 });
            await paxDayofBirth.type(DOBPastDateA, { delay: 100 });
            await paxMonthofBirth.type(DOBPastMonthA, { delay: 100 });
            await paxYearofBirth.type(DOBPastYearA, { delay: 100 });

            await page.locator(PageElements.FnF.locate_submitButton).click();
            await page.waitForTimeout(7000);

            let actualMessage = await page.locator(PageElements.FnF.locate_successfullConfirmationMessage).textContent()
            let expectedMessage = `has been successfully added to your list of Family and Friends. They will receive an email to let them know.`

            expect(String(actualMessage.trim())).includes(String(expectedMessage.trim()))

            await page.locator(PageElements.FnF.locate_closeSuccessFullAdditionPopUp).click();
        }
    }

    async newlyAddedFnFMemberConfirmation() {
        await page.waitForTimeout(5000);
        const paxFullName = myuserdata.title + " " + myuserdata.firstName + " " + myuserdata.lastName;
        const allMembers = await page.$$(PageElements.FnF.locate_newly_addedMember);
        for (let i = allMembers.length - 1; i >= 0; i--) {
            const element = allMembers[i];
            const memberName = await element.textContent();
            if (memberName == paxFullName) {
                console.log(`[INFO] :${paxFullName} is successfully added to FnF List`)
                break;
            }
        }
    }

    async verifyEditButton() {
        await expect(PageElements.FnF.editPersonDetailButton).toBeEditable();
    }

    async verifyRemovingFnFErrorMessage(errorMessage) {
        try {
            await page.locator(PageElements.FnF.removePersonButton).click({ delay: SIMPLE_TIMEOUT });
            await page.locator(PageElements.FnF.confirmRemovalButton).click();

            let earlyFnfRemovalErrorMessage = page.locator(PageElements.FnF.errorMessage)
            await expect(earlyFnfRemovalErrorMessage).to.equal(errorMessage)
        } catch (error) {
            console.error(`An error occurred: ${error.message}`);
        }
    }
}

module.exports = EC_Friends_And_Family;