
const { expect } = require('chai')
const LOGGER = require('../../../setup/logger')
const { nth } = require('lodash')
const CSVCardReader = require('../../../Helpers/csv_card_read')
const myuserdata = require('../../../models/passengerDetails.json')
const PaymentPageElements = require('../../../PageElements/FlightSelling/Payment_page.js')
const thirdPartyPayerData = require('../../../models/thirdPartyPayerDetails.json')
const LoginHelper = require('../../../Helpers/LoginHelper.js')
const UTILS = require('../../../Helpers/utils.js');
const utils= new UTILS();
const csvcardReader = new CSVCardReader()


class Payment {
  static pricebeforecountrychange = null;
  static priceaftercountrychange = null;

  async assert_disability() {
    try {
      await page
        .getByRole('link', { name: 'Disability assistance' })
        .isEnabled()
    } catch (error) {
      LOGGER.error('[ASSERTION ERROR] Flight Payment: Assert Disability')
    }
  }

  async Card_logo() {
    let locate_cardType_logo = page.locator(PaymentPageElements.paymentPage.locate_cardType_logo)
    try {
      await locate_cardType_logo.isVisible()
    } catch (error) {
      LOGGER.error('[ASSERTION ERROR] Payment: Assert Card Logo')
    }
  }

  async Credit_offer_skip_page() {
    await page.waitForTimeout(10000)
    let getHeaderId = await page
      .locator(PaymentPageElements.paymentPage.locate_headerId)
      .textContent()
    let creditCardPageId = 'Credit card offer'

    if (getHeaderId === creditCardPageId) {
      let creditCardOffer_make_payment_btn = await page
        .locator(PaymentPageElements.paymentPage.locate_creditCardOffer_make_payment_btn)
        .nth(2)

      if (creditCardOffer_make_payment_btn.isVisible()) {
        await creditCardOffer_make_payment_btn.click()
        LOGGER.info('Click on Credit_offer_skip_page Successful.', {
          classname: 'Credit_offer_skip_page',
        })
        await page.waitForLoadState('domcontentloaded');
        await utils.confirmPageLoad();
      }
    } else {
      LOGGER.info('Credit card offer page did not appear')
    }
  }

