const { assert, expect } = require('chai')
class MMBSeat{
    locate_MMB_seat_Button                        = "//*[@id='marketing_pods']//*[text()= 'Choose seats']";
    locate_choose_seats_button                    = "(//a[normalize-space()='Choose seats'])[1]";
    locate_seat_count                             = "//*[@id='paxTabsWrapper']/div/p/span[contains(@id,'paxName')]";
    locate_confirm_seat_button                    = "//*[@id='confirmSeatsButton']"
    locate_seat_confirmation_validation           = "//*[@class='confirm sl_split']";
    locate_seat_awaiting_validation               = "//*[@class='awaiting-payment sl_split']";
    locate_Summary_Page_Continue_Btn              ="//*[@id='mainContent']/div[1]/div[2]/div/div[1]/div[2]/a"
    locate_Lead_Passenger_payment                 = "//select[@id='leadPassenger']";
    locate_agree_TandC                            = "//span[@class='align-right']";
    locate_summaryPage_continue_Btn               = "//*[@id='seatSummaryBtn']";
    locate_email_id_confirmation                  = "//*[@id='contactableEmail']";
    locate_free_Or_Paid_Seat_text                 = "//*[@class='reserve-seat' or @class='no-price-display']";
    locate_Exit_Seat_Unavilable_popup              = "//div[@class='content-area']//h2[contains(text(),'Exit seat unavailable')]";
    locate_popup_close_Btn                        = "//a[normalize-space()='Close']";




async MMBSeatLinkVerification(){
    let MMB_seat_Button                           = page.locator(this.locate_MMB_seat_Button);
  
    await MMB_seat_Button.waitFor();

    if(await MMB_seat_Button.isVisible()){
        await MMB_seat_Button.click();
    }

}

async MMBSeatSelection(){
    let choose_seats_button                       = page.locator(this.locate_choose_seats_button);
    let confirm_seat_button                       = page.locator(this.locate_confirm_seat_button);
    let Summary_Page_Continue_Btn                 = page.locator(this.locate_Summary_Page_Continue_Btn);
 
    await page.waitForTimeout(5000);
    await choose_seats_button.click();
    await page.waitForTimeout(10000);
    const seat_count = await page.$$eval(this.locate_seat_count,(elements) => elements.map((element) => element.textContent));

        for(let i=1; i<=seat_count.length;i++){
        let pax_choose_seat_button_visible  = page.locator("(//*[contains(@value,'Choose seat')])["+i+"]");
        let select_available_seat           = page.locator("(//*[contains(@class,'seatRow')]//*[@class='seat available' or contains(@data-seattype,'GeneralSeat' ) ])["+i+"]");

        await pax_choose_seat_button_visible.isVisible();

        if(await select_available_seat.isEnabled()){
            await select_available_seat.click();
        }
        
    }
    await confirm_seat_button.click();
    await page.waitForTimeout(10000);
    const seat_confirmation_proof = await page.$$eval(this.locate_seat_confirmation_validation,(elements) => elements.map((element) => element.textContent));
    const seat_awaiting_proof = await page.$$eval(this.locate_seat_awaiting_validation,(elements) => elements.map((element) => element.textContent));
    try{
        for(let i=1; i<=seat_confirmation_proof.length;i++){
            let seat_selection_confirmation     = page.locator("(//*[@class='confirm sl_split'])["+i+"]");
    
            await seat_selection_confirmation.isVisible();
    
        }
    }catch(error){
        for(let i=1; i<=seat_awaiting_proof.length;i++){
            let seat_awaiting_payment     = page.locator("(//*[@class='awaiting-payment sl_split'])["+i+"]");
    
            await seat_awaiting_payment.isVisible();
    
        }
    }

    if (await Summary_Page_Continue_Btn.isVisible()){
        await Summary_Page_Continue_Btn.click();
        await page.waitForTimeout(10000);
    }

}

