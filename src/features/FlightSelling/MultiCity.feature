Feature: As a customer I am offered to create complex/openjaw bookings via classic flow  on ba.com

    @Classic_bacom_FlightSellingWeb_Test_01 @Regression
    Scenario: Multicity link is displayed on journey plan fragment
        Given I am on british airways home page
        When I see my journey plan fragment
        Then multicity link is displayed

    @Classic_bacom_FlightSellingWeb_Test_02
    Scenario: Plan your travel page is displayed for new multicity link
        Given I am planning for complex journey
        When I click on multicity link
        Then Plan your travel page on new flow is displayed

    @Classic_bacom_FlightSellingWeb_Test_03
    Scenario: Offer the ability to select at max six segments for new multicity
        Given I am planning for complex journey
        When I go to Plan your travel page on new flow
        Then I am allowed to enter at max six segments per journey in new flow

    @Classic_bacom_FlightSellingWeb_Test_04
    Scenario: Next day and  previous day links on classic flight browse page
        Given I am planning for complex journey
        When I go to flight list page in new multicity flow
        Then Multicity flight list page is visible

    @Classic_bacom_FlightSellingWeb_Test_06
    Scenario: Complex journeys are not possible for bookings containing non flight products for new multicity
        Given I am planning for complex journey
        When I click on multicity link
        Then It only allow me to create flight only journeys in new flow

    @Classic_bacom_FlightSellingWeb_Test_07 @Regression
    Scenario: Flight prices are not displayed on Flight browse page for classic bookings
        Given I am planning for complex journey
        When I go to flight list page in new multicity flow
        Then Flight prices are displayed in new flow

    @Classic_bacom_FlightSellingWeb_Test_08 @Regression
    Scenario: Classic flight list page offers direct flights and flights with connections
        Given I am planning for complex journey
        When I go to flight list page in new multicity flow
        Then I am offered direct flights and flights with connections as per route in new flow

    @Regression
    Scenario Outline: Offer the ability to create complex/open jaw bookings via new multicity - <type>
        Given I am planning my journey
        When I click on multicity link
        Then I can create "<type>" journey in new flow

        @Classic_bacom_FlightSellingWeb_Test_13
        Examples:
            | type    |
            | Complex |

        @Classic_bacom_FlightSellingWeb_Test_14
        Examples:
            | type     |
            | Open Jaw |

    @ConfirmBookingForMultiCity @Regression
    Scenario Outline: Successful creation of multi-city APD bookings
        Given I book a multicity new flow journey on "<Route>" in "<Cabin>" with "<paxMixType>"
        When I pay for my booking in new flow with "<cardName>"
        Then new flow confirmation page is displayed
        Examples:
            | Route           | Cabin   | paxMixType   | cardName      |
            | LHR-CDG/CDG-JFK | Economy | 1A,1C,1I,1YA | VISA Personal |

    @Regression
    Scenario Outline: Next week and previous week arrow are working - <type> for new multicity
        Given I am planning for openjaw journey
        When I go to flight list page in new multicity flow
        And  I click on "<arrow>" link in new flow
        Then "<arrow>" flights are displayed as per the selected departure date
        
        @Classic_bacom_FlightSellingWeb_Test_11
        Examples:
            | arrow     |
            | Next week |
        
        @Classic_bacom_FlightSellingWeb_Test_12
        Examples:
            | arrow     |
            | Prev week |
   
    @verify_seven_day_calender
    Scenario: Verify calender functionality for Mulicity on Flight Selection Page
         Given I am planning for openjaw journey
         When I go to flight list page in new multicity flow
         Then 7 day calender functionality is available         

    @MultiCityBooking @Regression
    Scenario Outline: Flight Selection page displayed successfully for a multi-city APD booking
        Given I navigate to Multicity search Page
        And I search complex journey on "<Route>" in "<Cabin>" with "<Paxmix Type>"
        Then Flight Selection page for a multi-city journey is displayed
        Examples:
            | Route           | Cabin   | Paxmix Type  |
            | LHR-CDG/CDG-JFK | Economy | 1A,1C,1I,1YA |

    @Classic_bacom_FlightSellingWeb_Test_10 @Regression
    Scenario Outline: Display Flight Information - <flight information> for new multicity on Flight List page
        Given I am planning for complex journey
        When I go to flight list page in new multicity flow
        Then a minimum "<flight information>" is shown as mandatory information in new flow
        Examples:
            | flight information                                                                   |
            | Carrier,Departure Point,Arrival point,Departing Time,Landing Time,total journey time |