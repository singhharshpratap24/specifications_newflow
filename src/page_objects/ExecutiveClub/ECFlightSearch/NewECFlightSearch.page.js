const LOGGER = require('../../../setup/logger');
class ECFlightSearch{
    locate_logIn_button                       = "header:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > a:nth-child(1) > span:nth-child(2)";
    //locate_logIn_button                         ="//span[text()='Log in']";
    locate_User_name_field                      = "//input[@id='loginid' or @id='username']";
    locate_password_field                       = "//input[@id='password']";
    locate_submit_button                        = "(//*[contains(text(), 'Log in')])[3] | //*[text()='Continue']";
    locate_account_holder_name                  = "span.login"
    locate_Departure_Next_month_button          = "(//div[@title='Next month'])[1]";
    locate_Return_Next_month_button             = "(//div[@title='Next month'])[2]";
    locate_pax_adult_dropdown                   = "//select[@id='ad']";
    locate_pax_YoungAdult_dropdown              = "//select[@id='ya']";
    locate_pax_Children_dropdown                = "//select[@id='ch']";       
    locate_pax_Infant_dropdown                  = "//select[@id='inf']";        
    locate_new_flow_dashboard_text              = "//*[text()='Your dashboard']";
    locate_new_flow_book_with_Avios             = "//*[contains(text(),'Book Reward')]";
    locate_new_flow_from_text_field             = "//input[@name='departurePoint']";
    locate_new_flow_to_text_field               = "//input[@name='destinationPoint']";
    locate_new_flow_one_way_checkBox            = "//input[@id='oneWay']";
    locate_new_flow_departure_date              = "//input[@id='departInputDate']";
    locate_new_flow_return_date                 = "//input[@id='returnInputDate']";
    locate_new_flow_Departure_year_LS           = "//*[@id='departInputDate_root']/div/div/div/div/div[2]/div[2]"; 
    locate_new_flow_Departure_month_LS          = "//*[@id='departInputDate_root']/div/div/div/div/div[2]/div[1]";
    locate_new_flow_Departure_year_RS           = "//*[@id='departInputDate_root']/div/div/div/div/div[3]/div[2]";
    locate_new_flow_Departure_month_RS          = "//*[@id='departInputDate_root']/div/div/div/div/div[3]/div[1]"; 
    locate_New_Flow_Return_year_LS              = "//*[@id='returnInputDate_root']/div/div/div/div/div[2]/div[2]";
    locate_New_Flow_Return_Month_LS             = "//*[@id='returnInputDate_root']/div/div/div/div/div[2]/div[1]";
    locate_New_Flow_Return_year_RS              = "//*[@id='returnInputDate_root']/div/div/div/div/div[3]/div[2]";
    locate_New_Flow_Return_month_RS             = "//*[@id='returnInputDate_root']/div/div/div/div/div[3]/div[1]";
    locate_new_flow_get_flight_btn              = 'Get flights';
    locate_new_flow_dropdown_travel_class       = "//*[@name='CabinCode']"; 
    locate_no_use_Vouchers                      = "//*[contains(text(),'use any vouchers')]";  
    
    async ECFlightSearchCredentials(username,password){
        let logIn_button           = page.locator(this.locate_logIn_button);
        let User_name_field        = page.locator(this.locate_User_name_field);
        let password_field         = page.locator(this.locate_password_field);
        let submit_button          = page.locator(this.locate_submit_button);    

        await logIn_button.click();
        await page.waitForTimeout(5000);
        await User_name_field.type(username,{delay:500});
        await password_field.type(password,{delay:500});
        await submit_button.click();
        LOGGER.info('Logged in with :' + username + ' ' + password)
    }

