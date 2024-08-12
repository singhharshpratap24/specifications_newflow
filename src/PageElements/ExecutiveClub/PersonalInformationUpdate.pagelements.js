module.exports = {
    PersonalInfo: {
        locate_ManageMyAccountlink: "//div[contains(text(),'Manage my account')]",
        locate_updateMyPersonalInfolink: "//a[normalize-space()='Update my personal information']",
        locate_DOB_POP: "//form[@name='maxpax-form']",
        locate_DOB_birthday: "[id='birthday']",
        locate_DOB_birthmonth: "[id='birthmonth']",
        locate_DOB_birthyear: "[id='form-birthYear']",
        locate_continue_button_For_more_info: "[name='Continue']",
        locate_your_preferences: "[id='preferencesTitle']",
        locate_update_your_preferences: "[id='editPrefs']",
        locate_meal_request_dropdown: "select#form-mealRequest",
        locate_save_preferences: "[id='savePrefs']",
        locate_meal_preference_success_message: "div#updateSuccessMessage > h3",
        locate_emailMarketingCheckbox: "#contactEmailLabel  span",
        locate_saveAndExitButton: "#saveMarketing span",
        locate_personalInfo: "//a[contains(text(),'Update personal information')]",
        MEAL_PREFERENCE_SUCCESS_MESSAGE: "Your preferences have been updated.",
        locate_verify_email_address: "//label[text()='Email address']/following-sibling::div",
        locate_verify_mobile_number: "//label[contains(text(),'Mobile')]/../following-sibling::div",
    }
}