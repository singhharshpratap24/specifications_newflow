const { expect } = require('chai');
const LOGGER = require('../../../setup/logger');
const PACKAGE = JSON.parse(JSON.stringify(require('../../../../package.json')));
const FlightHelper = require('../../../Helpers/flightdatahelper.js');
const ScenarioDataHelper = require('../../../Helpers/ScenarioDataHelper.js');
const PaxHelper = require('../../../Helpers/passenger.js');
const FLIGHTSELECTION = require('../flightSelection/flight_Selection.page');
const RouteHelper = require('../../../Helpers/routeHelper.js');
const flightSearchRequest = require('../../../Helpers/flightSearchRequest.js');
const ECBypass = require('../../../Helpers/byPassECLogin.js');
const ECLogin = require('../../../page_objects/ExecutiveClub/ECLogin/ECLogin.page');
const LoginHelper = require('../../../Helpers/LoginHelper.js')
const HomePageLocators = require('../../../PageElements/FlightSelling/Home_Page.js')
const FlightSearchElements = require('../../../PageElements/FlightSelling/FlightSearch_page.js')
const read_Write_Excel = require('../../../Helpers/ExcelReaderAndWriter.js')
const PageElementHelper = require('../../../Helpers/PageElementHelper.js')

const constants = require("../../../Helpers/Constants.js");
const DateHelper = require("../../../Helpers/DateHelper.js");
const Utils = require('../../../Helpers/utils.js');

const obj_PageElementHelper= new PageElementHelper();
const obj_Read_Write_Excel = new read_Write_Excel();
const obj_DateHelper = new DateHelper();
const obj_ECLogin = new ECLogin();
const obj_ECByPass = new ECBypass();
const obj_flightselection = new FLIGHTSELECTION();
const utils= new Utils();
const Hooks = require('../../../setup/hooks.js')
 
class HomePage {
  
  availablePax=null;
  
 async gotoHomePage() {
    let accept_cookies = page.locator(HomePageLocators.homePage.locate_accept_cookies);
    LOGGER.info('Environment under Test: ' + process.env.NODE_ENV, { classname: 'HomePage' })
    await page.goto('https://' + process.env.NODE_ENV + '/travel/home/public/en_gb/', { timeout: 60000 * 5 });
    await accept_cookies.click();
    await utils.confirmPageLoad();
  }
 
  async gotoHomePageForDifferentCountry(country) {
    let accept_cookies = page.locator(HomePageLocators.homePage.locate_accept_cookies);
    LOGGER.info('Environment under Test: ' + process.env.NODE_ENV, { classname: 'HomePage' })
    await page.goto('https://' + process.env.NODE_ENV + '/travel/home/public/en_' + country + '/', { timeout: 60000 * 5 });
    await accept_cookies.click();
    await utils.confirmPageLoad();
  }
 
  async getScenarioTag() {    
    return Hooks.getTagName();
  }
 
  async gotoMMBPage() {
    let accept_cookies = page.locator(HomePageLocators.homePage.locate_accept_cookies);
 
    LOGGER.info('Environment under Test: ' + process.env.NODE_ENV, { classname: 'HomePage' })
    await page.goto('https://' + process.env.NODE_ENV + '/travel/managebooking/public/en_gb');
    await accept_cookies.click();
    await page.getByText('Log in to your booking').isVisible();
    LOGGER.info('Navigated to MMB page.', { classname: 'HomePage' });
  }
  async isBookingSectionDisplayed() {
    let booking_section = page.locator(HomePageLocators.homePage.locate_booking_section);
    expect(booking_section.isVisible());
    console.log("Booking section displays");
  }
 
