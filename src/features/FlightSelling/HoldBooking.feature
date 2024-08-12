Feature: Hold Booking

    Scenario Outline: AAs a ba.com customer , I should be able to Hold my booking using "<cardName>" for ABA journey
        Given I book my journey on "<Route>" in "<Cabin>" with "<Paxmix Type>"
        When I am holding my flights
        And I pay for my booking with "<cardName>" for hold booking
        Then I should be allowed to hold a booking

        @HoldBookingDisplayedForABALongHaul
         Examples:
            | cardName   | Route       | Cabin   | Paxmix Type |
            | VISA DEBIT | LHR-DEL-LHR | Economy | 3A,0Y,3I,3C |
 
         @HoldBookingForLongHaul
         Examples:
            | cardName | Route       | Cabin   | Paxmix Type |
            | AIRPLUS  | LHR-DEL-LHR | Economy | 3A,0Y,3I,3C |
 
         @CompleteHoldBookingTest
         Examples:
           | cardName | Route   | Cabin   | Paxmix Type |
           | AIRPLUS  | LHR-CDG | Economy | 3A,0Y,3I,3C |
 
         @PaymentConfirmation_HBFF01Test
         Examples:
            | cardName    | Route       | Cabin   | Paxmix Type |
            | VISA CREDIT | LHR-BOM-LHR | Economy | 3A,0Y,3I,3C |

        @HoldBookingDisplayeForABC
        Examples:
            | cardName  | Route   | Cabin   | Paxmix Type |
            | AMEX CARD | MAN-DEL | Economy | 3A,0Y,3I,3C |

    Scenario Outline: Hold booking option is displayed for "<Journey Type>" journey with "<Airline>" airline
        Given I book my journey on "<Route>" in "<Cabin>" with "<Paxmix Type>"
        And   I continue till Booking summary page
        Then   Hold Booking Pod is Displayed

        @HoldBookingOptionIsDisplayedForABJourney
         Examples:
            | Route   | Airline         | Cabin   | Paxmix Type |
            | LHR-CDG | British Airways | Economy | 3A,0Y,3I,3C |
 
         @HoldBookingOptionIsDisplayedForBAFlights
         Examples:
            | Route       | Airline         | Cabin   | Paxmix Type |
            | DXB-LHR-BOM | British Airways | Economy | 3A,0Y,3I,3C |
 
         @HoldBookingOptionIsDisplayedforIberiaFlights
         Examples:
            | Route   | Airline | Cabin   | Paxmix Type |
            | BCN-MAD | Iberia  | Economy | 3A,0Y,3I,3C |

    @HoldBookingForSeventyTwoHours
    Scenario Outline: Hold your flights for 72 hours
        Given I am planning commercial booking with "One Adult"
        And   I continue till Booking summary page
        Then   Hold Booking Pod is Displayed

    @HoldBookingPodDisplayed
    Scenario Outline: Hold Booking pod is displayed for Booking date/time and departure date/time is greater than 21 days and less than 355 days
    Given I am planning my journey whose date of departure is greater or equal to 21 days with "One Adult"
    When I continue till Booking summary page
    Then Hold Booking Pod is Displayed

    Scenario Outline: Hold booking option is displayed for ABA journey with "<Airline>" airline
        Given I book my journey on "<Route>" in "<Cabin>" with "<Paxmix Type>"
        And   I continue till Booking summary page
        Then Hold Booking Pod is Displayed
 
         @HoldBookingOptionIsDisplayedForABAJourneyFS
         Examples:

            | Airline         | Cabin   | Paxmix Type |  Route       |
            | British Airways | Economy | 3A,0Y,3I,3C |  LHR-CDG-LHR |
 
         @HoldBookingOptionIsDisplayedForBACityflyerFlights
         Examples:

            | Airline   | Cabin   | Paxmix Type |  Route       |
            | CityFlyer | Economy | 3A,0Y,3I,3C |  LCY-IBZ-LCY |

        @HoldBookingOptionIsDisplayedForABCJourney
        Examples:
            | Airline   | Cabin   | Paxmix Type | Route   |
            | CityFlyer | Economy | 3A,0Y,3I,3C | MAN-DEL |

        @HoldBookingOptionIsDisplayedForABCBAJourney
        Examples:
            | Airline   | Cabin   | Paxmix Type | Route               |
            | CityFlyer | Economy | 3A,0Y,3I,3C | DXB-LHR-BOM-LHR-DXB |

    Scenario Outline: Pre-pin customer travelling on a long-haul journey "<Route>" can hold a booking
        Given I book my journey on "<Route>" in "<Cabin>" with "<Paxmix Type>"
        And   I continue till Booking summary page
        And   Hold Booking Pod is Displayed

         @OfferHoldBookingForFee_HBFF01Test
         Examples:
            | Route       | Cabin   | Paxmix Type |
            | LHR-BOM-LHR | Economy | 3A,0Y,3I,3C |
 
         @OfferHoldBookingForFee_HBFF07Test
         Examples:
            | Route       | Cabin   | Paxmix Type |
            | KWI-LHR-KWI | Economy | 3A,0Y,3I,3C |

    @HoldBookingHighRiskCountryCheck @Regression
    Scenario: Offline payment option is not offered on high risk routes
        Given I create a booking departing from "gh"
        When I click on hold booking link and enter the passenger details and navigate to payment page
        Then Offline payment option i.e. Pay In person is not displayed on payment page

    @HoldBookingOptionNotDisplayedForShortHaulRoute @Regression
    Scenario: Hold booking option is not offered on Short-Haul route for flexible cabin
        Given I am planning my short haul journey for flexible cabin with "One Adult"
        And   I continue till Booking summary page
        Then  hold booking option is not offered for flexible cabin route

    @Regression
    Scenario Outline: Pre-pin customer travelling on a long-haul journey "<Route>" can see a summary of the hold booking details
        Given I book my journey on "<Route>" in "<Cabin>" with "<Paxmix Type>"
        Then I choose to hold the booking for a fee
        And information about the fee and terms and conditions for holding the booking is displayed correctly on Hold Booking page

        @InformationAboutFeeAndTermsAndCondition_HBFF01Test
         Examples:
            | Route       | Cabin   | Paxmix Type |
            | LHR-BOM-LHR | Economy | 3A,0Y,3I,3C |
 
         @InformationAboutFeeAndTermsAndCondition_HBFF07Test
         Examples:
            | Route       | Cabin   | Paxmix Type |
            | KWI-LHR-KWI | Economy | 3A,0Y,3I,3C |

    @Regression                      
    Scenario Outline: Hold fee is paid by Use New card or paypal only - <payment option>
        Given I am planning commercial booking with "One Adult"
        When I am holding my flights
        Then "<payment option>" radio button option is shown on Payment page

        @PaymentOptionForHoldBookingFee
        Examples:
            | payment option |
            | Payment Card   |

        @PaymentOptionForHoldBookingFeeForPayPal
        Examples:
            | payment option |
            | Paypal         |

    Scenario Outline: Hold Booking option is not offered when user is creating booking departing from "<Country>""
        Given I create a booking departing from "<Country>"
        And   I continue till Booking summary page
        Then  Hold Booking Pod is not Displayed

        @HBFF05Test
        Examples:
            | Country |
            | ar      |

        @HBFF17Test
        Examples:
            | Country |
            | co      |

        @HBFF20Test
        Examples:
            | Country |
            | ie      |

    @HBFF18Test
    Scenario Outline: Customer is not offered hold booking option if travelling from USA on an Economy Flexible ticket
        Given  I am making an Economy Flexible booking departing from "us" with "One Adult"
        And   I continue till Booking summary page
        Then  hold booking option is not offered for flexible cabin route

    @PaymentSurchargeNotApplicable
    Scenario: Payment surcharge is not applicable on hold bookings
        Given I am planning commercial booking with "One Adult"
        When  I am holding my flights
        Then  payment "<cardName>" surcharge is not displayed on Payment page to hold bookings
        Examples:
            | cardName   |
            | UATP       |

    Scenario Outline: As a ba.com customer , I should not be allowed to apply <discount> on hold booking
        Given I am on ba.com homepage
        When I search and select my roundtrip flight with "One Adult"
        Then Hold Booking Pod is Displayed
        And I add "<discount>" discount on farequote page and amount should get removed from the total hold booking amount

        @VerifyEvoucherOnHoldBookingTest
        Examples:
            | discount  |
            | e-voucher |
            
        @VerifyAviosDiscountOnHoldBookingTest
        Examples:
            | discount |
            | Avios    |

     #Not present in EC-conversion ------> yet to be converted
    Scenario Outline: As a ba.com customer , I should not be allowed to apply <discount> on hold booking
        Given I am on ba.com homepage
        When I search and select my oneway flight with "One Adult"
        Then Hold Booking Pod is Displayed
        When I click on hold booking link and enter the passenger details and navigate to payment page
        And I add donation "<donation>" and  amount should get removed from the total hold booking amount

        @VerifyDonationOnHoldBookingTest
        Examples:
            | donation |
            | Fixed    |

    @HoldBookingAbleToHold @Regression
    Scenario: As a ba.com customer , i should be able to hold my booking on BA + IB
        Given I book my journey on "<Route>" in "<Cabin>" with "<Paxmix Type>"
        And I am holding my flights
        And I pay for my booking with "<cardName>" for hold booking
        Then I should be allowed to hold a booking
        Examples:
            | cardName      | Route       | Cabin   | Paxmix Type |
            | VISA Personal | LHR-MAD-LHR | Economy | 3A,0Y,3I,3C |

    Scenario Outline: As a ba.com customer, I should be able to see correct "<Hold Booking Details>" details during Hold Booking process on "<Hold Booking Page>"
        Given I book my journey on "<Route>" in "<Cabin>" with "<Paxmix Type>"
        When  I proceed till Booking Summary page
        And   correct "<Hold Booking Details>" are getting dislayed on "<Hold Booking Page>"

        @VerifyHoldDetailsForPriceQuotePage
        Examples:
            | Route       | Cabin   | Paxmix Type | Hold Booking Details              | Hold Booking Page       |
            | LHR-FRA-LHR | Economy | 1A,0Y,1I,C  | ShortHaul Hold Price ,Hold period | Hold Booking Price page |

        @VerifyHoldDetailsForHoldSummaryPage
        Examples:
            | Route   | Cabin   | Paxmix Type | Hold Booking Details                               | Hold Booking Page         |
            | LHR-AMS | Economy | 1A,1Y,0I,0C | Flight Itinerary, ShortHaul Hold Price,Hold period | Hold Booking Summary page |

        @VerifyHoldDetailsForShortHaulHoldPaymentPage
        Examples:
            | Route   | Cabin   | Paxmix Type | Hold Booking Details | Hold Booking Page         |
            | LHR-EDI | Economy | 1A,0Y,0I,1C | ShortHaul Hold Price | Hold Booking Payment page |

        @VerifyHoldDetailsForLongHaulHoldPaymentPage
        Examples:
            | Route   | Cabin   | Paxmix Type | Hold Booking Details | Hold Booking Page         |
            | LHR-DEL | Economy | 1A,0Y,0I,1C | LongHaul Hold Price  | Hold Booking Payment page |

        @VerifyHoldDetailsForHoldConfirmationPage
        Examples:
            | Route   | Cabin   | Paxmix Type | Hold Booking Details                               | Hold Booking Page              |
            | LHR-CDG | Economy | 1A,1Y,1I,1C | Confirmation message,Hold button,Booking Reference | Hold Booking Confirmation page |

    @VerifyPayAndCompleteBookingOptionForHoldBooking @Regression
    Scenario Outline: 'Pay and complete booking' option is shown on hold booking MMB page
        Given I am planning commercial booking with "One Adult"
        And I am holding my flights
        When I pay for my booking with "<cardName>" for hold booking
        And I should be allowed to hold a booking
        Then I proceed till MMB Page
        And "Pay and complete booking" link is shown on MMB page
        Examples:
            | cardName      |
            | VISA Personal |

    @ExecVerifyHoldDetailsForPriceQuotePage @Regression
    Scenario Outline: As a EC member, I should be able to see correct "<Hold Booking Details>" details during Hold Booking process on "<Hold Booking Page>"
        Given I am an EC "<memberType>" logged in to my account
        And I create a booking on any route with "One Adult"
        When  I am holding my flights for EC Cash booking
        Then   correct "<Hold Booking Details>" are getting dislayed on "<Hold Booking Page>" for EC Cash Booking
        Examples:
            | Hold Booking Details   | Hold Booking Page       | memberType |
            | Hold Price,Hold period | Hold Booking Price page | Gold R     |
