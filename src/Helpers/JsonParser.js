const fs = require('fs');
const xlsx = require('xlsx');
const filePath = '../../test_results/json'
const outputfilePath = '../../test_results/Daily_Regression_Report'

const outputfilePaths = [
    '../../test_results/Daily_Regression_Report', '../../test_results/html', '../../test_results/html-report',
    '../../test_results/json', '../../test_results/junit', '../../test_results/messages', '../../test_results/rerun',
    '../../test_results/runresult', '../../test_results/usage'
]

const DateHelper = require('../Helpers/DateHelper')
const obj_DateHelper = new DateHelper();



class JsonParser {
    static features_List = [];
    static scenarioOutline_List = [];
    static fileLocation_List = [];
    static total_steps_List = [];
    static scenario_status_List = [];
    static scenarioName_List = [];
    static featuresFileName_List = [];
    static assignee_List = [];

    async parseJson() {

        // setInterval(this.parseJson,30000);
        let availableFiles = await this.getAvailableFiles(`${filePath}/`)
        let getFileName = availableFiles[availableFiles.length-1];
        let jsonData = JSON.parse(fs.readFileSync(`${filePath}/${getFileName}`).toString());

        for (let i = 0; i < jsonData.length; i++) {
            let features = jsonData[i].name;
            let total_scenario = jsonData[i].elements.length;
            let fileLocation = jsonData[i].uri;

            // Feature Storing
            JsonParser.features_List.push(features);

            // Feature File Location Storing
            JsonParser.fileLocation_List.push(fileLocation);
            for (let j = 0; j < total_scenario; j++) {
                let extractfeaturesFileName = JsonParser.fileLocation_List[i].split("\\");
                let featureFileNameText = extractfeaturesFileName[extractfeaturesFileName.length - 1].split(".")[0];
                JsonParser.featuresFileName_List.push(featureFileNameText);

                let status = [];
                let scenario = jsonData[i].elements[j].name;
                let total_steps = jsonData[i].elements[j].steps.length;

                // Scenario Outline Storing
                JsonParser.scenarioOutline_List.push(scenario);

                // Total Steps Storing
                JsonParser.total_steps_List.push(total_steps);
                let getTagName = null;

                try {
                    const tags = jsonData[i].elements[j].tags.map(tag => tag.name.split("@")[1]);
                    const nonRegressionTags = tags.filter(tag => tag !== 'Regression');
                    getTagName = nonRegressionTags.length > 0 ? nonRegressionTags[0] : null;
                    JsonParser.scenarioName_List.push(getTagName);
                } catch (error) {
                    console.log(`[ERROR] : ${error}`)
                }

                for (let k = 0; k < total_steps; k++) {
                    let scenario_status = jsonData[i].elements[j].steps[k].result.status;
                    status.push(scenario_status);
                }

                // Scenario Status Storing
                JsonParser.scenario_status_List.push(status.includes("failed") || status.includes("skipped") ? "Failed" : "Passed");
                status.length = 0;
            }
        }


    }

    async writeDataInReport() {
        const currentDate = new Date();
        const date = currentDate.getDate();
        const monthName = currentDate.toLocaleString('default', { month: 'short' });
        const formatDate = `${date}_${monthName}`
        const workSheetName_FS = "Daily Regression Report FS"
        const workSheetName_EC = "Daily Regression Report EC"
        const Report = `${outputfilePath}/Daily_Regression_Testing_Report_${formatDate}.xlsx`;

        if (!fs.existsSync(outputfilePath)) {
            fs.mkdirSync(outputfilePath, { recursive: true });
        }
        const data = [
            ["Feature Name", "Scenario Outline", "Scenario Name", "Status", "Assignee"]
        ];
        for (let i = 0; i < JsonParser.scenarioName_List.length; i++) {
            let assigneeName = await this.getAssigneeName(JsonParser.scenarioName_List[i]);
            JsonParser.assignee_List.push(assigneeName);
            data.push([JsonParser.featuresFileName_List[i], JsonParser.scenarioOutline_List[i], JsonParser.scenarioName_List[i], JsonParser.scenario_status_List[i], JsonParser.assignee_List[i]]);
        }

        let workbook;
        let worksheet;
        if (fs.existsSync(Report)) {
            try {
                workbook = xlsx.readFile(Report);
                worksheet = workbook.Sheets[workSheetName_EC];
                if (worksheet) {
                    const existingData = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
                    const newData = existingData.concat(data);
                    worksheet = xlsx.utils.aoa_to_sheet(newData);
                    workbook.Sheets[workSheetName_EC] = worksheet;
                } else {
                    worksheet = xlsx.utils.aoa_to_sheet(data);
                    xlsx.utils.book_append_sheet(workbook, worksheet, workSheetName_EC);
                }
            } catch (error) {
                console.error(`[ERROR] : ${error}`);
                return;
            }
        } else {
            try {
                workbook = xlsx.utils.book_new();
                worksheet = xlsx.utils.aoa_to_sheet(data);
                xlsx.utils.book_append_sheet(workbook, worksheet, workSheetName_FS);
            } catch (error) {
                console.error(`[ERROR] : ${error}`);
                return;
            }
        }

        try {
            xlsx.writeFile(workbook, Report);
        } catch (error) {
            console.error(`[ERROR] : ${error}`);
        }
    }

