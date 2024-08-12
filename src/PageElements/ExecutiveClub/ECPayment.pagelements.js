module.exports = {
    ECPayment: {
        locate_country_dropdown: "#BillingCountry",
        locate_use_new_card_radio_btn: "//*[text()='Use a new card']",
        locate_text_box_card_number: "//iframe[starts-with(@id, 'securefields') and (@title='Credit Card') ]",
        locate_text_box_CVV: "//iframe[starts-with(@id, 'securefields') and @title='CVV' ]",
        locate_text_Card_month_expiry: "//select[@aria-label='Expiry date month']",
        locate_text_Card_Year_expiry: "//select[@aria-label='Expiry date year']",
        locate_text_address1: "//input[@id='AddressLine1']",
        locate_text_address2: "//input[@id='AddressLine2']",
        locate_text_address3: "//input[@id='AddressLine3']",
        locate_text_postal_code: "//input[@id='PostalCode']",
        locate_agree_pay_btn: "//input[@title='Make booking']",
        locate_cardType_logo: "//div[@id='pci-card-image']",
        locate_name_on_card: ".uppercase"
    }
}