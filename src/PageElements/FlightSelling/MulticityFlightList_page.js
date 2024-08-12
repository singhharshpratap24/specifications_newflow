module.exports = {


    multicityflightlist:{

  locate_multicity_flight_list_page : "app-flight-list-results",
  locate_search_summary_card : "[class^='search-summary-card']",
  locate_flight_list_results : 'app-flight-list-results',
  locate_flight_options :"[id^='flight']",
  locate_first_flight_cabin : "//*[@id='flight_0']/div[2]/div[1]//button",
  locate_flight_number : "[class^='flight-highlight-flight-number']",
  locate_select_button : "(//button[@aria-label='Close expanded flight']/..//ba-button)[1]",
  locate_british_airways_flight : "//*[text()=' British Airways ']",
  locate_flight_price_on_flight_list_page :"(//span[contains(text(),'£')])[1]",
  locate_direct_flights_list : "//*[text()='Direct flights']/../../../div[1]/div",
  locate_connecting_flights_list : "//*[text()='Connecting flights']/../../../div[2]/div",
  locate_current_selected_date : "(//*[contains(text(),'Calendar ')]/following-sibling::div//li[5]//span[1])[1]",
  locate_previous_week_btn : "//*[@aria-label='Previous week']",
  locate_next_week_btn :"//*[@aria-label='Next week']",
  locate_sevenDayCalender : "//*[@class='calendar']",
  locate_flight_details_option : "(//*[contains(text(),' Flight Details ')])[1]",
    }
}