    async SummaryPageT_C(){
        let Lead_Passenger_payment    = page.locator(this.locate_Lead_Passenger_payment);
        let agree_TandC               = page.locator(this.locate_agree_TandC);
        let summaryPage_continue_Btn  = page.locator(this.locate_summaryPage_continue_Btn);
        let email_id_confirmation     = page.locator(this.locate_email_id_confirmation);
     if(await Lead_Passenger_payment.isVisible()){
        await Lead_Passenger_payment.selectOption({value:'2'});
        await email_id_confirmation.waitFor();
        await agree_TandC.check();
        await summaryPage_continue_Btn.click();
     }
        
    }

    async ValidateFreeSeatText(){
        let free_Or_Paid_Seat_text = await page.locator(this.locate_free_Or_Paid_Seat_text).all();
        for(let i=1; i<=free_Or_Paid_Seat_text.length;i++){
            let freeSeat_text = await page.locator("(//*[@class='reserve-seat' or @class='no-price-display'])["+i+"]").textContent();
            expect(freeSeat_text).to.contain('free');
    
        }
        
       
    }

    async ValidatePaidSeatText(){
        let free_Or_Paid_Seat_text = await page.locator(this.locate_free_Or_Paid_Seat_text).all();
        for(let i=1; i<=free_Or_Paid_Seat_text.length;i++){
            let PaidSeat_text = await page.locator("(//*[@class='reserve-seat' or @class='no-price-display'])["+i+"]").textContent();
            expect(PaidSeat_text).to.contain('pay');
        }
    }

    async AdultandChildExitSeat(){
        let choose_seats_button                       = page.locator(this.locate_choose_seats_button);
        let popup_close_Btn                           = page.locator(this.locate_popup_close_Btn);

        await page.waitForTimeout(5000);
        await choose_seats_button.click();
        await page.waitForTimeout(10000);
        const seat_count = await page.$$eval(this.locate_seat_count,(elements) => elements.map((element) => element.textContent));
        for(let i=1; i<=seat_count.length;i++){

            let pax_choose_seat_button_visible  = page.locator("(//*[contains(@value,'Choose seat')])["+i+"]");
            let select_available_seat           = page.locator("(//*[contains(@data-type,'Exit') and contains(@class,'seat available')])["+i+"]");
    
            await pax_choose_seat_button_visible.isVisible();
            try{
                if(await select_available_seat.isEnabled()){
                    await select_available_seat.click();
                }
                await this.SeatUnavilablePopUp();
                await popup_close_Btn.click();
            }catch(error){
                console.error("Exit Seat is not available");
            }

        }
    }

    async AdultandInfantExitSeat(){

        await this.AdultandChildExitSeat();
    }

    async SeatUnavilablePopUp(){
        let Exit_Seat_Unavilable_popup  = await page.locator(this.locate_Exit_Seat_Unavilable_popup).textContent();
        await page.waitForTimeout(5000);
        expect(Exit_Seat_Unavilable_popup).to.contain('unavailable');
    }

    async AdultandYAExitSeat(){
        let choose_seats_button                       = page.locator(this.locate_choose_seats_button);

        await page.waitForTimeout(5000);
        await choose_seats_button.click();
        await page.waitForTimeout(10000);
        const seat_count = await page.$$eval(this.locate_seat_count,(elements) => elements.map((element) => element.textContent));
        for(let i=1; i<=seat_count.length;i++){

            let pax_choose_seat_button_visible  = page.locator("(//*[contains(@value,'Choose seat')])["+i+"]");
            let select_available_seat           = page.locator("(//*[contains(@data-type,'Exit') and contains(@class,'seat available')])["+i+"]");
    
            await pax_choose_seat_button_visible.isVisible();
            try{
                if(await select_available_seat.isEnabled()){
                    await select_available_seat.click();
                }

            }catch(error){
                console.error("Exit Seat is not available");
            }

        }
        }
}
module.exports=MMBSeat;