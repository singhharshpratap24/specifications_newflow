const { Logger } = require('winston');
const LOGGER = require('../../src/setup/logger.js');



class Utils {
  /**
   * Returns a double value from string.
   */
  async getDoubleValueFromString(stringToModify) {
    if (!stringToModify) {
      LOGGER.info('stringToModify cannot be null')
    }
    const ALL_DIGIT_FROM_STRING = /-?\d+(?:\.\d+)?/
    const ArrayFromString = stringToModify.match(ALL_DIGIT_FROM_STRING)
    const doubleValueFromString = ArrayFromString[0]
    return doubleValueFromString
  }

  /**
   * Check whether - is present in the string
   */
  async isNegative(stringToVerify) {
    if (!stringToVerify) {
      LOGGER.info('stringToVerify cannot be null or undefined')
    }
    const isNegative = stringToVerify.includes('-')
    return isNegative
  }

  /**
   * Check whether the number is +ve or not
   */
  async isPositive(value) {
    if (!value) {
      LOGGER.info('value can not be null or undefined')
    }
    const isPositive = value.match('^[0-9]*.[0-9]+$')
    return isPositive !== null
  }

  /**
   * This method extracts the currency value from passed priceValue.
   * This method is placed in util so that in future it can be leveraged wherever currency needs to be fetched from FlightPrice or TotalPrice.
   */
  async getCurrencyFromTotalPrice(priceValue) {
    if (!priceValue) {
      LOGGER.info('price value can not be null or undefined')
    }
    const currency = priceValue.charAt(0)
    return currency
  }

  /**
   * Returns a integer value from string.
   */
  async getIntegerValueFromString(stringToModify) {
    if (stringToModify == null) {
      LOGGER.info('stringToModify can not be null or undefined')
    }
    // const ALL_NON_DIGIT_CHARACTER_WITH_NEGATIVE = /[-^\d.]/g;
    const integerValue = stringToModify.replace(/[^0-9]/g, '')
    return parseInt(integerValue)
  }

  /**
   * method to get first three letters of the month.
   */
  async getMonthWithInitialThreeLetters(monthNumber) {
    const MONTHS = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]
    if (monthNumber < 1 || monthNumber > 12) {
      return LOGGER.info('monthNmber cannot be less than 1 and greater than 12')
    }
    return MONTHS[monthNumber - 1].substring(0, 3)
  }

  // checks if the page loaded successfully
  async confirmPageLoad() {
    await page.waitForSelector('body');
    await page.waitForLoadState('domcontentloaded');
    const pageTitle = await page.title();
    LOGGER.info('Navigated to' + pageTitle)
  }
}
module.exports = Utils;