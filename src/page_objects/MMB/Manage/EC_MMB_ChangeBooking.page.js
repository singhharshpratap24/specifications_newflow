const { assert, expect } = require('chai')
const CSVReader = require('../../../Helpers/csv_card_read');

const csvReader = new CSVReader();

class EC_MMB_ChangeBooking{

    locate_Manage_Option                         = "//a[normalize-space()='Manage']";
    locate_Booking_Ref_field                     = "//input[@id='bookingRef']";
    locate_LastName_field                        = "//input[@id='lastname']";
    locate_FMB_Btn                               = 'Find my booking';
    locate_change_timeDate_Btn                   = "//a[@class='olci-container__cta -outline js-cta-change-booking-link ']";
    locate_concent_continue                      = "//*[@id='passengerConsentForm']/div[7]/input";
    locate_radio_btn_change_date                 = "//*[@id='dateOutbound1Label']";
    locate_radio_btn_change_time                 = "//*[@id='timeOutbound1Label']";
    locate_select_date_btn                       = "//*[text()='Select a travel date']";
    locate_Current_Date                          = "//*[@class='next-flight__text']/span[3]";
    locate_concent_popup                         = "//*[@id='cookieModalDescription']";
    locate_concent_popup_continue                = "//*[@id='accept_ba_cookies']/span";
    locate_date_in_Calendar                      = "//*[@class='dateWrapper']";
    locate_confirm_date_selection_Btn            = "//*[@id='confirmDateOuterBtn']";
    locate_Continue_Btn                          = "//*[@title='Continue']";
    locate_choose_flight                         = "//*[@id='1_1']";
    locate_choose_flight_time_Change             = "//*[@id='1_2']";
    locate_choose_flight_continue                = "//*[@title='Continue']";
    locate_Who_is_paying_dropdown                = "//*[@id='PayerTypeDropDown']";
    locate_EmailID_confirmation                  = "//*[@id='payersEmailfld1']";
    locate_contact_number                        = "//input[@id='telephone']";
    locate_TermsandCondition                     = "//*[@class='termsInput']";
    locate_typeOf_Card_dropdown                  = "//*[@id='CardSchemeCode1']";
    locate_input_card_number                     = "//*[@id='CardNumber1']";
    locate_card_expiry_month                     = "//*[@id='ExpiryDateMonth1']";
    locate_card_expiry_year                      = "//*[@id='ExpiryDateYear1']";
    locate_security_number                       = "//*[@id='CSCNumber1']";
    locate_address_line_1                        = "//*[@id='AddressLine1']";
    locate_address_line_2                        = "//*[@id='AddressLine2']";
    locate_post_code                             = "//*[@id='PostalCode']";
    locate_pay_change_booking_btn                = "//*[@id='submitButton']";
    locate_change_booking_confirmation_text      = "//*[contains(text(),'ticket have been changed.')]";
    locate_change_booking_email_confirmation     = "//*[contains(text(),'confirmation email')]";
    locate_change_booking_date_confirmation      = "//*[@id='newItineraryPanel']/table/tbody/tr/td[4]";


    async ManageHoverSearchPNR(){
        const [PNR, lastName] = await csvReader.getPNRName('ECMMBChangeDate');

        let Manage_Option       = page.locator(this.locate_Manage_Option);
        let Booking_Ref_field   = page.locator(this.locate_Booking_Ref_field);
        let LastName_field      = page.locator(this.locate_LastName_field);

        await Manage_Option.hover();
        await Booking_Ref_field.waitFor();
        await Booking_Ref_field.type(PNR,{delay:1000});
        await LastName_field.type(lastName,{delay:1000});
        await page.getByRole('button', { name: this.locate_FMB_Btn }).click();

    }

