module.exports = {
    ECommercialPassenger: {
        locate_adult_count: "//*[contains(@class,'passenger-heading-id heading-sm')]",
        locate_EC_Member_Adult_1_detail: "(//span[text()='Select a passenger'])[1]",
        locate_phone_number: "//span[text()='Phone number']/../following-sibling::input",
        locate_continue_button: "//*[@class='pax-continue button expand-full button-solid hydrated']",
        locate_payment_Agree_and_Pay: "(//*[contains(text(),'Agree and pay now')])[1]",
        locate_gender: "(//span[text()='Gender on passport ']/../following-sibling::select)[1]",
        locate_email_address: "//*[contains(text(),'Email address')]/../following-sibling::input",
        locate_pax_title_hold_booking : "#ba-select-2"
    }
}