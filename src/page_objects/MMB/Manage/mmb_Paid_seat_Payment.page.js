const { expect } = require("chai");

class MMB_PaidSeat_Payment{
    locate_billing_country  = "//*[@id='BillingCountry']";
    locate_card_type        = "//*[@id='CardSchemeCode1']";
    locate_card_number      = "//*[@id='CardNumber1']";
    locate_card_month_expiry = "//*[@id='ExpiryDateMonth1']";
    locate_card_year_expiry  = "//*[@id='ExpiryDateYear1']";
    locate_cvv_number        = "//*[@id='CSCNumber1']";
    locate_address1_text     = "//*[@id='AddressLine1']";
    locate_address2_text     = "//*[@id='AddressLine2']";
    locate_postcode_text     = "//*[@id='PostalCode']";
    locate_final_pay_button  = "//*[@id='submitButton']";
    locate_Avios_payment     = "//*[@id='cashOnly5']";
    locate_EC_member_Avios_Btn  = "//*[@id='execLoginAcc']";
    locate_Membership_number  = "//form[@id='onLoadLogin']//input[@id='form-loginID']";
    locate_Membership_PWD     = "//form[@id='onLoadLogin']//input[@id='form-pwd']";
    locate_Membership_login_Btn   = "//form[@id='onLoadLogin']//button[@id='log-in-btn']";




    async MMBSeatPayment(Region, CardType, CardNo, SecurityNo, address1, address2, postcode){
        let billing_country        = page.locator(this.locate_billing_country);
        let card_type              = page.locator(this.locate_card_type); 
        let card_number            = page.locator(this.locate_card_number);
        let card_month_expiry      = page.locator(this.locate_card_month_expiry);
        let card_year_expiry       = page.locator(this.locate_card_year_expiry);
        let cvv_number             = page.locator(this.locate_cvv_number);
        let address1_text          = page.locator(this.locate_address1_text);
        let address2_text          = page.locator(this.locate_address2_text);
        let postcode_text          = page.locator(this.locate_postcode_text);
        let final_pay_button       = page.locator(this.locate_final_pay_button);
        if (await billing_country.isVisible()){
            await billing_country.selectOption(Region);
            await card_type.selectOption(CardType);
            await card_number.type(CardNo, {delay:1000});
            let card_Expiry = new Date();
            card_Expiry.setDate(card_Expiry.getDate());
            let CardExpiry_Year           = String(card_Expiry.getFullYear()+5);
            let CardExpiry_Month          = String(card_Expiry.getMonth() + 1);
    
            await card_month_expiry.selectOption(CardExpiry_Month);
            await card_year_expiry.selectOption(CardExpiry_Year);
            await cvv_number.type(SecurityNo, {delay:1000});
            await address1_text.type(address1,{delay:1000});
            await address2_text.type(address2,{delay:1000});
            await postcode_text.type(postcode, {delay:1000});
            await final_pay_button.click();
    
        }        


    }
    async AviosMMBSeatPayment(){
    let Avios_payment          = page.locator(this.locate_Avios_payment);
    let final_pay_button       = page.locator(this.locate_final_pay_button);
        await Avios_payment.waitFor();
        await Avios_payment.click();
        await final_pay_button.click();

    }

    async ECLoginthroughPaymentPage(username,password){
        let EC_member_Avios_Btn  = page.locator(this.locate_EC_member_Avios_Btn);
        let Membership_number    = page.locator(this.locate_Membership_number);
        let Membership_PWD       = page.locator(this.locate_Membership_PWD);
        let Membership_login_Btn = page.locator(this.locate_Membership_login_Btn);
        await page.waitForTimeout(5000);
        await EC_member_Avios_Btn.click();
        await Membership_number.type(username,{delay:1000});
        await Membership_PWD.type(password,{delay:1000});
        await Membership_login_Btn.click();
    }

}
module.exports = MMB_PaidSeat_Payment;