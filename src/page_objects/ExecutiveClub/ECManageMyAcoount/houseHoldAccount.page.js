const LOGGER = require('../../../setup/logger');
const myuserdata = require("../../../models/passengerDetails.json");
const PageElements = require("../../../PageElements/ExecutiveClub/HouseHoldAccount.pagelements.js");
const Email_Generator = require("../../../Helpers/email_generator.js");

const obj_EmailGen = new Email_Generator;

class HouseHoldAccount {

    async assertHHAPage() {
        await page.waitForTimeout(5000);
        const title = await page.locator(PageElements.HHA.locate_page_title).textContent();
        expect(title).to.equal(PageElements.HHA.HOUSE_HOLD_ACCOUNT_PAGE_TITLE)
        LOGGER.info('Navigate to House Hold Account Page', { classname: 'HouseHoldAccount' });
    }

    async addNonECMemberToHHA() {
        let addNewMember = await page.locator(PageElements.HHA.locate_add_new_member);
        let create_my_HHA_Account = await page.locator(PageElements.HHA.locate_create_my_houseHold_account);
        let manage_my_HHA_Account = await page.locator(PageElements.HHA.locate_manage_my_houseHold_account);
        let nominate_Non_EC_member = await page.locator(PageElements.HHA.locate_nominating_non_ec_member);
        let email_address = await page.locator(PageElements.HHA.locate_email_address_field);
        let confirm_email_address = await page.locator(PageElements.HHA.locate_confirm_email_address_field);
        let firstName = await page.locator(PageElements.HHA.locate_first_name_field);
        let lastName = await page.locator(PageElements.HHA.locate_last_name_field);
        let termsAndCondition = await page.locator(PageElements.HHA.locate_terms_and_condition);
        let submitButton = await page.locator(PageElements.HHA.locate_submit_button);

        const emailAddress = await obj_EmailGen.generateEmail();
        if (await create_my_HHA_Account.isVisible()) {
            await create_my_HHA_Account.click();
        } else {
            await manage_my_HHA_Account.click();
            await page.waitForTimeout(3000);
            await addNewMember.click();
        }

        await page.waitForTimeout(3000);
        await nominate_Non_EC_member.click();

        await email_address.type(emailAddress, { delay: 100 });
        await confirm_email_address.type(emailAddress, { delay: 100 });
        await firstName.type(myuserdata.firstName, { delay: 100 });
        await lastName.type(myuserdata.lastName, { delay: 100 });

        await termsAndCondition.click();
        await submitButton.click();
    }

    async selectAddToHAAccount() {
        await page.waitForTimeout(5000);
        let createHHA = await page.locator(PageElements.HHA.locate_create_house_hold_account);
        let addMembersToHHA = await page.locator(PageElements.HHA.locate_add_meber_to_houseHoldAccount);

        let already_register_member_error_text = await page.locator(PageElements.HHA.locate_already_register_member_error);
        let houseHold_account_creation_successfull = await page.locator(PageElements.HHA.locate_hha_creation_successfull_message);
        let memeber_addtion_successfull = await page.locator(PageElements.HHA.locate_member_addition_successfull_message);
        
        if (await createHHA.isVisible()) {
            await createHHA.click();
        } else {
            await addMembersToHHA.click();
        }

        await page.waitForTimeout(3000);
        if (await already_register_member_error_text.isVisible()) {
            console.log("[ERROR] : The person you have invited is already registered with the Executive Club ")
        }else{            
            let memeber_addtion_successfull_text = await memeber_addtion_successfull.textContent();
            expect(memeber_addtion_successfull_text).to.equal("Thank you for adding a member to your Household Account.")
        }
    }

    async selectViewHHAAccount() {
        await page.waitForTimeout(5000);
        const viewHHAaccount = await page.locator(PageElements.HHA.locate_view_hha_account_button);
        await viewHHAaccount.click();
    }

    async verifyNewMemberDetails() {
        await page.waitForTimeout(5000);
        const new_member_email = await page.$$(PageElements.HHA.locate_confirm_member_email);
        const new_member_name = await page.$$(PageElements.HHA.locate_confirm_member_name);

        const paxFullName = myuserdata.firstName + " " + myuserdata.lastName;
        const paxEmailAddress = myuserdata.emailAddress;


        for (let i = 0; i < new_member_email.length; i++) {
            const element = new_member_email[i];
            const memberEmail = await element.textContent();
            if (memberEmail == paxEmailAddress) {
                console.log(`[INFO] :${paxEmailAddress} for new member is successfully added to House Hold Account`)
                break;
            }
        }

        for (let i = 0; i < new_member_name.length; i++) {
            const element = new_member_name[i];
            const memberName = await element.textContent();
            if (memberName == paxFullName) {
                console.log(`[INFO] :${paxFullName} for new member is successfully added to House Hold Account`)
                break;
            }
        }
    }
}
module.exports = HouseHoldAccount