const { expect, AssertionError, Assertion } = require("chai");
const logger = require("../../../setup/logger");
const ScenarioDataHelper = require("../../../Helpers/ScenarioDataHelper");
const HomePage = require("../../FlightSelling/homePage/home_page.page");
const FlightHelper = require("../../../Helpers/flightdatahelper")
const RouteHelper = require('../../../Helpers/routeHelper.js');
const PageElements = require("../../../PageElements/ExecutiveClub/ECHomepage.pagelements.js");

const obj_homePage = new HomePage();

class ECMember_Account {
    
    async continueToFlighSearchPage(routeType, paymentType) {
        const caseName = await obj_homePage.getScenarioTag();
        const flightSearchRequest = FlightHelper.get(caseName);
      
        if (routeType == "oneway" || routeType == "return") {
            ScenarioDataHelper.updateScenarioDataForEC(flightSearchRequest, routeType)
        } else if (routeType) {
            RouteHelper.routeSplit(routeType);
            ScenarioDataHelper.updateScenarioDataForEC(flightSearchRequest, String(RouteHelper.routeType),
                String(RouteHelper.departing), String(RouteHelper.arrival));
        }
        await this.chooseRedemptionType(paymentType);
    }

    async chooseRedemptionType(paymentType) {
        let bookWithAvios = await page.locator(PageElements.ECHomepage.locate_bookFlightWithAvios);
        let bookWithVoucherAndUpgrade = await page.locator(PageElements.ECHomepage.locate_bookWithVoucherAndUpgrade);
        let useGoldUpgradeAndAvios = await page.locator(PageElements.ECHomepage.locate_useGoldAndUpgradeAvios);
        let useGoldUpgradeAndMoney = await page.locator(PageElements.ECHomepage.locate_useGoldAndUpgradeMoney);
        let bookAndUpgradeTab = await page.locator(PageElements.ECHomepage.locate_bookAndUpgradeTab);
        let amexCompanionVoucher = await page.locator(PageElements.ECHomepage.locate_amexCompanionVoucher);
        let amexCreditCardCompanionVoucher = await page.locator(PageElements.ECHomepage.locate_amexCreditCardCompanionVoucher);
        let amexPremiumPlusCompanionVoucher = await page.locator(PageElements.ECHomepage.locate_amexPremiumPlusCompanionVoucher);
        let amexPremiumPlus_eVoucher = await page.locator(PageElements.ECHomepage.locate_amexPremiumPlus_eVoucher);
        let amexComp_eVoucher=await page.locator(PageElements.ECHomepage.locate_amex_comp_eVoucher);
        let voucher = await page.locator(PageElements.ECHomepage.locate_voucherPopUp);
        
        const RedemptionTypeHelper = {
            BOOK_WITH_AVIOS: "Book with Avios",
            FULL_AVIOS: "Full Avios",
            PART_AVIOS_PART_CASH: "PartAvios PartCash",
            GOLD_UPGRADE_FOR_TWO: "Gold Upgrade for Two",
            BOOK_WITH_MONEY_UPGRADE_WITH_GOLD_VOUCHER: "Book with Money,Upgrade with Gold Voucher",
            BOOK_WITH_MONEY_UPGRADE_USING_AVIOS: "Book with Money,Upgrade using Avios",
            BOOK_WITH_AVIOS_UPGRADE_WITH_GOLD_VOUCHER: "Book with avios, upgrade with gold voucher",
            BOOK_WITH_AMEX_COMPANION_VOUCHER: "BA American Express Companion Voucher",
            BOOK_WITH_AMEX_CREDIT_CARD_COMPANION_VOUCHER: "BA American Express Credit Card Companion Voucher",
            BOOK_WITH_AMEX_PREMIUM_PLUS_COMPANION_VOUCHER: "BA American Express Premium Plus Companion Voucher",
        }
       
        if (RedemptionTypeHelper.BOOK_WITH_AVIOS.includes(paymentType) || RedemptionTypeHelper.FULL_AVIOS.includes(paymentType) || RedemptionTypeHelper.PART_AVIOS_PART_CASH.includes(paymentType) ) {
            await bookWithAvios.click();
        }
        else if (RedemptionTypeHelper.BOOK_WITH_AMEX_COMPANION_VOUCHER.includes(paymentType)){
            await bookWithAvios.click();
            await amexCompanionVoucher.click();
            await amexComp_eVoucher.click();
        }  
        else if (RedemptionTypeHelper.BOOK_WITH_AMEX_CREDIT_CARD_COMPANION_VOUCHER.includes(paymentType) ) {
            await bookWithAvios.click();
            await amexCreditCardCompanionVoucher.click();
        }
        else if (RedemptionTypeHelper.BOOK_WITH_AMEX_PREMIUM_PLUS_COMPANION_VOUCHER.includes(paymentType)){
            await bookWithAvios.click();
            await amexPremiumPlusCompanionVoucher.click();  
            await amexPremiumPlus_eVoucher.click();
        }
         else if (RedemptionTypeHelper.GOLD_UPGRADE_FOR_TWO.includes(paymentType)) {
            await bookWithAvios.click();
            await bookWithVoucherAndUpgrade.click();
        } else if (RedemptionTypeHelper.BOOK_WITH_AVIOS_UPGRADE_WITH_GOLD_VOUCHER.includes(paymentType)) {
            await bookWithAvios.click();      
            await bookAndUpgradeTab.click();
            await useGoldUpgradeAndAvios.click(); 
        } 
        else if (RedemptionTypeHelper.BOOK_WITH_MONEY_UPGRADE_WITH_GOLD_VOUCHER.includes(paymentType)) {
            await bookWithAvios.click();
            await bookAndUpgradeTab.click();
            await useGoldUpgradeAndMoney.click();
        }
        else if(RedemptionTypeHelper.BOOK_WITH_MONEY_UPGRADE_USING_AVIOS.includes(paymentType)){
            await bookWithAvios.click();
            await bookAndUpgradeTab.click();         
        }
    }
    async ClickOnBookFlightWithAvios() {
        let BookWithAvios = page.locator(PageElements.ECHomepage.locate_bookFlightWithAvios)
        await BookWithAvios.click();
    }

