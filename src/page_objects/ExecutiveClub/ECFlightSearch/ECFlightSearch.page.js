const logger = require("../../../setup/logger");
const flightSearchRequest = require('../../../Helpers/flightSearchRequest.js');
const LOGGER = require('../../../setup/logger');
const { expect } = require('chai');
const { Logger } = require('winston');
const PageElements = require("../../../PageElements/ExecutiveClub/ECFlightSearch.pagelements.js");
const DateHelper = require("../../../Helpers/DateHelper.js");
const Constants = require("../../../Helpers/Constants.js")

const obj_DateHelper = new DateHelper();

class ECFlightSearch{
 
    async VerifyBookFlightWithAviosPage() {
    await (page.locator(PageElements.ECFlightSearch.locate_bookWithAvios_tab)).isVisible();
    let text = await page.locator(PageElements.ECFlightSearch.locate_bookWithAvios_tab).textContent();
    expect(text).to.equal("Book with Avios");
               
    }

    async ECFlightSearch() {
        logger.info('EC Flight Search Page is Loaded', { classname: 'ECFlightSearch' });

        let flightData = flightSearchRequest.getDefaultData();
        let text_box_from = await page.locator(PageElements.ECFlightSearch.locate_DepartFrom_Textbox);
        let text_box_to = await page.locator(PageElements.ECFlightSearch.locate_Destination_Textbox);
        let one_way_checkbox = await page.locator(PageElements.ECFlightSearch.locate_journeyType_checkbox);

        let adultPax = await page.locator(PageElements.ECFlightSearch.locate_pax_adult_dropdown);
        let youngAdultPax = await page.locator(PageElements.ECFlightSearch.locate_pax_YoungAdult_dropdown);
        let childrenPax = await page.locator(PageElements.ECFlightSearch.locate_pax_Children_dropdown);
        let infantPax = await page.locator(PageElements.ECFlightSearch.locate_pax_Infant_dropdown);
        let BaAmericanExpressCompanionVoucher= await page.locator(PageElements.ECFlightSearch.locate_BaAmericanExpressCompanionVoucher);   

        let Departure_month_LS = await page.locator(PageElements.ECFlightSearch.locate_Departure_month_LS);
        let Departure_year_LS = await page.locator(PageElements.ECFlightSearch.locate_Departure_year_LS);
        let Departure_Next_month_button = await page.locator(PageElements.ECFlightSearch.locate_Departure_Next_month_button);
        let Departure_month_RS = await page.locator(PageElements.ECFlightSearch.locate_Departure_month_RS);
        let Departure_year_RS = await page.locator(PageElements.ECFlightSearch.locate_Departure_year_RS);
        let Departure_date = await page.locator(PageElements.ECFlightSearch.locate_Departure_date);
        let Departure_date_picker = await page.locator(PageElements.ECFlightSearch.locate_Departure_date_picker);

        let Return_month_LS                      = await page.locator(PageElements.ECFlightSearch.locate_Return_month_LS);
        let Return_year_LS                       = await page.locator(PageElements.ECFlightSearch.locate_Return_year_LS);
        let Return_Next_month_button             = await page.locator(PageElements.ECFlightSearch.locate_Return_Next_month_button);
        let Return_month_RS                      = await page.locator(PageElements.ECFlightSearch.locate_Return_month_RS);
        let Return_year_RS                       = await page.locator(PageElements.ECFlightSearch.locate_Return_year_RS);
        let Return_date                          = await page.locator(PageElements.ECFlightSearch.locate_Return_date);
        let Return_date_picker                   = await page.locator(PageElements.ECFlightSearch.locate_Return_date_picker);
        let Upgrade_Inbound                      = await page.locator(PageElements.ECFlightSearch.locate_Upgrade_Inbound);

        let getFlights_btn = await page.locator(PageElements.ECFlightSearch.locate_getFlights_btn);
        await page.waitForTimeout(5000);
        if(await Upgrade_Inbound.isVisible()){
            await Upgrade_Inbound.click();
        }
        await page.waitForTimeout(5000);
        await text_box_from.fill(flightData.depart);
        await text_box_from.press('Enter');
        await page.waitForTimeout(2000);
        await text_box_to.fill(flightData.arrival);
        await text_box_to.press('Enter');
        await page.waitForTimeout(2000);

        let depArrDate = await obj_DateHelper.setDateEC(Constants.Const.DDMMYY)
        const departureDateSelection = depArrDate[0];
        await Departure_date.click();
        await Departure_date_picker.isVisible();

        const futureYearDepartureDate = DateHelper.YEAR;
        const futureMonthDepartureDateString = await obj_DateHelper.getMonthLongOutBound();

        while (true) {
            const Departure_currentYear_LS = await Departure_year_LS.textContent();
            const Departure_currentMonth_LS = await Departure_month_LS.textContent();
            const Departure_currentYear_RS = await Departure_year_RS.textContent();
            const Departure_currentMonth_RS = await Departure_month_RS.textContent();

            if (((parseInt(Departure_currentYear_LS) === futureYearDepartureDate) && (Departure_currentMonth_LS === futureMonthDepartureDateString)) || ((parseInt(Departure_currentYear_RS) === futureYearDepartureDate) && (Departure_currentMonth_RS === futureMonthDepartureDateString))) {
                break;
            }

            await Departure_Next_month_button.click();
            await page.waitForTimeout(2000);
        }
       // await page.locator("(//*[@aria-label='"+ departureDateSelection +"'])[1]").click();
       await page.locator(`//*[@id='departInputDate_root']//*[@class='picker__box']//*[text()='${futureMonthDepartureDateString}']/following-sibling::table//*[@aria-label='${departureDateSelection}']`).click();

        if (flightData.journeyType == "return") {
            const returnDateSelection = depArrDate[1];
            await Return_date.click();
            await Return_date_picker.isVisible();

            const futureYearArrivalDate = DateHelper.YEAR;
            const futureMonthArrivalDateString = await obj_DateHelper.getMonthLongInBound();

            while (true) {
                const Return_currentYear_LS = await Return_year_LS.textContent();
                const Return_currentMonth_LS = await Return_month_LS.textContent();
                const Return_currentYear_RS = await Return_year_RS.textContent();
                const Return_currentMonth_RS = await Return_month_RS.textContent();

                if (((parseInt(Return_currentYear_LS) === futureYearArrivalDate) && (Return_currentMonth_LS === futureMonthArrivalDateString)) || ((parseInt(Return_currentYear_RS) === futureYearArrivalDate) && (Return_currentMonth_RS === futureMonthArrivalDateString))) {
                    break;
                }
                await Return_Next_month_button.click();
                await page.waitForTimeout(2000);
            }

         //   await page.locator("(//*[@aria-label='" + returnDateSelection + "'])[2]").click();
         await page.locator(`//*[@id='returnInputDate_root']//*[@class='picker__box']//*[text()='${futureMonthArrivalDateString}']/following-sibling::table//*[@aria-label='${returnDateSelection}']`).click();
         await page.waitForTimeout(5000);
        } else{
            await one_way_checkbox.click();
            await page.waitForTimeout(2000);
        }

        await adultPax.selectOption({ value: `${flightData.adult}` });
        await youngAdultPax.selectOption({ value: `${flightData.youngAdult}` });
        await childrenPax.selectOption({ value: `${flightData.child}` });
        await infantPax.selectOption({ value: `${flightData.infant}` });

        await page.waitForTimeout(5000);
        await getFlights_btn.click();
        await page.waitForTimeout(20000);
    }