  async UpdatedpaymentDetails(cardName) {
    const address1 = myuserdata.addressOne
    const address2 = myuserdata.addressTwo
    const postcode = myuserdata.postCode
    let whospaying_dropdown = PaymentPageElements.paymentPage.locate_whospaying_dropdown
    let country_dropdown = await page.locator(PaymentPageElements.paymentPage.locate_country_dropdown)
    let use_new_card_radio_btn = await page.locator(
      PaymentPageElements.paymentPage.locate_use_new_card_radio_btn,
    )
    let use_new_card_text = await page.locator(PaymentPageElements.paymentPage.locate_use_new_card_text)
    let text_box_card_number = await page.locator(
      PaymentPageElements.paymentPage.locate_text_box_card_number,
    )
    let text_box_CVV = await page.locator(PaymentPageElements.paymentPage.locate_text_box_CVV)
    let text_Card_month_expiry = await page.locator(
      PaymentPageElements.paymentPage.locate_text_Card_month_expiry,
    )
    let text_Card_Year_expiry = await page.locator(
      PaymentPageElements.paymentPage.locate_text_Card_Year_expiry,
    )
    let text_address1 = await page.locator(PaymentPageElements.paymentPage.locate_text_address1)
    let text_address2 = await page.locator(PaymentPageElements.paymentPage.locate_text_address2)
    let text_address3 = await page.locator(PaymentPageElements.paymentPage.locate_text_address3)
    let text_postal_code = await page.locator(PaymentPageElements.paymentPage.locate_text_postal_code)
    let old_flow_payment_method_dropdown = await page.locator(
      PaymentPageElements.paymentPage.locate_old_flow_payment_method_dropdown,
    )
    let old_flow_country_dropdown = await page.locator(
      PaymentPageElements.paymentPage.locate_old_flow_country_dropdown,
    )
    let old_flow_Card_number_text_field = await page.locator(
      PaymentPageElements.paymentPage.locate_old_flow_Card_number_text_field,
    )
    let old_flow_CVV_number = await page.locator(
      PaymentPageElements.paymentPage.locate_old_flow_CVV_number,
    )
    let USA_State = await page.locator(PaymentPageElements.paymentPage.locate_USA_State)

    await this.assert_disability()
    await page.locator(PaymentPageElements.paymentPage.locate_agree_pay_btn).waitFor()
    const isWhoIsPayingDropwdown = await page
      .locator(PaymentPageElements.paymentPage.locate_whospaying_dropdown)
      .isVisible()
    if (isWhoIsPayingDropwdown) {
      await page.selectOption(whospaying_dropdown, '100000000001')
    } else {
      console.log(
        '[INFO]: Person Paying Dropdown is not available for Hold Booking',
      )
    }
    if (await use_new_card_text.isVisible()) {
      await page.waitForTimeout(10000)
      const [CardNo, CVV] = await csvcardReader.getCardName(cardName)
      await text_box_card_number.type(CardNo, { delay: 100 })
      await text_box_card_number.press('Tab')
      await this.Card_logo()

      let ExpiryDate = new Date()
      ExpiryDate.setDate(ExpiryDate.getDate())
      let EDMonth = ExpiryDate.toLocaleDateString('default', {
        month: '2-digit',
      })
      let EDYear = String(ExpiryDate.getFullYear() % 100)
      if (cardName != 'CardExpiry Error') {
        await text_Card_month_expiry.type(EDMonth, { delay: 500 })
        await text_Card_Year_expiry.type(EDYear, { delay: 500 })
      } else {
        await text_Card_month_expiry.press('Tab')
      }

      try {
        let cvv_issue = String(CVV)
        await text_box_CVV.type(cvv_issue, { delay: 500 })
      } catch (error) {
        console.error('CVV not required')
      }

      await text_address1.type(address1, { delay: 500 })
      await text_address2.type(address2, { delay: 500 })
      if (await USA_State.isVisible()) {
        await text_address3.type('addressThree', { delay: 500 })
        await USA_State.selectOption({ value: 'AK' })
      }
      await text_postal_code.type(postcode, { delay: 500 })
    }
    else {
      LOGGER.info('Payment page have Switch OFF condition')

      let locatePrice = await page
        .locator("#payment-total-price")
        .textContent()
      if (locatePrice != ' £0.00 ') {
        await old_flow_country_dropdown.selectOption(country)
        await old_flow_payment_method_dropdown.selectOption({
          value: 'Visa Personal',
        })
        await old_flow_Card_number_text_field.fill('4111111111111111')
        await text_Card_month_expiry.fill('11')
        await text_Card_Year_expiry.fill('24')
        await old_flow_CVV_number.fill('123')

        await text_address1.type(address1, { delay: 500 })
        await text_address2.type(address2, { delay: 500 })
        if (await USA_State.isVisible()) {
          await text_address3.type('addressThree', { delay: 500 })
          await USA_State.selectOption({ value: 'AK' })
        }
        await text_postal_code.type(postcode, { delay: 500 })
      }
    }
    this.Agree_and_Pay()
  }

  async Agree_and_Pay() {
    try{
      let agree_pay_btn = page.locator(PaymentPageElements.paymentPage.locate_agree_pay_btn)

      await agree_pay_btn.click()
      await this.Auth_OTP()
      await this.Auth_pwd()
      LOGGER.info('Payment done Successfully.', { classname: 'Payment' })
    }
  catch(error) {
    LOGGER.info('Payment Incomplete', { classname: 'Payment' })
    }
  }