    async MMB_ChnageBookingDate(ContactNo,CardType,CardNo,Address1,Address2,CVV,PCode){
        let change_timeDate_Btn         = page.locator(this.locate_change_timeDate_Btn);
        let concent_continue            = page.locator(this.locate_concent_continue);
        let radio_btn_change_date       = page.locator(this.locate_radio_btn_change_date);
        let select_date_btn             = page.locator(this.locate_select_date_btn);
        let concent_popup               = page.locator(this.locate_concent_popup);
        let concent_popup_continue      = page.locator(this.locate_concent_popup_continue);
        let Current_Date                = await page.locator(this.locate_Current_Date).textContent();
        let confirm_date_selection_Btn  = page.locator(this.locate_confirm_date_selection_Btn);
        let Continue_Btn                = page.locator(this.locate_Continue_Btn);
        let choose_flight               = page.locator(this.locate_choose_flight);
        let choose_flight_continue      = page.locator(this.locate_choose_flight_continue);
        let Who_is_paying_dropdown      = page.locator(this.locate_Who_is_paying_dropdown);
        let EmailID_confirmation        = page.locator(this.locate_EmailID_confirmation);
        let contact_number              = page.locator(this.locate_contact_number);
        let TermsandCondition           = page.locator(this.locate_TermsandCondition);
        let typeOf_Card_dropdown        = page.locator(this.locate_typeOf_Card_dropdown);
        let input_card_number           = page.locator(this.locate_input_card_number);
        let card_expiry_month           = page.locator(this.locate_card_expiry_month);
        let card_expiry_year            = page.locator(this.locate_card_expiry_year);
        let security_number             = page.locator(this.locate_security_number);
        let address_line_1              = page.locator(this.locate_address_line_1);
        let address_line_2              = page.locator(this.locate_address_line_2);
        let post_code                   = page.locator(this.locate_post_code);
        let pay_change_booking_btn      = page.locator(this.locate_pay_change_booking_btn);


        
        const DateofDepart = Current_Date.split(" ");
        await change_timeDate_Btn.click();
        await page.waitForTimeout(5000);
        if (await concent_popup.isVisible()){
            await concent_popup_continue.click();
        }
        await concent_continue.click();


        await radio_btn_change_date.check();
        if(select_date_btn.isVisible()){
            await select_date_btn.click();
        }
        await page.waitForTimeout(5000);
        const date_in_Calendar = await page.$$eval(this.locate_date_in_Calendar,(elements) => elements.map((element) => element.textContent));
        const DepartureDate = DateofDepart[1]+""+DateofDepart[2].slice(0, -1);
        for (let i=1; i<=date_in_Calendar.length; i++){
            let Date_to_choose = await page.locator("(//*[@class='dateWrapper'])["+i+"]").textContent();
            let Date_Box_Border_color = page.locator("(//*[@class='dateWrapper'])["+i+"]");
            let Radio_btn_in_Date  = page.locator("(//*[@class='availableRadioBtn'])["+i+"]");

            const DateBox_Border_color   = await Date_Box_Border_color.evaluate(e => getComputedStyle(e).borderColor);
            const DateBox_background_color   = await Date_Box_Border_color.evaluate(e => getComputedStyle(e).backgroundColor);

            
            if(Date_to_choose>DepartureDate && (DateBox_Border_color=== 'rgb(230, 92, 92)' || DateBox_background_color=== 'rgb(255, 255, 187)')){
                await Radio_btn_in_Date.click();
                break;
            }
        }

        await confirm_date_selection_Btn.click();
        await Continue_Btn.click();
        try{
            await choose_flight.check();
            await choose_flight_continue.click();
            await Who_is_paying_dropdown.selectOption({value:'2'});
            await EmailID_confirmation.check();
            await contact_number.type(ContactNo);
            await TermsandCondition.click();
            await Continue_Btn.click();
            await typeOf_Card_dropdown.selectOption(CardType);
            await input_card_number.type(CardNo);

            let CardExpiry = new Date();
            let EDMonth = CardExpiry.toLocaleDateString("en-US", { month: "numeric" }); 
            let EDYear = String(CardExpiry.getFullYear() + 5);

            await card_expiry_month.selectOption(EDMonth);
            await card_expiry_year.selectOption(EDYear);
            await security_number.type(CVV,{delay:1000});
            await address_line_1.type(Address1,{delay:1000});
            await address_line_2.type(Address2,{delay:1000});
            await post_code.type(PCode,{delay:1000});
            await pay_change_booking_btn.click();
        }catch(error){
            console.error("Flight is not available for changed date");
        }


    }

