const logger = require("../../../setup/logger");
const flightSearchRequest = require('../../../Helpers/flightSearchRequest');
const { expect, assert } = require("chai");
const PageElements = require("../../../PageElements/ExecutiveClub/ECFlightSelection.pagelements.js");

class EC_Flight_Selection {

  static expSelectedFlights = [];
  
  async RedemptionFlightSelection(flightSegmentIndex, flightData) {
    const MAX_FLIGHTS = 20;

    if (flightData.flightType === "Direct Flights") {
      for (let flightIndex = 1; flightIndex <= MAX_FLIGHTS; flightIndex++) {
        try {
          const UI_operator_name = await page.locator("(//article[@role='contentinfo'][" + flightSegmentIndex + "]//*[//*[contains(@class,'direct-flight-details')]]//*[@class='career-and-flight']//span[1])[" + flightIndex + "]").textContent();
          await page.waitForTimeout(2000);
          if (await flightData.operator === String(await UI_operator_name.trim())) {
            const cabinSelected = await this.selectCabinClass(flightSegmentIndex, flightIndex, flightData);
            if (cabinSelected) break;
          }
        } catch (error) {
          console.error(`Error processing flight index ${flightIndex}:`, error);
        }
      }
    }
  }

  async selectCabinClass(flightSegmentIndex, flightIndex, flightData) {
    const MAX_CLASSES = 5;

    for (let classIndex = 1; classIndex <= MAX_CLASSES; classIndex++) {
      const getCabinClassText = await page.locator("(//article[@role='contentinfo'][" + flightSegmentIndex + "]//div[@class='travel-class-detail']/div[" + classIndex + "]//span[@class='travel-class'])[" + flightIndex + "]").textContent();
      const cabinSelect = await page.locator("(//article[@role='contentinfo'][" + flightSegmentIndex + "]//*[@class='flight-list']//div[@class='travel-class-detail']/div[" + classIndex + "]//button)[" + flightIndex + "]");
      await page.waitForTimeout(2000);
      if(String(await getCabinClassText.trim()).includes(await flightData.cabinClass)) {
        let flightDetails = await page.locator(`(//*[@id='SectorFlightsContainer_${flightSegmentIndex-1}']//*[contains(@class,'career-and-flight')]//a)[${flightIndex}]`).textContent();
        const flightNumber = flightDetails.split("-")[1];
        EC_Flight_Selection.expSelectedFlights.push(flightNumber.trim());
        await cabinSelect.click();
        return true;
      }
    }
    return false;
  }

  async verifyFlightListPage() {
    const isFlightListPage = await page.locator(PageElements.ECFlightSelecetion.locate_flight_list_page).isVisible();
    assert.isOk(isFlightListPage, "Flight list page is not visible")
  }

  async verifySoloTraveller(banner) {
    let isSoloTravellerBanner = await page.locator(PageElements.ECFlightSelecetion.locate_solo_traveller_banner).isVisible();
    assert.isOk(isSoloTravellerBanner, "Solo traveller Banner is not visible")
    let getSoloTravellerBannerText = await page.locator(PageElements.ECFlightSelecetion.locate_solo_traveller_banner_text).textContent();
    assert.equal(getSoloTravellerBannerText, banner);
  }

  async assertRFSIndicator(){
    const rfsSymbolOutbound = await page.locator(PageElements.ECFlightSelecetion.locate_rfsSymbolOutbound);
    const rfsSymbolInbound = await page.locator(PageElements.ECFlightSelecetion.locate_rfsSymbolInbound);
    await rfsSymbolOutbound.isVisible();
    await rfsSymbolInbound.isVisible();
  }

  async continueNextToFareQuote() {
    logger.info('EC Flight List Page is Loaded', { classname: 'EC_Flight_Selection' });

    const continue_button = await page.locator(PageElements.ECFlightSelecetion.locate_continue_button);
    const flightData = flightSearchRequest.getDefaultData();
  
    let getFlightSegment = (flightData.journeyType === "return") ? 2 : 1;
    let cabinUpgradeSuccessBannerText = "You have been upgraded to the next cabin on one or more of your flights with your Gold Upgrade Voucher"
    const getPriceButton = await page.locator(PageElements.ECFlightSelecetion.locate_getPriceQuote);
    if (flightData.flightType === "Connecting Flights") {
      await this.handleStopOver();
      await this.selectConnectingFlights(flightData);
    } else {
      for (let flightSegmentIndex = 1; flightSegmentIndex <= getFlightSegment; flightSegmentIndex++) {
        await this.RedemptionFlightSelection(flightSegmentIndex, flightData);
      }
      await continue_button.waitFor();
      await continue_button.click();
    }
    await this.continueRFSModel();
    await page.waitForTimeout(10000);

    let unUsedVoucherList = await page.$(PageElements.ECFlightSelecetion.locate_voucherPopUp);
    if (unUsedVoucherList) {
      const isVisible = await page.evaluate(el => {
        const style = window.getComputedStyle(el);
        return style && style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
      }, unUsedVoucherList);

      if (isVisible) {
        if (flightData.adult > 1) {
          await page.locator(PageElements.ECFlightSelecetion.locate_selectVoucherForTwo).click();
          logger.info("Voucher for 2 selected");
        } else if (flightData.adult === 1) {
          await page.locator(PageElements.ECFlightSelecetion.locate_selectVoucherForOne).click();
          logger.info("Voucher for 1 selected");
        }
        await getPriceButton.click();
        await page.waitForTimeout(5000);
        let cabinUpgradeBanner = await page.locator("//h3[contains(text(),'You have been upgraded')]").textContent();
        assert.equal(cabinUpgradeBanner, cabinUpgradeSuccessBannerText);
      }
    }
  }

