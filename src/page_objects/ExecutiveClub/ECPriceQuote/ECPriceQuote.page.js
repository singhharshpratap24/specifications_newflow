const { assert, expect } = require('chai')
const LOGGER = require('../../../setup/logger');
const PageElements = require("../../../PageElements/ExecutiveClub/ECPriceQuote.pagelements.js");
const EC_Flight_Selection = require('../ECFlightSelection/ECFlightSelection.page')
const flightSearchRequest = require('../../../Helpers/flightSearchRequest');
const PageElementHelper = require('../../../Helpers/PageElementHelper');

class EC_Price_Quote {

  static aviosandprice = null;

  async continueToPassengerPage() {
    LOGGER.info('EC Price Quote Page is Loaded', {
      classname: 'EC_Price_Quote',
    })

    let T_and_C_checkBox = page.locator(PageElements.ECPriceQuote.locate_T_and_C_checkBox)
    let continue_button = page.locator(PageElements.ECPriceQuote.locate_continue_button)

    await T_and_C_checkBox.click()
    await continue_button.click()
  }

    async VerifyYourAviosInAccount() {
        let total_avios = page.locator(PageElements.ECPriceQuote.locate_your_avios_lbl)
        await total_avios.isVisible();
        let text = await total_avios.textContent();
        console.log(text)
        expect(text).contain('Your Avios: ');
        await page.waitForTimeout(5000);
    }

    async isPassengerWisePriceDisplayed(){
       let adultTotalPrice = page.locator(PageElements.ECPriceQuote.locate_adult_total_price)
       await adultTotalPrice.isVisible();
       let youngAdultPrice = page.locator(PageElements.ECPriceQuote.locator_youngadult_total_price)
       await youngAdultPrice.isVisible();
       let infantTotalPrice = page.locator(PageElements.ECPriceQuote.locator_infant_total_price)
       await infantTotalPrice.isVisible();
   }

   async verifyAllOptionsInPriceBreakdown(details)   {
    let expectedFields = details.split(",");
     const actualFields=await page.$$(PageElements.ECPriceQuote.locate_total_summary_block);
     for (let i = 1, j=0; i < actualFields.length, j<expectedFields.length; i++, j++) {
       let actualElement = actualFields[i];
       let actualField = await actualElement.textContent();
       if (expectedFields[j].trim()==="TFC's per person".trim()){
        expectedFields[j]= "Taxes, fees and carrier charges* per person"
      }
      if (expectedFields[j].trim()==="Inclusive Total".trim()){
        let inclusive_total = await page.locator(PageElements.ECPriceQuote.locate_inclusive_total1).textContent();
        actualField=inclusive_total;
        expectedFields[j]=await page.locator(PageElements.ECPriceQuote.locate_inclusive_total1).textContent();
      }
      expect(actualField).to.equal(expectedFields[j]);
     }
     LOGGER.info('EC_Price_Quote Total Price Summary block is verified', {
      classname: 'EC_Price_Quote',
    })
    }
   async VerifyAviosPerPersonInAccount() {
        const avios_per_person = page.locator(PageElements.ECPriceQuote.locate_avios_per_person)
        let isVisibleAviosPerPerson =  await avios_per_person.isVisible();
        expect(isVisibleAviosPerPerson).to.be.true;
        let text = await avios_per_person.textContent();
        console.log(text)
        await page.waitForTimeout(5000);
    }
    async verifyPriceBreakdownInPopUp(details) {
      if(details.startsWith('Price Breakdown')){
      const adult_tax_fare= await page.locator(PageElements.ECPriceQuote.locate_adult_tax_fare).textContent();
      var priceValue = parseFloat(adult_tax_fare.replace(/[^\d\.]/g,''));
      const info_icon = await page.locator(PageElements.ECPriceQuote.locate_info_icon_price_breakdown);
      await info_icon.waitFor();
      await info_icon.click();
      await page.waitForTimeout(2000);
      const total_in_popup= await page.locator(PageElements.ECPriceQuote.locate_total_in_popup);
      const totalFareInPopup = await total_in_popup.textContent();
      const priceInPopup = parseFloat(totalFareInPopup.replace(/[^\d\.]/g,''));
      expect(priceValue).to.be.equal(priceInPopup);
      }
    
  }
    async VerifyTaxesFeesAndCarrierChargesPerPersonInAccount() {
        const taxes_fees = page.locator(PageElements.ECPriceQuote.locate_Taxes_fees_and_carrier_charges_per_person)
        let isVisibleTaxesFees = await taxes_fees.isVisible();
        expect(isVisibleTaxesFees).to.be.true;
        let text = await taxes_fees.textContent();
        console.log(text)
        await page.waitForTimeout(5000);
    }