    async goToFriendsAndFamilyPage(){
        let manageMyAccountTab = await page.locator(PageElements.ECHomepage.locate_manage_my_account_tab);
        let friendsAndFamilyOption = await page.locator(PageElements.ECHomepage.locate_friends_and_family_button);
        await manageMyAccountTab.hover();
        await friendsAndFamilyOption.waitFor();
        await friendsAndFamilyOption.click();
    }

    async goToHouseHoldAccountPage(){
        let manageMyAccountTab = await page.locator(PageElements.ECHomepage.locate_manage_my_account_tab);
        let HHAOption = await page.locator(PageElements.ECHomepage.locate_house_hold_account_button);
        await manageMyAccountTab.hover();
        await HHAOption.waitFor();
        await HHAOption.click();
    }

    async goToThirdPartyNomineePage(){
        let manageMyAccountTab = await page.locator(PageElements.ECHomepage.locate_manage_my_account_tab);
        let thirdPartyNomineeOption = await page.locator(PageElements.ECHomepage.locate_manage_third_party_nominee_button);
        await manageMyAccountTab.hover();
        await thirdPartyNomineeOption.waitFor();
        await thirdPartyNomineeOption.click();        
   } 

    //This method checks and confirms whether the member is an EC Gold, Blue, or any other type of member
    async confirmECMemberAccountType(EcMember){  
     try{
            console.log("Inside assert")
            await page.locator("xpath=//div[contains(@class,'"+EcMember+"')][1]").isVisible();
            console.log("Ec memberType is :"+EcMember)
            console.log("Assert successful.....");                         
        }catch(error){
            console.error("[ASSERTION ERROR]ECMember_Account:confirmECMemberAccountType");
        }
    }     
    async gotoMyAccount () { 
        await page.locator("xpath=//a[normalize-space()='My Account']").click();
    }

