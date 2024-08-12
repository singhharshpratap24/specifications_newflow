
class OLCIAPISPaxDetails{
    locate_concent_popup = "//*[@id='modal-close']/div/div[1]/input";
    locate_exit_without_save = "//*[@id='passportForm0']//button[text()='Exit without saving']";
    locate_pax_count       = "//*[@class='personalData']";
    locate_pax_secondary_details = "//*[text()='Your secondary contact details']";



   async OLCIAPISPaxDetailsForm(PassNo, Nationality, Gov){
   await page.waitForTimeout(15000);
    let concent_popup           = page.locator(this.locate_concent_popup);
    let pax_count               = await page.locator(this.locate_pax_count).all();
    let pax_secondary_details   = await page.locator(this.locate_pax_secondary_details).all();
   // let exit_without_save       = page.locator(this.locate_exit_without_save);


console.log(pax_secondary_details.length);
    let Passport_Expiry_Details = new Date();
    Passport_Expiry_Details.setDate(Passport_Expiry_Details.getDate());

    let Passport_Expiry_Year           = String((Passport_Expiry_Details.getFullYear()+20));
    let Passport_Expiry_Month          = Passport_Expiry_Details.toLocaleDateString("default", { month: "long" });
    let Passport_Expiry_Date           = String(Passport_Expiry_Details.getDate()).padStart(2, '0');

    let Pax_DOB_Details = new Date();
    
    Pax_DOB_Details.setDate(Pax_DOB_Details.getDate());

    let Pax_DOB_Month_A          = Pax_DOB_Details.toLocaleDateString("default", { month: "long" });
    let Pax_DOB_Date_A           = String(Pax_DOB_Details.getDate()).padStart(2, '0');
    


    await concent_popup.click({force:true});
  //  await exit_without_save.click();

    for (let i=0; i<=(pax_count.length-1) ; i++){

        let passport_Number                             = page.locator(`//*[@id="pax-${i}-field-pn-doc-passport"]`);
        let confirm_passport_Number                     = page.locator(`//*[@id="pax-${i}-field-cpn-doc-passport"]`);
        let Citizenship                                 = page.locator(`//*[@id="pax-${i}-field-citizp-doc-passport"]`);
        let issue_athuority                             = page.locator(`//*[@id="pax-${i}-field-passgov-doc-passport"]`);
        let expiry_Date                                 = page.locator(`//*[@id="pax-${i}-field-pexday-doc-passport"]`);
        let expiry_Month                                = page.locator(`//*[@id="pax-${i}-field-pexmonth-doc-passport"]`);
        let expiry_Year                                 = page.locator(`//*[@id="pax-${i}-field-pexyear-doc-passport"]`);
        let submit                                      = page.locator(`//fieldset[@id="passportForm4"]//button[@value='Submit' or @value='Submit details'][normalize-space()='Submit details' or 'Submit']`);
        let pax_name                                    = await page.locator(`//*[@id="passengerForm${i}"]/fieldset/h3`).textContent();
        let FirstName_Passport                          = page.locator(`//*[@id= "pax-${i}-field-agn-doc-passport"]`);
        let LastName_Passport                           = page.locator(`//*[@id= "pax-${i}-field-ln-doc-passport"]`);
        let Pax_DOB_Date                                = page.locator(`//*[@id= "pax-${i}-field-dobday-doc-passport"]`);
        let Pax_DOB_Month                               = page.locator(`//*[@id= "pax-${i}-field-dobmonth-doc-passport"]`);
        let Pax_DOB_Year                                = await page.$(`//*[@id= "pax-${i}-field-dobyear-doc-passport"]`);
        let add_details                                 = page.locator(`//*[@id="passengerForm${i}"]/fieldset/div[3]/div[2]/button`);
        let Gender_male                                 = page.locator(`//*[@for='pax-${i}-field-M-doc-passport']`);
        let Gender_female                               = page.locator(`//*[@for='pax-${i}-field-F-doc-passport']`);
        let Residence_country                           = page.locator(`//*[@id="pax-${i}-field-resd-doc-passport"]`);
        let Residence_country_Text                      = page.locator(`//*[@id="countryOfResidenceLabel-${i}"]`);
        let Residence_street_address                    = page.locator(`//*[@id="pax-${i}-field-addr-doc-passport"]`);
        let Residence_city_address                      = page.locator(`//*[@id="pax-${i}-field-city-doc-passport"]`);
        let Residence_state_address                     = page.locator(`//*[@id="pax-${i}-field-state-doc-passport"]`);
        let Residence_Zip_address                       = page.locator(`//*[@id="pax-${i}-field-zip-doc-passport"]`);
        let Residence_Country_dialing_address           = page.locator(`//*[@id="pax-${i}-field-cddialcode-doc-passport"]`);
        let Residence_Country_dialing_PhoneNo           = page.locator(`//*[@id="pax-${i}-field-cdphonenumber-doc-passport"]`);
        let Residence_email_address                     = page.locator(`//*[@id="pax-${i}-field-cdemail-doc-passport"]`);
        let Residence_Contact_Person_Name               = page.locator(`//*[@id="pax-${i}-field-ecdname-doc-passport"]`);
        let Residence_Country_dialing_address_2         = page.locator(`//*[@id="pax-${i}-field-ecddialcode-doc-passport"]`);
        let Residence_Country_dialing_PhoneNo_2         = page.locator(`//*[@id="pax-${i}-field-ecdphonenumber-doc-passport"]`);
        let Term_Condition_1                            = page.locator(`//*[@id="usTrackTraceConsentLabel1-${i}"]`);
        let Term_Condition_2                            = page.locator(`//*[@id="usTrackTraceConsentLabel2-${i}"]`);
       let secondary_contact_text                      = page.locator(`//fieldset[@id="passportForm${i}"]//h3[contains(text(),'Your secondary contact details')]`);



        await add_details.waitFor();
        await add_details.click();

        let name_parts = pax_name.split(" ");
        let PassPort = PassNo + String.fromCharCode(64 + i);
        await passport_Number.type(PassPort,{delay:1000});
        await confirm_passport_Number.type(PassPort,{delay:1000});
        await Citizenship.selectOption(Nationality);
        await issue_athuority.selectOption(Gov);
        await expiry_Date.selectOption(Passport_Expiry_Date);
        await expiry_Month.selectOption(Passport_Expiry_Month);
        await expiry_Year.selectOption(Passport_Expiry_Year);
        await FirstName_Passport.clear();
        await FirstName_Passport.type(name_parts[1]);
        await LastName_Passport.clear();
        await LastName_Passport.type(name_parts[2]);

        
        await Gender_male.waitFor();
        await Gender_female.waitFor();
        if(name_parts[0]==='Mr'|| name_parts[0]==='Mstr'){
          await Gender_male.check();
          } else if(name_parts[0]==='Miss'|| name_parts[0]==='Mrs' || name_parts[0]==='Ms'){
            await Gender_female.check();
          }

        await Pax_DOB_Date.type(Pax_DOB_Date_A);
        await Pax_DOB_Month.type(Pax_DOB_Month_A);
        
          const options = await Pax_DOB_Year.$$eval('option', options => options.map(option => option.value));
          await Pax_DOB_Year.selectOption(options[options.length - 1]);
          await page.waitForTimeout(2000);
          const selectedValue = await Pax_DOB_Year.$eval('option:checked', option => option.value);
          console.log('Selected value:', selectedValue);

          if (await Residence_country_Text.isVisible()){
            await Residence_country.selectOption('USA');
            await Residence_street_address.type('Address1',{delay:1000});
            await Residence_city_address.type('Denver', {delay:1000});
            await Residence_state_address.selectOption('Colorado');
            await Residence_Zip_address.type('80014', {delay:1000});
          }
          if(await Residence_Country_dialing_address.isVisible()){
            await Residence_Country_dialing_address.selectOption('USA (+1)');
            await Residence_Country_dialing_PhoneNo.clear();
            await Residence_Country_dialing_PhoneNo.type('123456789', {delay:500});
            await Residence_email_address.clear();
            await Residence_email_address.type('test@ba.com', {delay:500});
          }
            

          if (await secondary_contact_text.isVisible()){
            await Residence_Contact_Person_Name.type(name_parts[1]);
            await Residence_Country_dialing_address_2.selectOption('USA (+1)');
            await Residence_Country_dialing_PhoneNo_2.type('123456789', {delay:500});
          }

          if(await Term_Condition_1.isVisible()){
            await Term_Condition_1.click();
            await Term_Condition_2.click();
           
          }
          
        await submit.waitFor();
        await submit.click();
          
    }


   }
}
module.exports = OLCIAPISPaxDetails