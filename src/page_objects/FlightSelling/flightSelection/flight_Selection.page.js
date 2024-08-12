const LOGGER = require('../../../setup/logger');
const FAREQUOTE = require ('../farequote/farequote.page');
const flightSearchRequest= require('../../../Helpers/flightSearchRequest');
const FlightSelectionPageElement = require('../../../PageElements/FlightSelling/FlightSelection_page.js');
const { expect, assert } = require('chai');
const UTILS = require('../../../Helpers/utils.js');
const utils= new UTILS();
const PageElementHelper = require('../../../Helpers/PageElementHelper.js')
const obj_PageElementHelper= new PageElementHelper(); 
const flightSelectionTitle = "British Airways - Flight Selection";
const detailPopUpTitle = "Flight Details";

class SelectionFlight {
   
    async assert_tax_fee() {
        try {
            await page.getByRole('link', { name: 'Taxes, fees and carrier charges' }).isEnabled();
        } catch (error) {
            LOGGER.error("[ASSERTION ERROR] Flight Selection: Assert Tax Fee");
        }
    }

    async assert_disability() {
        try {
            await page.getByRole('link', { name: 'Disability assistance' }).isEnabled();
        } catch (error) {
            LOGGER.error("[ASSERTION ERROR] Flight Selection: Assert Disability");
        }
    }

    async CommericalFlightSelection(flightSearchRequest, expectedOperatorName) {
        const MAX_FLIGHTS = 40;

        if (flightSearchRequest.flightType === "Direct Flights") {
            await obj_PageElementHelper.findLocator(FlightSelectionPageElement.flightSelection.locate_direct_flight_text, 20000);

            for (let flightIndex = 1; flightIndex <= MAX_FLIGHTS; flightIndex++) {
                let actualOperator = `(//*[contains(@class,'direct-flights')][1]//*[text()=' Flight Details ']/../preceding-sibling::span[3]/span/span[1])[${flightIndex}]`;
                let actualOperatorName = await obj_PageElementHelper.getElementText(actualOperator, 5000);

                if (expectedOperatorName.trim() === actualOperatorName) {
                    const cabinSelected = await this.cabinClassSelect(flightIndex, flightSearchRequest);
                    if (cabinSelected) break;
                }
            }
        } else {
            await obj_PageElementHelper.findLocator(FlightSelectionPageElement.flightSelection.locate_connecting_flight_text, 20000);

            for (let flightIndex = 1; flightIndex <= MAX_FLIGHTS; flightIndex++) {
                let actualOperator = `(//*[contains(@class,'connecting-flights')][1]//*[text()=' Flight Details ']/../preceding-sibling::span[3]/span/span[1])[${flightIndex}]`;
                let actualOperatorName = await obj_PageElementHelper.getElementText(actualOperator, 5000);

                if (expectedOperatorName.trim() === actualOperatorName) {
                    const cabinSelected = await this.cabinClassSelect(flightIndex, flightSearchRequest);
                    if (cabinSelected) break;
                }
            }
        }
    }

    async cabinClassSelect(flightIndex, flightData) {
        let MAX_CLASSES = `(//*[contains(@class,'cabin-button-wrapper')])[${flightIndex}]//div`
        MAX_CLASSES = await page.$$(MAX_CLASSES);

        for (let classIndex = 1; classIndex <= MAX_CLASSES.length; classIndex++) {
            const cabinClass = `(//*[text()=' Flight Details ']/../../../following-sibling::div/div[${classIndex}]//ba-content/span[1])[${flightIndex}]`;
            const cabinClassName = await obj_PageElementHelper.getElementText(cabinClass, 5000);
            let cabinClassSelect = `(//*[text()=' Flight Details ']/../../../following-sibling::div/div[${classIndex}]//ba-content[1])[${flightIndex}]`;

            if (cabinClassName === flightData.cabinClass.trim()) {
                cabinClassSelect = await obj_PageElementHelper.findLocator(cabinClassSelect, 5000);
                await cabinClassSelect.click();
            } else if (cabinClassName.includes('Basic') || cabinClassName.includes('Hand baggage only')) {
                cabinClassSelect = await obj_PageElementHelper.findLocator(cabinClassSelect, 5000);
                await cabinClassSelect.click();
            } else if (flightData.cabinClass.trim() == 'Economy') {
                cabinClassSelect = await obj_PageElementHelper.findLocator(cabinClassSelect, 5000);
                await cabinClassSelect.click();
            }

            const isCabinSelected = await this.selectCabin(flightData, flightIndex, MAX_CLASSES);
            if (isCabinSelected) return true;
        }
        return false;
    }

