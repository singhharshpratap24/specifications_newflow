module.exports = {


    flightSelection:{
        locate_direct_flight_text : "//span[text()='Direct flights']",
        locate_connecting_flight_text : "//span[text()='Connecting flights']",
        //span[normalize-space():'Connecting flights'],
        locate_select_btn :"(//button[@aria-label='Close expanded flight']/..//ba-button)[1]",
       // locate_select_btn : "/html/body/app-root/main/app-flight-list/ba-page-segment/div/app-flight-list-results/div/div/div/div[1]/app-flight-original/div/lib-ba-drawer/div/app-flight-card-original[1]/div/div/ba-button",
        locate_outbound_flight_list : "//p[text()=' Flight 1 of 2 ']",
        locate_outbound_flight_list_oneway : "//p[text()= ' Flight 1 of 1 ']",
        locate_inbound_flight_list : "//p[text()=' Flight 2 of 2 ']",
        locate_flightSummary_from_to : "//*[@class='ng-star-inserted']/div/ba-content",
        locate_flightSummary_from : "(//span[@class='from-city-name' ])[2]",
        locate_flightSummary_to : "(//span[@class='to-city-name'])[2]",
        locate_Tax_fee_charges_link : "(//a[@class='primary-blue'])[1]",
        //to select the discover link from home page and cheapest fare flight link
        locate_DiscoverLink : ".nav-section__title-wrapper",
        locate_CheapestFlightLink : "//a[normalize-space()='Find our cheapest flights']",
        locate_CheapestFareQuotePage : "//h1[contains(text(),'Our cheapest fares from')]",
        //to change the country of resident
        locate_Country_of_Resident_link : ".country-selector",
        locate_Region_Country_DropDown : "//select[@id='countrycode']",
        locate_Change_Region_Btn : "//input[@value='Change']",
        locate_Cheapest_Destination_table : "//table[@class='clearfix tabPanelTable ']",
        locate_NumberOfNightsDrpDwn : "//select[@id='nightsFilter']",
        locate_To_Destination_Search_TextBx : "//input[@id='toFilter']",
        locate_CheapestFare_Cabin : "//select[@id='cabinFilter']",
        locator_connection_different_operator : ".flight-details > span:first-child > span:last-child",
        locate_UI_Operator: "(//*[text()=' Flight Details ']/../preceding-sibling::span//span/span)[1]",
        locate_flight_selection_close_btn: "//*[@aria-label='Close expanded flight'][1]",
        locate_CountryDrpDwn:"//select[@id='countrycode']",
        locate_Language:"//select[@id='languagecode']",
        locate_edit_search_button : "[data-qa=edit-search] .details__summary",
        locate_edit_search_popUp : ".search-bar form",
        locate_edit_search_total_pax:"#ba-form-group-dropdown-0-button > span > span"
    }

}