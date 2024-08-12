
module.exports = {

  homePage: {
  locate_accept_cookies: "//*[@id='ensAcceptAll']",
  locate_booking_section : "//*[contains(text(),'searching for')]",
  locate_fare_label :"//*[@class='sc-ba-select sc-ba-select-s']/span[1]",
  locate_from_label : 'ba-input-typeahead#location-selection-origin > div > label',
  locate_to_label : 'ba-input-typeahead#location-selection-destination > div > label',
  locate_depart_date_label : 'ba-grid > ba-input-datepicker > fieldset >legend',
  locate_passengers_label : 'Passengers 1 adult',
  locate_return_date_label :'ba-grid > div >  ba-input-datepicker > fieldset >legend',
  locate_links :'ba-grid > ba-content >p.ba-c-content__small-print',
  locate_home_page_tabs: "ba-header-section .nav-section__title",
  locate_booking_reference_field :'(//*[@id="bookingRef"])[1]',
  locate_last_Name_field :'(//*[@id="lastname"])[1]',
  locate_find_my_booking :'.dual-form-button-mmb',
  locate_join_the_club_link: "(//a[@role='listitem'][normalize-space()='Join the Club'])[2]"
}

}







