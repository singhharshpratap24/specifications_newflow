"use strict";
const { expect } = require("chai");

const LOGGER = require('../../../setup/logger');
const myuserdata = require("../../../models/passengerDetails.json");
const EmailGenerator = require('../../../Helpers/email_generator.js');
const PageElements = require("../../../PageElements/ExecutiveClub/ECEnrollment.pagelements.js");
const HomePageLocators = require('../../../PageElements/FlightSelling/Home_Page.js')

const obj_email_generator=new EmailGenerator();

class ECEnrollment{

     async validateJoinTheClubForm(){
        const join_the_club_form_title=await page.getByRole('heading', { name: 'Join the Executive Club for free'}).textContent();
        expect(join_the_club_form_title).to.equal('Join the Executive Club for free');
        LOGGER.info('Join the Executive Club page displayed', { classname: 'ECEnrollment'});
     }

    async fillInDetailsWithAllowedPassword(){
        let title_dropdown = PageElements.ECEnrollment.locate_title_dropdown;
        let first_name=await page.locator(PageElements.ECEnrollment.locate_first_name);
        let last_name=await page.locator(PageElements.ECEnrollment.locate_last_name);
        let email=await page.locator(PageElements.ECEnrollment.locate_email);
        let confirm_email=await page.locator(PageElements.ECEnrollment.locate_confirm_email);
        let password=await page.locator(PageElements.ECEnrollment.locate_password);
        let confirm_password=await page.locator(PageElements.ECEnrollment.locate_confirm_password);
        let address_line1=await page.locator(PageElements.ECEnrollment.locate_address_line1);
        let city=await page.locator(PageElements.ECEnrollment.locate_city);
        let day_dropdown = await page.locator(PageElements.ECEnrollment.locate_dayDOB);
        let month_dropdown =await page.locator(PageElements.ECEnrollment.locate_monthDOB);
        let year_dropdown =await page.locator(PageElements.ECEnrollment.locate_yearDOB);
        let gender_radio=await page.locator(PageElements.ECEnrollment.locate_gender);
        let terms_conditions_checkbox= await page.locator(PageElements.ECEnrollment.locate_terms_conditions_checkbox);

        const isTitleDropdownVisible = await page.locator(title_dropdown).isVisible();
        if (isTitleDropdownVisible) {
        await page.selectOption(title_dropdown, myuserdata.title);
        await first_name.type(myuserdata.firstName,{delay:250});
        await last_name.type(myuserdata.lastName,{delay:250});
        const emailAddress=await obj_email_generator.generateEmail();
        await email.type(emailAddress,{delay:250});
        await confirm_email.type(emailAddress,{delay:250});
        await password.type(myuserdata.password,{delay:250});
        await confirm_password.type(myuserdata.password,{delay:250});
        await address_line1.type(myuserdata.addressOne,{delay:250});  
        await city.type(myuserdata.addressTwo,{delay:250});
        await gender_radio.dispatchEvent('click');
          
        let DOB = new Date();  
        let DOBPastDay = DOB.toLocaleDateString("default", { day: "2-digit" });
        let DOBPastMonth = DOB.toLocaleDateString("default", { month: "2-digit" });
        let DOBPastYear = String((DOB.getFullYear() - 24));
        await day_dropdown.selectOption({ value: `${DOBPastDay}` });
        await month_dropdown.selectOption({ value: `${DOBPastMonth}` });
        await year_dropdown.selectOption({ value: `${DOBPastYear}` });
        await terms_conditions_checkbox.dispatchEvent('click');
        await page.getByRole('button', { name: 'Join now'}).click();
        LOGGER.info("Join the EC Club form filled successfully", { classname : 'ECEnrollment'});     
    }  
}
async assertMembershipNumber(){
    let membership_number=await page.locator(PageElements.ECEnrollment.locate_membership_number).textContent()
    console.log("Membership number : "+membership_number);
    expect(await page.locator(PageElements.ECEnrollment.locate_membership_number).isVisible()).to.equal(true);   
    LOGGER.info("Membership number : "+membership_number, { classname : 'ECEnrollment'});
    }

    async clickOnSignup(){
        let signup=await page.locator(PageElements.ECEnrollment.locate_signup)
        await signup.click();
        await page.waitForTimeout(5000);
        let accept_cookies = page.locator(HomePageLocators.homePage.locate_accept_cookies);
        await accept_cookies.click();
        await page.waitForTimeout(3000);
   }
   
   async fillInDetailsWithAllowedPasswordforInet(){
       let email=await page.locator(PageElements.ECEnrollment.locate_inet_email);
       let confirm_email=await page.locator(PageElements.ECEnrollment.locate_inet_confirm_email);
       let password=await page.locator(PageElements.ECEnrollment.locate_inet_password);
       let confirm_password=await page.locator(PageElements.ECEnrollment.locate_inet_confirm_password);
       let title_dropdown = PageElements.ECEnrollment.locate_title_dropdown;
       let first_name=await page.locator(PageElements.ECEnrollment.locate_inet_first_name);
       let last_name=await page.locator(PageElements.ECEnrollment.locate_inet_last_name);
       let register_with_bacom=await page.locator(PageElements.ECEnrollment.locate_register_with_bacom); 
       let inet_terms_conditions_checkbox=await page.locator(PageElements.ECEnrollment.locate_inet_terms_conditions_checkbox);
   
       
           
       const emailAddress=await obj_email_generator.generateEmail();
       await email.type(emailAddress,{delay:250});
       await confirm_email.type(emailAddress,{delay:250});
       await password.type(myuserdata.password,{delay:250});
       await confirm_password.type(myuserdata.password,{delay:250});
       const isTitleDropdownVisible = await page.locator(title_dropdown).isVisible();
       if (isTitleDropdownVisible) {
       await page.selectOption(title_dropdown, myuserdata.title);
       await first_name.type(myuserdata.firstName,{delay:250});
       await last_name.type(myuserdata.lastName,{delay:250});
       await register_with_bacom.click();
       await inet_terms_conditions_checkbox.click();
       await page.waitForTimeout(3000);
   
           }
   }
   
      async joinNow(){
       let joinNow=await page.locator(PageElements.ECEnrollment.locate_join_now);
       await joinNow.click();
       await page.waitForTimeout(3000);
       let page_title=await page.locator(PageElements.ECEnrollment.locate_page_title).textContent();
       let pagetitle= await page.title();
       console.log(pagetitle);
       expect(pagetitle).to.equal(page_title);
      }
}

module.exports = ECEnrollment;