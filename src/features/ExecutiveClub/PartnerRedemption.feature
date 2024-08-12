Feature: As a ba.com customer I can book partner airlines for redemption bookings

    @Regression
    Scenario Outline: I will be offered various partner airlines to book on Flight Selection page for redemption bookings"<Partner Airlines>"
        Given I am an EC "UK Gold" logged in to my account
        When I am making a shorthaul "<route Type>" redemption booking using "<Booking Type>"
        Then I will be offered various "<Partner Airlines>"

        @AmericanAirlines-bacom_executiveClubSellingWeb
        Examples:
            | Partner Airlines  | Booking Type    | route Type |
            | American Airlines | Book with Avios | return     |
        @MalaysiaAirlinesFlightBrowse-bacom_executiveClubSellingWeb
        Examples:
            | Partner Airlines  | Booking Type    | route Type |
            | Malaysia Airlines | Book with Avios | return     |
        @QantasAirwaysFlightBrowse-bacom_executiveClubSellingWeb
        Examples:
            | Partner Airlines | Booking Type    | route Type |
            | Qantas Airlines  | Book with Avios | return     |
        @RoyalJordanian-bacom_executiveClubSellingWeb
        Examples:
            | Partner Airlines | Booking Type    | route Type |
            | Royal Jordanian  | Book with Avios | return     |
        @SriLankanAirlines-bacom_executiveClubSellingWeb
        Examples:
            | Partner Airlines   | Booking Type    | route Type |
            | SriLankan Airlines | Book with Avios | return     |

    @Regression
    Scenario Outline: BA will be offered for Gold/Amex voucher bookings - <Booking Type>
        Given I am an EC "<Member Type>" logged in to my account
        When I am making a shorthaul "<route Type>" redemption booking using "<Booking Type>"
        Then only BA will be offered

        @BookWithAviosUpgradeGoldVoucherBAOnly
        Examples:
            | Member Type | Booking Type                               | route Type |
            | R Gold      | Book with avios, upgrade with gold voucher | return     |

        @BookWithMoneyUpgradeGoldVoucherBAOnly
        Examples:
            | Member Type | Booking Type                              | route Type |
            | UK Gold     | Book with Money,Upgrade with Gold Voucher | return     |


    @displayOfRFSsymbolRFS @Regression
    Scenario Outline: Successful display of RFS symbol on flight list page for "<Member Type>"
        Given I am an EC "<Member Type>" logged in to my account
        And I am making a longhaul "<route>" redemption booking using "<payment type>"
        Then I am able to see the RFS symbol against the flights for both segment on flight selection page
        Examples:
            | Member Type | payment type    | route       |
            | UK Gold     | Book with Avios | LHR-DEL-LHR |

    @Regression
    Scenario Outline: I can able to see fare quote for partner redemption bookings "<partner airlines>"
    Given I am an EC "UK Gold" logged in to my account
    When I am making a shorthaul "<route Type>" redemption booking using "<Booking Type>"
    And I have selected partner airlines for my journey
    Then I can see fare quote for partner Avios bookings

    @FinnairFareQuote-bacom_executiveClubSellingWeb
    Examples:
      | partner airlines |Booking Type     | route Type |
      | Finnair          |Book with Avios  | return     |

    @IberiaAirlinesFareQuoteWeb-bacom_executiveClubSellingWeb
    Examples:
      | partner airlines |Booking Type    | route Type |
      | Iberia           |Book with Avios | return     |
    @JapanAirlinesFareQuoteWeb-bacom_executiveClubSellingWeb
    Examples:
      | partner airlines |Booking Type    | route Type |
      |Japan Airlines    |Book with Avios | return     |
    @LATAMAirlinesFareQuote-bacom_executiveClubSellingWeb
    Examples:
      | partner airlines|Booking Type    | route Type |
      | Latam Airlines  |Book with Avios | return     |
    @QatarAirwaysFareQuoteWeb-bacom_executiveClubSellingWeb
    Examples:
      | partner airlines|Booking Type   | route Type|
      | Qatar Airways   |Book with Avios | return     |

  @PartnerAirlinesDetailsDisplayedForPriceBreakdownSection @Regression
  Scenario Outline: Change in Avios Price option will change the avios , price , tfc's per person for Partner airlines
     Given I am an EC "UK Gold" logged in to my account
     When I am making a shorthaul "<routeType>" redemption booking using "<payment type>"
     Then I will be offered various "<Partner Airlines>"
     When I go to see my fare quote
     And I change avios price option on Fare Quote
     Then avios fare and tfc's per person under price breakdown section also change
     Examples:
      |Partner Airlines  | payment type    | routeType |                            
      |Finnair           | Book with Avios | return    |


