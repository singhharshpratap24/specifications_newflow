module.exports = {
    ECFlightSelecetion: {
        locate_continue_button: "//button[@title='Continue']",
        locate_flight_list_page: "[class^='segment details']",
        locate_solo_traveller_banner: "//*[contains(text(),'Solo traveller')]/..",
        locate_solo_traveller_banner_text: "//*[text()='Solo traveller Avios discount']",
        locate_voucherPopUp: "//*[@id='unUsedVoucherList']",
        locate_selectVoucherForTwo: "//*[text()='Gold Upgrade Voucher for Two']/../following-sibling::div[1]",
        locate_selectVoucherForOne: "//*[text()='Gold Upgrade Voucher for One']/../following-sibling::div[1]",
        locate_getPriceQuote: "//button[@value='Get price quote']",
        locate_PartnerAirLines: "//p[@class='career-and-flight']//span[1]",
        locate_rfsSymbolOutbound: "#rfsInfoMessageOutbound a[href*='RewardFlightSaversInfoModal']",
        locate_rfsSymbolInbound: "#rfsInfoMessageInbound a[href*='RewardFlightSaversInfoModal']",
        locate_sel_outbound_flight_number: "//*[@id='flightListOutbound0']/tbody/tr[3]/td[6]/div/div/div[1]/div[3]/div/p[1]/a/span[2]",
        locate_sel_inbound_flight_number: "//*[@id='flightListInbound1']/tbody/tr[3]/td[6]/div/div/div[1]/div[3]/div/p[1]/a/span[2]",
        locate_FareQuotePageHeading:"//h2[@id='priceQuoteTitle']",
        locate_RFS_Model_Continue_Btn:"//div[@class='content-area']//button[@name='continueRFSModal']",
        locate_continueBtnStopover : "#continueTopPod",
        locate_continueBtnConnectingFlights : "#continueBtn"
    }
}