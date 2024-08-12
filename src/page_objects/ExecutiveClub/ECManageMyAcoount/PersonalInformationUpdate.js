const { expect, assert } = require('chai');
const LOGGER = require('../../../setup/logger');
const MemberHelper = require("../../../Helpers/MemberHelper.json")
const PageElements = require("../../../PageElements/ExecutiveClub/PersonalInformationUpdate.pagelements.js");

class Personal_Info_Update {

    async clickUpdateMyPersonalInfo(){
        await page.locator(PageElements.PersonalInfo.locate_ManageMyAccountlink).click();
        await page.locator(PageElements.PersonalInfo.locate_updateMyPersonalInfolink).click();
    }
    async verifyMoreInformationPOP(){
        await page.locator(PageElements.PersonalInfo.locate_DOB_POP).isVisible();
        LOGGER.info('We need some more information for DOB is Displayed', { classname: 'Personal_Info_Update' })
    }

    async enterMoreInformationDOB() {
        await page.locator(PageElements.PersonalInfo.locate_DOB_birthday).selectOption({value: MemberHelper.TIER_MEMBER.Gold_R.birthday});
        await page.locator(PageElements.PersonalInfo.locate_DOB_birthmonth).selectOption({value: MemberHelper.TIER_MEMBER.Gold_R.birthmonth});
        await page.locator(PageElements.PersonalInfo.locate_DOB_birthyear).fill(MemberHelper.TIER_MEMBER.Gold_R.birthyear);
        await page.locator(PageElements.PersonalInfo.locate_continue_button_For_more_info).click();
    }

    async verifyUpdateMyProfilePage() {
        const isUpdateMyProfile = await page.locator(PageElements.PersonalInfo.locate_update_your_preferences).isVisible();
        assert.isOk(isUpdateMyProfile, "Executive club profile is not visible")
    }

    async clickUpdateYourPreferencesButton() {
        assert.exists(await page.locator(PageElements.PersonalInfo.locate_update_your_preferences).isVisible(), "Update Your Preferences Button is not present");
        await page.locator(PageElements.PersonalInfo.locate_update_your_preferences).click();
    }

    async updateMealRequest() {
        await page.locator(PageElements.PersonalInfo.locate_meal_request_dropdown).selectOption({ value: "VG" });
        await page.locator(PageElements.PersonalInfo.locate_save_preferences).click();
    }

    async verifyUpdateMealRequest() {
        const getMealPreferenceSuccessMessage = await page.locator(PageElements.PersonalInfo.locate_meal_preference_success_message).textContent();
        assert.equal(getMealPreferenceSuccessMessage, PageElements.PersonalInfo.MEAL_PREFERENCE_SUCCESS_MESSAGE, "Meal preference is not updated");
    }

    async deSelectCheckboxForMarketingCommunication() {
        await page.waitForTimeout(1000);
        await page.locator(PageElements.PersonalInfo.locate_emailMarketingCheckbox).click();   
    }

    async saveAndExit() {
        await page.waitForTimeout(1000);
        await page.locator(PageElements.PersonalInfo.locate_saveAndExitButton).click();
    }
    
    async selectUpdatePersonalInfoSidebar() {
        await page.waitForTimeout(1000);
        await page.locator(PageElements.PersonalInfo.locate_personalInfo).click();
    }
    
    async assertEmailCheckboxChecked() {
        await page.waitForTimeout(1000);
        let emailCheckBox = await page.isChecked(PageElements.PersonalInfo.locate_emailMarketingCheckbox);
        assert(!emailCheckBox,"Marketing E-mail checkbox is checked");
    }

    async enterDOB()
    {
       let day_dropdown= await page.locator(PageElements.PersonalInfo.locate_DOB_birthday);
        let month_dropdown= await page.locator(PageElements.PersonalInfo.locate_DOB_birthmonth);
        let year_dropdown= await page.locator(PageElements.PersonalInfo.locate_DOB_birthyear);
        let continue_button= await page.locator(PageElements.PersonalInfo.locate_continue_button_For_more_info);

        await day_dropdown.selectOption({value: MemberHelper.TIER_MEMBER.Gold_R.birthday});
        await month_dropdown.selectOption({value: MemberHelper.TIER_MEMBER.Gold_R.birthmonth});
        await year_dropdown.fill(MemberHelper.TIER_MEMBER.Gold_R.birthyear);
        await continue_button.click();
        await page.waitForTimeout(5000);
    }

    async assertEmailIdAndMobileNumberInContactDetailsSection()
    {
        let verify_emailaddress= await page.locator(PageElements.PersonalInfo.locate_verify_email_address);
        let verify_mobilenumber= await page.locator(PageElements.PersonalInfo.locate_verify_mobile_number);
        await verify_emailaddress.isVisible();
        let emailAddressText =await verify_emailaddress.textContent();
        console.log(emailAddressText);
        await page.waitForTimeout(3000);
        await verify_mobilenumber.isVisible();
        let mobileNumberText= await verify_mobilenumber.textContent();
        console.log(mobileNumberText);

    }
}
module.exports =Personal_Info_Update;