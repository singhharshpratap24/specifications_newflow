const { expect } = require("chai");
const CSVReader = require('../../../Helpers/csv_read');
const csvReader = new CSVReader();

class EC_Login_Avios_Seat_Booking{
    locate_view_all_booking_link = "//*[text()=' View all bookings ']";
    locate_view_all_booking_click = 'View all bookings'
    locate_all_PNR_text          = "//*[@class='booking-value personaldata']";
    locate_account_holder_name                   = "span.login";
    locate_add_booking_text_field  = "//*[@id='idBookingRef']";
    locate_add_booking_submit_Btn  = "//*[@id='idManageBookingSubmit']";





    async ECLoginSelectMMB(){
        let view_all_booking_link = page.locator(this.locate_view_all_booking_link);
        let account_holder_name   = page.locator(this.locate_account_holder_name);

        await account_holder_name.click({ timeout: 60000 });
        await view_all_booking_link.waitFor();
      //  await view_all_booking_link.click();
        await page.getByRole('link', { name: this.locate_view_all_booking_click }).click();

       // let all_PNR_text          = await page.locator(this.locate_all_PNR_text).all();

        const all_PNR_text = await page.$$eval(this.locate_all_PNR_text,(elements) => elements.map((element) => element.textContent));
        console.log("PNR Total Count"+all_PNR_text.length);

        for(let i=1; i<=all_PNR_text.length; i++){

            let PNR_text = await page.locator("(//*[@class='booking-value personaldata'])["+i+"]").textContent();
            let MMB_button        = page.locator("(//*[@class='button-submit'])["+i+"]");


            const [PNR, lastName] = await csvReader.getPNRName('ECMemberAVIOSSeatBooing');
            if(PNR_text===PNR){
                await MMB_button.click();
                break;
            }
        }

    }


    async ECLoginAddBookingandSelectMMB(){
        let view_all_booking_link = page.locator(this.locate_view_all_booking_link);
        let account_holder_name   = page.locator(this.locate_account_holder_name);
        let add_booking_text_field = page.locator(this.locate_add_booking_text_field);
        let add_booking_submit_Btn = page.locator(this.locate_add_booking_submit_Btn);

        const [PNR, lastName] = await csvReader.getPNRName('ECMemberAVIOSAddBooingSeat');

        await account_holder_name.click({ timeout: 60000 });
        await page.pause();
        await view_all_booking_link.waitFor();
        await page.getByRole('link', { name: this.locate_view_all_booking_click }).click();
        await add_booking_text_field.waitFor();
        await add_booking_text_field.type(PNR,{delay:1000});
        await add_booking_submit_Btn.click();
        const all_PNR_text = await page.$$eval(this.locate_all_PNR_text,(elements) => elements.map((element) => element.textContent));
        console.log("PNR Total Count"+all_PNR_text.length);

        for(let i=1; i<=all_PNR_text.length; i++){

            let PNR_text = await page.locator("(//*[@class='booking-value personaldata'])["+i+"]").textContent();
            let MMB_button        = page.locator("(//*[@class='button-submit'])["+i+"]");

            if(PNR_text===PNR){
                await MMB_button.click();
                break;
            }
        }

    }
}
module.exports= EC_Login_Avios_Seat_Booking;