    async getAssigneeName(getTagName) {
        let scenarioAssigneeMap =
        {
            /* ###################################################################################
               ############################### FS Bucket Starts Here #############################
               ###################################################################################
            */
            "Shorthaul_APDTaxes_PNRBooking": {
                "Assignee": "Yash"
            },
            "Longhaul_APDTaxes_PNRBooking": {
                "Assignee": "Yash"
            },
            "BaggageAllowanceShortHaul": {
                "Assignee": "Nandan"
            },
            "BaggageAllowanceLongHaul": {
                "Assignee": "Nandan"
            },
            "BaggageAllowanceForUpgradedCabin": {
                "Assignee": "Nandan"
            },
            "VerifyNoCheckedBaggageAllowance": {
                "Assignee": "Yash"
            },
            "StandardHBOFeatures": {
                "Assignee": "Rishabh"
            },
            "CheapestFare_bacom_FlightSellingWeb_Test_01": {
                "Assignee": "Abhishek"
            },
            "CheapestFare_bacom_FlightSellingWeb_Test_03": {
                "Assignee": "Abhishek"
            },
            "CheapestFare_bacom_FlightSellingWeb_Test_04": {
                "Assignee": "Abhishek"
            },
            "CheapestFare_bacom_FlightSellingWeb_Test_05": {
                "Assignee": "Abhishek"
            },
            "CheapestFare_bacom_FlightSellingWeb_Test_06": {
                "Assignee": "Abhishek"
            },
            "CheapestFare_bacom_FlightSellingWeb_Test_07": {
                "Assignee": "Abhishek"
            },
            "CheapestFare_bacom_FlightSellingWeb_Test_08": {
                "Assignee": "Abhishek"
            },
            "oneway_Direct_pnrbooking_farequoteAgreeAndContinue": {
                "Assignee": "Nandan"
            },
            "oneway_Connecting_pnrbooking_farequoteAgreeAndContinue": {
                "Assignee": "Nandan"
            },
            "roundtrip_direct_pnrbooking_farequoteAgreeAndContinue": {
                "Assignee": "Nandan"
            },
            "roundtrip_connecting_pnrbooking_farequoteAgreeAndContinue": {
                "Assignee": "Nandan"
            },
            "oneway_pnrbooking_farequoteApplyVoucher": {
                "Assignee": "Nandan"
            },
            "oneway_pnrbooking_farequote_disabilityAssistance": {
                "Assignee": "Nandan"
            },
            "oneway_pnrbooking_farequote_holdBooking": {
                "Assignee": "Himanshu"
            },
            "twoway_Shorthhaul_Direct_pnrbooking_farequoteAgreeAndContinue": {
                "Assignee": "Himanshu"
            },
            "twoway_Longhaul_Direct_pnrbooking_farequoteAgreeAndContinue": {
                "Assignee": "Himanshu"
            },
            "twoway_Connecting_pnrbooking_farequoteAgreeAndContinue": {
                "Assignee": "Himanshu"
            },
            "paymentSurchargeChargedForSurchargeCountry": {
                "Assignee": "Gourang"
            },
            "FlightListPageDisplayed": {
                "Assignee": "Rishabh"
            },
            "PrimesellingWithThirdPartyAsPayerTest": {
                "Assignee": "Gourang"
            },
            "GhanaCommercialBooking": {
                "Assignee": "Gourang"
            },
            "UpgradeAvailableEconomy": {
                "Assignee": "Gourang"
            },
            "UpgradeAvailableHBO": {
                "Assignee": "Gourang"
            },
            "Paxmix_type_booking_summary_page": {
                "Assignee": "Priyanka"
            },
            "paymentCardValidationsForBookingFromGhana": {
                "Assignee": "Harsh Pratap"
            },
            "SecureOnlinePaymentCards": {
                "Assignee": "Priyanka"
            },
            "AddOnBusinessMemberShipdetailsOnPaymentPage": {
                "Assignee": "Nandan"
            },
            "PaymentChargedForAllFlightLegs": {
                "Assignee": "Priyanka"
            },
            "CommercialFlowAssertBetaMMB": {
                "Assignee": "Gourang"
            },
            "Payment_Surcharge_Surcharge_Removed_Test": {
                "Assignee": "Yash"
            },
            "doanationsFixed": {
                "Assignee": "Priyanka"
            },
            "donationNoThanks": {
                "Assignee": "Priyanka"
            },
            "ECEnrollment_with_join_the_club": {
                "Assignee": "Priyanka"
            },
            "InetEnrollment_with_join_the_club": {
                "Assignee": "Nandan"
            },
            "ErrorCheckOnPassengerPage": {
                "Assignee": "Himanshu"
            },
            "CVV_Errormessage_verify": {
                "Assignee": "Yash"
            },
            "Address_Errormessage_verify_PaymentPage": {
                "Assignee": "Himanshu"
            },
            "Postalcode_Errormessage_verify_PaymentPage": {
                "Assignee": "Himanshu"
            },
            "NumberOfPassengerError": {
                "Assignee": "Himanshu"
            },
            "Missing_Card_Exp_ErrorMsg_verify_PaymentPage": {
                "Assignee": "Himanshu"
            },
            "Verify_cards_available_for_payment_PaymentPage": {
                "Assignee": "Yash"
            },
            "Card_Errormessage_verify_PaymentPage_Type1": {
                "Assignee": "Himanshu"
            },
            "Card_Errormessage_verify_PaymentPage_Type2": {
                "Assignee": "Himanshu"
            },
            "Card_Errormessage_verify_PaymentPage_Type3": {
                "Assignee": "Himanshu"
            },
            "HoldBookingDisplayedForABALongHaul": {
                "Assignee": "Rishabh"
            },
            "HoldBookingForLongHaul": {
                "Assignee": "Rishabh"
            },
            "CompleteHoldBookingTest": {
                "Assignee": "Rishabh"
            },
            "PaymentConfirmation_HBFF01Test": {
                "Assignee": "Rishabh"
            },
            "HoldBookingDisplayeForABC": {
                "Assignee": "Rishabh"
            },
            "HoldBookingOptionIsDisplayedForABJourney": {
                "Assignee": "Rishabh"
            },
            "HoldBookingOptionIsDisplayedForBAFlights": {
                "Assignee": "Rishabh"
            },
            "HoldBookingOptionIsDisplayedforIberiaFlights": {
                "Assignee": "Rishabh"
            },
            "HoldBookingForSeventyTwoHours": {
                "Assignee": "Rishabh"
            },
            "HoldBookingPodDisplayed": {
                "Assignee": "Rishabh"
            },
            "HoldBookingOptionIsDisplayedForABAJourneyFS": {
                "Assignee": "Rishabh"
            },
            "HoldBookingOptionIsDisplayedForBACityflyerFlights": {
                "Assignee": "Rishabh"
            },
            "HoldBookingOptionIsDisplayedForABCJourney": {
                "Assignee": "Rishabh"
            },
            "HoldBookingOptionIsDisplayedForABCBAJourney": {
                "Assignee": "Rishabh"
            },
            "OfferHoldBookingForFee_HBFF01Test": {
                "Assignee": "Rishabh"
            },
            "OfferHoldBookingForFee_HBFF07Test": {
                "Assignee": "Rishabh"
            },
            "HoldBookingHighRiskCountryCheck": {
                "Assignee": "Rishabh"
            },
            "HoldBookingOptionNotDisplayedForShortHaulRoute": {
                "Assignee": "Rishabh"
            },
            "InformationAboutFeeAndTermsAndCondition_HBFF01Test": {
                "Assignee": "Rishabh"
            },
            "InformationAboutFeeAndTermsAndCondition_HBFF07Test": {
                "Assignee": "Rishabh"
            },
            "PaymentOptionForHoldBookingFee": {
                "Assignee": "Rishabh"
            },
            "PaymentOptionForHoldBookingFeeForPayPal": {
                "Assignee": "Rishabh"
            },
            "HBFF05Test": {
                "Assignee": "Rishabh"
            },
            "HBFF17Test": {
                "Assignee": "Rishabh"
            },
            "HBFF20Test": {
                "Assignee": "Rishabh"
            },
            "HBFF18Test": {
                "Assignee": "Rishabh"
            },
            "PaymentSurchargeNotApplicable": {
                "Assignee": "Rishabh"
            },
            "VerifyEvoucherOnHoldBookingTest": {
                "Assignee": "Rishabh"
            },
            "VerifyAviosDiscountOnHoldBookingTest": {
                "Assignee": "Rishabh"
            },
            "VerifyDonationOnHoldBookingTest": {
                "Assignee": "Rishabh"
            },
            "HoldBookingAbleToHold": {
                "Assignee": "Rishabh"
            },
            "VerifyHoldDetailsForPriceQuotePage": {
                "Assignee": "Rishabh"
            },
            "VerifyHoldDetailsForHoldSummaryPage": {
                "Assignee": "Rishabh"
            },
            "VerifyHoldDetailsForShortHaulHoldPaymentPage": {
                "Assignee": "Rishabh"
            },
            "VerifyHoldDetailsForLongHaulHoldPaymentPage": {
                "Assignee": "Rishabh"
            },
            "VerifyHoldDetailsForHoldConfirmationPage": {
                "Assignee": "Rishabh"
            },
            "VerifyPayAndCompleteBookingOptionForHoldBooking": {
                "Assignee": "Yash"
            },
            "ExecVerifyHoldDetailsForPriceQuotePage": {
                "Assignee": "Gourang"
            },
            "homepage_assertions_booking_section_radio": {
                "Assignee": "Priyanka"
            },
            "homepage_assertions_booking_section": {
                "Assignee": "Priyanka"
            },
            "homepage_assertions_links_booking_section": {
                "Assignee": "Priyanka"
            },
            "Classic_bacom_FlightSellingWeb_Test_01": {
                "Assignee": "Harsh Pratap"
            },
            "Classic_bacom_FlightSellingWeb_Test_02": {
                "Assignee": "Harsh Pratap"
            },
            "Classic_bacom_FlightSellingWeb_Test_03": {
                "Assignee": "Harsh Pratap"
            },
            "Classic_bacom_FlightSellingWeb_Test_04": {
                "Assignee": "Harsh Pratap"
            },
            "Classic_bacom_FlightSellingWeb_Test_06": {
                "Assignee": "Harsh Pratap"
            },
            "Classic_bacom_FlightSellingWeb_Test_07": {
                "Assignee": "Harsh Pratap"
            },
            "Classic_bacom_FlightSellingWeb_Test_08": {
                "Assignee": "Harsh Pratap"
            },
            "Classic_bacom_FlightSellingWeb_Test_13": {
                "Assignee": "Harsh Pratap"
            },
            "Classic_bacom_FlightSellingWeb_Test_14": {
                "Assignee": "Harsh Pratap"
            },
            "ConfirmBookingForMultiCity": {
                "Assignee": "Harsh Pratap"
            },
            "Classic_bacom_FlightSellingWeb_Test_11": {
                "Assignee": "Rishabh"
            },
            "Classic_bacom_FlightSellingWeb_Test_12": {
                "Assignee": "Rishabh"
            },
            "verify_seven_day_calender": {
                "Assignee": "Himanshu"
            },
            "MultiCityBooking": {
                "Assignee": "Harsh Pratap"
            },
            "Classic_bacom_FlightSellingWeb_Test_10": {
                "Assignee": "Rishabh"
            },
            "Payment_Surcharge_Not_Charged_For_NonSurcharge_Country_Test": {
                "Assignee": "Abhishek"
            },
            "ShowingSeatSelectionPageInPrimeSelling": {
                "Assignee": "Himanshu"
            },
            "ShowingSameSeatOnMmb": {
                "Assignee": "Himanshu"
            },
            "VerifyCarbonDonationOnHoldBookingTest": {
                "Assignee": "Priyanka"
            },
            "VerifyEditSearchPaxCount": {
                "Assignee": "Rishabh"
            },
            "VerifyPrePin_EconomyBasicAttibutes": {
                "Assignee": "Gourang"
            },
            "ChangeFlightSearchPopUpDisplayed": {
                "Assignee": "Gourang"
            },

            /* ###################################################################################
               ############################### EC Bucket Starts Here #############################
               ###################################################################################
            */

            "EC_Srvicing_Verify_Avios_PartnerClaimTest": {
                "Assignee": "Gourang"
            },
            "Solotravellerbannerfor121voucher": {
                "Assignee": "Harsh Pratap"
            },
            "DigitalcardsoptionsBlueSpainPrintCopyTest-bacom_executiveClubSellingWeb": {
                "Assignee": "Abhishek"
            },
            "DigitalcardsoptionsBlueSpainReceiveEmailTest-bacom_executiveClubSellingWeb": {
                "Assignee": "Abhishek"
            },
            "DigitalcardsoptionsBlueSpainDownloadCardTest-bacom_executiveClubSellingWeb": {
                "Assignee": "Abhishek"
            },
            "DigitalcardsoptionsBlueSpainNewMembershipTest-bacom_executiveClubSellingWeb": {
                "Assignee": "Abhishek"
            },
            "ECLogout-executiveClubSellingWeb": {
                "Assignee": "Priyanka"
            },
            "verifyBookingOptionsandmemberdetails": {
                "Assignee": "Himanshu"
            },
            "PaymentDetailsChecks": {
                "Assignee": "Harsh Pratap"
            },
            "AccessingEStoreFromCollectingAvios_Uk": {
                "Assignee": "Himanshu"
            },
            "ECMember_OneWay_LongHaul_Cash_PNRBooking": {
                "Assignee": "Rishabh"
            },
            "ECMember_OneWay_Domestic_Cash_PNRBooking": {
                "Assignee": "Rishabh"
            },
            "ECMember_OneWay_ShortHaul_Cash_PNRBooking": {
                "Assignee": "Rishabh"
            },
            "ECMember_RoundTrip_Longhaul_Cash_PNRBooking": {
                "Assignee": "Rishabh"
            },
            "AddNewFnFMember": {
                "Assignee": "Rishabh"
            },
            "EditFriendsAndFamily": {
                "Assignee": "Rishabh"
            },
            "RemoveFriendsAndFamily": {
                "Assignee": "Rishabh"
            },
            "EC_Servicing_Passenger_AddedTest": {
                "Assignee": "Rishabh"
            },
            "AmericanAirlines-bacom_executiveClubSellingWeb": {
                "Assignee": "Abhishek"
            },
            "MalaysiaAirlinesFlightBrowse-bacom_executiveClubSellingWeb": {
                "Assignee": "Abhishek"
            },
            "QantasAirwaysFlightBrowse-bacom_executiveClubSellingWeb": {
                "Assignee": "Abhishek"
            },
            "RoyalJordanian-bacom_executiveClubSellingWeb": {
                "Assignee": "Abhishek"
            },
            "SriLankanAirlines-bacom_executiveClubSellingWeb": {
                "Assignee": "Abhishek"
            },
            "BookWithAviosUpgradeGoldVoucherBAOnly": {
                "Assignee": "Rishabh"
            },
            "BookWithMoneyUpgradeGoldVoucherBAOnly": {
                "Assignee": "Rishabh"
            },
            "displayOfRFSsymbolRFS": {
                "Assignee": "Gourang"
            },
            "FinnairFareQuote-bacom_executiveClubSellingWeb": {
                "Assignee": "Abhishek"
            },
            "IberiaAirlinesFareQuoteWeb-bacom_executiveClubSellingWeb": {
                "Assignee": "Abhishek"
            },
            "JapanAirlinesFareQuoteWeb-bacom_executiveClubSellingWeb": {
                "Assignee": "Abhishek"
            },
            "LATAMAirlinesFareQuote-bacom_executiveClubSellingWeb": {
                "Assignee": "Abhishek"
            },
            "QatarAirwaysFareQuoteWeb-bacom_executiveClubSellingWeb": {
                "Assignee": "Abhishek"
            },
            "EC_Servicing_Verify_PopupTest-bacom_executiveClubSellingWeb": {
                "Assignee": "Abhishek"
            },
            "updateMealPreferences": {
                "Assignee": "Harsh Pratap"
            },
            "EC_Servicing_mail_unsubscriptionsTest": {
                "Assignee": "Gourang"
            },
            "ValidateEcProfilePageInContactDetails": {
                "Assignee": "Nandan"
            },
            "OnewayShortHaulBookWithAviosBooking": {
                "Assignee": "Priyanka"
            },
            "RoundTripShortHaulBookWithAviosBooking": {
                "Assignee": "Priyanka"
            },
            "AviosWithChildAndInfant": {
                "Assignee": "Himanshu"
            },
            "RoundTripLongHaulUSBookWithAviosBooking": {
                "Assignee": "Rishabh"
            },
            "RoundTripLongHaulUSBookWithMoneyUpgradeUsingAviosBooking": {
                "Assignee": "Yash"
            },
            "BookwithAviosUpgradeWithGoldVoucherGUFT": {
                "Assignee": "Gourang"
            },
            "BookwithAviosUpgradeWithGoldVoucherGUFO": {
                "Assignee": "Gourang"
            },
            "BookingWithMoneyUpgradeWithgGoldVoucher": {
                "Assignee": "Rishabh"
            },
            "BookWithAviosDetailsDisplayedForPriceBreakdownSection": {
                "Assignee": "Nandan"
            },
            "BookwithMoneyUpgradeUsingAviosDetailsDisplayedForPriceBreakdownSection": {
                "Assignee": "Nandan"
            },
            "BookwithAviosUpgradeWithGoldVoucherDetailsDisplayedForPriceBreakdownSection": {
                "Assignee": "Nandan"
            },
            "ChangeAviosPriceOption": {
                "Assignee": "Nandan"
            },
            "TwoWayBookWithAviosItinerary": {
                "Assignee": "Priyanka"
            },
            "VerifyCorrectSeatingMessageForInfantBookWithAviosBooking": {
                "Assignee": "Yash"
            },
            "ecselling_DetailTestUS_Gold": {
                "Assignee": "Gourang"
            },
            "ecselling_DetailTestUK_Premier": {
                "Assignee": "Gourang"
            },
            "ecselling_bookwithavios_upgrade_gold_voucher": {
                "Assignee": "Gourang"
            },
            "ecselling_bookwithmoney_upgrade_with_avios": {
                "Assignee": "Priyanka"
            },
            "VerifyPaymentfieldforMasterCard": {
                "Assignee": "Himanshu"
            },
            "VerifyPaymentfieldforVisaCreditCard": {
                "Assignee": "Himanshu"
            },
            "EC_Servicing_Verify_FareQuote_Details_For_UKGoldTest-bacom_executiveClubSellingWeb": {
                "Assignee": "Priyanka"
            },
            "PersonPayingDetail": {
                "Assignee": "Yash"
            },
            "BookwithMoneyUpgradeWithGoldVoucherDetailsDisplayedForPriceBreakdownSection": {
                "Assignee": "Nandan"
            },
            "Addthirdpartynominee": {
                "Assignee": "Nandan"
            },
            "AddTravelCompanionWithSpecialCharacterName": {
                "Assignee": "Yash"
            },
            "UpgradeNotAvailableRedemption": {
                "Assignee": "Harsh Pratap"
            },
            "PartnerAirlinesDetailsDisplayedForPriceBreakdownSection": {
                "Assignee": "Nandan"
            }
        }

        try {
            let assignee = scenarioAssigneeMap[getTagName].Assignee
            return assignee || 'Assignee not found';
        } catch (error) {
            console.log(`[ERROR] : Assignee not available for ${getTagName}`)
        }
    }

    async getAvailableFiles(filePath) {
        const getFiles = fs.readdirSync(filePath);
        return getFiles
    }

    async getFilesDetails(filePath) {
        const getFiles = fs.statSync(filePath);
        return getFiles
    }

    async ReportManager() {
        let lastWeekDate = await obj_DateHelper.getPreviousDate(7);
        // console.log(`Available File are : \n${availableFiles.join('\n')}`)

        for (let filepath of outputfilePaths) {

            const availableFiles = await this.getAvailableFiles(filepath);

            for (let file of availableFiles) {
                const fileDetails = await this.getFilesDetails(`${filepath}/${file}`);
                let getFileCreationDate = fileDetails.birthtime.toLocaleDateString();
                // console.log(`\n${file} Creation Data : ${getFileCreationDate}`)

                if (getFileCreationDate < lastWeekDate) {
                    // console.log(`\nDeleting : ${file}`)
                    fs.unlinkSync(`${filepath}/${file}`);
                }
            }
        }
    }

    async prepareReport() {
        await this.ReportManager()
        await this.parseJson();
        await this.writeDataInReport();
    }
}

const obj = new JsonParser();
obj.prepareReport();

module.exports = JsonParser;