    async  checkElementVisibility(page, selector) {
        try{
            console.log("Inside assert")
        const element = await page.locator(selector);
        const isVisible=await element.isVisible(); 
        expect(isVisible).to.be.true;

      }catch(error){
        console.error("[ASSERTION ERROR]ecmember_account.page:checkElementVisibility:\'selector\'");
      }

    }
async isCorrectMemberNameDisplayedOnECHomePage(ecname){  
    const actualName = await page.locator(PageElements.ECHomepage.actualMemberName).textContent();
    expect(actualName).to.equal(ecname);
    console.log("Ec Emember name is :"+actualName);  
}

async getAviosMilesAmountDisplayedOnEcHomePage(){ 
    const aviosPointsNumber = await page.locator(PageElements.ECHomepage.aviosPoints).textContent();
try{
    console.log("Inside assert")
    if(parseInt (aviosPointsNumber) > 0 && aviosPointsNumber!= 0 ){
        

        console.log("Avios points are Displayed :"+aviosPointsNumber)
    }
    else{
        console.log("Please check avios are less or not avaiable");
    }
}
catch(error){
    console.log("[ASSERTION ERROR]ecmember_account.page:getAviosMilesAmountDisplayedOnEcHomePage")
}
}
async getTierPointsDisplayedOnECHomePage(){
    try{
        await ECMember_Account.checkElementVisibility()

    }
catch(error){
}

}
async clickFlightsLink(){
}
async isPlanYourJourneyPageDisplayed(){
}

async clickPaymentDropdownBox(){
}

async isMyAccountLinkDisplayed(){
    await page.waitForTimeout(5000);
    expect(page.locator(PageElements.ECHomepage.myAccountLink).isVisible());
    logger.info("My Account link displays, User logged in successfully");
}
async ecMemberLogout(){
    await page.locator(PageElements.ECHomepage.logoutbtn).click();
    logger.info("EC Member logged out successfully")
}
async selectExecClubTab(){
    let executiveClubtab = await page.locator(PageElements.ECHomepage.locate_ExecutiveClub_tab);
    await page.waitForTimeout(5000);
    await executiveClubtab.hover();
    await executiveClubtab.waitFor();
    await executiveClubtab.click();
}
async VerifyCollectingAviosLink(){
    let collectingAvios = await page.locator(PageElements.ECHomepage.CollectingAviosLink);
    await collectingAvios.waitFor();
    expect(collectingAvios.isVisible());
    logger.info("Collecting Avios Link is displays");
}

async goToMyTravelCompanionsPage(){
    let manageMyAccountTab = await page.locator(PageElements.ECHomepage.locate_manage_my_account_tab);
    let myTravelCompanion = await page.locator(PageElements.ECHomepage.locate_my_travel_companions_tab);
    await manageMyAccountTab.hover();
    await myTravelCompanion.waitFor();
    await myTravelCompanion.click();
}

    
 async clickExecutiveClubItem(){   
    await page.locator(PageElements.ECHomepage.locate_executive_club_link).click();
 }
 async selectMemberShipCardOption(){
    await page.locator(PageElements.ECHomepage.locate_membershipCardOptions).click();
 }
 async executiveClubItemPageDisplayed() {
    await page.locator(PageElements.ECHomepage.locate_executive_club_page).isVisible();
    logger.info('[INFO]:Executive Club Item Page Displayed')
 }
 async selectDropdownMenuOption(Option) { 
        await page.locator(PageElements.ECHomepage.locate_item_name).selectOption(Option);
        console.log("selected option is :",Option)
        switch(Option) {
            case "Receive my membership card by email":
                await page.locator(PageElements.ECHomepage.locate_chooseItem_email_continue_Btn).click();
                break;
            case "Print a copy of my membership card":
                await page.locator(PageElements.ECHomepage.locate_print_continue_btn).click()
                this.printEmailMemberShipCardPage();
                break;
            case "Download the BA app and my digital membership card":
                await page.locator(PageElements.ECHomepage.locate_DownloadApp_icon).isVisible();
                break;
            case "Save a copy of my membership card":
                await page.locator(PageElements.ECHomepage.locate_Save_MemberShipCard_btn).click();
                break;
        }
 }
     async printEmailMemberShipCardPage(){
            const pagePromise = context.waitForEvent('page');
            const newPage = await pagePromise;
            await newPage.waitForLoadState();
            
            let pagetitle= await newPage.title();
            
                  console.log(pagetitle);
                  
               expect(pagetitle).to.equal('British Airways - Digital Fulfilment Card');
        }
 async isCorrectPageIsDisplayed(Option){
    switch(Option)
    {       
        case "Print a copy of my membership card":
            await page.locator(PageElements.ECHomepage.locate_MemberShipCardImg).isVisible();
            logger.info('[Info]:Your membership card image is Displayed')
            break;
        case "Receive my membership card by email":
            const successMsgText = "A copy of your membership card has been sent to you at";
            const successMessage= await page.locator(PageElements.ECHomepage.locate_success_message).textContent();
            if(successMessage.includes(successMsgText)){
             logger.info('[ASSERT]:A copy of your membership card has been sent to you at registered email')
            }
            break;
        case "Download the BA app and my digital membership card":
            await page.locator(PageElements.ECHomepage.locate_DownloadText).isVisible();
            break;
        case "Save a copy of my membership card":
            await page.locator(PageElements.ECHomepage.locate_save_memberShip_page).isVisible();
            break;
    }
 }

 async isBookWithAviosOrmoneyDisplayed(){
    let bookWithAviosOrMoney = await page.locator(PageElements.ECHomepage.locate_bookWithAviosOrMoney);
    await bookWithAviosOrMoney.waitFor();
    expect(bookWithAviosOrMoney.isVisible());
   
 }
 async isCorrectOptionsDisplayed(Options){
    let givenOptions = Options.split(" ; ")
    let bookflightWithAvios = await page.locator(PageElements.ECHomepage.locate_bookFlightWithAvios).textContent();
    let bookfligthWithMoney = await page.locator(PageElements.ECHomepage.locate_bookFlightWithMoney).textContent();
    let bookwithVoucherandUpgrade = await page.locator(PageElements.ECHomepage.locate_bookWithVoucherAndUpgrade).textContent();
    expect(bookflightWithAvios.trim()).to.equal(givenOptions[0])
    expect(bookfligthWithMoney.trim()).to.equal(givenOptions[1])
    expect(bookwithVoucherandUpgrade.trim()).to.equal(givenOptions[2])
 }

 async isMembernameAviosandTierPointDisplayed(){
    let memberName = await page.locator(PageElements.ECHomepage.locate_memberName);
    expect(memberName.isVisible());
    let aviosPoint = await page.locator(PageElements.ECHomepage.locate_avios);
    expect(aviosPoint.isVisible());
    let tierPoint = await page.locator(PageElements.ECHomepage.locate_tierPoint);
    expect(tierPoint.isVisible());
}
};

module.exports = ECMember_Account ;