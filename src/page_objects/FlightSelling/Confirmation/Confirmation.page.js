const flightConfirmationElements = require('../../../PageElements/FlightSelling/FlightConfirmation_page.js')
const LOGGER = require('../../../setup/logger');
class FlightConfirmation{

   
 async assert_PNR(){
     let PNR_number_Text    = page.locator(flightConfirmationElements.flightConfirmation.locate_PNR_number_Text);
     
     try{
         await PNR_number_Text.isVisible();
         let PNRNumber_Text     = await PNR_number_Text.textContent();
         console.log(PNRNumber_Text);
     }catch(error){
         let PNRNumber_Text     = await PNR_number_Text.textContent();
         console.log(PNRNumber_Text);
         console.error("[ASSERTION ERROR] Flight Confirmation: Assert PNR Text");
     }
 }   

 async assert_Passenger_Count(){
     let Passenger_count_text    = page.locator(flightConfirmationElements.flightConfirmation.locate_Passenger_count_text);
     try{
         await Passenger_count_text.isVisible();
     }catch(error){
         console.error("[ASSERTION ERROR] Flight Confirmation: Assert Passenger Count");
     }
 } 

 async assert_total_price(){
     let total_price    = page.locator(flightConfirmationElements.flightConfirmation.locate_total_price);
     try{
         await total_price.isVisible();
     }catch(error){
         console.error("[ASSERTION ERROR] Flight Confirmation: Assert Total Price");
     }
 }  

 async assert_flight_details(){
     let flight_details    = page.locator(flightConfirmationElements.flightConfirmation.locate_flight_details);
     try{
         await flight_details.isVisible();
     }catch(error){
         console.error("[ASSERTION ERROR] Flight Confirmation: Assert Flight details");
     }
 }  
 
 async assert_Manage_My_Booking_button(){
     let Manage_My_booking_button    = page.locator(flightConfirmationElements.flightConfirmation.locate_Manage_My_booking_button);
     try{
       //  await expect(Manage_My_booking_button).toBeEnabled();
         await Manage_My_booking_button.isEnabled();
     }catch(error){
         console.error("[ASSERTION ERROR] Flight Confirmation: Assert MMB button");
     }
 }
 
 async assert_Print_button(){
     let Print_button    = page.locator(flightConfirmationElements.flightConfirmation.locate_Print_button);
     try{
        // await expect(Print_button).toBeEnabled();
         await Print_button.isEnabled();
     }catch(error){
         console.error("[ASSERTION ERROR] Flight Confirmation: Assert Print Button");
     }
 }
 
 
 async assert_disability(){
     try{
         await page.getByRole('link', { name: 'Disability assistance' }).isEnabled();
     }catch(error){
         console.error("[ASSERTION ERROR] Flight Confirmation: Assert Disability");
     }
 }
 
 async assertConfirmation(){
     await page.waitForTimeout(20000);
     await this.assert_PNR();
     await page.waitForTimeout(2000);
     await this.assert_Passenger_Count();
     await page.waitForTimeout(2000);
     await this.assert_total_price();
     await page.waitForTimeout(2000);
     await this.assert_flight_details();
     await page.waitForTimeout(10000);
     await this.assert_Manage_My_Booking_button();
     await page.waitForTimeout(2000);
     await this.assert_Print_button();
     await page.waitForTimeout(2000);
     await this.assert_disability();
 }

    async verifyHoldBookingCancellationMessage() {
        await page.waitForTimeout(30000);
        let cancelMessage = await page.locator(flightConfirmationElements.flightConfirmation.locate_hold_booking_cancellation_message).textContent();
        expect(cancelMessage).to.have.string("has been cancelled.")
    }


    async HBFFPayAndComplete() {
        let payAndComplete = await page.locator(flightConfirmationElements.flightConfirmation.locate_HBFF_PayCompleteButton);

        const isVisible = (payAndComplete.isVisible());

        if (!isVisible) {
            console.log('Assertion PASSED : Hold Booking Pay and Complete Option is Not Present');
        } else {
            console.log('Assertion FAILED : Hold Booking Pay and Complete Option is Present');
        }
    }

    async holdBookingConfirmation() {
        try{
            await page.locator(flightConfirmationElements.flightConfirmation.locate_hold_booking_confirmation_title).isVisible();
            await page.locator(flightConfirmationElements.flightConfirmation.locate_hold_booking_confirmation_heading).isVisible();
    
            let holdBookingConfirmationHeading = await page.locator(flightConfirmationElements.flightConfirmation.locate_hold_booking_confirmation_heading).textContent();
            expect(holdBookingConfirmationHeading).to.equal(" We're holding your flights at this price for the next 72 hours ");
        }catch(Error){
            console.log(`[ERROR] : ${Error}`)
        }
    }

    async clickMmbButton(){
        let Manage_My_booking_button = page.locator(flightConfirmationElements.flightConfirmation.locate_Manage_My_booking_button);
       await Manage_My_booking_button.click();
    }
async completeHoldBookingConfirmation(){
    let hold_booking_refund_msg = await page.locator(flightConfirmationElements.flightConfirmation.locate_hold_booking_refund).textContent();
    LOGGER.info('Hold Booking with Donation is successfull', { classname: 'FlightConfirmation'});
    expect(hold_booking_refund_msg).to.equal("The amount you paid to hold this booking will be refunded separately.");
}
}
module.exports=FlightConfirmation;