    async ECFlightSearchOneWay(from, to, DDate, TcType, adult, youngAdult, children, infant){
        let account_holder_name                  = page.locator(this.locate_account_holder_name);
        let pax_adult_dropdown                   = page.locator(this.locate_pax_adult_dropdown);
        let pax_YoungAdult_dropdown              = page.locator(this.locate_pax_YoungAdult_dropdown);
        let pax_Children_dropdown                = page.locator(this.locate_pax_Children_dropdown); 
        let pax_Infant_dropdown                  = page.locator(this.locate_pax_Infant_dropdown);
        let Departure_Next_month_button          = page.locator(this.locate_Departure_Next_month_button);
        let new_flow_dashboard_text              = page.locator(this.locate_new_flow_dashboard_text);
        let new_flow_book_with_Avios             = page.locator(this.locate_new_flow_book_with_Avios);
        let new_flow_from_text_field             = page.locator(this.locate_new_flow_from_text_field);
        let new_flow_to_text_field               = page.locator(this.locate_new_flow_to_text_field);
        let new_flow_one_way_checkBox            = page.locator(this.locate_new_flow_one_way_checkBox);
        let new_flow_departure_date              = page.locator(this.locate_new_flow_departure_date);
        let new_flow_Departure_year_LS           = page.locator(this.locate_new_flow_Departure_year_LS);
        let new_flow_Departure_month_LS          = page.locator(this.locate_new_flow_Departure_month_LS);
        let new_flow_Departure_year_RS           = page.locator(this.locate_new_flow_Departure_year_RS);
        let new_flow_Departure_month_RS          = page.locator(this.locate_new_flow_Departure_month_RS);
        let new_flow_dropdown_travel_class       = page.locator(this.locate_new_flow_dropdown_travel_class);
        let no_use_Vouchers                      = page.locator(this.locate_no_use_Vouchers);
        

            await account_holder_name.click({ timeout: 60000 });
       
            await new_flow_dashboard_text.isVisible()

            await new_flow_book_with_Avios.click();
            await page.waitForTimeout(12000);
            if(await no_use_Vouchers.isVisible()){
                await no_use_Vouchers.check({force:true});

            }
            // try{
            //     await no_use_Vouchers.check({force:true});

            // }catch(error){
            //     console.error("Voucher not required for Silver");
            // }
            await new_flow_from_text_field.type(from,{delay:1000});
            await page.waitForTimeout(1000);
            await new_flow_from_text_field.press('Enter');
            await new_flow_to_text_field.type(to,{delay:1000});
            await page.waitForTimeout(1000);
            await new_flow_to_text_field.press('Enter');
            await new_flow_one_way_checkBox.check({force:true});
            let Departure_Date = new Date();
    
            Departure_Date.setDate(Departure_Date.getDate() + parseInt(DDate));

            let futureYearDeparture_Date           = Departure_Date.getFullYear();
            let futureYear                         = String(futureYearDeparture_Date).slice(-2);
            let futureMonthDeparture_Date          = Departure_Date.toLocaleDateString("default", { month: "2-digit" });
            let futureMonthDeparture_Date_String   = Departure_Date.toLocaleDateString("default", { month: "long" });
            let futureDayDeparture_Date            = String(Departure_Date.getDate()).padStart(2, '0');
            let DepartureDateSelection             =futureDayDeparture_Date+'/'+futureMonthDeparture_Date+'/'+futureYear;

            await new_flow_departure_date.click();

            while(true){

                const New_Flow_Departure_currentYear_LS           = await new_flow_Departure_year_LS.textContent();
                const New_Flow_Departure_currentMonth_LS          = await new_flow_Departure_month_LS.textContent();
                const New_Flow_Departure_currentYear_RS           = await new_flow_Departure_year_RS.textContent();
                const New_Flow_Departure_currentMonth_RS          = await new_flow_Departure_month_RS.textContent();

                if (((parseInt(New_Flow_Departure_currentYear_LS)=== futureYearDeparture_Date) && (New_Flow_Departure_currentMonth_LS === futureMonthDeparture_Date_String)) || ((parseInt(New_Flow_Departure_currentYear_RS) === futureYearDeparture_Date) && (New_Flow_Departure_currentMonth_RS === futureMonthDeparture_Date_String))) {
                    break;
                  }

                  await Departure_Next_month_button.click();
                  await page.waitForTimeout(2000);


            }
          //  let SelectDDate = `//*[@id='departInputDate_table']//*[@class='picker__day picker__day--infocus' and @aria-label="${DepartureDateSelection}"]`;
           
            getByRole('cell', { name: DepartureDateSelection }).locator('span').click();
          //  await page.locator(SelectDDate).click();
            await page.waitForTimeout(2000);
            await new_flow_dropdown_travel_class.selectOption(TcType);

            try{
                await pax_adult_dropdown.selectOption(adult);
            }catch(error){
                console.error("Adult count can not be Zero");
            }
            
            await pax_YoungAdult_dropdown.selectOption(youngAdult);
            await pax_Children_dropdown.selectOption(children);
            await pax_Infant_dropdown.selectOption(infant);
    }