  async fieldsAreAvailableOnHomePage(options) {
    let fare_label = await page.locator(HomePageLocators.homePage.locate_fare_label).textContent();
    let passengers_label = await page.getByLabel(HomePageLocators.homePage.locate_passengers_label).textContent();
    let from_label = await page.locator(HomePageLocators.homePage.locate_from_label).textContent();
    let to_label = await page.locator(HomePageLocators.homePage.locate_to_label).textContent();
    let depart_date_label = await page.locator(HomePageLocators.homePage.locate_depart_date_label).textContent();
    let return_date_label = await page.locator(HomePageLocators.homePage.locate_return_date_label).textContent();
    let travel_class_label = await page.locator('ba-form-group-dropdown > div > div > button > span').first().textContent();
 
    const optionsArray = options.split(",");
    let j = 1;
    for (let i = 0; i < optionsArray.length; i++) {
      if (optionsArray[0] == 'Flight') {
        let actualOption = await page.locator("(//*[@class='sc-ba-radio sc-ba-radio-s']/span)[" + j + "]").textContent();
        this.assertLabels(actualOption, optionsArray[i]);
        j = j + 1;
      }
      else {
        switch (optionsArray[i]) {
          case "Fare":
            this.assertLabels(fare_label, optionsArray[i]);
            break;
          case "Passengers":
            this.assertLabels(passengers_label.substr(0, 10), optionsArray[i]);
            break;
          case "From":
            this.assertLabels(from_label.substr(0, 4), optionsArray[i]);
            break;
          case "To":
            this.assertLabels(to_label.substr(0, 2), optionsArray[i]);
            break;
          case "Depart":
            this.assertLabels(depart_date_label, optionsArray[i]);
            break;
          case "Return":
            this.assertLabels(return_date_label, optionsArray[i]);
            break;
          case "Travel class":
            this.assertLabels(travel_class_label.substr(0, 12), optionsArray[i]);
            break;
          default:
            console.error("Assertion Error! " + optionsArray[i] + " label not available in booking section on home page");
            break;
        }
      }
    }
  }
  async assertLabels(actual, expected) {
    expect(actual).to.equal(expected);
    LOGGER.info(expected + ' label available', { classname: 'HomePage' });
  }
 
  async verifyLinks(linkLabels) {
    let looking_for_more_link = await page.locator(HomePageLocators.homePage.locate_links).first().textContent();
    let need_insp_link = await page.locator(HomePageLocators.homePage.locate_links).nth(1).textContent();
    const linksArray = linkLabels.split(",");
    for (let i = 0; i < linksArray.length; i++) {
      switch (linksArray[i]) {
        case "Looking for more stops?":
          this.assertLabels(looking_for_more_link, linksArray[i]);
          break;
        case "Need inspiration?":
          this.assertLabels(need_insp_link, linksArray[i]);
          break;
        default:
          console.error("Assertion Error! " + linksArray[i] + " link not available in booking section on home page");
          break;
      }
    }
  }
 
  async FlightSearch() {
    let flightData = flightSearchRequest.getDefaultData();
    let text_box_from = page.locator(FlightSearchElements.flightSearch.locate_text_box_from);
    let text_box_to = page.locator(FlightSearchElements.flightSearch.locate_text_box_to);
    let fare_type_dropdown = page.locator(FlightSearchElements.flightSearch.locate_fare_type_dropdown);
    await page.waitForTimeout(15000);
    if(flightData.journeyType.includes("oneway")){
      await fare_type_dropdown.selectOption({ value: "oneway" });
    }else{
      await fare_type_dropdown.selectOption({ value: "return" });
    }
    await page.waitForTimeout(2000);
    await text_box_from.fill(flightData.depart, {delay: 1000});
    await page.locator('#ba-input-typeahead-0-listbox').waitFor();
    await text_box_from.press('Enter');
    await page.waitForTimeout(3000);
    await text_box_to.fill(flightData.arrival, {delay: 1000});
    await page.locator('#ba-input-typeahead-1-listbox').waitFor();
    await text_box_to.press('Enter');
    await page.waitForTimeout(3000);

    let depArrDate = await obj_DateHelper.setDate(constants.Const.YYYYMMDD);
    await page.getByLabel(FlightSearchElements.flightSearch.locate_outbound_date).fill(depArrDate[0]);
 
    if (flightData.journeyType == "return") {
      await page.getByLabel(FlightSearchElements.flightSearch.locate_inBound_date).fill(depArrDate[1]);
    }
 
    await page.getByLabel(FlightSearchElements.flightSearch.locate_pax_selection).waitFor();
    await page.getByLabel(FlightSearchElements.flightSearch.locate_pax_selection).click();
    await page.getByLabel(FlightSearchElements.flightSearch.locate_adult_increase, { exact: true }).click();
 
    await page.getByLabel(FlightSearchElements.flightSearch.locate_adult_increase, { exact: true }).fill(String(flightData.adult));
    await page.getByLabel(FlightSearchElements.flightSearch.locate_young_adult_increase).click();
    await page.getByLabel(FlightSearchElements.flightSearch.locate_young_adult_increase).fill(String(flightData.youngAdult));
    await page.getByLabel(FlightSearchElements.flightSearch.locate_children_increase).click();
    await page.getByLabel(FlightSearchElements.flightSearch.locate_children_increase).fill(String(flightData.child));
    await page.getByLabel(FlightSearchElements.flightSearch.locate_infant_increase).click();
    await page.getByLabel(FlightSearchElements.flightSearch.locate_infant_increase).fill(String(flightData.infant));
    
    this.availablePax = await this.getTotalPax();
    
    let travel_class_type = page.locator(FlightSearchElements.flightSearch.locate_travel_class_type);
    await page.getByLabel(FlightSearchElements.flightSearch.locate_dropdown_travel_class).click();
    await travel_class_type.waitFor();
    await travel_class_type.getByText(flightData.ticketType, { exact: true }).click();
    await this.Search();
  }
 
