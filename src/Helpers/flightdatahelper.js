const FLIGHT_SEARCH_REQUEST = require('../Helpers/flightSearchRequest.js');
const FlightConfirmation = require('../page_objects/FlightSelling/Confirmation/Confirmation.page.js');
 
const FLIGHT_DETAILS_MAP = new Map();
 
FLIGHT_DETAILS_MAP.set("HoldBookingDisplayedForABALongHaul", FLIGHT_SEARCH_REQUEST.setDefaultLongHaulReturnJourneyLHRDEL())
FLIGHT_DETAILS_MAP.set("HoldBookingForLongHaul", FLIGHT_SEARCH_REQUEST.setDefaultLongHaulReturnJourneyLHRDEL())
FLIGHT_DETAILS_MAP.set("CompleteHoldBookingTest", FLIGHT_SEARCH_REQUEST.setDefaultShortHaulReturnJourneyLHRCDG())
FLIGHT_DETAILS_MAP.set("PaymentConfirmation_HBFF01Test", FLIGHT_SEARCH_REQUEST.setLongHaulReturnJourneyForLHRBOM())
FLIGHT_DETAILS_MAP.set("PaymentConfirmation_HBFF07Test", FLIGHT_SEARCH_REQUEST.setLongHaulReturnJourneyForLHRKWI())
FLIGHT_DETAILS_MAP.set("HoldBookingDisplayeForABC", FLIGHT_SEARCH_REQUEST.setLongHaulOneWayConnectingJourneyForMANDEL())
FLIGHT_DETAILS_MAP.set("HoldBookingOptionIsDisplayedForABJourney", FLIGHT_SEARCH_REQUEST.setDefaultShortHaulOneWayJourneyLHRCDG())
FLIGHT_DETAILS_MAP.set("HoldBookingOptionIsDisplayedForBAFlights", FLIGHT_SEARCH_REQUEST.setLongHaulOneWayConnectingJourneyForDXBBOM())
FLIGHT_DETAILS_MAP.set("HoldBookingOptionIsDisplayedforIberiaFlights", FLIGHT_SEARCH_REQUEST.setShortHaulIberiaOneWayJourneyForBCNMAD())
FLIGHT_DETAILS_MAP.set("HoldBookingForSeventyTwoHours", FLIGHT_SEARCH_REQUEST.setDefaultLongHaulReturnUSJourneyLHRJFK())
FLIGHT_DETAILS_MAP.set("HoldBookingPodDisplayed", FLIGHT_SEARCH_REQUEST.setDefaultLongHaulReturnUSJourneyLHRJFK())
FLIGHT_DETAILS_MAP.set("HoldBookingOptionIsDisplayedForABAJourneyFS", FLIGHT_SEARCH_REQUEST.setDefaultLongHaulReturnJourneyLHRDEL())
FLIGHT_DETAILS_MAP.set("HoldBookingOptionIsDisplayedForBACityflyerFlights", FLIGHT_SEARCH_REQUEST.setShortHaulCityFlyerReturnJourneyForLCYIBZ())
FLIGHT_DETAILS_MAP.set("OfferHoldBookingForFee_HBFF01Test", FLIGHT_SEARCH_REQUEST.setLongHaulReturnJourneyForLHRBOM())
FLIGHT_DETAILS_MAP.set("OfferHoldBookingForFee_HBFF07Test", FLIGHT_SEARCH_REQUEST.setLongHaulReturnJourneyForLHRKWI())
FLIGHT_DETAILS_MAP.set("HoldBookingOptionIsDisplayedForABCJourney", FLIGHT_SEARCH_REQUEST.setLongHaulOneWayConnectingJourneyForMANDEL())
FLIGHT_DETAILS_MAP.set("HoldBookingOptionIsDisplayedForABCBAJourney", FLIGHT_SEARCH_REQUEST.setLongHaulReturnConnectingJourneyForDXBBOM())
FLIGHT_DETAILS_MAP.set("HoldBookingHighRiskCountryCheck", FLIGHT_SEARCH_REQUEST.setHighRiskOneWayJourneyForLHRACC())
FLIGHT_DETAILS_MAP.set("HoldBookingOptionNotDisplayedForShortHaulRoute", FLIGHT_SEARCH_REQUEST.setDefaultShortHaulOneWayFlexibleJourneyLHRCDG())
FLIGHT_DETAILS_MAP.set("InformationAboutFeeAndTermsAndCondition_HBFF01Test", FLIGHT_SEARCH_REQUEST.setLongHaulReturnJourneyForLHRBOM())
FLIGHT_DETAILS_MAP.set("InformationAboutFeeAndTermsAndCondition_HBFF07Test", FLIGHT_SEARCH_REQUEST.setLongHaulReturnJourneyForLHRKWI())
FLIGHT_DETAILS_MAP.set("PaymentOptionForHoldBookingFee", FLIGHT_SEARCH_REQUEST.setDefaultLongHaulReturnUSJourneyLHRJFK())
FLIGHT_DETAILS_MAP.set("PaymentOptionForHoldBookingFeeForPayPal", FLIGHT_SEARCH_REQUEST.setDefaultLongHaulReturnUSJourneyLHRJFK())
FLIGHT_DETAILS_MAP.set("HBFF05Test", FLIGHT_SEARCH_REQUEST.setLongHaulReturnJourneyForCORLHR())
FLIGHT_DETAILS_MAP.set("HBFF17Test", FLIGHT_SEARCH_REQUEST.setLongHaulReturnJourneyForBOGLHR())
FLIGHT_DETAILS_MAP.set("HBFF20Test", FLIGHT_SEARCH_REQUEST.setLongHaulReturnJourneyForORKLHR())
FLIGHT_DETAILS_MAP.set("HBFF18Test", FLIGHT_SEARCH_REQUEST.setLongHaulReturnJourneyForJFKLHR())
FLIGHT_DETAILS_MAP.set("PaymentSurchargeNotApplicable", FLIGHT_SEARCH_REQUEST.setDefaultLongHaulReturnUSJourneyLHRJFK())
FLIGHT_DETAILS_MAP.set("VerifyEvoucherOnHoldBookingTest", FLIGHT_SEARCH_REQUEST.setDefaultLongHaulReturnJourneyLHRDEL())
FLIGHT_DETAILS_MAP.set("VerifyAviosDiscountOnHoldBookingTest", FLIGHT_SEARCH_REQUEST.setLongHaulReturnJourneyForLHRBOM())
FLIGHT_DETAILS_MAP.set("ShowingSeatSelectionPageInPrimeSelling", FLIGHT_SEARCH_REQUEST.setLongHaulReturnConnectingJourneyForEDIMAD())
FLIGHT_DETAILS_MAP.set("BaggageAllowanceShortHaul", FLIGHT_SEARCH_REQUEST.setShortHaulOneWayJourneyForLHRAMS())
FLIGHT_DETAILS_MAP.set("BaggageAllowanceLongHaul", FLIGHT_SEARCH_REQUEST.setLongHaulOneWayJourneyForLHRMAA())
FLIGHT_DETAILS_MAP.set("SeparateChangeFlightSearchOptions", FLIGHT_SEARCH_REQUEST.setDefaultLongHaulReturnJourneyLHRDEL())
FLIGHT_DETAILS_MAP.set("oneway_Direct_pnrbooking_farequoteAgreeAndContinue", FLIGHT_SEARCH_REQUEST.setDefaultShortHaulOneWayJourneyLHRCDG())
FLIGHT_DETAILS_MAP.set("oneway_Connecting_pnrbooking_farequoteAgreeAndContinue", FLIGHT_SEARCH_REQUEST.setShortHaulConnectingOneWayJourneyForEDICDG())
FLIGHT_DETAILS_MAP.set("roundtrip_direct_pnrbooking_farequoteAgreeAndContinue", FLIGHT_SEARCH_REQUEST.setDefaultLongHaulReturnUSJourneyLHRJFK())
FLIGHT_DETAILS_MAP.set("roundtrip_connecting_pnrbooking_farequoteAgreeAndContinue", FLIGHT_SEARCH_REQUEST.setShortHaulConnectingReturnJourneyForEDICDG())
FLIGHT_DETAILS_MAP.set("oneway_pnrbooking_farequoteApplyVoucher", FLIGHT_SEARCH_REQUEST.setDefaultLongHaulOneWayJourneyLHRDEL())
FLIGHT_DETAILS_MAP.set("oneway_pnrbooking_farequoteSaveWithAvios", FLIGHT_SEARCH_REQUEST.setDefaultDomesticOneWayJourneyForLHREDI())
FLIGHT_DETAILS_MAP.set("oneway_pnrbooking_farequote_disabilityAssistance", FLIGHT_SEARCH_REQUEST.setDefaultShortHaulOneWayJourneyLHRCDG())
FLIGHT_DETAILS_MAP.set("twoway_Shorthhaul_Direct_pnrbooking_farequoteAgreeAndContinue", FLIGHT_SEARCH_REQUEST.setDefaultShortHaulReturnJourneyLHRCDG())
FLIGHT_DETAILS_MAP.set("twoway_Longhaul_Direct_pnrbooking_farequoteAgreeAndContinue", FLIGHT_SEARCH_REQUEST.setDefaultLongHaulReturnJourneyLHRDEL())
FLIGHT_DETAILS_MAP.set("twoway_Connecting_pnrbooking_farequoteAgreeAndContinue", FLIGHT_SEARCH_REQUEST.setShortHaulConnectingReturnJourneyForEDICDG())
FLIGHT_DETAILS_MAP.set("paymentSurchargeChargedForSurchargeCountry", FLIGHT_SEARCH_REQUEST.setShortHaulOneWayJourneyForLHRAMS())
FLIGHT_DETAILS_MAP.set("oneway_pnrbooking_farequote_holdBooking", FLIGHT_SEARCH_REQUEST.setDefaultShortHaulOneWayJourneyLHRCDG())
FLIGHT_DETAILS_MAP.set("doanationsFixed", FLIGHT_SEARCH_REQUEST.setDefaultShortHaulReturnJourneyLHRCDG())
FLIGHT_DETAILS_MAP.set("donationNoThanks", FLIGHT_SEARCH_REQUEST.setDefaultShortHaulReturnJourneyLHRCDG())
FLIGHT_DETAILS_MAP.set("Verify_cards_available_for_payment_PaymentPage",FLIGHT_SEARCH_REQUEST.setDefaultShortHaulReturnJourneyLHRCDG())
FLIGHT_DETAILS_MAP.set("HoldBookingAbleToHold", FLIGHT_SEARCH_REQUEST.setShortHaulPartnerAirlinesReturnJourneyForLHRMAD())
FLIGHT_DETAILS_MAP.set("Shorthaul_APDTaxes_PNRBooking", FLIGHT_SEARCH_REQUEST.setShortHaulOneWayJourneyForLHRAMS())
FLIGHT_DETAILS_MAP.set("Longhaul_APDTaxes_PNRBooking", FLIGHT_SEARCH_REQUEST.setLongHaulOneWayConnectingJourneyForDXBBOM())
FLIGHT_DETAILS_MAP.set("VerifyDonationOnHoldBookingTest", FLIGHT_SEARCH_REQUEST.setDefaultShortHaulOneWayJourneyLHRCDG())
FLIGHT_DETAILS_MAP.set("CVV_Errormessage_verify", FLIGHT_SEARCH_REQUEST.setDefaultShortHaulOneWayJourneyLHRCDG())
FLIGHT_DETAILS_MAP.set("Address_Errormessage_verify_PaymentPage", FLIGHT_SEARCH_REQUEST.setDefaultShortHaulOneWayJourneyLHRCDG())
FLIGHT_DETAILS_MAP.set("VerifyHoldDetailsForPriceQuotePage", FLIGHT_SEARCH_REQUEST.setDefaultShortHaulOneWayJourneyLHRCDG())
FLIGHT_DETAILS_MAP.set("VerifyHoldDetailsForHoldSummaryPage", FLIGHT_SEARCH_REQUEST.setShortHaulOneWayJourneyForLHRAMS())
FLIGHT_DETAILS_MAP.set("VerifyHoldDetailsForShortHaulHoldPaymentPage", FLIGHT_SEARCH_REQUEST.setDefaultDomesticOneWayJourneyForLHREDI())
FLIGHT_DETAILS_MAP.set("VerifyHoldDetailsForLongHaulHoldPaymentPage", FLIGHT_SEARCH_REQUEST.setDefaultLongHaulOneWayJourneyLHRDEL())
FLIGHT_DETAILS_MAP.set("VerifyHoldDetailsForHoldConfirmationPage", FLIGHT_SEARCH_REQUEST.setDefaultShortHaulOneWayJourneyLHRCDG())
FLIGHT_DETAILS_MAP.set("ErrorCheckOnPassengerPage", FLIGHT_SEARCH_REQUEST.setLongHaulReturnJourneyForLHRSIN())
FLIGHT_DETAILS_MAP.set("Classic_bacom_FlightSellingWeb_Test_05", FLIGHT_SEARCH_REQUEST.setJourneyDetailsForMulticity())
FLIGHT_DETAILS_MAP.set("Classic_bacom_FlightSellingWeb_Test_07", FLIGHT_SEARCH_REQUEST.setJourneyDetailsForMulticity())
FLIGHT_DETAILS_MAP.set("Classic_bacom_FlightSellingWeb_Test_08", FLIGHT_SEARCH_REQUEST.setJourneyDetailsTypeOfFlight())
FLIGHT_DETAILS_MAP.set("Classic_bacom_FlightSellingWeb_Test_13", FLIGHT_SEARCH_REQUEST.setJourneyDetailsForMulticity())
FLIGHT_DETAILS_MAP.set("Classic_bacom_FlightSellingWeb_Test_14", FLIGHT_SEARCH_REQUEST.setJourneyDetailsForOpenJaw())
FLIGHT_DETAILS_MAP.set("PaymentAddressErrorValidation", FLIGHT_SEARCH_REQUEST.setDefaultShortHaulOneWayJourneyLHRCDG())
FLIGHT_DETAILS_MAP.set("Postalcode_Errormessage_verify_PaymentPage", FLIGHT_SEARCH_REQUEST.setLongHaulReturnJourneyForLHRSIN())
FLIGHT_DETAILS_MAP.set("VerifyNoCheckedBaggageAllowance",FLIGHT_SEARCH_REQUEST.setDefaultShortHaulOneWayJourneyLHRCDG())
FLIGHT_DETAILS_MAP.set("Missing_Card_Exp_ErrorMsg_verify_PaymentPage", FLIGHT_SEARCH_REQUEST.setDefaultShortHaulOneWayJourneyLHRCDG())
FLIGHT_DETAILS_MAP.set("SecureOnlinePaymentCards", FLIGHT_SEARCH_REQUEST.setDefaultDomesticOneWayJourneyForLHREDI())
FLIGHT_DETAILS_MAP.set("NumberOfPassengerError", FLIGHT_SEARCH_REQUEST.setShortHaulConnectingReturnJourneyForEDIMAD())
FLIGHT_DETAILS_MAP.set("ShowingSameSeatOnMmb", FLIGHT_SEARCH_REQUEST.setLongHaulReturnConnectingJourneyForLHRSYD())
FLIGHT_DETAILS_MAP.set("ECMember_OneWay_LongHaul_Cash_PNRBooking", FLIGHT_SEARCH_REQUEST.setDefaultLongHaulOneWayJourneyLHRDEL())
FLIGHT_DETAILS_MAP.set("ECMember_OneWay_ShortHaul_Cash_PNRBooking", FLIGHT_SEARCH_REQUEST.setDefaultShortHaulOneWayJourneyLHRCDG())
FLIGHT_DETAILS_MAP.set("PrimesellingWithThirdPartyAsPayerTest", FLIGHT_SEARCH_REQUEST.setDefaultShortHaulOneWayJourneyLHRCDG())
FLIGHT_DETAILS_MAP.set("GhanaCommercialBooking", FLIGHT_SEARCH_REQUEST.setHighRiskOneWayJourneyForLHRACC())
FLIGHT_DETAILS_MAP.set("ECMember_OneWay_Domestic_Cash_PNRBooking", FLIGHT_SEARCH_REQUEST.setDefaultDomesticOneWayJourneyForLHREDI())
FLIGHT_DETAILS_MAP.set("ECMember_RoundTrip_Longhaul_Cash_PNRBooking", FLIGHT_SEARCH_REQUEST.setDefaultLongHaulReturnJourneyLHRDEL())
FLIGHT_DETAILS_MAP.set("Card_Errormessage_verify_PaymentPage_Type1", FLIGHT_SEARCH_REQUEST.setDefaultShortHaulOneWayJourneyLHRCDG())
FLIGHT_DETAILS_MAP.set("Card_Errormessage_verify_PaymentPage_Type2", FLIGHT_SEARCH_REQUEST.setDefaultShortHaulOneWayJourneyLHRCDG())
FLIGHT_DETAILS_MAP.set("Card_Errormessage_verify_PaymentPage_Type3", FLIGHT_SEARCH_REQUEST.setDefaultShortHaulOneWayJourneyLHRCDG())
FLIGHT_DETAILS_MAP.set("BaggageAllowanceForUpgradedCabin", FLIGHT_SEARCH_REQUEST.setLongHaulOneWayBusinessCabinJourneyForLHRMAA())
FLIGHT_DETAILS_MAP.set("UpgradeAvailableEconomy", FLIGHT_SEARCH_REQUEST.setDefaultShortHaulOneWayJourneyLHRCDG())
FLIGHT_DETAILS_MAP.set("UpgradeAvailableHBO", FLIGHT_SEARCH_REQUEST.setShortHaulConnectingOneWayJourneyForEDICDG())
FLIGHT_DETAILS_MAP.set("StandardHBOFeatures", FLIGHT_SEARCH_REQUEST.setDefaultShortHaulOneWayJourneyLHRCDG())
FLIGHT_DETAILS_MAP.set("OnewayShortHaulBookWithAviosBooking", FLIGHT_SEARCH_REQUEST.setDefaultShortHaulOneWayJourneyLHRCDG())
FLIGHT_DETAILS_MAP.set("RoundTripShortHaulBookWithAviosBooking", FLIGHT_SEARCH_REQUEST.setDefaultShortHaulOneWayJourneyLHRCDG())
FLIGHT_DETAILS_MAP.set("VerifyCarbonDonationOnHoldBookingTest", FLIGHT_SEARCH_REQUEST.setLongHaulReturnJourneyForLHRBOM())
FLIGHT_DETAILS_MAP.set("ConfirmBookingForMultiCity", FLIGHT_SEARCH_REQUEST.setJourneyDetailsForTwoSegmentsDefault())
FLIGHT_DETAILS_MAP.set("Upgrade_Option_Is_Not_Available", FLIGHT_SEARCH_REQUEST.setLongHaulReturnJourneyForLHRDEL())
FLIGHT_DETAILS_MAP.set("VerifyConfirmationForGUFTBooking-bacom_executiveClubSellingWeb", FLIGHT_SEARCH_REQUEST.setDefaultLongHaulReturnJourneyMEXLHR())
FLIGHT_DETAILS_MAP.set("AmericanAirlines-bacom_executiveClubSellingWeb", FLIGHT_SEARCH_REQUEST.setLongHaulReturnJourneyForJFKLHR())
FLIGHT_DETAILS_MAP.set("MalaysiaAirlinesFlightBrowse-bacom_executiveClubSellingWeb", FLIGHT_SEARCH_REQUEST.setDefaultLongHaulReturnJourneyMAAKUL())
FLIGHT_DETAILS_MAP.set("QantasAirwaysFlightBrowse-bacom_executiveClubSellingWeb", FLIGHT_SEARCH_REQUEST.setDefaultLongHaulReturnJourneyLHRDOH())
FLIGHT_DETAILS_MAP.set("RoyalJordanian-bacom_executiveClubSellingWeb", FLIGHT_SEARCH_REQUEST.setDefaultLongHaulReturnJourneyLHRAMM())
FLIGHT_DETAILS_MAP.set("SriLankanAirlines-bacom_executiveClubSellingWeb", FLIGHT_SEARCH_REQUEST.setDefaultLongHaulReturnJourneyLHRCMB())
FLIGHT_DETAILS_MAP.set("AviosWithChildAndInfant", FLIGHT_SEARCH_REQUEST.setDefaultLongHaulOnewayJourneyLHREDI())
FLIGHT_DETAILS_MAP.set("RoundTripLongHaulUSBookWithAviosBooking", FLIGHT_SEARCH_REQUEST.setDefaultLongHaulReturnJourneyMEXLHR())
FLIGHT_DETAILS_MAP.set("BookwithAviosUpgradeWithGoldVoucherGUFT", FLIGHT_SEARCH_REQUEST.setDefaultLongHaulReturnJourneyPremiumEconomyMEXLHR2Adults())
FLIGHT_DETAILS_MAP.set("BookwithAviosUpgradeWithGoldVoucherGUFO", FLIGHT_SEARCH_REQUEST.setDefaultLongHaulReturnJourneyPremiumEconomyMEXLHR())
FLIGHT_DETAILS_MAP.set("DetailsDisplayedForPriceBreakdownSection", FLIGHT_SEARCH_REQUEST.setDefaultShortHaulOneWayJourneyLHRCDG())
FLIGHT_DETAILS_MAP.set("Solotravellerbannerfor121voucher", FLIGHT_SEARCH_REQUEST.setDefaultShortHaulOneWayJourneyLHRCDG())
FLIGHT_DETAILS_MAP.set("TwoWayBookWithAviosItinerary", FLIGHT_SEARCH_REQUEST.setDefaultShortHaulReturnJourneyLHRCDG())
FLIGHT_DETAILS_MAP.set("Paxmix_type_booking_summary_page", FLIGHT_SEARCH_REQUEST.setDefaultShortHaulReturnJourneyLHRCDG())
FLIGHT_DETAILS_MAP.set("RoundTripLongHaulUSBookWithMoneyUpgradeUsingAviosBooking", FLIGHT_SEARCH_REQUEST.setDefaultLongHaulReturnWorldTravellerJourneyMEXLHR())
FLIGHT_DETAILS_MAP.set("VerifyPayAndCompleteBookingOptionForHoldBooking", FLIGHT_SEARCH_REQUEST.setDefaultShortHaulOneWayJourneyLHRCDG())
FLIGHT_DETAILS_MAP.set("BookWithAviosUpgradeGoldVoucherBAOnly", FLIGHT_SEARCH_REQUEST.setDefaultLongHaulReturnUSJourneyLHRJFK())
FLIGHT_DETAILS_MAP.set("BookWithMoneyUpgradeGoldVoucherBAOnly", FLIGHT_SEARCH_REQUEST.setDefaultLongHaulReturnUSJourneyLHRJFK())
FLIGHT_DETAILS_MAP.set("displayOfRFSsymbolRFS", FLIGHT_SEARCH_REQUEST.setDefaultLongHaulReturnJourneyLHRDEL())
FLIGHT_DETAILS_MAP.set("UpgradeNotAvailableRedemption", FLIGHT_SEARCH_REQUEST.setDefaultShortHaulOneWayJourneyLHRCDG())
FLIGHT_DETAILS_MAP.set("PaymentSurchargeAddedTest", FLIGHT_SEARCH_REQUEST.setDefaultShortHaulOneWayJourneyLHRCDG())
FLIGHT_DETAILS_MAP.set("BookWithAviosDetailsDisplayedForPriceBreakdownSection", FLIGHT_SEARCH_REQUEST.setDefaultShortHaulOneWayJourneyLHRCDG())
FLIGHT_DETAILS_MAP.set("BookwithMoneyUpgradeUsingAviosDetailsDisplayedForPriceBreakdownSection", FLIGHT_SEARCH_REQUEST.setDefaultLongHaulReturnWorldTravellerJourneyMEXLHR())
FLIGHT_DETAILS_MAP.set("BookwithAviosUpgradeWithGoldVoucherDetailsDisplayedForPriceBreakdownSection", FLIGHT_SEARCH_REQUEST.setDefaultLongHaulReturnJourneyPremiumEconomyMEXLHR2Adults())
FLIGHT_DETAILS_MAP.set("ChangeAviosPriceOption", FLIGHT_SEARCH_REQUEST.setJourneyDetailsForSFOLHRSFO())
FLIGHT_DETAILS_MAP.set("VerifyCorrectSeatingMessageForInfantBookWithAviosBooking", FLIGHT_SEARCH_REQUEST.setShortHaulOneWayJourneyForLHRAMS())
FLIGHT_DETAILS_MAP.set("paymentCardValidationsForBookingFromGhana", FLIGHT_SEARCH_REQUEST.setJourneyDetailsForGhana())
FLIGHT_DETAILS_MAP.set("Classic_bacom_FlightSellingWeb_Test_11", FLIGHT_SEARCH_REQUEST.setJourneyDetailsForOpenJaw())
FLIGHT_DETAILS_MAP.set("Classic_bacom_FlightSellingWeb_Test_12", FLIGHT_SEARCH_REQUEST.setJourneyDetailsForOpenJaw())
FLIGHT_DETAILS_MAP.set("AddOnBusinessMemberShipdetailsOnPaymentPage", FLIGHT_SEARCH_REQUEST.setDefaultShortHaulOneWayJourneyLHRCDG())
FLIGHT_DETAILS_MAP.set("ecselling_DetailTestUS_Gold", FLIGHT_SEARCH_REQUEST.setDefaultLongHaulOneWayUSJourneyLHRJFK())
FLIGHT_DETAILS_MAP.set("ecselling_DetailTestUK_Premier", FLIGHT_SEARCH_REQUEST.setDefaultLongHaulOneWayJourneyLHRDEL())
FLIGHT_DETAILS_MAP.set("ecselling_DetailTestUK_Silver", FLIGHT_SEARCH_REQUEST.setShortHaulCityFlyerOneWayJourneyForLCYEDI())
FLIGHT_DETAILS_MAP.set("ecselling_DetailTestAustria_Gold", FLIGHT_SEARCH_REQUEST.setDefaultCityFlyerConnectingReturnJourneyForVIEEDI())
FLIGHT_DETAILS_MAP.set("ecselling_DetailTestUK_PremierConnecting", FLIGHT_SEARCH_REQUEST.setLongHaulReturnConnectingJourneyForEDIJFK())
FLIGHT_DETAILS_MAP.set("PaymentChargedForAllFlightLegs", FLIGHT_SEARCH_REQUEST.setLongHaulReturnConnectingJourneyForEDIMAD())
FLIGHT_DETAILS_MAP.set("MultiCityBooking", FLIGHT_SEARCH_REQUEST.setJourneyDetailsForTwoSegmentsDefault())
FLIGHT_DETAILS_MAP.set("ExecVerifyHoldDetailsForPriceQuotePage", FLIGHT_SEARCH_REQUEST.setDefaultShortHaulOneWayJourneyLHRCDG())
FLIGHT_DETAILS_MAP.set("VerifyPaymentfieldforMasterCard", FLIGHT_SEARCH_REQUEST.setDefaultShortHaulOneWayJourneyLHRCDG())
FLIGHT_DETAILS_MAP.set("VerifyPaymentfieldforVisaCreditCard", FLIGHT_SEARCH_REQUEST.setDefaultShortHaulOneWayJourneyLHRCDG())
FLIGHT_DETAILS_MAP.set("verify_seven_day_calender", FLIGHT_SEARCH_REQUEST.setJourneyDetailsForOpenJaw())
FLIGHT_DETAILS_MAP.set("CommercialFlowAssertBetaMMB", FLIGHT_SEARCH_REQUEST.setDefaultLongHaulReturnJourneyLHRSIN())
FLIGHT_DETAILS_MAP.set("Classic_bacom_FlightSellingWeb_Test_10", FLIGHT_SEARCH_REQUEST.setJourneyDetailsForMulticity())
FLIGHT_DETAILS_MAP.set("IberiaAirlines-bacom_executiveClubSellingWeb", FLIGHT_SEARCH_REQUEST.setLongHaulReturnJourneyForLHRMAD())
FLIGHT_DETAILS_MAP.set("Payment_Surcharge_Not_Charged_For_NonSurcharge_Country_Test", FLIGHT_SEARCH_REQUEST.setLongHaulReturnJourneyForHNDLHR())
FLIGHT_DETAILS_MAP.set("Payment_Surcharge_Surcharge_Removed_Test", FLIGHT_SEARCH_REQUEST.setJourneyDetailsForSurchargeCountryHELLHR())
FLIGHT_DETAILS_MAP.set("ecselling_bookwithavios_upgrade_gold_voucher", FLIGHT_SEARCH_REQUEST.setDefaultLongHaulReturnJourneyLHRDEL())
FLIGHT_DETAILS_MAP.set("ecselling_bookwithmoney_upgrade_with_avios", FLIGHT_SEARCH_REQUEST.setDefaultReturnJourneyLHRJFK())
FLIGHT_DETAILS_MAP.set("BookingWithMoneyUpgradeWithgGoldVoucher", FLIGHT_SEARCH_REQUEST.setLongHaulReturnJourneyForJFKLHR())
FLIGHT_DETAILS_MAP.set("FlightListPageDisplayed", FLIGHT_SEARCH_REQUEST.setLongHaulOneWayJourneyForLHRMAA())
FLIGHT_DETAILS_MAP.set("PaymentDetailsChecks", FLIGHT_SEARCH_REQUEST.setLongHaulReturnJourneyForJFKLHR())
FLIGHT_DETAILS_MAP.set("PersonPayingDetail", FLIGHT_SEARCH_REQUEST.setDefaultLongHaulReturnUSJourneyLHRJFK())
FLIGHT_DETAILS_MAP.set("BookwithMoneyUpgradeWithGoldVoucherDetailsDisplayedForPriceBreakdownSection", FLIGHT_SEARCH_REQUEST.setLongHaulReturnJourneyForJFKLHR())
FLIGHT_DETAILS_MAP.set("Classic_bacom_FlightSellingWeb_Test_04", FLIGHT_SEARCH_REQUEST.setJourneyDetailsForThreeSegmentsDefault())
FLIGHT_DETAILS_MAP.set("PartnerAirlinesDetailsDisplayedForPriceBreakdownSection", FLIGHT_SEARCH_REQUEST.setDefaultLongHaulReturnJourneyHELLHR())
FLIGHT_DETAILS_MAP.set("BookwithAviosCompanionVoucherDetails", FLIGHT_SEARCH_REQUEST.setDefaultShortHaulJourneyCompVoucherLHRCDG())
FLIGHT_DETAILS_MAP.set("BookwithAviosAmexCreditCardCompVoucherDetails", FLIGHT_SEARCH_REQUEST.setDefaultShortHaulJourneyCompVoucherLHRCDG())
FLIGHT_DETAILS_MAP.set("BookwithAviosAmexPremiumCompVoucherDetails", FLIGHT_SEARCH_REQUEST.setDefaultShortHaulJourneyCompVoucherLHRCDG())
FLIGHT_DETAILS_MAP.set("LATAMAirlinesFareQuote-bacom_executiveClubSellingWeb", FLIGHT_SEARCH_REQUEST.setLongHaulReturnJourneyForZCOLHR())
FLIGHT_DETAILS_MAP.set("FinnairFareQuote-bacom_executiveClubSellingWeb", FLIGHT_SEARCH_REQUEST.setJourneyDetailsForHELLHR())
FLIGHT_DETAILS_MAP.set("IberiaAirlinesFareQuoteWeb-bacom_executiveClubSellingWeb", FLIGHT_SEARCH_REQUEST.setLongHaulReturnJourneyForLHRMAD())
FLIGHT_DETAILS_MAP.set("JapanAirlinesFareQuoteWeb-bacom_executiveClubSellingWeb", FLIGHT_SEARCH_REQUEST.setLongHaulReturnJourneyForHNDLHR())
FLIGHT_DETAILS_MAP.set("QatarAirwaysFareQuoteWeb-bacom_executiveClubSellingWeb", FLIGHT_SEARCH_REQUEST.setLongHaulReturnJourneyForLHRDOH())
FLIGHT_DETAILS_MAP.set("FarerulesConditionsDetailsDisplayedForPriceBreakdownSection", FLIGHT_SEARCH_REQUEST.setDefaultLongHaulReturnWorldTravellerJourneyMEXLHR())
FLIGHT_DETAILS_MAP.set("VerifyPrePin_EconomyBasicAttibutes", FLIGHT_SEARCH_REQUEST.setDefaultShortHaulOneWayJourneyLHRCDG())
FLIGHT_DETAILS_MAP.set("VerifyEditSearchPaxCount", FLIGHT_SEARCH_REQUEST.setDefaultShortHaulReturnJourneyLHRCDG())
FLIGHT_DETAILS_MAP.set("ChangeFlightSearchPopUpDisplayed", FLIGHT_SEARCH_REQUEST.setDefaultShortHaulReturnJourneyLHRCDG())
module.exports = FLIGHT_DETAILS_MAP;