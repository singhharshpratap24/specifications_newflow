module.exports = {
    HHA: {
        HOUSE_HOLD_ACCOUNT_PAGE_TITLE: "My Household Account",
        locate_page_title: ".pageTitle",
        locate_manage_my_houseHold_account: ".manage-my-hha-button a",
        locate_create_my_houseHold_account: ".household-button a",
        locate_add_new_member: ".additional-main-container .add-member",
        locate_nominating_ec_member: ".mem-nom-option:first-child",
        locate_nominating_non_ec_member: ".mem-nom-option:last-child",
        locate_email_address_field: "//*[contains(text(),'Email')]/following-sibling::div/input",
        locate_confirm_email_address_field: "//*[contains(text(),'Confirm email')]/following-sibling::div/input",
        locate_first_name_field: "//*[contains(text(),'First name')]/following-sibling::div/input",
        locate_last_name_field: "(//*[contains(text(),'Last name')]/following-sibling::div/input)[2]",
        locate_terms_and_condition: "[for='termsConfirm'] span strong",
        locate_submit_button: "#submit",
        locate_create_house_hold_account: "#submitButtonCreate",
        locate_add_meber_to_houseHoldAccount: "#submitButtonAddMember",
        locate_view_hha_account_button: "//a[contains(text(),'View Household Account')]",
        locate_already_register_member_error: ".error-message-content > p",
        locate_hha_creation_successfull_message: ".message.success > h3",
        locate_member_addition_successfull_message: ".message.success > h3",
        locate_confirm_member_email: ".member-details .personaldata",
        locate_confirm_member_name: ".table-body .personaldata:first-child"
    }
}