'use strict'

const RouteHelper = require("../../../Helpers/routeHelper");
const flightSearchRequest = require("../../../Helpers/flightSearchRequest.js");
const FlightHelper = require("../../../Helpers/flightdatahelper.js")
const HomePage = require("../../../page_objects/FlightSelling/homePage/home_page.page.js")
const MulticityElements = require('../../../PageElements/FlightSelling/Multicity_page.js')

let obj_homepage = new HomePage();

class Multicity {

  async verifyMulticityLink() {
    try {
      const isMulticity = await page
        .getByText(MulticityElements.multicity.MULTICITY_LINK_TEXT)
        .isVisible()
      return isMulticity
    } catch {
      console.error('Multicity link element not found')
    }
  }

  async clickOnMulticityLink() {
    await page.waitForSelector(MulticityElements.multicity.locate_multicity_link)
    await page.locator(MulticityElements.multicity.locate_multicity_link).click()
  }

  async verifyMulticityPage() {
    const multicityHeadingText = await page
      .locator(MulticityElements.multicity.locate_multicity_page_heading)
      .textContent()
    const multicityPageTitle = await page.title()
    await page.locator(MulticityElements.multicity.locate_multicity_page_heading).isVisible()
    assert.equal(
      multicityHeadingText,
      MulticityElements.multicity.MULTICITY_PAGE_HEADING,
      'Multicity heading is not visible',
    )
    assert.equal(
      multicityPageTitle,
      MulticityElements.multicity.MULTICITY_PAGE_TITLE,
      'Expected:British Airways - Flight Search. Actual:British Airways - Flight Search has not been successfully.',
    )
  }

  async setArrivalDepartureMulticity() {
    if (RouteHelper.routeLegs == null) {
      let multicityRoute = null;
      const caseName = await obj_homepage.getScenarioTag();
      const flightData = FlightHelper.get(caseName);
      if (flightData.type == "Complex") {
        multicityRoute = [
          flightData.depart.segmentOne,
          flightData.arrival.segmentOne,
          flightData.depart.segmentTwo,
          flightData.arrival.segmentTwo,
          flightData.depart.segmentThree,
          flightData.arrival.segmentThree
        ]
      } else {
        multicityRoute = [
          flightData.depart.segmentOne,
          flightData.arrival.segmentOne,
          flightData.depart.segmentTwo,
          flightData.arrival.segmentTwo,
        ]
      }
      for (let i = 0; i < multicityRoute.length; i++) {
        await page
          .locator("[id='ba-input-typeahead-" + i + "']")
          .fill(multicityRoute[i])
        await page.waitForTimeout(1000)
        await page.locator("[id='ba-input-typeahead-" + i + "']").press('Enter')
      }
    } else {
      if (RouteHelper.routeLegs === 3) {
        const multicityRoute = [
          RouteHelper.departingSegmentOne,
          RouteHelper.arrivalSegmentOne,
          RouteHelper.departingSegmentTwo,
          RouteHelper.arrivalSegmentTwo,
          RouteHelper.departingSegmentThree,
          RouteHelper.arrivalSegmentThree
        ]

        for (let i = 0; i < multicityRoute.length; i++) {
          await page
            .locator("[id='ba-input-typeahead-" + i + "']")
            .fill(multicityRoute[i])
          await page.waitForTimeout(1000)
          await page.locator("[id='ba-input-typeahead-" + i + "']").press('Enter')
        }
      } else {
        const multicityRoute = [
          RouteHelper.departingSegmentOne,
          RouteHelper.arrivalSegmentOne,
          RouteHelper.departingSegmentTwo,
          RouteHelper.arrivalSegmentTwo
        ]

        for (let i = 0; i < multicityRoute.length; i++) {
          await page.waitForTimeout(1000);
          await page
            .locator("[id='ba-input-typeahead-" + i + "']")
            .fill(multicityRoute[i])
          await page.waitForTimeout(1000)
          await page.locator("[id='ba-input-typeahead-" + i + "']").press('Enter')
        }
      }
    }
  }

  async setDateForEachFlightSegment(flightSearchRequest) {
    let multicityDate = new Date()
    const multicityDateArray = Object.values(
      flightSearchRequest.multicityDate,
    )

    for (
      let i = 0, j = 1;
      i < multicityDateArray.length, j < multicityDateArray.length + 1;
      i++, j++
    ) {
      let dateSegment =
        "(//*[text()='Date']/following-sibling::input)[" + j + ']'
      multicityDate.setDate(multicityDate.getDate() + multicityDateArray[i])

      let futureYearForMulticity = String(multicityDate.getFullYear())
      let futureMonthForMulticity = multicityDate.toLocaleDateString('default', { month: '2-digit' });
      let futureDayForMulticity = String(multicityDate.getDate()).padStart(2, '0');
      let multicityDateForFirstSegment = futureYearForMulticity + '-' + futureMonthForMulticity + '-' + futureDayForMulticity

      await page.locator(dateSegment).fill(multicityDateForFirstSegment)
    }
  }

