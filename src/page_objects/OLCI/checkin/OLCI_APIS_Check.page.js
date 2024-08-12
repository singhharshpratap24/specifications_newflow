const { expect } = require("chai");
const CSVReader = require('../../../Helpers/csv_read');

const csvReader = new CSVReader();

class OLCIAPIS{
    locate_Passenger_Name            = "//*[@class='passenger__link__text']/span[2]";
    locate_PNR_Text                  = "//strong[@class='personaldata']";
    locate_checkIN_Now_Btn           = "//a[normalize-space()='Check in now']";
    locate_online_checkin_Text       = "//h1[normalize-space()='Online Check-in']";
    locate_add_passport_info         = "(//a[normalize-space()='Add passport information'])[1]";



    async OLCI_MMB_Page(){
        let Passenger_Name_count   = await page.locator(this.locate_Passenger_Name).textContent();
        let PNR_Text               = await page.locator(this.locate_PNR_Text).textContent();
        let checkIN_Now_Btn        = await page.locator(this.locate_checkIN_Now_Btn);
        
        const [PNR, lastName] = await csvReader.getPNRName('OLCIAPIS');
        console.log('PNR Number:', PNR);
        console.log('Last Name:', lastName);
        expect(PNR_Text).to.deep.equal(PNR);
        expect(Passenger_Name_count).to.deep.equal(lastName);
       // await page.pause();

        if(await checkIN_Now_Btn.isVisible()){
            await checkIN_Now_Btn.click();
        }
    }
    
    async OLCI_MMB_Checkin_Page(){
        let online_checkin_Text = page.locator(this.locate_online_checkin_Text);
        let add_passport_info   = page.locator(this.locate_add_passport_info);
        //await page.waitForTimeout(10000);
        await add_passport_info.waitFor();
        await online_checkin_Text.isVisible();
        if(await add_passport_info.isVisible()){

            await add_passport_info.click();
          
        }


    }
}
module.exports = OLCIAPIS;