  async getTotalPax(){
    return await obj_PageElementHelper.getElementText(FlightSearchElements.flightSearch.locate_pax_count,10000);
  }

  async selectFlexbileClass(){
    await page.getByLabel(FlightSearchElements.flightSearch.locate_dropdown_travel_class).click();
    await page.locator(FlightSearchElements.flightSearch.locate_flexbile_ticket).click();
    await page.getByLabel(FlightSearchElements.flightSearch.locate_dropdown_travel_class).click();
  }
 
  async Search() {
    await page.waitForTimeout(5000);
    await page.getByRole('button', { name: FlightSearchElements.flightSearch.locate_btn_search_flight }).click();
    await page.waitForLoadState('domcontentloaded');
    await utils.confirmPageLoad();
  }
 

  async continueToFlightSearchPage(route, cabin, paxmixType) {
    const caseName = await this.getScenarioTag();
    const flightSearchRequest = FlightHelper.get(caseName);
    PaxHelper.splitPaxMixType(paxmixType);
    if (route && cabin) {
      RouteHelper.routeSplit(route);
      ScenarioDataHelper.updateScenarioData(
        flightSearchRequest,
        String(PaxHelper.getNumOfAdults),
        String(PaxHelper.getNumOfYoungAdults),
        String(PaxHelper.getNumOfChildren),
        String(PaxHelper.getNumOfInfants),
        String(RouteHelper.routeType),
        String(RouteHelper.departing),
        String(RouteHelper.arrival),
        cabin
      );
    } else {
      ScenarioDataHelper.updateScenarioData(
        flightSearchRequest,
        String(PaxHelper.getNumOfAdults),
        String(PaxHelper.getNumOfYoungAdults),
        String(PaxHelper.getNumOfChildren),
        String(PaxHelper.getNumOfInfants)
      );
    }
    await this.FlightSearch();
  }

  async continueToMulticityFlightSearchPage(route, cabin, paxmixType){
    const caseName = await this.getScenarioTag();
    const flightSearchRequest = FlightHelper.get(caseName);
    PaxHelper.splitPaxMixType(paxmixType);
    if (route && cabin) {
      RouteHelper.routeSplitMulticity(route);
      if(RouteHelper.routeLegs === 2) {
        ScenarioDataHelper.updateScenarioDataMulticity(
          flightSearchRequest,
          String(PaxHelper.getNumOfAdults),
          String(PaxHelper.getNumOfYoungAdults),
          String(PaxHelper.getNumOfChildren),
          String(PaxHelper.getNumOfInfants),
          String(RouteHelper.departingSegmentOne),
          String(RouteHelper.arrivalSegmentOne),
          String(RouteHelper.departingSegmentTwo),
          String(RouteHelper.arrivalSegmentTwo),
          cabin
        );
      } else if(RouteHelper.routeLegs === 3) {
        ScenarioDataHelper.updateScenarioDataMulticity(
          flightSearchRequest,
          String(PaxHelper.getNumOfAdults),
          String(PaxHelper.getNumOfYoungAdults),
          String(PaxHelper.getNumOfChildren),
          String(PaxHelper.getNumOfInfants),
          String(RouteHelper.departingSegmentOne),
          String(RouteHelper.arrivalSegmentOne),
          String(RouteHelper.departingSegmentTwo),
          String(RouteHelper.arrivalSegmentTwo),
          String(RouteHelper.departingSegmentThree),
          String(RouteHelper.arrivalSegmentThree),
          cabin
        );
      }
    } else {
      ScenarioDataHelper.updateScenarioDataMulticity(
        flightSearchRequest,
        String(PaxHelper.getNumOfAdults),
        String(PaxHelper.getNumOfYoungAdults),
        String(PaxHelper.getNumOfChildren),
        String(PaxHelper.getNumOfInfants)
      );
    }
  }

