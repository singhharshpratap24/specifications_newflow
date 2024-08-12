const HoldBookingElements = require('../../../PageElements/FlightSelling/HoldBooking_page');
class MmbOperation{


   clickEdit="div[class='cell small-4 medium-2 contact-details__link__edit'] span"
   InputBoxContactNumber="#PhoneNo-1"
   clickContinueBtn="#continueButton"
   PayandCompleteBooking= "(//*[text()='Pay and complete booking'])[1]"

// this method will use to add/edit  contact detail on MMB
  
   async addContactNumber(){
 
    await page.locator(this.clickEdit).click();
    await page.waitForTimeout(40000);
  await page.locator(this.InputBoxContactNumber).fill(' ');//clear the existing text
   await page.locator(this.InputBoxContactNumber).fill('9689891256');
    await page.locator(this.clickContinueBtn).click();
   
   }
   async  verifyLinks(page, linkSelector) {
      try {
        
        const links = await page.$$(linkSelector);
    
        for (const link of links) {
         
          const href = await link.getAttribute('href');
    
          if (href && href.trim() !== '') {
            console.log(`Link is valid. Href: ${href}`);
          } else {
            console.error('Link is empty or undefined.');
          }
        }
        console.log('Link successful validated.');
      } catch (error) {
        console.error(`Error verifying links: ${error}`);
      }
    }
    async assert_PayandCompleteBooking_Link(PayandCompleteBooking) {
      page.waitForTimeout(10000);
      let PayAndCompleteBookingText = await page.locator(this.PayandCompleteBooking).textContent();
      try{
        await PayAndCompleteBookingText.includes(PayandCompleteBooking);
      }
      catch(error){
        console.error("[ASSERTION ERROR] Pay And Complete Booking text is not Visible");
      }
    }

    async clickOnPayAndCompleteHoldBooking(){
      page.waitForTimeout(20000);
      let PayAndCompleteBooking = await page.locator(this.PayandCompleteBooking);
      await PayAndCompleteBooking.waitFor(); 
      await PayAndCompleteBooking.click();
      console.log("Pay and complete held booking clicked");
    }
}
module.exports = MmbOperation;