  async VerifyPricePerPersonInAccount() {
    const price_per_person = page.locator(PageElements.ECPriceQuote.locate_Price_per_person)
    let isVisiblePricePerPerson = await price_per_person.isVisible();
    expect(isVisiblePricePerPerson).to.be.true;
    let text = await price_per_person.textContent()
    console.log(text)
    await page.waitForTimeout(5000)
  }

  async verifyInclusiveTotalPrice() {
    let inclusive_total1 = await page.locator(PageElements.ECPriceQuote.locate_inclusive_total1);
    let inclusive_total2 = await page.locator(PageElements.ECPriceQuote.locate_inclusive_total2);
    let inclusive_total3 = await page.locator(PageElements.ECPriceQuote.locate_inclusive_total3);
    try {
      expect(inclusive_total1.isVisible()).to.be.true;
      expect(inclusive_total2.isVisible()).to.be.true;
      expect(inclusive_total3.isVisible()).to.be.true;
    }
    catch (error) {
      LOGGER.info('Inclusive Total is not visible as expected', {
        classname: 'EC_Price_Quote',
      })
    }
    await page.waitForTimeout(5000)
  }
 
  async isCorrectIteneryDisplayed() {
    const flightData = flightSearchRequest.getDefaultData();
    let acFlights = [];
    let actualOutboundFlightNumber = await page.locator("//*[@id='journey1FlightNo1']").textContent()
      acFlights.push(actualOutboundFlightNumber);
      if(flightData.journeyType==='return'){
      let actualInboundFlightNumber = await page.locator("//*[@id='journey2FlightNo1']").textContent();
       acFlights.push(actualInboundFlightNumber);
      }
    const expFlights = EC_Flight_Selection.expSelectedFlights;
    LOGGER.info(
      'Actual flights : ' + acFlights + ' Expected flights : ' + expFlights,
    )
    for (let i = 0; i < expFlights.length; i++) {
      expect(acFlights[i]).to.equal(expFlights[i])
    }
  }
  async ChangeAviosPriceOption() {
    let change_avios_price_person = await page.locator(PageElements.ECPriceQuote.locate_change_avios_price_option)
    await change_avios_price_person.click();
    let aviosandpricetext = await page.locator(PageElements.ECPriceQuote.locate_change_avios_price_option).textContent()
    let aviosandpricesplitext = aviosandpricetext.split(/\s+/);
    EC_Price_Quote.aviosandprice = aviosandpricesplitext[0];
    await page.waitForTimeout(5000);
    return EC_Price_Quote.aviosandprice;
  }

  async verifyUpgradeOptions() {
    const isUpgradeOptions = await page
      .locator(PageElements.ECPriceQuote.locate_upgrade_options)
      .isVisible()
    return isUpgradeOptions
  }
  
  async verifyCorrectSeatingMessageForInfant(message) {
    let str1 = await page.locator("div#errorMsg > h3").textContent();
    let str2 = await page.locator("div#errorMsg > p").textContent();
    let InfantSeatingMsg = str1 + str2;
    try {
        expect(InfantSeatingMsg).to.deep.eql(message);
    }
    catch (error) {
        console.log("[Assertion error] Seating message for Infant is invalid")
    }
}

async verifyAviosDeducted(){    
  let original_avios_count = await page.locator(PageElements.ECPriceQuote.locate_total_avios_count).textContent(); 
  let avios_count_to_be_deducted =await page.locator(PageElements.ECPriceQuote.locate_total_avios_countwithPrice).textContent();
  let original_avois=parseInt(original_avios_count.replace(/,/g, ''));
  let avios_to_be_deducted=parseInt(avios_count_to_be_deducted.replace(/,/g, ''));
  let remainingAvios = original_avois - avios_to_be_deducted

  LOGGER.info("Original avios count: "+original_avois);
  LOGGER.info("avios count to be deducted: "+avios_to_be_deducted);
  LOGGER.info("Remaining avios count: "+remainingAvios);
  expect(remainingAvios).to.be.lessThan(original_avois);
  LOGGER.info(" Total avios to be deducted displayed "+avios_to_be_deducted, { classname : 'EC_Price_Quote'}); 
}

async verifyFareRules(){
  const fare_rules = page.locator(PageElements.ECPriceQuote.locate_fare_rules_conditions)
  let isVisibleFareRules = await fare_rules.isVisible();
  expect(isVisibleFareRules).to.be.true;
  let text = await fare_rules.textContent();
  console.log(text)
  await page.waitForTimeout(5000);
}
}
module.exports = EC_Price_Quote