  async numberOfPassengerError(NumberOfPassengerError) {
    let number_of_paxError = await page.locator(FlightSearchElements.flightSearch.locate_numberof_passenger_error).textContent();
    expect(number_of_paxError).to.equal(NumberOfPassengerError);
  }

  async flightSearchForWrongNumberOfPax(flightSearchRequest) {
    await page.getByLabel(FlightSearchElements.flightSearch.locate_pax_selection).waitFor();
    await page.getByLabel(FlightSearchElements.flightSearch.locate_pax_selection).click();
    await page.getByLabel(FlightSearchElements.flightSearch.locate_adult_increase, { exact: true }).click();
    await page.getByLabel(FlightSearchElements.flightSearch.locate_adult_increase, { exact: true }).fill(String(flightSearchRequest.adult));
    await page.getByLabel(FlightSearchElements.flightSearch.locate_young_adult_increase).click();
    await page.getByLabel(FlightSearchElements.flightSearch.locate_young_adult_increase).fill(String(flightSearchRequest.youngAdult));
    await page.getByLabel(FlightSearchElements.flightSearch.locate_children_increase).click();
    await page.getByLabel(FlightSearchElements.flightSearch.locate_children_increase).fill(String(flightSearchRequest.child));
    await page.getByLabel(FlightSearchElements.flightSearch.locate_infant_increase).click();
    await page.getByLabel(FlightSearchElements.flightSearch.locate_infant_increase).fill(String(flightSearchRequest.infant));
    await page.waitForTimeout(2000);

  }
  
  async continueToFlightsearchForWrongPax(paxmixType){
    const caseName = await this.getScenarioTag();
    const flightSearchRequest = FlightHelper.get(caseName);
    PaxHelper.splitPaxMixType(paxmixType);
    ScenarioDataHelper.updateScenarioData(flightSearchRequest, String(PaxHelper.getNumOfAdults), String(PaxHelper.getNumOfYoungAdults), String(PaxHelper.getNumOfChildren), String(PaxHelper.getNumOfInfants))
    await this.flightSearchForWrongNumberOfPax(flightSearchRequest);

  }

  async logInWithECMember(ecMember){
    await obj_ECByPass.signIn(ecMember);
  }

  async continueNextToECLogin(ecMember){
    const ecMemberDetails = LoginHelper.get(ecMember);
    await this.gotoHomePage();
    await obj_ECLogin.IDPLogin(ecMemberDetails);
  }
async selectJoinTheClubLink(){
  await page.getByRole('button', { name: FlightSearchElements.flightSearch.locate_manage_tab}).hover();
  //await page.getByRole('link', { name: 'Join the Club'}).click(); 
  await page.locator(HomePageLocators.homePage.locate_join_the_club_link).click();

}
  async validateJoinTheClubForm(formtitle){}

  async retrieveBooking() {
    const caseName = await this.getScenarioTag();
    let pnrData = await obj_Read_Write_Excel.convertExcelToJSON(caseName);
    let homePageTabs = await page.$$(HomePageLocators.homePage.locate_home_page_tabs);
    let manageTabElement = await homePageTabs[2];
    let bookingRef = await page.locator(HomePageLocators.homePage.locate_booking_reference_field);
    let lastName = await page.locator(HomePageLocators.homePage.locate_last_Name_field);
    let findMyBooking = await page.locator(HomePageLocators.homePage.locate_find_my_booking);

    try {
      await manageTabElement.hover();
      await bookingRef.waitFor();
      await bookingRef.type(pnrData.PNR, { delay: 100 });
      await lastName.type(pnrData.PAXLastName, { delay: 100 });
      await findMyBooking.click();
      await page.waitForTimeout(20000);
    } catch (error) {
      console.error(`[ERROR] : ${error}`)
    }
  }
};
module.exports = HomePage;