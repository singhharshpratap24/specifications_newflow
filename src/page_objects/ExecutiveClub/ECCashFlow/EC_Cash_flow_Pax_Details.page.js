const LOGGER = require('../../../setup/logger');
const myuserdata = require("../../../models/passengerDetails.json");
const flightSearchRequest = require('../../../Helpers/flightSearchRequest.js')
const PageElements = require("../../../PageElements/ExecutiveClub/ECommercialPassengerPage.pagelements.js");
const FareQuotePageElement = require('../../../PageElements/FlightSelling/Farequote_page.js')

FareQuotePageElement.farequote;

class EC_Cash_flow_Pax_Details {
    
    async EnterPassengerDetails() {
        await page.waitForTimeout(20000);
        let EC_Member_Adult_1_detail = page.locator(PageElements.ECommercialPassenger.locate_EC_Member_Adult_1_detail);
        const Title = myuserdata.title;
        const FirstName = myuserdata.firstName;
        const lastname = myuserdata.lastName;
        const emailAddress = myuserdata.emailAddress;
        const phoneNumber = myuserdata.phoneNumber;
        const gender = myuserdata.gender;

        let flightData = flightSearchRequest.getDefaultData();

        await EC_Member_Adult_1_detail.selectOption({ value: 'paxOption0' });
        await page.waitForTimeout(2000);
        const isRouteUS = await page.locator("(//span[text()='Gender on passport ']/../following-sibling::select)[1]")
        if (await isRouteUS.isVisible()) {
            await this.EnterPassengerDetailsForUSRoute(flightData, Title, FirstName, lastname, emailAddress, phoneNumber, gender);
        } else {
            await this.EnterPassengerDetailsForNonUSRoute(flightData, Title, FirstName, lastname, emailAddress, phoneNumber);
        }
    };

