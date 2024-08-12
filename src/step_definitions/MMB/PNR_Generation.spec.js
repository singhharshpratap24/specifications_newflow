const { Given, When, Then, defineStep } = require('@cucumber/cucumber');
const APIcall = require('../../page_objects/MMB/Manage/PNR_Generation.page');
const read_Write_Excel = require('../../Helpers/ExcelReaderAndWriter.js')
const obj_APICall = new APIcall();
const obj_Read_Write_Excel = new read_Write_Excel();
const logger = require("../../setup/PNR_API_Logger");
const { Logger } = require('winston');
const HomePage = require('../../page_objects/FlightSelling/homePage/home_page.page');

const obj_homePage = new HomePage();
var PNRresponse;
var data;

Given("Authentication API call with {string} member", async function (member) {
  await obj_APICall.authcall(member);
});
When("Data is Fetched from Excel with {string}", async function (TestCaseName) {
  data = await obj_Read_Write_Excel.convertExcelToJSON(TestCaseName);
});
When("All Api calls are hit", async function () {
  logger.info(data)
  if (data === false) {
    logger.info('Skipping the api calls.');
  }
  else {
    // one way api call
    await obj_APICall.OutBound_InBoundApiCall('2024-08-15T07:05:00', data.FLY_FROM, data.CarrierCode, data.FLY_TO, data.FlightNumber, 'OutBound')
    // two way/connecting api call
    if ((data.Scenario === 'TwoWay') || (data.Scenario === 'Connecting')) {
      await obj_APICall.OutBound_InBoundApiCall('2024-09-15T07:05:00', data.FLY_FROM_1, data.CarrierCode, data.FLY_TO_1, data.FlightNumber_1, 'InBound');
    }
    // 3 flights api call
    if (data.Scenario === 'Connecting') {
      await obj_APICall.OutBound_InBoundApiCall('2024-09-30T07:05:00', data.FLY_FROM_2, data.CarrierCode, data.FLY_TO_2, data.FlightNumber_2, 'Connecting');
    }
    // create basket token api call
    await obj_APICall.CreateBasketTokenAPIcall(data.ADULTS, data.Scenario);
    // create basket quote api call
    await obj_APICall.BasketQuotesApiCall(data.CabinCode, data.ADULTS, data.Scenario);
    // payment confirmation api call
    PNRresponse = await obj_APICall.PaymentAndConfirmationCall(data.Scenario, data.ADULTS, data.FirstName, data.LastName, data.eMAIL, data.OriginCountry, data.CardNumber, data.CardType, data.CardExpiryMonth, data.CardExpiryYear, data.CardCSC);
  }
});
Then("Write PNR into Excel row", async function () {
  if (!PNRresponse) {
    logger.info('No Data added into the sheet');
  }
  else {
    logger.info(PNRresponse.price.amount)
    var TestCaseName = data.TestCase;
    await obj_Read_Write_Excel.WritePNRtoExcel(PNRresponse.reference, TestCaseName, PNRresponse.paxLastName, PNRresponse.price.amount, PNRresponse.price.currency);
  }
});


defineStep("I generate my booking reference and navigate to ba.com homepage", async()=> {
  await obj_homePage.gotoHomePage();
  await obj_APICall.authcall(member="Gold");
  const caseName = await obj_homePage.getScenarioTag();
  data = await obj_Read_Write_Excel.convertExcelToJSON(caseName);
  // logger.info(data)
  if (data === false) {
    logger.info('Skipping the api calls.');
  }
  else {
    // one way api call
    await obj_APICall.OutBound_InBoundApiCall('2024-08-15T07:05:00', data.FLY_FROM, data.CarrierCode, data.FLY_TO, data.FlightNumber, 'OutBound')
    // two way/connecting api call
    if ((data.Scenario === 'TwoWay') || (data.Scenario === 'Connecting')) {
      await obj_APICall.OutBound_InBoundApiCall('2024-09-15T07:05:00', data.FLY_FROM_1, data.CarrierCode, data.FLY_TO_1, data.FlightNumber_1, 'InBound');
    }
    // 3 flights api call
    if (data.Scenario === 'Connecting') {
      await obj_APICall.OutBound_InBoundApiCall('2024-09-30T07:05:00', data.FLY_FROM_2, data.CarrierCode, data.FLY_TO_2, data.FlightNumber_2, 'Connecting');
    }
    // create basket token api call
    await obj_APICall.CreateBasketTokenAPIcall(data.ADULTS, data.Scenario);
    // create basket quote api call
    await obj_APICall.BasketQuotesApiCall(data.CabinCode, data.ADULTS, data.Scenario);
    // payment confirmation api call
    PNRresponse = await obj_APICall.PaymentAndConfirmationCall(data.Scenario, data.ADULTS, data.FirstName, data.LastName, data.eMAIL, data.OriginCountry, data.CardNumber, data.CardType, data.CardExpiryMonth, data.CardExpiryYear, data.CardCSC);
    
    if (!PNRresponse) {
      logger.info('No Data added into the sheet');
    }
    else {
      // logger.info(PNRresponse.price.amount)
      var TestCaseName = data.TestCase;
      await obj_Read_Write_Excel.WritePNRtoExcel(PNRresponse.reference, TestCaseName, PNRresponse.paxLastName, PNRresponse.price.amount, PNRresponse.price.currency);
    }
  }
});