    async selectCabin(flightData, flightIndex, MAX_CLASSES) {
        for (let selectCabin = 1; selectCabin <= MAX_CLASSES.length; selectCabin++) {

            let selectCabinClass = `(//*[contains(text(),'Flight Details')]/../../../following-sibling::lib-ba-drawer//app-flight-card-original[${selectCabin}]//ba-content/h5[1])[${flightIndex}]`;
            let selectCabinClassName = await obj_PageElementHelper.getElementText(selectCabinClass, 5000);
            let selectCabinButton = `(//*[contains(text(),'Flight Details')]/../../../following-sibling::lib-ba-drawer//app-flight-card-original[${selectCabin}]//ba-button)[${flightIndex}]`;

            if (selectCabinClassName === flightData.cabinClass.trim()) {
                selectCabinButton = await obj_PageElementHelper.findLocator(selectCabinButton, 5000);
                await selectCabinButton.click();
                return true;
            } else if (selectCabinClassName.includes('Basic') || selectCabinClassName.includes('Hand baggage only')) {
                selectCabinButton = await obj_PageElementHelper.findLocator(selectCabinButton, 5000);
                await selectCabinButton.click();
                return true;
            } else if (flightData.cabinClass.trim() == 'Economy') {
                selectCabinButton = await obj_PageElementHelper.findLocator(selectCabinButton, 5000);
                await selectCabinButton.click();
                return true;
            }
        }
        return false;

    }


    async selectCheapestFlightLink() {
    await page.locator(FlightSelectionPageElement.flightSelection.locate_DiscoverLink).first().click();
     
     await page.getByText('Find our cheapest flights').first().click();
        await page.waitForTimeout(2000);


    }
    async validateCheaptestFareQuotePage() {
        await page.locator(FlightSelectionPageElement.flightSelection.locate_CheapestFareQuotePage).isVisible();

    }
    async selectCountryOfResidence(CountryOfResidence) {

        await page.locator(FlightSelectionPageElement.flightSelection.locate_Country_of_Resident_link).click();
        await page.locator(FlightSelectionPageElement.flightSelection.locate_CountryDrpDwn).selectOption(CountryOfResidence);
        await page.locator(FlightSelectionPageElement.flightSelection.locate_Language).selectOption("English");
        await page.waitForTimeout(2000)
        await page.locator(FlightSelectionPageElement.flightSelection.locate_Change_Region_Btn).click();
    }
    
    async lowestFaredestinationsList(city) {
        await page.locator("//span[contains(text(),'" + city + "')]");
        await page.locator(FlightSelectionPageElement.flightSelection.locate_Cheapest_Destination_table).isVisible();
    }
    async selectNumberOfNightsDrpDwn() {

        await page.locator(FlightSelectionPageElement.flightSelection.locate_NumberOfNightsDrpDwn).click();
    }
    async OfferDestinationToEnterOnLowestFarePage() {
        await page.waitForTimeout(2000)
        const isClickable = await page.$eval(FlightSelectionPageElement.flightSelection.locate_To_Destination_Search_TextBx, input => !input.disabled && !input.readOnly && input.offsetWidth > 0 && input.offsetHeight > 0);
        expect(isClickable).to.be.true;
    }

    async checkMaxNightOptDrpdwn() {
        const dropdownElement = await page.$(FlightSelectionPageElement.flightSelection.locate_NumberOfNightsDrpDwn);
        const options = await dropdownElement.$$eval('option', options => options.map(option => option.textContent));
        const desiredOption = '14 nights';
        const optionExists = options.includes(desiredOption);
        assert.isTrue(optionExists, `Option "${desiredOption}" is not available in the dropdown`);
    }
    async cheapestFarePage() {

        this.selectCheapestFlightLink();
        this.validateCheaptestFareQuotePage();
        await page.waitForTimeout(2000)
    }
    async selectCheapestFarePageCabin(cabin) {
        await page.locator(FlightSelectionPageElement.flightSelection.locate_CheapestFare_Cabin).selectOption(cabin);

    }
    async validatedSelectedOptionFromDrpDn(option) {
        const selectedOption = await page.locator(FlightSelectionPageElement.flightSelection.locate_CheapestFare_Cabin).evaluate(option => option.selected);
        return selectedOption === option;


    }

    async continueNextToFareQuote() {
        let flightData = flightSearchRequest.getDefaultData();
        let getFlightSegment = (flightData.journeyType === "return") ? 2 : 1;
        let expectedOperator = flightData.operator.split(",");

        if (flightData.journeyType == "connection combination oneway") {
            await this.selectFlightByOperator(flightData)
        } else {
            for (let flightSegmentIndex = 0; flightSegmentIndex < getFlightSegment; flightSegmentIndex++) {
                let expectedOperatorName = (expectedOperator[flightSegmentIndex] != null) ? expectedOperator[flightSegmentIndex] : expectedOperator[0];
                await this.CommericalFlightSelection(flightData, expectedOperatorName);
            }
        }
        
        await page.waitForLoadState('domcontentloaded');
        await utils.confirmPageLoad();
    }

