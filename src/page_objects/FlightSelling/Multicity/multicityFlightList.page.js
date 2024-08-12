'user strict'

const { assert } = require("chai");
const MulticityFlgihtListElements = require('../../../PageElements/FlightSelling/MulticityFlightList_page.js')

class MulticityFlightListPage {
  

  static currentDayText = null;
  
  async verifyMulticityFlightList() {
    const isMulticityFlightList = await page.locator(MulticityFlgihtListElements.multicityflightlist.locate_multicity_flight_list_page).isVisible();
    assert.isOk(isMulticityFlightList,
      'Expected: Multicity flight list is visible. Actual: Multicity flight list is not visible.');
  }

  // Define your selection criteria (e.g., Airline, Price, Departure Time)

  async selectingFlightsForMulticity() {
    const airline = ' British Airways ';
    const cabin = ' Business ';
    const flightNumberStatement = await page.locator(MulticityFlgihtListElements.multicityflightlist.locate_flight_number).textContent();
    const regex = /Flight (\d+) of (\d+)/;
    const match = flightNumberStatement.match(regex);

    await page.waitForSelector(MulticityFlgihtListElements.multicityflightlist.locate_flight_list_results);
    const flights = await page.$$(MulticityFlgihtListElements.multicityflightlist.locate_flight_options);
    for (let i = 0; i < await flights.length; i++) {
        const flight = await page.locator("[id='flight_" + i + "']");
        const flightAirline = (await flight.locator("//*[text()='" + airline + "']").innerText()).trim();
        const flightCabin = (await flight.locator("//*[text()='" + cabin + "']").innerText()).trim();

        if (flightAirline === airline.trim() && flightCabin === cabin.trim()) {
            if (match) {
                const flightNumber = parseInt(match[1]);
                const totalFlights = parseInt(match[2]);
          
                for (let i = flightNumber; i <= totalFlights; i++) {
                    await page.waitForSelector(MulticityFlgihtListElements.multicityflightlist.locate_first_flight_cabin);
                    await page.locator(MulticityFlgihtListElements.multicityflightlist.locate_first_flight_cabin).click();
                    await page.waitForSelector(MulticityFlgihtListElements.multicityflightlist.locate_select_button);
                    await page.locator(MulticityFlgihtListElements.multicityflightlist.locate_select_button).click();
                }
                break;
            } else {
                console.log('No matching pattern found in the string.')
            }
            break;
        }
    }
  }

  async verifyFlightPriceForMulticity() {
    const isPriceVisible = await page.locator(MulticityFlgihtListElements.multicityflightlist.locate_flight_price_on_flight_list_page).isVisible();
    const getFlightPrice = await page.locator(MulticityFlgihtListElements.multicityflightlist.locate_flight_price_on_flight_list_page).textContent();

    assert.isOk(isPriceVisible, "Expected: Price to be visible. Actual: Price is not visible.");
    expect(getFlightPrice).to.have.string('£');
  }

  async checkFlightTypesForMulticity() {
    const directFlightsList = await page.$$(MulticityFlgihtListElements.multicityflightlist.locate_direct_flights_list);
    const connectingFlightList = await page.$$(MulticityFlgihtListElements.multicityflightlist.locate_connecting_flights_list);

    assert.isOk(Array.isArray(directFlightsList > 0), 
    "Expected : Direct Flight to be available for the itinerary." 
    + "Actual : Direct Flight not offered for the itinerary");
    assert.isOk(Array.isArray(connectingFlightList > 0),
    "Expected : Connecting Flight to be available for the itinerary. "
    + "Actual : Connecting Flight not offered for the itinerary");
  }

  async selectWeekOption(weekType) {
    const nextWeek = await page.locator(MulticityFlgihtListElements.multicityflightlist.locate_next_week_btn);
    const previosWeek = await page.locator(MulticityFlgihtListElements.multicityflightlist.locate_previous_week_btn);
    const currentDayValue = await page.locator(MulticityFlgihtListElements.multicityflightlist.locate_current_selected_date).textContent();
    const getCurrentDayValueText = await currentDayValue.split('Selected')[0];
    MulticityFlightListPage.currentDayText = await getCurrentDayValueText.trim();
    if (await weekType.includes("Next")) {
      await nextWeek.click();
    } else {
      await previosWeek.click();
    }
  }

  async verifySelectedWeekOption(weekType) {
    const actualDayValue = await page.locator(MulticityFlgihtListElements.multicityflightlist.locate_current_selected_date).textContent();
    const getCurrentDayValueText = await actualDayValue.split('Selected')[0];

    const actualDayValueText = await getCurrentDayValueText.trim();
    const expectedDayValueText = MulticityFlightListPage.currentDayText;
    let isDateLater = Date.parse(expectedDayValueText) < Date.parse(actualDayValueText) ? true : false

    if (isDateLater) {
      expect(isDateLater, `${weekType} date is not selected`).to.be.true;
    } else {
      expect(isDateLater, `${weekType} date is not selected`).to.be.false;
    }
  }

  async verifyFlightDetails(flightInformation) {
    await page.waitForTimeout(3000);
    const FLIGHT_DETAILS_MAP = await this.getFlightDetailsFeatures();
    const flight_Information = flightInformation.split(",");
    let actualFlightDetailsList = [];

    let flight_details_link = await page.locator(MulticityFlgihtListElements.multicityflightlist.locate_flight_details_option);
    await flight_details_link.click();

    for (let i = 2; i <= 8; i++) {
      let actualFlightDetails = await page.locator("(//p[text()=' to '])[1]/../div[1]/p[" + i + "]").textContent();
      actualFlightDetailsList.push(actualFlightDetails);
    }

    for (let i = 0; i < actualFlightDetailsList.length; i++) {
      for (let j = 0; j < FLIGHT_DETAILS_MAP.size; j++) {
        try {
          if (actualFlightDetailsList[i].includes(FLIGHT_DETAILS_MAP.get(`${flight_Information[j]}`))) {
            expect(actualFlightDetailsList[i]).to.include(FLIGHT_DETAILS_MAP.get(`${flight_Information[j]}`));
          }
        } catch (error) {
          console.log(`[ERROR]: ${error}`);
        }
      }
    }
  }

  async getFlightDetailsFeatures() {
    const FLIGHT_DETAILS = new Map();
    FLIGHT_DETAILS.set("Carrier", "Airline");
    FLIGHT_DETAILS.set("Departure Point", "Depart");
    FLIGHT_DETAILS.set("Arrival point", "Arrive");
    FLIGHT_DETAILS.set("Departing Time", "at anytime");
    FLIGHT_DETAILS.set("Landing Time", "refund");
    FLIGHT_DETAILS.set("total journey time", "Duration");

    return FLIGHT_DETAILS;
}

  async verifySevenDayCalender(){

     let sevenDayCalender = await page.locator(MulticityFlgihtListElements.multicityflightlist.locate_sevenDayCalender) 
     await sevenDayCalender.isVisible();
     
  }
}
module.exports = MulticityFlightListPage
