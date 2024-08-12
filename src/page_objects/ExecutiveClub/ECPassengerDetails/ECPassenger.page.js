const LOGGER = require('../../../setup/logger');
const myuserdata = require("../../../models/passengerDetails.json");
const flightSearchRequest = require('../../../Helpers/flightSearchRequest.js');
const PageElements = require("../../../PageElements/ExecutiveClub/ECRedemptionPassengerPage.pagelements.js");

class EC_Passenger {

    static Pax_First_Name_Value = null;

    async EnterPassengerDetails(flightData, Title, FirstName, LastName, Gender) {
        let continue_button = page.locator(PageElements.RedemptionPassenger.locate_continue_button);
        let intAdult = parseInt(flightData.adult);
        let intYoungAdult = parseInt(flightData.youngAdult);
        let intChildrens = parseInt(flightData.child);
        let intInfant = parseInt(flightData.infant);
        let country_code = page.locator(PageElements.RedemptionPassenger.locate_country_code);
        let PassengerCount = intAdult + intYoungAdult + intChildrens + intInfant;

        const isRouteUS = await page.locator("(//*[contains(text(),'Gender')]/following-sibling::label[1])[1]")

            for (let i = 2; i <= PassengerCount; i++) {
                let PaxFirstName = await FirstName + String.fromCharCode(64 + i);
                let passenger_title = await page.locator("(//select[@class='input-primary'])[" + i + "]");
                let passenger_Fname = await page.locator("(//input[contains(@name,'firstName')])[" + i + "]");
                let passenger_Lname = await page.locator("(//input[contains(@name,'lastName')])[" + i + "]");

                await passenger_title.type(Title);
                await passenger_Fname.clear();
                await passenger_Fname.type(PaxFirstName);
                await passenger_Lname.clear();
                await passenger_Lname.type(LastName);
            }

            await this.EnterGender(isRouteUS,PassengerCount,Gender);
            await this.EnterDOB(isRouteUS, intAdult, intYoungAdult, intChildrens, intInfant);
            await country_code.click();
            await country_code.selectOption({ value: "GB" });
            await this.getPaxName();
            await continue_button.waitFor();
            await continue_button.click();
        
    }

    async EnterGender(isRouteUS,PassengerCount,Gender) {
        for (let i = 1; i <= PassengerCount; i++) {
            if (await isRouteUS.isVisible()) {
                let maleGenderRadioBtn = await page.locator("(//span[contains(text(),'Male')])[" + i + "]");
                let femaleGenderRadioBtn = await page.locator("(//span[contains(text(),'Female')])[" + i + "]");

                if (Gender == "M") {
                    await maleGenderRadioBtn.click();
                } else {
                    await femaleGenderRadioBtn.click();
                }
            }
        }
    }