    async selectFlightByOperator(flightSearchRequest) {
        let connecting_flight_text = await page.locator(FlightSelectionPageElement.flightSelection.locate_connecting_flight_text);
        let select_btn = await page.locator(FlightSelectionPageElement.flightSelection.locate_select_btn);
        try {
            await connecting_flight_text.waitFor();
            await connecting_flight_text.isVisible();
            for (let i = 1; i < 2; i++) {
                let operator = await page.$$(FlightSelectionPageElement.flightSelection.locator_connection_different_operator);
                for (let k = 1; k < 40; k++) {
                    let element = await operator[k];
                    let operator_Name = await element.textContent();

                    if ((flightSearchRequest.operator.split(",")[1] === String(operator_Name))) {
                        for (let j = 1; i <= 4; j++) {
                            let cabinClass_selection = await page.locator("(//span[contains(text(),'connection')]/../../../following-sibling::div/div[" + j + "]//button/ba-content/span[1])[" + k + "]").textContent();
                            if (flightSearchRequest.cabinClass === String(cabinClass_selection.trim())) {
                                let cabinClass_selection_click = await page.locator("(//span[contains(text(),'connection')]/../../../following-sibling::div/div[" + j + "]//ba-content)[" + k + "]/..")
                                await cabinClass_selection_click.waitFor();
                                await cabinClass_selection_click.click();
                                await select_btn.waitFor();
                                await select_btn.click();
                            }
                        } break;
                    }

                }
            }

        } catch (error) {
            LOGGER.error('[ERROR] flight is not Selected')
        }
    }

    async verifyCloseFlightSelectionBtn(){
        let flightSelectionCloseBtn = await page.locator(FlightSelectionPageElement.flightSelection.locate_flight_selection_close_btn);
        if(await flightSelectionCloseBtn.isVisible()){
            await flightSelectionCloseBtn.click();
        }
    }
    async verifyFlightSelectionPageLoaded(){
        await page.waitForLoadState('domcontentloaded');
        await utils.confirmPageLoad();
    }

    async assertFlightSelectionPage() {
        await page.waitForTimeout(5000);
        const pageTitle = await page.title();
        expect(pageTitle).to.equal(flightSelectionTitle);
    }

    async assertFlightAttributes() {
        let popUp = await page.getByRole('document', { name: '#ba-modal-4-title' });
        await popUp.isVisible();
        let popUpHeading = await page.locator('#ba-modal-4-title', { hasText: 'Flight Details' }).textContent();
        expect(popUpHeading).to.equal(detailPopUpTitle);
    }

    async clickFlightDetails() {
        let flightData = flightSearchRequest.getDefaultData();
        let MAX_FLIGHTS = 40;
        let getFlightSegment = (flightData.journeyType === "return") ? 2 : 1;
        let expectedOperator = flightData.operator.split(",");

        for (let flightSegmentIndex = 0; flightSegmentIndex < getFlightSegment; flightSegmentIndex++) {
            let expectedOperatorName = (expectedOperator[flightSegmentIndex] != null) ? expectedOperator[flightSegmentIndex] : expectedOperator[0];

            if (flightData.flightType === "Direct Flights") {
                await obj_PageElementHelper.findLocator(FlightSelectionPageElement.flightSelection.locate_direct_flight_text, 20000);
                for (let flightIndex = 1; flightIndex <= MAX_FLIGHTS; flightIndex++) {
                    let actualOperator = `(//*[contains(@class,'direct-flights')][1]//*[text()=' Flight Details ']/../preceding-sibling::span[3]/span/span[1])[${flightIndex}]`;
                    let actualOperatorName = await obj_PageElementHelper.getElementText(actualOperator, 5000);

                    if (expectedOperatorName.trim() === actualOperatorName) {
                        let flightDetails = await page.locator(`(//*[contains(@class,'direct-flights')][1]//*[text()=' Flight Details '])[${flightIndex}]`);
                        await flightDetails.isVisible();
                        await flightDetails.click();
                        break;
                    }
                }
            }

        }
    }

    async clickOnEditSearchButton(){
        let editSearchButton = await page.locator(FlightSelectionPageElement.flightSelection.locate_edit_search_button);
        await editSearchButton.waitFor();
        await editSearchButton.click();
    }

    async verifyEditSearchPopUp(){
        let editSearchPopUp = await page.locator(FlightSelectionPageElement.flightSelection.locate_edit_search_popUp);
        await editSearchPopUp.waitFor();
        expect(await editSearchPopUp.isVisible()).to.be.true;
    }

    async verifyPaxInEditSearchPopUp() {
        let flightData = flightSearchRequest.getDefaultData();
        let actualTotalPax = await obj_PageElementHelper.getElementText(FlightSelectionPageElement.flightSelection.locate_edit_search_total_pax, 7000);

        let getActualTotalPax = actualTotalPax.split(",");

        for (let i = 0; i <= getActualTotalPax.length - 1; i++) {

            let paxName = getActualTotalPax[i].trim().match(/(\d+\s+)(\w+)/)[2];
            let paxCount = getActualTotalPax[i].trim().match(/\d+/g)[0];

            if (paxName != 'undefined') {
                if (paxName.includes('adult')) {
                    expect(flightData.adult).to.be.equal(paxCount);
                } else if (paxName.includes('young')) {
                    expect(flightData.youngAdult).to.be.equal(paxCount);
                } else if (paxName.includes('children')) {
                    expect(flightData.child).to.be.equal(paxCount);
                } else if (paxName.includes('infant')) {
                    expect(flightData.infant).to.be.equal(paxCount);
                }
            }
        }
    }
}

module.exports = SelectionFlight;