    async EnterPassengerDetailsForUSRoute(flightData, Title, FirstName, lastname, emailAddress, phoneNumber, gender) {
        let continue_button = page.locator(PageElements.ECommercialPassenger.locate_continue_button);
        let phone_number = page.locator(PageElements.ECommercialPassenger.locate_phone_number);
        let email_address = page.locator(PageElements.ECommercialPassenger.locate_email_address);

        let DOBYA = new Date();
        DOBYA.setDate(DOBYA.getDate());

        let DOBPastDateA = String(DOBYA.getDate());
        let DOBPastDateYA = String(DOBYA.getDate());
        let DOBPastDateC = String(DOBYA.getDate());
        let DOBPastDateI = String(DOBYA.getDate());

        let DOBPastMonthA = DOBYA.toLocaleDateString("default", { month: "2-digit" });
        let DOBPastMonthYA = DOBYA.toLocaleDateString("default", { month: "2-digit" });
        let DOBPastMonthC = DOBYA.toLocaleDateString("default", { month: "2-digit" });
        let DOBPastMonthI = DOBYA.toLocaleDateString("default", { month: "2-digit" });

        let DOBPastYearA = String((DOBYA.getFullYear() - 16));
        let DOBPastYearYA = String((DOBYA.getFullYear() - 14));
        let DOBPastYearC = String((DOBYA.getFullYear() - 10));
        let DOBPastYearI = String((DOBYA.getFullYear() - 1));

        let intAdult = parseInt(flightData.adult);
        let intYoungAdult = parseInt(flightData.youngAdult);
        let intChildrens = parseInt(flightData.child);
        let intInfant = parseInt(flightData.infant);

        let PassengerCount = intAdult + intYoungAdult + intChildrens + intInfant;

        for (let i = 2; i <= PassengerCount; i++) {
            let Adult_Pax_dropdown = page.locator("(//span[text()='Select a passenger'])[" + i + "]");
            let passenger_title = page.locator("(//span[text()='Title']/../following-sibling::select)[" + i + "]");
            let passenger_Fname = page.locator("(//input[contains(@name,'-firstName')])[" + i + "]");
            let passenger_Lname = page.locator("(//input[contains(@name,'-lastName')])[" + i + "]");
            let Pax_Gender = page.locator("(//span[text()='Gender on passport ']/../following-sibling::select)[" + i + "]");

            if (await Adult_Pax_dropdown.isVisible()) {
                await Adult_Pax_dropdown.selectOption({ value: 'new' });
            }

            let PaxFirstName = FirstName + String.fromCharCode(64 + i);

            await passenger_title.type(Title, { delay: 100 });
            await passenger_Fname.clear();
            await passenger_Fname.type(PaxFirstName, { delay: 100 });
            await passenger_Lname.clear();
            await passenger_Lname.type(lastname, { delay: 100 });
            await Pax_Gender.type(gender, { delay: 100 });
        }

        let itr = 2;
        for (; itr <= intAdult; itr++) {
            await page.locator("(//input[@placeholder='DD'])[" + itr + "]").type(DOBPastDateA, { force: true }, { delay: 100 });
            await page.locator("(//input[@placeholder='MM'])[" + itr + "]").type(DOBPastMonthA, { force: true }, { delay: 100 });
            await page.locator("(//input[@placeholder='YYYY'])[" + itr + "]").type(DOBPastYearA, { force: true }, { delay: 100 });
        }

        for (; itr <= (intAdult + intYoungAdult); itr++) {
            await page.locator("(//input[@placeholder='DD'])[" + itr + "]").type(DOBPastDateYA, { force: true }, { delay: 100 });
            await page.locator("(//input[@placeholder='MM'])[" + itr + "]").type(DOBPastMonthYA, { force: true }, { delay: 100 });
            await page.locator("(//input[@placeholder='YYYY'])[" + itr + "]").type(DOBPastYearYA, { force: true }, { delay: 100 });
        }

        for (; itr <= (intAdult + intYoungAdult + intChildrens); itr++) {

            await page.locator("(//input[@placeholder='DD'])[" + itr + "]").type(DOBPastDateC, { force: true }, { delay: 100 });
            await page.locator("(//input[@placeholder='MM'])[" + itr + "]").type(DOBPastMonthC, { force: true }, { delay: 100 });
            await page.locator("(//input[@placeholder='YYYY'])[" + itr + "]").type(DOBPastYearC, { force: true }, { delay: 100 });
        }

        for (; itr <= (intAdult + intYoungAdult + intChildrens + intInfant); itr++) {
            await page.locator("(//input[@placeholder='DD'])[" + itr + "]").type(DOBPastDateI, { force: true }, { delay: 100 });
            await page.locator("(//input[@placeholder='MM'])[" + itr + "]").type(DOBPastMonthI, { force: true }, { delay: 100 });
            await page.locator("(//input[@placeholder='YYYY'])[" + itr + "]").type(DOBPastYearI, { force: true }, { delay: 100 });
        }

        if (phone_number.textContent() == null || email_address.textContent() == null) {
            await phone_number.type(phoneNumber);
            await email_address.type(emailAddress);
        }

        await continue_button.click();
        LOGGER.info('Passenger entry completed', { classname: 'PassengerDetails' });
    }


