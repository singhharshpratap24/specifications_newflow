module.exports = {
    FnF: {
        FRIENDS_AND_FAMILY_PAGE_TITLE: "My Family and Friends",
        locate_page_title: ".pageTitle",
        locate_make_fnf_list: ".family-group",
        locate_addNewPersonButton: ".family-and-friends .addTravelCompanion",
        locate_editPersonDetailButton: "//span[contains(text(),'Edit')]/..",
        locate_removePersonButton: "//span[contains(text(),'Remove')]/..",
        locate_confirmRemovalButton: "#modal-content-inner .delete-travel-companion a",
        locate_closeSuccessFullAdditionPopUp: "#modal-content-inner a",
        locate_non_eligible_create_Fnf_list_text: "//*[contains(text(),'cannot')]",
        locate_addCompanionToFnf_list: "#moveTCOptionsList .move-tc",
        locate_paxTitle: "#passengertitleID",
        locate_paxFirstName: "#passengerFirstNameID",
        locate_paxLastName: "#passengerLastNameID",
        locate_paxGender_male: ".address-type-radio-button label:nth-child(1)",
        locate_paxGender_female: ".address-type-radio-button label:nth-child(2)",
        locate_paxEmail: "#emailAddress",
        locate_paxConfirmEmail: "#confirmEmailAddress",
        locate_paxDayofBirth: "#passengerDoBDayID",
        locate_paxMonthofBirth: "#passengerDoBMonthID",
        locate_paxYearofBirth: "#passengerDoBYearID",
        locate_submitButton: "//*[contains(@value,'Submit')]",
        locate_successfullConfirmationMessage: ".content-area .success p",
        locate_newly_addedMember: ".travel-companion .sl_split:nth-child(1)"
    }
}