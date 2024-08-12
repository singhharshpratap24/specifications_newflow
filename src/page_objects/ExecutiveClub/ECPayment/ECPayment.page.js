const myuserdata = require('../../../models/passengerDetails.json')
const CSVCardReader = require('../../../Helpers/csv_card_read')
const LOGGER = require('../../../setup/logger')
const PageElements = require("../../../PageElements/ExecutiveClub/ECPayment.pagelements.js");
const csvcardReader = new CSVCardReader()
const EC_Passenger = require('../../ExecutiveClub/ECPassengerDetails/ECPassenger.page');

class ECPayment {


  async Auth_pwd() {
    let secure_payment_with_PWD = page.frameLocator(
      PageElements.ECPayment.locate_secure_payment_with_PWD,
    )
    try {
      await secure_payment_with_PWD.getByLabel('Password:').fill('1234')
      await secure_payment_with_PWD
        .getByRole('button', { name: 'Submit' })
        .click()
    } catch (error) {
      console.error('Payment Authorization Password not Required')
    }
  }

  async Auth_OTP() {
    try {
      await page
        .frameLocator('iframe[title="Bank Authentication"]')
        .getByPlaceholder(' Enter Code Here')
        .fill('1234')
      await page
        .frameLocator('iframe[title="Bank Authentication"]')
        .getByRole('button', { name: 'SUBMIT' })
        .click()
    } catch (error) {
      LOGGER.error('Payment Authorization OTP not Required')
    }
  }

  async Card_logo() {
    let locate_cardType_logo = page.locator(PageElements.ECPayment.locate_cardType_logo)
    try {
      await locate_cardType_logo.isVisible()
    } catch (error) {
      LOGGER.error('[ASSERTION ERROR] Payment: Assert Card Logo')
    }
  }