    async MMB_ChnageBookingConfirmation(){
        let change_booking_confirmation_text = await page.locator(this.locate_change_booking_confirmation_text).textContent();
        let change_booking_email_confirmation = await page.locator(this.locate_change_booking_email_confirmation).textContent();
        let change_booking_date_confirmation  = page.locator(this.locate_change_booking_date_confirmation);

        expect(change_booking_confirmation_text).to.contain('Your booking and ticket have been changed.');
        expect(change_booking_email_confirmation).to.contain('confirmation email');
        await change_booking_date_confirmation.isVisible();

    }

    async MMB_ChnageBookingTime(ContactNo,CardType,CardNo,Address1,Address2,CVV,PCode){

        let change_timeDate_Btn         = page.locator(this.locate_change_timeDate_Btn);
        let concent_continue            = page.locator(this.locate_concent_continue);
        let radio_btn_change_time       = page.locator(this.locate_radio_btn_change_time);
        let concent_popup               = page.locator(this.locate_concent_popup);
        let concent_popup_continue      = page.locator(this.locate_concent_popup_continue);
        let Continue_Btn                = page.locator(this.locate_Continue_Btn);
        let choose_flight_time_Change   = page.locator(this.locate_choose_flight_time_Change);
        let choose_flight_continue      = page.locator(this.locate_choose_flight_continue);
        let Who_is_paying_dropdown      = page.locator(this.locate_Who_is_paying_dropdown);
        let EmailID_confirmation        = page.locator(this.locate_EmailID_confirmation);
        let contact_number              = page.locator(this.locate_contact_number);
        let TermsandCondition           = page.locator(this.locate_TermsandCondition);
        let typeOf_Card_dropdown        = page.locator(this.locate_typeOf_Card_dropdown);
        let input_card_number           = page.locator(this.locate_input_card_number);
        let card_expiry_month           = page.locator(this.locate_card_expiry_month);
        let card_expiry_year            = page.locator(this.locate_card_expiry_year);
        let security_number             = page.locator(this.locate_security_number);
        let address_line_1              = page.locator(this.locate_address_line_1);
        let address_line_2              = page.locator(this.locate_address_line_2);
        let post_code                   = page.locator(this.locate_post_code);
        let pay_change_booking_btn      = page.locator(this.locate_pay_change_booking_btn);


        
        await change_timeDate_Btn.click();
        await page.waitForTimeout(5000);
        if (await concent_popup.isVisible()){
            await concent_popup_continue.click();
        }
        await concent_continue.click();

         await radio_btn_change_time.check();
         await Continue_Btn.click();


        try{
            await choose_flight_time_Change.check();
            await choose_flight_continue.click();
            await Who_is_paying_dropdown.selectOption({value:'2'});
            await EmailID_confirmation.check();
            await contact_number.type(ContactNo);
            await TermsandCondition.click();
            await Continue_Btn.click();
            await typeOf_Card_dropdown.selectOption(CardType);
            await input_card_number.type(CardNo);

            let CardExpiry = new Date();
            let EDMonth = CardExpiry.toLocaleDateString("en-US", { month: "numeric" }); 
            let EDYear = String(CardExpiry.getFullYear() + 5);

            await card_expiry_month.selectOption(EDMonth);
            await card_expiry_year.selectOption(EDYear);
            await security_number.type(CVV,{delay:1000});
            await address_line_1.type(Address1,{delay:1000});
            await address_line_2.type(Address2,{delay:1000});
            await post_code.type(PCode,{delay:1000});
            await pay_change_booking_btn.click();
        }catch(error){
            console.error("Flight is not available for changed date");
        }


    }
}
module.exports=EC_MMB_ChangeBooking;