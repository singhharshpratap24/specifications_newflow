const SEATING = require('../SeatSelection/SeatItenary.page');
const LOGGER = require('../../../setup/logger');
const PAXHELPER = require('../../../Helpers/passenger');
const myuserdata = require("../../../models/passengerDetails.json");
const flightSearchRequest = require('../../../Helpers/flightSearchRequest');
const SeatItenary = require('../SeatSelection/SeatItenary.page');
const SeatMapping = require('../SeatSelection/SeatMapping.page');
const PassengerDetailsElements = require('../../../PageElements/FlightSelling/PassengerDetails_page.js')

class PassengerDetails {

    obj_seating = new SEATING();
    obj_pax_helper = new PAXHELPER();
    obj_seatItenary = new SeatItenary();
    obj_selectSeat = new SeatMapping();

    // to check pessenger page is for SH or LH
    async enterPassengerDetails() {
        await page.waitForTimeout(20000);
        const Title = myuserdata.title;
        const FirstName = myuserdata.firstName;
        const lastname = myuserdata.lastName;
        const emailAddress = myuserdata.emailAddress;
        const phoneNumber = myuserdata.phoneNumber;
        const gender = myuserdata.gender;

        let flightData = flightSearchRequest.getDefaultData();

        const elements = await page.locator("(//span[text()='Gender on passport ']/../following-sibling::select)[1]")
        if (await elements.isVisible()) {
            console.log("LH")
            await this.enterPassengerDetailsforLongHaul(flightData,Title, FirstName, lastname, emailAddress, phoneNumber, gender);
        }
        else {
            console.log("SH")
            await this.enterPassengerDetailsforShortHaul(flightData,Title, FirstName, lastname, emailAddress, phoneNumber);
        }
        await this.clickPassengerContinueButton();
    };


    async enterPassengerDetailsforShortHaul(flightData,Title, FirstName, lastname, emailAddress, phoneNumber) {    

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

        let PassengerCount = intAdult + intYoungAdult + intChildrens + intInfant

        for (let j = 1; j <= PassengerCount; j++) {
            let PaxFirstName = FirstName + String.fromCharCode(64 + j);

            await page.locator("(//span[text()='Title']/../following-sibling::select)[" + j + "]").type(Title, { delay: 100 })
            await page.locator("(//input[contains(@name,'-firstName')])[" + j + "]").type(PaxFirstName, { delay: 100 });
            await page.locator("(//input[contains(@name,'-lastName')])[" + j + "]").type(lastname, { delay: 100 });

        }

        let itr = 1;

        for (; itr <= intYoungAdult; itr++) {
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

        let email_address = page.locator(PassengerDetailsElements.passengerdetails.locate_email_address)
        await email_address.type(emailAddress)

        let phone_number = page.locator(PassengerDetailsElements.passengerdetails.locate_phone_number)
        await phone_number.type(phoneNumber);

        LOGGER.info('Passenger entry for SH successfull', { classname: 'PassengerDetails' });
    }

    async enterPassengerDetailsforLongHaul(flightData, Title, FirstName, lastname, emailAddress, phoneNumber, gender) {
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

        for (let j = 1; j <= PassengerCount; j++) {
            let PaxFirstName = FirstName + String.fromCharCode(64 + j);

            await page.locator("(//span[text()='Title']/../following-sibling::select)[" + j + "]").type(Title, { delay: 100 })
            await page.locator("(//input[contains(@name,'-firstName')])[" + j + "]").type(PaxFirstName, { delay: 100 });
            await page.locator("(//input[contains(@name,'-lastName')])[" + j + "]").type(lastname, { delay: 100 });
            await page.locator("(//span[text()='Gender on passport ']/../following-sibling::select)[" + j + "]").type(gender, { delay: 100 });
        }

        let itr = 1;

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


        let email_address = page.locator(PassengerDetailsElements.passengerdetails.locate_email_address)
        await email_address.type(emailAddress)

        let phone_number = page.locator(PassengerDetailsElements.passengerdetails.locate_phone_number)
        await phone_number.type(phoneNumber);

        LOGGER.info('Passenger entry for LH successfull', { classname: 'PassengerDetails' });
    }


    async clickPassengerContinueButton() {
        let continue_button = page.locator(PassengerDetailsElements.passengerdetails.locate_continue_button)
        await continue_button.click();

        LOGGER.info('Passenger entry completed', { classname: 'PassengerDetails' });
    }

    async ErrorVerficationForYoungAdult(AgeError){        
        let DOBYA = new Date();
       try{
         DOBYA.setDate(DOBYA.getDate());
        
        let DOBPastDateA = String(DOBYA.getDate());
        let DOBPastMonthA = DOBYA.toLocaleDateString("default", { month: "2-digit" }); 
        let DOBPastYearA = String((DOBYA.getFullYear() - 16));

        for (let itr = 1; itr = 1; itr++) {
            await page.locator("(//input[@placeholder='DD'])[" + itr + "]").type(DOBPastDateA, { force: true }, { delay: 100 });
            await page.locator("(//input[@placeholder='MM'])[" + itr + "]").type(DOBPastMonthA, { force: true }, { delay: 100 });
            await page.locator("(//input[@placeholder='YYYY'])[" + itr + "]").type(DOBPastYearA, { force: true }, { delay: 100 });
            break;
        }
         await this.clickPassengerContinueButton();
        
         let error_msg = await page.locator(PassengerDetailsElements.passengerdetails.locate_passenger_error).textContent();
         await error_msg.waitFor();
         expect(error_msg).to.equal(AgeError);

}catch (error) {
    LOGGER.error('[ERROR] flight is not Selected')

}
    }

    async continueNextToSeatingPage() {
        await this.enterPassengerDetails();
    }
}
module.exports = PassengerDetails;
