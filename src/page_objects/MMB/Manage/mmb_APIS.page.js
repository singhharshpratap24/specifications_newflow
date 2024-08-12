const { expect } = require("chai");
//const {expect} = require('expect');

class MMBApis{

    locate_Passenger_Header_Text     = "//*[@class='passenger-header__text']";
    locate_Passenger_Warning_Text    = "(//*[@class='passenger__link__message -notification'])[1]";
    locate_Passenger_Name            = "//*[@class='passenger__link__text']";
    locate_First_Passenger           = "(//a[1]/div[1])[2]";
    locate_Apis_form_page            = "//*[@class='mainHeading']";
    locate_frequent_flyer_link       = "//*[contains(@aria-label,'Add Frequent')]";
    locate_FF_Number_text_field      = "(//*[contains(@id,'ffNumber')])[1]";
    locate_submit_btn                = "//*[@id='submitLayer']";
    locate_success_msg               = "//h3[normalize-space()='Success']";
    locate_return_MMB_Btn            = "//*[@title='Return to MMB']";
    async APISHeaderMsg(HeaderMessage){
 

        let Passenger_Header_Text    = await page.locator(this.locate_Passenger_Header_Text).textContent();

         expect(Passenger_Header_Text).to.equal(HeaderMessage);

    }

    async APISWaringMsg(Warning_Message){
        
        let Passenger_Warning_Text = await page.locator(this.locate_Passenger_Warning_Text).textContent();
        
         expect(Passenger_Warning_Text).to.equal(Warning_Message);

    }

    async APISPassengerName(){
        let Passenger_Name_count   = await page.locator(this.locate_Passenger_Name).all();
        let Passenger_Header_Text    = await page.locator(this.locate_Passenger_Header_Text).textContent();

        console.log(Passenger_Name_count.length);
        if(await Passenger_Header_Text.includes('passenger')){
        expect(Passenger_Name_count.length).to.be.at.least(1);    
        }else if(await Passenger_Header_Text.includes('your')){
            expect(Passenger_Name_count.length).to.eql(1);

        }


    }

    async APISFormPage(){
        
        let First_Passenger  = page.locator(this.locate_First_Passenger);
        let Apis_form_page   = page.locator(this.locate_Apis_form_page);


        await First_Passenger.click();
        if (await Apis_form_page.isVisible()){
            const title = await page.title();
            expect(title).to.equal('Apis Summary');
        }
       

    }

    async AddFrequentFlyer(){
        let frequent_flyer_link     = page.locator(this.locate_frequent_flyer_link);
        let submit_btn              = page.locator(this.locate_submit_btn);
        let success_msg             = page.locator(this.locate_success_msg);
        let return_MMB_Btn          = page.locator(this.locate_return_MMB_Btn);
        let FF_Number_text_field    = page.locator(this.locate_FF_Number_text_field);
        await frequent_flyer_link.click();
        await page.pause();
        // const FF_Number_text_field = await page.$$eval(this.locate_FF_Number_text_field,(elements) => elements.map((element) => element.length));
        // console.log(FF_Number_text_field.length);
        // for (let i=1; i<=FF_Number_text_field.length;i++){
        //     let FF_Number = page.locator("(//*[contains(@id,'ffNumber')])["+i+"]");
        //     await FF_Number.type('00030996',{delay:1000});
        //     if (await success_msg.isVisible()){
        //         break;
        //     }

        // }
        await FF_Number_text_field.type('00030996',{delay:1000});
        await submit_btn.click();
        await success_msg.isVisible();
        await return_MMB_Btn.click();
    }

}
module.exports = MMBApis;