    async ECFlightSearchRoundTrip(from, to, DDate, RDate, TcType, adult, youngAdult, children, infant){
        let account_holder_name                  = page.locator(this.locate_account_holder_name);
        let pax_adult_dropdown                   = page.locator(this.locate_pax_adult_dropdown);
        let pax_YoungAdult_dropdown              = page.locator(this.locate_pax_YoungAdult_dropdown);
        let pax_Children_dropdown                = page.locator(this.locate_pax_Children_dropdown); 
        let pax_Infant_dropdown                  = page.locator(this.locate_pax_Infant_dropdown);
        let Departure_Next_month_button          = page.locator(this.locate_Departure_Next_month_button);
        let New_Flow_Return_year_LS              = page.locator(this.locate_New_Flow_Return_year_LS);
        let New_Flow_Return_Month_LS             = page.locator(this.locate_New_Flow_Return_Month_LS);
        let New_Flow_Return_year_RS              = page.locator(this.locate_New_Flow_Return_year_RS);
        let New_Flow_Return_month_RS             = page.locator(this.locate_New_Flow_Return_month_RS);
        let Return_Next_month_button             = page.locator(this.locate_Return_Next_month_button);
        let new_flow_dashboard_text              = page.locator(this.locate_new_flow_dashboard_text);
        let new_flow_book_with_Avios             = page.locator(this.locate_new_flow_book_with_Avios);
        let new_flow_from_text_field             = page.locator(this.locate_new_flow_from_text_field);
        let new_flow_to_text_field               = page.locator(this.locate_new_flow_to_text_field);
        let new_flow_departure_date              = page.locator(this.locate_new_flow_departure_date);
        let new_flow_Departure_year_LS           = page.locator(this.locate_new_flow_Departure_year_LS);
        let new_flow_Departure_month_LS          = page.locator(this.locate_new_flow_Departure_month_LS);
        let new_flow_Departure_year_RS           = page.locator(this.locate_new_flow_Departure_year_RS);
        let new_flow_Departure_month_RS          = page.locator(this.locate_new_flow_Departure_month_RS);
        let new_flow_dropdown_travel_class       = page.locator(this.locate_new_flow_dropdown_travel_class);
        let no_use_Vouchers                      = page.locator(this.locate_no_use_Vouchers);
        let new_flow_return_date                 = page.locator(this.locate_new_flow_return_date);


        
      
       await account_holder_name.click({ timeout: 60000 });
       
       await new_flow_dashboard_text.isVisible()

       await new_flow_book_with_Avios.click();
       await page.waitForTimeout(20000);
       await no_use_Vouchers.check({force:true});
       await new_flow_from_text_field.type(from,{delay:1000});
       await page.waitForTimeout(2000);
       await new_flow_from_text_field.press('Enter');
       await new_flow_to_text_field.type(to,{delay:1000});
       await page.waitForTimeout(2000);
       await new_flow_to_text_field.press('Enter');


       let Departure_Date = new Date();

       Departure_Date.setDate(Departure_Date.getDate() + parseInt(DDate));

       let futureYearDeparture_Date           = Departure_Date.getFullYear();
       let futureYear                         = String(futureYearDeparture_Date).slice(-2);
       let futureMonthDeparture_Date          = Departure_Date.toLocaleDateString("default", { month: "2-digit" });
       let futureMonthDeparture_Date_String   = Departure_Date.toLocaleDateString("default", { month: "long" });
       let futureDayDeparture_Date            = String(Departure_Date.getDate()).padStart(2, '0');
       let DepartureDateSelection             =futureDayDeparture_Date+'/'+futureMonthDeparture_Date+'/'+futureYear;

       await new_flow_departure_date.click();


       while(true){

           const New_Flow_Departure_currentYear_LS           = await new_flow_Departure_year_LS.textContent();
           const New_Flow_Departure_currentMonth_LS          = await new_flow_Departure_month_LS.textContent();
           const New_Flow_Departure_currentYear_RS           = await new_flow_Departure_year_RS.textContent();
           const New_Flow_Departure_currentMonth_RS          = await new_flow_Departure_month_RS.textContent();

           if (((parseInt(New_Flow_Departure_currentYear_LS)=== futureYearDeparture_Date) && (New_Flow_Departure_currentMonth_LS === futureMonthDeparture_Date_String)) || ((parseInt(New_Flow_Departure_currentYear_RS) === futureYearDeparture_Date) && (New_Flow_Departure_currentMonth_RS === futureMonthDeparture_Date_String))) {
               break;
             }

             await Departure_Next_month_button.click();
             await page.waitForTimeout(2000);


       }
        
        let SelectDDate = `//*[@id='departInputDate_table']//*[@class='picker__day picker__day--infocus' and @aria-label="${DepartureDateSelection}"]`;
         await page.locator(SelectDDate).click();

         await page.waitForTimeout(2000);

        let Return_Date = new Date();
        Return_Date.setDate(Return_Date.getDate() + parseInt(RDate));

        let futureYearReturn_Date              = Return_Date.getFullYear();
        let futureYearReturn                   = String(futureYearReturn_Date).slice(-2);
        let futureMonthReturn_Date             = Return_Date.toLocaleDateString("default", { month: "2-digit" });
        let futureMonthReturn_Date_String      = Return_Date.toLocaleDateString("default", { month: "long" });
        let futureDayReturn_Date               = String(Return_Date.getDate()).padStart(2, '0');
        let ReturnDateSelection                =futureDayReturn_Date+'/'+futureMonthReturn_Date+'/'+futureYearReturn;

        await new_flow_return_date.click();

            while (true) {
                const New_Flow_Return_currentYear_LS           = await New_Flow_Return_year_LS.textContent();
                const New_Flow_Return_currentMonth_LS          = await New_Flow_Return_Month_LS.textContent();
                const New_Flow_Return_currentYear_RS           = await New_Flow_Return_year_RS.textContent();
                const New_Flow_Return_currentMonth_RS          = await New_Flow_Return_month_RS.textContent();

                if (((parseInt(New_Flow_Return_currentYear_LS)=== futureYearReturn_Date) && (New_Flow_Return_currentMonth_LS === futureMonthReturn_Date_String)) || ((parseInt(New_Flow_Return_currentYear_RS) === futureYearReturn_Date) && (New_Flow_Return_currentMonth_RS === futureMonthReturn_Date_String))) {
                  break;
                }
              
                await Return_Next_month_button.click();
                await page.waitForTimeout(2000);
              }
          
              let SelectRDate = `//*[@id='returnInputDate_table']//*[@class='picker__day picker__day--infocus' and @aria-label="${ReturnDateSelection}"]`;
              await page.locator(SelectRDate).click();
              await page.waitForTimeout(2000);
              await new_flow_dropdown_travel_class.selectOption(TcType);

              try{
                  await pax_adult_dropdown.selectOption(adult);
              }catch(error){
                  console.error("Adult count can not be Zero");
              }
              
              await pax_YoungAdult_dropdown.selectOption(youngAdult);
              await pax_Children_dropdown.selectOption(children);
              await pax_Infant_dropdown.selectOption(infant);
    }

    async ECFindFlightButton(){
        
            await page.getByRole('button', { name: this.locate_new_flow_get_flight_btn }).click();
        
    }

    async UpgradationOptionOutbound(){
        let upgrade_outbound_flight              = page.locator(this.locate_upgrade_outbound_flight);
        try{
            await upgrade_outbound_flight.check({force: true});

        }catch(error){
            console.error("Outbound upgrade not required");
        }


    }

    async UpgradationOptioninbound(){

        let upgrade_inbound_flight    = page.locator(this.locate_upgrade_inbound_flight);

        try{
            await upgrade_inbound_flight.check({force:true});

        }catch(error){
            console.error("Inbound upgrade not required");
        }
    }


    async isLoginBtnDisplayed(){
      await page.locator(this.locate_logIn_button).isVisible();
      LOGGER.info("Login button displays");
    }

}
module.exports=ECFlightSearch;