    async EnterDOB(isRouteUS, intAdult, intYoungAdult, intChildrens, intInfant) {
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

        let DOBPastYearA = String((DOBYA.getFullYear() - 18));
        let DOBPastYearYA = String((DOBYA.getFullYear() - 14));
        let DOBPastYearC = String((DOBYA.getFullYear() - 10));
        let DOBPastYearI = String((DOBYA.getFullYear() - 1));

        let itr = 0;

        if (await isRouteUS.isVisible()) {
            itr = 2;
            for (; itr <= intAdult; itr++) {
                await page.locator("(//*[contains(text(),'Date of birth')]/following-sibling::div[1]//select)[" + itr + "]").selectOption({ value: "" + DOBPastDateA + "" });
                await page.locator("(//*[contains(text(),'Date of birth')]/following-sibling::div[2]//select)[" + itr + "]").selectOption({ value: `${DOBPastMonthA}` });
                await page.locator("(//*[contains(text(),'Date of birth')]/following-sibling::div[3]//input)[" + itr + "]").type(DOBPastYearA, { force: true }, { delay: 100 });
            }

            for (; itr <= (intAdult + intYoungAdult); itr++) {
                await page.locator("(//*[contains(text(),'Date of birth')]/following-sibling::div[1]//select)[" + itr + "]").selectOption({ value: "" + DOBPastDateYA + "" });
                await page.locator("(//*[contains(text(),'Date of birth')]/following-sibling::div[2]//select)[" + itr + "]").selectOption({ value: `${DOBPastMonthYA}` });
                await page.locator("(//*[contains(text(),'Date of birth')]/following-sibling::div[3]//input)[" + itr + "]").type(DOBPastYearYA, { force: true }, { delay: 100 });
            }

            for (; itr <= (intAdult + intYoungAdult + intChildrens); itr++) {
                await page.locator("(//*[contains(text(),'Date of birth')]/following-sibling::div[1]//select)[" + itr + "]").selectOption({ value: "" + DOBPastDateC + "" });
                await page.locator("(//*[contains(text(),'Date of birth')]/following-sibling::div[2]//select)[" + itr + "]").selectOption({ value: `${DOBPastMonthC}` });
                await page.locator("(//*[contains(text(),'Date of birth')]/following-sibling::div[3]//input)[" + itr + "]").type(DOBPastYearC, { force: true }, { delay: 100 });
            }

            for (let i = 1; itr <= (intAdult + intYoungAdult + intChildrens + intInfant); itr++, i++) {
                await page.locator("(//*[contains(text(),'Date of birth')]/following-sibling::div[1]//select)[" + itr + "]").selectOption({ value: "" + DOBPastDateI + "" });
                await page.locator("(//*[contains(text(),'Date of birth')]/following-sibling::div[2]//select)[" + itr + "]").selectOption({ value: `${DOBPastMonthI}` });
                await page.locator("(//*[contains(text(),'Date of birth')]/following-sibling::div[3]//select)[" + i + "]").type(DOBPastYearI, { force: true }, { delay: 100 });
            }
        } else {
            itr = 1;
            for (; itr <= (intYoungAdult); itr++) {
                await page.locator("(//*[contains(text(),'Date of birth')]/following-sibling::div[1]//select)[" + itr + "]").selectOption({ value: "" + DOBPastDateYA + "" });
                await page.locator("(//*[contains(text(),'Date of birth')]/following-sibling::div[2]//select)[" + itr + "]").selectOption({ value: `${DOBPastMonthYA}` });
                await page.locator("(//*[contains(text(),'Date of birth')]/following-sibling::div[3]//input)[" + itr + "]").type(DOBPastYearYA, { force: true }, { delay: 100 });
            }

            for (let i = 1; itr <= (intYoungAdult + intInfant); itr++, i++) {
                await page.locator("(//*[contains(text(),'Date of birth')]/following-sibling::div[1]//select)[" + itr + "]").selectOption({ value: "" + DOBPastDateI + "" });
                await page.locator("(//*[contains(text(),'Date of birth')]/following-sibling::div[2]//select)[" + itr + "]").selectOption({ value: `${DOBPastMonthI}` });
                await page.locator("(//*[contains(text(),'Date of birth')]/following-sibling::div[3]//select)[" + i + "]").type(DOBPastYearI, { force: true }, { delay: 100 });
            }
        }

    }

    async continueToPaymentPage() {
        LOGGER.info('EC Passenger Page', { classname: 'EC_Passenger' });
        await page.waitForTimeout(15000);

        let flightData = flightSearchRequest.getDefaultData();
        const Title = myuserdata.title;
        const FirstName = myuserdata.firstName;
        const LastName = myuserdata.lastName;
        const Gender = myuserdata.gender;

        await this.EnterPassengerDetails(flightData, Title, FirstName, LastName, Gender)
    }

    async getPaxName() {
        let Pax_First_Name = (page.locator(PageElements.RedemptionPassenger.locate_pax_first_name))
        EC_Passenger.Pax_First_Name_Value =  await Pax_First_Name.inputValue();
        return EC_Passenger.Pax_First_Name_Value;
    }
}
module.exports = EC_Passenger;