  async ECUpdatedpaymentDetails(cardName) {
    const address1 = myuserdata.addressOne
    const address2 = myuserdata.addressTwo
    const postcode = myuserdata.postCode

    let use_new_card_text = await page.locator(PageElements.ECPayment.locate_use_new_card_radio_btn)
    let text_box_card_number = await page.locator(PageElements.ECPayment.locate_text_box_card_number)
    let text_box_CVV = await page.locator(PageElements.ECPayment.locate_text_box_CVV)
    let text_Card_month_expiry = await page.locator(PageElements.ECPayment.locate_text_Card_month_expiry)
    let text_Card_Year_expiry = await page.locator(PageElements.ECPayment.locate_text_Card_Year_expiry)
    let text_address1 = await page.locator(PageElements.ECPayment.locate_text_address1)
    let text_address2 = await page.locator(PageElements.ECPayment.locate_text_address2)
    let text_address3 = await page.locator(PageElements.ECPayment.locate_text_address3)
    let text_postal_code = await page.locator(PageElements.ECPayment.locate_text_postal_code)
    let locate_cardType_logo = page.locator(PageElements.ECPayment.locate_cardType_logo)
    let agree_pay_btn = page.locator(PageElements.ECPayment.locate_agree_pay_btn)

    await page.waitForTimeout(10000)
    if (await use_new_card_text.isVisible()) {
      await use_new_card_text.click()
      await page.waitForTimeout(10000)
      const [CardNo, CVV] = await csvcardReader.getCardName(cardName)
      await text_box_card_number.type(CardNo, { delay: 100 })
      await text_box_card_number.press('Tab')
      await this.Card_logo()

      let ExpiryDate = new Date();
      ExpiryDate.setDate(ExpiryDate.getDate())
      let EDMonth = ExpiryDate.toLocaleDateString('default', {
        month: 'numeric',
      })
      let EDYear = String(ExpiryDate.getFullYear() % 100)
      await text_Card_month_expiry.type(EDMonth, { delay: 500 })
      await text_Card_Year_expiry.type(EDYear, { delay: 500 })

      try {
        let cvv_issue = String(CVV)
        await text_box_CVV.type(cvv_issue, { delay: 500 })
      } catch (error) {
        console.error('CVV not required')
      }
      await agree_pay_btn.click()
      LOGGER.info('Payment done Successfully.', { classname: 'ECPayment' })
    }
    else {
      const [CardNo, CVV] = await csvcardReader.getCardName(cardName)
      await text_box_card_number.type(CardNo, { delay: 100 })
      await text_box_card_number.press('Tab')
      await this.Card_logo()

      let ExpiryDate = new Date();
      ExpiryDate.setDate(ExpiryDate.getDate())
      let EDMonth = ExpiryDate.toLocaleDateString('default', {
        month: 'numeric',
      })
      let EDYear = String(ExpiryDate.getFullYear() % 100)
      await text_Card_month_expiry.type(EDMonth, { delay: 500 })
      await text_Card_Year_expiry.type(EDYear, { delay: 500 })

      try {
        let cvv_issue = String(CVV)
        await text_box_CVV.type(cvv_issue, { delay: 500 })
      } catch (error) {
        console.error('CVV not required')
      }
      await text_address1.type(address1, { delay: 500 })
      await text_address2.type(address2, { delay: 500 })
      await text_postal_code.type(postcode, { delay: 500 })
      await agree_pay_btn.click()
      LOGGER.info('Payment done Successfully.', { classname: 'ECPayment' })
    }
  }
  async continueNextToConfirmationPage(cardName) {
    await this.ECUpdatedpaymentDetails(cardName);
  }
  async verifyfields(fields){
   let agree_pay_btn = page.locator(PageElements.ECPayment.locate_agree_pay_btn)
   let use_new_card_text = await page.locator(PageElements.ECPayment.locate_use_new_card_radio_btn)
   await use_new_card_text.isVisible() 
   await use_new_card_text.click()
   await page.waitForTimeout(10000)
   await agree_pay_btn.click();
   let error_fields = fields.split(" , ");
   let verfy_fields = [];
   for(let i=1 ; i<5 ; i++){
    let error_msg = await page.locator("((//*[@class = 'message warning'])[1]//ul//li)[" + i + "]").textContent();
    verfy_fields.push(error_msg);
    }
   for(let j=0 ; j<4 ; j++){
    expect(verfy_fields[j]).to.equal(error_fields[j]);
   }
} 
async verifyPaymentChecks(details) {
  let details_text = details.split(",");
  let pax_accordian = page.locator(PageElements.ECPayment.locate_pax_accordian)
  let passengerNames = page.locator(PageElements.ECPayment.locate_passenger_names)
  let flight_accordian = page.locator(PageElements.ECPayment.locate_flight_accordian)
  let flight_itinenary = page.locator(PageElements.ECPayment.locate_flight_itinenary)
  let total_avios = page.locator(PageElements.ECPayment.locate_total_avios)
  let total_amount = page.locator(PageElements.ECPayment.locate_total_amount)
  let total_currency = page.locator(PageElements.ECPayment.locate_total_currency)
  await page.waitForTimeout(5000)
 
  try {
    await pax_accordian.click();
    expect(passengerNames).to.be.Visible;
    await flight_accordian.click();
    expect(flight_itinenary).to.be.Visible;
    expect(total_avios).to.be.Visible;
    expect(total_amount).to.be.Visible;
    expect(total_currency).to.be.Visible;
  } catch (error) {
    console.log(`[ERROR] : ${details_text} not found`)
    LOGGER.info(`[ERROR] : ${details_text} not found`)
  }
}
  async verifyNameOnCard(){
    const name_on_card_text = await page.locator(PageElements.ECPayment.locate_name_on_card).textContent()
    try{
      await expect(name_on_card_text).includes(EC_Passenger.Pax_First_Name_Value);
      LOGGER.info('Name is displayed on Payment page' , {classname: 'ECPayment' })
    }
    catch(error){
      LOGGER.info('Name not matched' , {classname: 'ECPayment' })
    }
  }

}
module.exports = ECPayment;