    async EnterPassengerDetailsForNonUSRoute(flightData, Title, FirstName, lastname, emailAddress, phoneNumber) {
        let continue_button = page.locator(PageElements.ECommercialPassenger.locate_continue_button);
        let phone_number = page.locator(PageElements.ECommercialPassenger.locate_phone_number);
        let email_address = page.locator(PageElements.ECommercialPassenger.locate_email_address);

        let DOBYA = new Date();
        DOBYA.setDate(DOBYA.getDate());

        let DOBPastDateYA = String(DOBYA.getDate());
        let DOBPastDateC = String(DOBYA.getDate());
        let DOBPastDateI = String(DOBYA.getDate());

        let DOBPastMonthYA = DOBYA.toLocaleDateString("default", { month: "2-digit" });
        let DOBPastMonthC = DOBYA.toLocaleDateString("default", { month: "2-digit" });
        let DOBPastMonthI = DOBYA.toLocaleDateString("default", { month: "2-digit" });

        let DOBPastYearYA = String((DOBYA.getFullYear() - 14));
        let DOBPastYearC = String((DOBYA.getFullYear() - 10));
        let DOBPastYearI = String((DOBYA.getFullYear() - 1));

        let intAdult = parseInt(flightData.adult);
        let intYoungAdult = parseInt(flightData.youngAdult);
        let intChildrens = parseInt(flightData.child);
        let intInfant = parseInt(flightData.infant);

        let PassengerCount = intAdult + intYoungAdult + intChildrens + intInfant;

        for (let i = 2; i <= PassengerCount; i++) {

            let Adult_Pax_dropdown = page.locator("(//span[text()='Select a passenger'])[" + i + "]");
            let passenger_title = page.locator("(//span[text()='Title']/../following-sibling::select)[" + i + "]");
            let passenger_Fname = page.locator("(//input[contains(@name,'-firstName')])[" + i + "]");
            let passenger_Lname = page.locator("(//input[contains(@name,'-lastName')])[" + i + "]");

            if (await Adult_Pax_dropdown.isVisible()) {
                await Adult_Pax_dropdown.selectOption({ value: 'new' });
            }

            let PaxFirstName = FirstName + String.fromCharCode(64 + i);

            await passenger_title.type(Title, { delay: 100 });
            await passenger_Fname.clear();
            await passenger_Fname.type(PaxFirstName, { delay: 100 });
            await passenger_Lname.clear();
            await passenger_Lname.type(lastname, { delay: 100 });
        }

        let itr = 1;

        for (; itr <= (intYoungAdult); itr++) {
            await page.locator("(//input[@placeholder='DD'])[" + itr + "]").type(DOBPastDateYA, { force: true }, { delay: 100 });
            await page.locator("(//input[@placeholder='MM'])[" + itr + "]").type(DOBPastMonthYA, { force: true }, { delay: 100 });
            await page.locator("(//input[@placeholder='YYYY'])[" + itr + "]").type(DOBPastYearYA, { force: true }, { delay: 100 });
        }

        for (; itr <= (intYoungAdult + intChildrens); itr++) {

            await page.locator("(//input[@placeholder='DD'])[" + itr + "]").type(DOBPastDateC, { force: true }, { delay: 100 });
            await page.locator("(//input[@placeholder='MM'])[" + itr + "]").type(DOBPastMonthC, { force: true }, { delay: 100 });
            await page.locator("(//input[@placeholder='YYYY'])[" + itr + "]").type(DOBPastYearC, { force: true }, { delay: 100 });
        }

        for (; itr <= (intYoungAdult + intChildrens + intInfant); itr++) {
            await page.locator("(//input[@placeholder='DD'])[" + itr + "]").type(DOBPastDateI, { force: true }, { delay: 100 });
            await page.locator("(//input[@placeholder='MM'])[" + itr + "]").type(DOBPastMonthI, { force: true }, { delay: 100 });
            await page.locator("(//input[@placeholder='YYYY'])[" + itr + "]").type(DOBPastYearI, { force: true }, { delay: 100 });
        }

        if (phone_number.textContent() == null || email_address.textContent() == null) {
            await phone_number.type(phoneNumber);
            await email_address.type(emailAddress);
        }

        await continue_button.click();
        LOGGER.info('Passenger entry completed', { classname: 'PassengerDetails' });

    }

    async continueNextToSeatingPage() {
        await this.EnterPassengerDetails();
    }
  async enterPaxDetailsForHoldBooking(){
    const title = myuserdata.title;
    const firstName = myuserdata.firstName;
    const lastname = myuserdata.lastName;
    const emailAddress = myuserdata.emailAddress;
    const phoneNumber = myuserdata.phoneNumber;

    let passenger_title = await page.locator(PageElements.ECommercialPassenger.locate_pax_title_hold_booking);
    let passenger_Fname = page.locator(PageElements.ECommercialPassenger.locate_first_name_passport);
    let passenger_Lname = page.locator(PageElements.ECommercialPassenger.locate_last_name_passport);
    let phone_number = page.locator(PageElements.ECommercialPassenger.locate_phone_number);
    let email_address = page.locator(PageElements.ECommercialPassenger.locate_email_address);
    let continue_button = page.locator(FareQuotePageElement.farequote.locate_pax_continue_btn);

    await passenger_title.selectOption({ value: title});
    await passenger_Fname.fill(firstName, { delay: 100 }); 
    await passenger_Lname.fill(lastname, { delay: 100 });
    await phone_number.fill(phoneNumber, { delay: 100 });
    await email_address.fill(emailAddress, { delay: 100 }); 
    await continue_button.click();
    LOGGER.info('Passenger entry for hold booking completed', { classname: 'PassengerDetails' });
}

}
module.exports = EC_Cash_flow_Pax_Details;