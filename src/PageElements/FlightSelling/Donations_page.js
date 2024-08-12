module.exports = {


    donations:{
    BA_BETTER_WORLD_MESSAGE :" Support BA Better World Community Fund improving communities in the UK and overseas with projects that benefit education, employment, nature and climate. ",
    locate_donations_pod : "[class^='donation'] > ba-content",
    locate_donations_heading_content : "[id='better-world-content']",
    locate_no_thanks_radio_button :"[id='no-donation']",
    locate_radio_buttons : "[name='donation'] > label",
    locate_radio_button_donation : "[value='2']",
    locate_donation_text : "(//*[contains(text(),'Total cost')])[1]",
    locate_total_fare_before_donation : "[class='payment-total'] > ba-content > span",
    locate_final_payment : "//*[contains(text(),'TOTAL')]/..//h2",
    locate_charity_donation_text :"//*[contains(text(),'Charity donation')]/following-sibling::div",
    locate_Better_World_donation_text :"(//*[contains(text(),'Total cost')])[1]/span"
    }
}