  async handleStopOver() {
    await page.waitForLoadState();
    if (await page.title() === "STOPOVERROUTE") {
      await page.waitForSelector(PageElements.ECFlightSelecetion.locate_continueBtnStopover, 8000);
      await page.locator(PageElements.ECFlightSelecetion.locate_continueBtnStopover).click();
      await page.waitForTimeout(8000);
    }
  }

  async selectConnectingFlights(flightData) {
    await page.waitForLoadState();
    await this.selectFlightByOperatorOutbound(flightData);
    await this.selectFlightByOperatorInbound(flightData);
    await page.waitForSelector(PageElements.ECFlightSelecetion.locate_continueBtnConnectingFlights, 10000);
    await page.locator(PageElements.ECFlightSelecetion.locate_continueBtnConnectingFlights).click();
  }

  async selectFlightByOperatorOutbound(flightSearchRequest) {
    let operatorFlightData = flightSearchRequest.operator.split(",");
    await page.waitForTimeout(3000);
    for (let i = 1; i < 10; i++) {
      await page.waitForTimeout(2000);
      for (let j = 1; j <= 2; j++) {
        let operatorName = await page.locator(`(//*[@id='SectorFlightsContainer_0']//*[@class='connection journeyOptions'][${i}]//*[contains(@class,'career-and-flight')]//a)[${j}]`).textContent();
        await page.waitForTimeout(2000);
        if (operatorName.includes(operatorFlightData[j - 1])) {
          if (j == 2) {
            for (let k = 1; k <= 2; k++) {
              let cabinText = await page.locator(`(//*[@id='SectorFlightsContainer_0']//*[@class='connection journeyOptions'][${i}]//*[contains(@class,'flight-segment-cabins')]//span/../div/following-sibling:: span)[${k}]`).textContent();
              if (cabinText === flightSearchRequest.cabinClass) {
                let cabinButton = await page.locator(`(//*[@id='SectorFlightsContainer_0']//*[@class='connection journeyOptions'][${i}]//*[contains(@class,'flight-segment-cabins')]//button)[${k}]`);
                await cabinButton.click();
                return true;
              }
            } return false;
          }
        }
      }
    } return false;
  }

  async selectFlightByOperatorInbound(flightSearchRequest) {
    let operatorFlights = flightSearchRequest.operator.split(",");
    let operatorFlightData = operatorFlights.reverse();
    await page.waitForTimeout(3000);
    for (let i = 1; i < 10; i++) {
      await page.waitForTimeout(2000);
      for (let j = 1; j <= 2; j++) {
        let operatorName = await page.locator(`(//*[@id='SectorFlightsContainer_1']//*[@class='connection journeyOptions'][${i}]//*[contains(@class,'career-and-flight')]//a)[${j}]`).textContent();
        await page.waitForTimeout(2000);
        if (operatorName.includes(operatorFlightData[j - 1])) {
          if (j == 2) {
            for (let k = 1; k <= 2; k++) {
              let cabinText = await page.locator(`(//*[@id='SectorFlightsContainer_1']//*[@class='connection journeyOptions'][${i}]//*[contains(@class,'flight-segment-cabins')]//span)[${k}]`).textContent();
              if (cabinText === flightSearchRequest.cabinClass) {
                let cabinButton = await page.locator(`(//*[@id='SectorFlightsContainer_1']//*[@class='connection journeyOptions'][${i}]//*[contains(@class,'flight-segment-cabins')]//button)[${k}]`);
                await cabinButton.click();
                return true;
              }
            } return false;
          }
        }
      }
    } return false;
  }

  async verifyOnlyBAFlightsAreOffered() {
    const flightData = flightSearchRequest.getDefaultData();
    const expectedAirline = flightData.operator;
    const airlines = await page.$$(PageElements.ECFlightSelecetion.locate_PartnerAirLines);

    for (let i = 0; i < airlines.length; i++) {
      const element = airlines[i];
      const actualAirline = await element.textContent();
      expect(actualAirline).to.include(expectedAirline, `Expected airline ${expectedAirline} not found`);
    }
  }

  async verifyFareQuotePage()
  {
   const farequotepage= await page.locator(PageElements.ECFlightSelecetion.locate_FareQuotePageHeading).isVisible();
    expect(farequotepage).to.be.equal(true)
  }
  
  async  continueRFSModel() {
    
    const popDisplay = await page.locator(PageElements.ECFlightSelecetion.locate_RFS_Model_Continue_Btn).isVisible();
    if (popDisplay) {
        await page.locator(PageElements.ECFlightSelecetion.locate_RFS_Model_Continue_Btn).click();
    }
}

}
module.exports = EC_Flight_Selection;