    async checkPartnerAirlinesOffered(expectedAirline) {
        const airlineElements = await page.$$(PageElements.ECFlightSearch.locate_PartnerAirLines);
        if (airlineElements.length === 0) {
            throw new Error("No airline elements found");
        }
        const foundAirlines = [];
        for (const airlineElement of airlineElements) {
            const airlineName = await airlineElement.innerText();
            foundAirlines.push(airlineName);
        }
        expect(foundAirlines).to.include(expectedAirline, `Expected airline ${expectedAirline} not found`); 
    }

    async clickOnNoVoucherRadioButton() {
        await page.waitForTimeout(2000);
        let noVoucher_lbl = page.locator(PageElements.ECFlightSearch.locate_no_voucher_lbl);
        if (await noVoucher_lbl.isVisible()) {
            await noVoucher_lbl.click();
            await page.waitForTimeout(2000);
        }
    }

    async clickOnAmexVoucherRadioButton() {
        let amexVocher_lbl = page.locator(PageElements.ECFlightSearch.locate_amex_voucher_lbl);
        let amexEVoucher = page.locator(PageElements.ECFlightSearch.locate_amex_e_voucher);
        let isChecked = await amexVocher_lbl.evaluateAll(e => e.map(e => e.checked));

        if (isChecked) {
            await this.clickOnNoVoucherRadioButton();
            await page.waitForTimeout(2000);
            await amexVocher_lbl.click();
            await page.waitForTimeout(2000);
            await amexEVoucher.click();
            await page.waitForTimeout(2000);
        }
    }

    async continueToEcFlightListPage(paymentType) {
        if (await paymentType === "Book with Avios" || await paymentType === "PartAvios PartCash") {
            await this.clickOnNoVoucherRadioButton();
        } else if (await paymentType.includes("BA American Express Credit Card Companion Voucher")) {
            await this.clickOnAmexVoucherRadioButton();
        }

        await this.ECFlightSearch();
    }
}
module.exports=ECFlightSearch;