  async Auth_pwd() {
    let secure_payment_with_PWD = page.frameLocator(
      this.locate_secure_payment_with_PWD,
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
        .waitFor()
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

  async MMB_Payment(country,cardType,cardNo,CVV,address1,address2,postcode)
  {
    let billing_country_dropdwon = page.locator(
      PaymentPageElements.paymentPage.locate_old_flow_country_dropdown,
    )
    let type_of_card_dropdown = page.locator(
      PaymentPageElements.paymentPage.locate_mmb_type_of_card_dropdown,
    )
    let card_number_textbox = page.locator(PaymentPageElements.paymentPage.locate_mmb_card_number)
    let expiry_month_dropdown = page.locator(PaymentPageElements.paymentPage.locate_mmb_expiry_month)
    let expiry_year_dropdown = page.locator(PaymentPageElements.paymentPage.locate_mmb_expiry_year)
    let security_number_textbox = page.locator(PaymentPageElements.paymentPage.locate_mmb_security_number)
    let address_line1_textbox = page.locator(PaymentPageElements.paymentPage.locate_mmb_address_line1)
    let address_line2_textbox = page.locator(PaymentPageElements.paymentPage.locate_mmb_address_line2)
    let postcode_textbox = page.locator(PaymentPageElements.paymentPage.locate_mmb_postcode)
    let submit_button = page.locator(PaymentPageElements.paymentPage.locate_mmb_submit_button)

    await billing_country_dropdwon.selectOption(country)
    await type_of_card_dropdown.selectOption(cardType, { delay: 1000 })
    await card_number_textbox.type(cardNo, { delay: 1000 })
    await expiry_month_dropdown.selectOption({ value: '11' })
    await expiry_year_dropdown.selectOption({ value: '2024' })
    await security_number_textbox.type(CVV)
    await address_line1_textbox.type(address1, { delay: 500 })
    await address_line2_textbox.type(address2, { delay: 500 })
    await postcode_textbox.type(postcode, { delay: 500 })
    await submit_button.click()
  }

  async Agree_and_Pay_For_Surcharge() {
    let agree_pay_btn = page.locator(PaymentPageElements.paymentPage.locate_agree_pay_btn)
    await agree_pay_btn.click()
    await page.waitForTimeout(10000)
  }

  async paymentDetailsSurcharge(cardName) {
    let country = 'United Kingdom'
    let cardType = 'UATP'
    let cardNo = '107513000000004'
    let CVV = '123'
    const address1 = myuserdata.addressOne
    const address2 = myuserdata.addressTwo
    const postcode = myuserdata.postCode

    let country_dropdown = await page.locator(PaymentPageElements.paymentPage.locate_country_dropdown)
    let use_new_card_radio_btn = await page.locator(
      PaymentPageElements.paymentPage.locate_use_new_card_radio_btn,
    )
    let use_new_card_text = await page.locator(PaymentPageElements.paymentPage.locate_use_new_card_text)
    let text_box_card_number = await page.locator(
      PaymentPageElements.paymentPage.locate_text_box_card_number,
    )
    let text_box_CVV = await page.locator(PaymentPageElements.paymentPage.locate_text_box_CVV)
    let text_Card_month_expiry = await page.locator(
      PaymentPageElements.paymentPage.locate_text_Card_month_expiry,
    )
    let text_Card_Year_expiry = await page.locator(
      PaymentPageElements.paymentPage.locate_text_Card_Year_expiry,
    )
    let text_address1 = await page.locator(PaymentPageElements.paymentPage.locate_text_address1)
    let text_address2 = await page.locator(PaymentPageElements.paymentPage.locate_text_address2)
    let text_address3 = await page.locator(PaymentPageElements.paymentPage.locate_text_address3)
    let text_postal_code = await page.locator(PaymentPageElements.paymentPage.locate_text_postal_code)
    let USA_State = await page.locator(PaymentPageElements.paymentPage.locate_USA_State)
    let whospaying_dropdown = PaymentPageElements.paymentPage.locate_whospaying_dropdown

    await this.assert_disability()
    await page.locator(PaymentPageElements.paymentPage.locate_agree_pay_btn).waitFor()
    const isWhoIsPayingDropwdown = await page.locator(PaymentPageElements.paymentPage.locate_whospaying_dropdown).isVisible()
    if (isWhoIsPayingDropwdown) {
      await page.selectOption(whospaying_dropdown, '100000000001')
    } else {
      console.log(
        '[INFO]: Person Paying Dropdown is not available for Hold Booking',
      )
      if (await use_new_card_text.isVisible()) {
        let use_new_card = await use_new_card_text.textContent()
        LOGGER.info('Payment Surcharge checking')

        const priceBeforeSurcharge = await page
          .locator(PaymentPageElements.paymentPage.locate_final_payment)
          .textContent()
        const regexForSurcharge = priceBeforeSurcharge.match(/(\d+(?:\.\d+)?)?/g)
        const finalAmountBeforeSurcharge = regexForSurcharge[2]

        await country_dropdown.selectOption(country)
        await page.waitForTimeout(5000)
        if (cardType === use_new_card) {
          await use_new_card_radio_btn.check({ force: true })
        }
        await page.waitForTimeout(3000)
        await text_box_card_number.type(cardNo, { delay: 100 })
        await text_box_card_number.press('Tab')
        await this.Card_logo()

        let ExpiryDate = new Date()
        ExpiryDate.setDate(ExpiryDate.getDate())
        let EDMonth = ExpiryDate.toLocaleDateString('default', {
          month: '2-digit',
        })
        let EDYear = String(ExpiryDate.getFullYear() % 100)

        await text_Card_month_expiry.type(EDMonth, { delay: 250 })
        await text_Card_Year_expiry.type(EDYear, { delay: 250 })

        const priceAfterSurcharge = await page
          .locator(PaymentPageElements.paymentPage.locate_final_payment)
          .textContent()
        const regexForPriceAfterSurcharge =
          priceAfterSurcharge.match(/(\d+(?:\.\d+)?)?/g)
        const finalAmountAfterSurcharge = regexForPriceAfterSurcharge[2]

        try {
          let cvv_issue = String(CVV)
          await text_box_CVV.type(cvv_issue, { delay: 500 })
        } catch (error) {
          console.error('CVV not required')
        }
        await text_address1.type(address1, { delay: 500 })
        await text_address2.type(address2, { delay: 500 })
        if (await USA_State.isVisible()) {
          await text_address3.type('addressThree', { delay: 500 })
          await USA_State.selectOption({ value: 'AK' })
        }
        await text_postal_code.type(postcode, { delay: 500 })

        if (
          parseFloat(finalAmountAfterSurcharge) >
          parseFloat(finalAmountBeforeSurcharge)
        ) {
          await this.Agree_and_Pay_For_Surcharge()
          LOGGER.info('Surcharge is Applied')
        } else {
          LOGGER.info('Surcharge is not applied')
        }
      } else {
        LOGGER.info('Payment page have Switch OFF condition')
        console.log('Unable to test Payment page due to Payment switch being ON')
      }
    }
  }

  async cvvErrorMessage() {
    let invalid_cvv_message = await page
      .locator(PaymentPageElements.paymentPage.locate_invalid_cvv_error_text)
      .textContent()
    try {
      await invalid_cvv_message.includes('Security code must be three digits')
    } catch (error) {
      LOGGER.error('[ASSERTION ERROR] Payment Page: Invalid Security code')
    }
  }

  async cvvErrorMessage() {
    let invalid_cvv_message = await page
      .locator(PaymentPageElements.paymentPage.locate_invalid_cvv_error_text)
      .textContent()
    try {
      await invalid_cvv_message.includes('Security code must be three digits')
    } catch (error) {
      LOGGER.error('[ASSERTION ERROR] Payment Page: Invalid Security code')
    }
  }

  async AddressErrorMessage(AddressError) {
    let agree_pay_btn = page.locator(PaymentPageElements.paymentPage.locate_agree_pay_btn)
    let Address_Error_Msg_Line1 = await page
      .locator(PaymentPageElements.paymentPage.locate_Address_Error_Msg_Line1)
      .textContent()
    let Address_Error_Msg_Line2 = await page
      .locator(PaymentPageElements.paymentPage.locate_Address_Error_Msg_Line2)
      .textContent()

    await agree_pay_btn.click()
    expect(Address_Error_Msg_Line1).to.deep.eql(AddressError)
    expect(Address_Error_Msg_Line2).to.deep.eql(AddressError)
  }

  async verifyPayInPersonPaymentOption() {
    const isVisible = await page.locator(PaymentPageElements.paymentPage.locate_payInPersoOption).isVisible();
    expect(isVisible).to.be.false;
  }

  async paymentMethodVerification(paymentoption) {
    let paymentPayPal_Option = await page.locator(PaymentPageElements.paymentPage.locate_paypal_radio_btn);
    let paymentNewCard_Option = await page.locator(PaymentPageElements.paymentPage.locate_paypal_radio_btn);

    if (paymentoption == 'Paypal') {
      await paymentPayPal_Option.waitFor();
      await paymentPayPal_Option.click();
      expect(await paymentPayPal_Option.isVisible()).to.be.true;
    } else {
      await paymentNewCard_Option.waitFor();
      await paymentNewCard_Option.click();
      expect(await paymentNewCard_Option.isVisible()).to.be.true;
    }
  }

  async continueNextToConfirmationPage(cardName) {
    await this.Credit_offer_skip_page()
    await this.UpdatedpaymentDetails(cardName)
  }

  async postalcodeErrorMessage(PostalcodeError) {
    let Postalcode_Error_Msg_Line = await page
      .locator(PaymentPageElements.paymentPage.locate_Postalcode_Error_Msg)
      .textContent()
    let agree_pay_btn = page.locator(PaymentPageElements.paymentPage.locate_agree_pay_btn)
    await agree_pay_btn.click()

    expect(Postalcode_Error_Msg_Line).to.equal(PostalcodeError)
  }

  async validatePaymentCardAuthorisationPage() {
    try {
      await page.locator(PaymentPageElements.paymentPage.locate_paymentCard_authorisation_text).isVisible()
      console.log('PaymentCard Authorisation Page displayed..')
    } catch (error) {
      LOGGER.error(
        '[ASSERTION ERROR]Payment Page:Payment Card Authorisation failed',
      )
    }
  }

  async missingCardExpErrMsg(CardExpiryError) {
    let agree_pay_btn = page.locator(PaymentPageElements.paymentPage.locate_agree_pay_btn)
    await agree_pay_btn.click()
    let missing_card_exp_message = await page
      .locator(PaymentPageElements.paymentPage.locate_missing_card_exp_message)
      .textContent()
    expect(missing_card_exp_message).to.deep.eql(CardExpiryError)
  }

  async ECPaymentDetails() {
    await page.waitForTimeout(10000);
    const whospayingDropdown = await page.locator(PaymentPageElements.paymentPage.locate_whospaying_dropdown);
    const textBoxCVV = await page.locator(PaymentPageElements.paymentPage.locate_text_box_CVV);
    let agree_pay_btn = page.locator(PaymentPageElements.paymentPage.locate_agree_pay_btn);

    if (await whospayingDropdown.isVisible()) {
      await whospayingDropdown.waitFor({ state: 'visible' });
      await whospayingDropdown.selectOption("100000000001", { timeout: 5000 });
    } else {
      console.log("[INFO]: Person Paying Dropdown is not available for Hold Booking");
    }

    await page.waitForTimeout(3000);

    try {
      await textBoxCVV.waitFor();
      const cvv = "123";
      await textBoxCVV.type(cvv, { delay: 100 });
    } catch (error) {
      console.error("[INFO]: CVV input field is not required or not available", error);
    }

    await page.waitForTimeout(2000);
    await agree_pay_btn.waitFor();
    await agree_pay_btn.click()
  }

  async thirdPartyPayerPayment(cardName) {
    const address1 = myuserdata.addressOne;
    const address2 = myuserdata.addressTwo;
    const postcode = myuserdata.postCode;
    const thirdPartyPayerFirstName = thirdPartyPayerData.TPP_firstName;
    const thirdPartyPayerLastName = thirdPartyPayerData.TPP_lastName;
    const thirdPartyPayerEmail = thirdPartyPayerData.TPP_email;
    const thirdPartyPayerTitle = thirdPartyPayerData.TPP_title;

    let whospaying_dropdown = PaymentPageElements.paymentPage.locate_whospaying_dropdown;
    let use_new_card_text = await page.locator(PaymentPageElements.paymentPage.locate_use_new_card_text);
    let text_box_card_number = await page.locator(PaymentPageElements.paymentPage.locate_text_box_card_number);
    let text_box_CVV = await page.locator(PaymentPageElements.paymentPage.locate_text_box_CVV);
    let text_Card_month_expiry = await page.locator(PaymentPageElements.paymentPage.locate_text_Card_month_expiry);
    let text_Card_Year_expiry = await page.locator(PaymentPageElements.paymentPage.locate_text_Card_Year_expiry);
    let text_address1 = await page.locator(PaymentPageElements.paymentPage.locate_text_address1);
    let text_address2 = await page.locator(PaymentPageElements.paymentPage.locate_text_address2);
    let text_address3 = await page.locator(PaymentPageElements.paymentPage.locate_text_address3);
    let text_postal_code = await page.locator(PaymentPageElements.paymentPage.locate_text_postal_code);
    let old_flow_payment_method_dropdown = await page.locator(PaymentPageElements.paymentPage.locate_old_flow_payment_method_dropdown);
    let old_flow_country_dropdown = await page.locator(PaymentPageElements.paymentPage.locate_old_flow_country_dropdown);
    let old_flow_Card_number_text_field = await page.locator(PaymentPageElements.paymentPage.locate_old_flow_Card_number_text_field);
    let old_flow_CVV_number = await page.locator(PaymentPageElements.paymentPage.locate_old_flow_CVV_number);
    let USA_State = await page.locator(PaymentPageElements.paymentPage.locate_USA_State);
    let thirdPartyPayer_title = PaymentPageElements.paymentPage.locate_thirdPartyPayer_title;
    let thirdPartyPayer_firstName = await page.locator(PaymentPageElements.paymentPage.locate_thirdPartyPayer_firstName);
    let thirdPartyPayer_lastName = await page.locator(PaymentPageElements.paymentPage.locate_thirdPartyPayer_lastName);
    let thirdPartyPayer_email = await page.locator(PaymentPageElements.paymentPage.locate_thirdPartyPayer_email);

    await this.assert_disability();
    await page.locator(PaymentPageElements.paymentPage.locate_agree_pay_btn).waitFor()
    const isWhoIsPayingDropwdown = await page.locator(PaymentPageElements.paymentPage.locate_whospaying_dropdown).isVisible();
    if (isWhoIsPayingDropwdown) {
      await page.selectOption(whospaying_dropdown, "someone_else");
      await page.waitForTimeout(5000);
      await page.selectOption(thirdPartyPayer_title, thirdPartyPayerTitle);
      await thirdPartyPayer_firstName.fill(thirdPartyPayerFirstName, { delay: 100 });
      await thirdPartyPayer_lastName.fill(thirdPartyPayerLastName, { delay: 100 });
      await thirdPartyPayer_email.fill(thirdPartyPayerEmail, { delay: 100 });
      console.log("Third Party Payer details filled successfully")
    } else {
      console.log("[INFO]: Person Paying Dropdown is not available");
    }

    if (await use_new_card_text.isVisible()) {
      await page.waitForTimeout(10000);
      const [CardNo, CVV] = await csvcardReader.getCardName(cardName);
      await text_box_card_number.type(CardNo, { delay: 100 });
      await text_box_card_number.press("Tab");
      await this.Card_logo();

      let ExpiryDate = new Date();
      ExpiryDate.setDate(ExpiryDate.getDate());
      let EDMonth = ExpiryDate.toLocaleDateString("default", {
        month: "2-digit",
      });
      let EDYear = String(ExpiryDate.getFullYear() % 100);

      await text_Card_month_expiry.type(EDMonth, { delay: 500 });
      await text_Card_Year_expiry.type(EDYear, { delay: 500 });

      try {
        let cvv_issue = String(CVV);
        await text_box_CVV.type(cvv_issue, { delay: 500 });
      } catch (error) {
        console.error("CVV not required");
      }
    }
    await text_address1.type(address1, { delay: 500 });
    await text_address2.type(address2, { delay: 500 });
    if (await USA_State.isVisible()) {
      await text_address3.type("addressThree", { delay: 500 });
      await USA_State.selectOption({ value: "AK" });
    }
    await text_postal_code.type(postcode, { delay: 500 });
    this.Agree_and_Pay();
  }


  async getAvailablePaymentCard(Images) {
    const PaymentCardList = Images.split(",");
    console.log("Payment Cards available are:")
    
    for (let i = 0; i < PaymentCardList.length; i++) {
      let PaymentcardLogo = page.locator("//div[@class='payment-logos']/img[" + (i + 1) + "]");
      let availablePaymentCard = await PaymentcardLogo.getAttribute('alt');
      let availablePaymentCardType = availablePaymentCard.split('logo')[0];
      console.log(availablePaymentCardType)
      expect(availablePaymentCardType).to.contains(PaymentCardList[i])
    }
  }
  
  async CardErrorMessageTypeOne(CardErrorType1){
    let agree_pay_btn = page.locator(PaymentPageElements.paymentPage.locate_agree_pay_btn);
    await agree_pay_btn.click();
    let CardNo_Error_Msg_Type1 = await page.locator(PaymentPageElements.paymentPage.locate_CardNo_Error_Msg).textContent();
    await page.waitForTimeout(5000);
    expect(CardNo_Error_Msg_Type1).to.deep.eql(CardErrorType1);
  }

  async CardErrorMessageTypeTwo(CardErrorType2){

    let CardNo_Error_Msg_Type2 = await page.locator(PaymentPageElements.paymentPage.locate_CardNo_Error_Msg).textContent();
    expect(CardNo_Error_Msg_Type2).to.deep.eql(CardErrorType2);
  }
  async CardErrorMessageTypeThree(CardErrorType3){
    let CardNo_Error_Msg_Type2 = await page.locator(PaymentPageElements.paymentPage.locate_CardNo_Error_Msg).textContent();
    expect(CardNo_Error_Msg_Type2).to.deep.eql(CardErrorType3);
  }


  async thirdPartyPayerPayment(cardName) {
    const address1 = myuserdata.addressOne;
    const address2 = myuserdata.addressTwo;
    const postcode = myuserdata.postCode;

    let whospaying_dropdown = PaymentPageElements.paymentPage.locate_whospaying_dropdown;
    let use_new_card_text = await page.locator(PaymentPageElements.paymentPage.locate_use_new_card_text);
    let text_box_card_number = await page.locator(PaymentPageElements.paymentPage.locate_text_box_card_number);
    let text_box_CVV = await page.locator(PaymentPageElements.paymentPage.locate_text_box_CVV);
    let text_Card_month_expiry = await page.locator(PaymentPageElements.paymentPage.locate_text_Card_month_expiry);
    let text_Card_Year_expiry = await page.locator(PaymentPageElements.paymentPage.locate_text_Card_Year_expiry);
    let text_address1 = await page.locator(PaymentPageElements.paymentPage.locate_text_address1);
    let text_address2 = await page.locator(PaymentPageElements.paymentPage.locate_text_address2);
    let text_address3 = await page.locator(PaymentPageElements.paymentPage.locate_text_address3);
    let text_postal_code = await page.locator(PaymentPageElements.paymentPage.locate_text_postal_code);
    let old_flow_payment_method_dropdown = await page.locator(PaymentPageElements.paymentPage.locate_old_flow_payment_method_dropdown);
    let old_flow_country_dropdown = await page.locator(PaymentPageElements.paymentPage.locate_old_flow_country_dropdown);
    let old_flow_Card_number_text_field = await page.locator(PaymentPageElements.paymentPage.locate_old_flow_Card_number_text_field);
    let old_flow_CVV_number = await page.locator(PaymentPageElements.paymentPage.locate_old_flow_CVV_number);
    let USA_State = await page.locator(PaymentPageElements.paymentPage.locate_USA_State);
    let thirdPartyPayer_title = PaymentPageElements.paymentPage.locate_thirdPartyPayer_title;
    let thirdPartyPayer_firstName = await page.locator(PaymentPageElements.paymentPage.locate_thirdPartyPayer_firstName);
    let thirdPartyPayer_lastName = await page.locator(PaymentPageElements.paymentPage.locate_thirdPartyPayer_lastName);
    let thirdPartyPayer_email = await page.locator(PaymentPageElements.paymentPage.locate_thirdPartyPayer_email);

    await this.assert_disability();
    await page.locator(PaymentPageElements.paymentPage.locate_agree_pay_btn).waitFor()
    const isWhoIsPayingDropwdown = await page.locator(PaymentPageElements.paymentPage.locate_whospaying_dropdown).isVisible();
    if (isWhoIsPayingDropwdown) {
      await page.selectOption(whospaying_dropdown, "someone_else");
      await page.waitForTimeout(5000);
      await page.selectOption(thirdPartyPayer_title, "Ms");
      await thirdPartyPayer_firstName.fill("Testing", { delay: 100 });
      await thirdPartyPayer_lastName.fill("Test", { delay: 100 });
      await thirdPartyPayer_email.fill("testing.test@ba.com", { delay: 100 });
      console.log("Third Party Payer details filled successfully")
    } else {
      console.log("[INFO]: Person Paying Dropdown is not available");
    }

    if (await use_new_card_text.isVisible()) {
      await page.waitForTimeout(10000);
      const [CardNo, CVV] = await csvcardReader.getCardName(cardName);
      await text_box_card_number.type(CardNo, { delay: 100 });
      await text_box_card_number.press("Tab");
      await this.Card_logo();

      let ExpiryDate = new Date();
      ExpiryDate.setDate(ExpiryDate.getDate());
      let EDMonth = ExpiryDate.toLocaleDateString("default", {
        month: "2-digit",
      });
      let EDYear = String(ExpiryDate.getFullYear() % 100);

      await text_Card_month_expiry.type(EDMonth, { delay: 500 });
      await text_Card_Year_expiry.type(EDYear, { delay: 500 });

      try {
        let cvv_issue = String(CVV);
        await text_box_CVV.type(cvv_issue, { delay: 500 });
      } catch (error) {
        console.error("CVV not required");
      }
    } else {
      LOGGER.info("Payment page have Switch OFF condition");
      await old_flow_country_dropdown.selectOption(country);
      await old_flow_payment_method_dropdown.selectOption({ value: "Visa Personal" });
      await old_flow_Card_number_text_field.fill("4111111111111111");
      await text_Card_month_expiry.fill("11");
      await text_Card_Year_expiry.fill("24");
      await old_flow_CVV_number.fill("123");
    }
    await text_address1.type(address1, { delay: 500 });
    await text_address2.type(address2, { delay: 500 });
    if (await USA_State.isVisible()) {
      await text_address3.type("addressThree", { delay: 500 });
      await USA_State.selectOption({ value: "AK" });
    }
    await text_postal_code.type(postcode, { delay: 500 });
    this.Agree_and_Pay();
  }



  async getAvailablePaymentCard(Images) {
    const PaymentCardList = Images.split(",");

    for (let i = 0; i < PaymentCardList.length; i++) {
      let PaymentcardLogo = page.locator("//div[@class='payment-logos']/img[" + (i + 1) + "]");
      let availablePaymentCard = await PaymentcardLogo.getAttribute('alt');
      let availablePaymentCardType = availablePaymentCard.split('logo')[0];
      expect(availablePaymentCardType).to.contains((PaymentCardList[i]))
    }
  }

  async addOnBusinessMembershipDetails(onBusiness)
  {
    let add_business_loyility_programme = await page.locator(PaymentPageElements.paymentPage.locate_add_business_loyality_programme)
    await add_business_loyility_programme.click();
    await page.waitForTimeout(5000);
    console.log('click add business loyality programme')
    let select_business_loyality_programme = await page.locator(PaymentPageElements.paymentPage.locate_select_business_loyality_programme)
    await select_business_loyality_programme.selectOption(onBusiness);
    let enter_membershipNumber = await page.locator(PaymentPageElements.paymentPage.locate_enter_membership_Number)
    await enter_membershipNumber.fill("AB12345678");
  }

  async getPriceOnPayment() {
    let pricebeforecountrychangepayment = await page.locator(PaymentPageElements.paymentPage.locate_final_payment).textContent();
    Payment.pricebeforecountrychange = pricebeforecountrychangepayment.trim();
    return Payment.pricebeforecountrychange;
  }

  async isSurchargeApplied()
  {
    expect(await page.locator(PaymentPageElements.paymentPage.locate_Surcharges).isVisible()).to.equal(false);
    
  }
  

  async cardDetails(cardName)
  {
    
    let use_new_card_text = await page.locator(PaymentPageElements.paymentPage.locate_use_new_card_text)
    let text_box_card_number = await page.locator(
      PaymentPageElements.paymentPage.locate_text_box_card_number,
    )
    let text_box_CVV = await page.locator(PaymentPageElements.paymentPage.locate_text_box_CVV)
    let text_Card_month_expiry = await page.locator(
      PaymentPageElements.paymentPage.locate_text_Card_month_expiry,
    )
    let text_Card_Year_expiry = await page.locator(
      PaymentPageElements.paymentPage.locate_text_Card_Year_expiry,
    )
    if (await use_new_card_text.isVisible()) {
      await page.waitForTimeout(10000)
      const [CardNo, CVV] = await csvcardReader.getCardName(cardName)
      await text_box_card_number.type(CardNo, { delay: 100 })
      await text_box_card_number.press('Tab')
      await this.Card_logo()

      let ExpiryDate = new Date()
      ExpiryDate.setDate(ExpiryDate.getDate())
      let EDMonth = ExpiryDate.toLocaleDateString('default', {
        month: '2-digit',
      })
      let EDYear = String(ExpiryDate.getFullYear() % 100)
      if (cardName != 'CardExpiry Error') {
        await text_Card_month_expiry.type(EDMonth, { delay: 500 })
        await text_Card_Year_expiry.type(EDYear, { delay: 500 })
      } else {
        await text_Card_month_expiry.press('Tab')
      }

      try {
        let cvv_issue = String(CVV)
        await text_box_CVV.type(cvv_issue, { delay: 500 })
      } catch (error) {
        console.error('CVV not required')
      }
    }
  }

  async getPriceOnPaymentAfterCountryChange() {
    let country = "Japan"
    let billing_country_dropdwon = page.locator(PaymentPageElements.paymentPage.locate_old_flow_country_dropdown)
    await billing_country_dropdwon.selectOption(country)
    let priceaftercountrychangepayment = await page.locator(PaymentPageElements.paymentPage.locate_final_payment).textContent();
    Payment.priceaftercountrychange = priceaftercountrychangepayment.trim();
    return Payment.priceaftercountrychange;
  }

  async surchargeRemoved() {
    try {
      Payment.pricebeforecountrychange >= Payment.priceaftercountrychange
      LOGGER.info('[ASSERTION ERROR] Payment: Surcharge is not Added')
    }
    catch (error) {
      LOGGER.info('[ASSERTION ERROR] Payment: Surcharge is Added')
    }
  }

  async enterErrorPOstalcode() {
    // let text_postal_code = await page.locator(PaymentPageElements.paymentPage.locate_text_postal_code)
    const errorPostalCode = myuserdata.errorPostalCode;
    let error_postal_code = await page.locator(PaymentPageElements.paymentPage.locate_text_postal_code);
    await error_postal_code.type(errorPostalCode, { delay: 500 });
  }

}
module.exports = Payment
