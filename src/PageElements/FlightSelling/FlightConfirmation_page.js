module.exports = {

    flightConfirmation: {
    locate_PNR_number_Text           :"(//*[@id='booking-ref'])/following::p[1]",
    locate_Passenger_count_text      : "//*[contains(@id,  'passengers-amount')]",
    locate_total_price               : "//*[contains(text(),  'Total')]",
    locate_flight_details            :"//*[contains(@aria-label,  'Flight Details')]/following::ba-accordion",
    locate_Manage_My_booking_button  : "(//*[contains(@aria-label,  'Further Options')])/div/app-confirmation-actions/ba-button[1]",
    locate_Print_button              : "(//*[contains(@aria-label,  'Further Options')])/div/app-confirmation-actions/ba-button[2]",
    locate_HBFF_PayCompleteButton    : "//*[contains(text(),'Pay and complete booking')]",
    locate_hold_booking_cancellation_message :"//*[contains(text(),'been cancelled')]",
    locate_hold_booking_confirmation_title : "(//*[text()='Confirmation'])[1]",
    locate_hold_booking_confirmation_heading : "//*[contains(text(),'confirmation')][1]/../../h1", 
    locate_hold_booking_refund : "#refund-deposit-separately"
    }
}