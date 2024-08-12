class PaidSeat_Confirmation{

    locate_confirmation_text                      ="//h2[normalize-space()='Your seat confirmation']";
    locate_seat_confirmation_validation           = "//*[@class='confirm-seat sl_split']";


    async MMBPaidSeatPaymentConfirmation(){
      //  await page.waitForTimeout(120000);
        let confirmation_text = page.locator(this.locate_confirmation_text);
        await confirmation_text.waitFor();
       if(await confirmation_text.isVisible()){
        const seat_confirmation_proof = await page.$$eval(this.locate_seat_confirmation_validation,(elements) => elements.map((element) => element.textContent));        
        for(let i=1; i<=seat_confirmation_proof.length;i++){
            let seat_selection_confirmation     = page.locator("(//*[@class='confirm-seat sl_split'])["+i+"]");
    
            await seat_selection_confirmation.isVisible();
    
        }
       } 
        
    }
}
module.exports=PaidSeat_Confirmation;