  async selectPax(FlightSearchRequest) {
    await page.locator(MulticityElements.multicity.locate_pax_segment).click()
    await page.getByLabel(MulticityElements.multicity.locate_adult_increase, { exact: true }).click()
    await page
      .getByLabel(MulticityElements.multicity.locate_adult_increase, { exact: true })
      .fill(String(FlightSearchRequest.adult))
    await page.getByLabel(MulticityElements.multicity.locate_young_adult_increase).click()
    await page
      .getByLabel(MulticityElements.multicity.locate_young_adult_increase)
      .fill(String(FlightSearchRequest.youngAdult))
    await page.getByLabel(MulticityElements.multicity.locate_children_increase).click()
    await page
      .getByLabel(MulticityElements.multicity.locate_children_increase)
      .fill(String(FlightSearchRequest.child))
    await page.getByLabel(MulticityElements.multicity.locate_infant_increase).click()
    await page
      .getByLabel(MulticityElements.multicity.locate_infant_increase)
      .fill(String(FlightSearchRequest.infant))
  }

  async selectTravelClass() {
    await page.pause();
    await page.selectOption("[data-qa='travel-class'] > ba-form-group-dropdown > button", 'J');
  }

  async selectTicketType() {
    await page
      .locator(MulticityElements.multicity.locate_ticket_type_dropdown)
      .selectOption({ value: 'LOWEST' })
  }

  async asserrtAddAnotherFlightButton() {
    await page.waitForSelector(MulticityElements.multicity.locate_add_another_flight_button)
    const isAddAnotherFlight = await page
      .locator(MulticityElements.multicity.locate_add_another_flight_button)
      .isVisible()
    assert.isOk(
      isAddAnotherFlight,
      'Expected: Add another flight button should be visible. Actual: Add another flight button is not visible.',
    )
  }

  async clickAddAnotherFlightButtonMax() {
    await page.waitForSelector(MulticityElements.multicity.locate_add_another_flight_button)
    const isAddAnotherFlight = await page
      .locator(MulticityElements.multicity.locate_add_another_flight_button)
      .isVisible()

    for (let i = 0; i < MulticityElements.multicity.ADD_ANOTHER_FLIGHT_MAX; i++) {
      if (isAddAnotherFlight) {
        await page.locator(MulticityElements.multicity.locate_add_another_flight_button).click()
      }
    }
  }

  async countNumberOfFlightSegments() {
    const numberOfFlightSegments = await page.$$(
      MulticityElements.multicity.locate_number_of_flight_segments,
    )
    assert.equal(
      numberOfFlightSegments.length,
      MulticityElements.multicity.MAX_NUMBER_OF_FLIGHT_SEGMENTS,
      'Expected: Number of flight segments is 6. Actual: Number of Flight segments is not 6.',
    )
    const getMaxFlightMessage = await page.locator(MulticityElements.multicity.locate_max_flights_added_message).textContent();
    assert.equal(getMaxFlightMessage, MulticityElements.multicity.MAX_FLIGHTS_ADDED_MESSAGE, 
      "Expected: Maximum flights message for multi-city journey is displayed. Actual: Maximum flights message for multi-city journey is not displayed.");
  }

  async verifyMulticitySubmitButton() {
    const multicitySubmitButtonText = await page
      .locator(MulticityElements.multicity.locate_multicity_submit_button)
      .textContent()
    assert.equal(
      multicitySubmitButtonText,
      MulticityElements.multicity.GET_FLIGHTS_NEW_FLOW,
      'Expected: Flight Only journey should be available. Actual: Other non- flight journeys are also available.',
    )
  }

  async continue() {
    await page.locator(MulticityElements.multicity.locate_multicity_submit_button).click();
    await page.waitForTimeout(20000);
  }

  async verifyMulticityFlightList() {
    const isMulticityFlightList = await page.locator(MulticityElements.multicity.locate_multicity_flight_list_page).isVisible();
    assert.isOk(isMulticityFlightList, "Expected: Multicity flight list is visible. Actual: Multicity flight list is not visible.")
  }

  async continueToFlightListPageMulticity() {
    await this.FlightSearch()
  }

  async FlightSearch(){
    let flightData = flightSearchRequest.getDefaultData();
    await this.clickOnMulticityLink();
    await this.setArrivalDepartureMulticity();
    await this.setDateForEachFlightSegment(flightData);
    await this.selectPax(flightData);
    await this.continue();
  }
}
module.exports = Multicity
