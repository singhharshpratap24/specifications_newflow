
Feature: MMB Seat Selection for Booked PNR

        @MMBSeatSelection
        Scenario: To verify Choose seats MMB Action bar are displayed for eligible passengers
         Given User is on MMB Page
         When  User search for Booked PNR "MMBSeatSelection"
         Then  User verify Choose seats link is shown and it is functional
         When  User click on choose seats button and verify pax have choose seat clickable button  

        @MMBPaidSeatSelection
        Scenario: To book paid seat With MMB operations
         Given User is on MMB Page
         When  User search for Booked PNR "MMBPaidSeatSelection"
         Then  User verify Choose seats link is shown and it is functional
         When  User click on choose seats button and verify pax have choose seat clickable button
         When  User reach to summary page and agree terms and conditions
         When  User reach to payment page and provide details like Region "<Region>" CardType "<CardType>" CardNo "<CardNo>" SecurityNo "<SecurityNo>" address1 "<address1>" address2 "<address1>" postcode "<postcode>" and click on pay button  
         Then  User reach to confirmation page where each pax get confirmed seat 

         Examples:
             | Region          | CardType          | CardNo                 |SecurityNo |address1 |address2 |postcode |
             | United Kingdom  | Visa Personal     | 4111111111111111       |456        |address1 |address2 |12345    |


        @MMBSeatSelectionAVIOSwithECHomePage
        Scenario: To book seat With EC member MMB operations
         Given User is on EC member Home Page
         When  User click on log in button and enter Valid credentials with login username "<username>" password "<password>"
         Then  User go to view all bookings and click on desired MMB button 
         Then  User verify Choose seats link is shown and it is functional
         When  User click on choose seats button and verify pax have choose seat clickable button
         When  User reach to summary page and agree terms and conditions
         When  User reach to payment page and select avios points and click on pay button
         Then  User reach to confirmation page where each pax get confirmed seat 

         Examples:
            |username| password  | 
            |00006305|test@123   |

    @MMBSeatSelectionAVIOSwithPaymentPageECLogin
        Scenario: To book paid seat With MMB operations
         Given User is on MMB Page
         When  User search for Booked PNR "MMBSeatSelectionAVIOSwithPaymentPageECLogin"
         Then  User verify Choose seats link is shown and it is functional
         When  User click on choose seats button and verify pax have choose seat clickable button
         When  User reach to summary page and agree terms and conditions
         When  User provides EC login credentials username "<username>" password "<password>" to pay through AVIOS
         When  User reach to payment page and select avios points and click on pay button
         Then  User reach to confirmation page where each pax get confirmed seat 

         Examples:
              |username| password  | 
              |00006305|test@123   |

     @MMBSeatSelectionAVIOSwithAddBooking
        Scenario: To book seat With EC member MMB operations
         Given User is on EC member Home Page
         When  User click on log in button and enter Valid credentials with login username "<username>" password "<password>"
         Then  User go to view all bookings perform add booking action and click on desired MMB button 
         Then  User verify Choose seats link is shown and it is functional
         When  User click on choose seats button and verify pax have choose seat clickable button
         When  User reach to summary page and agree terms and conditions
         When  User reach to payment page and select avios points and click on pay button
         Then  User reach to confirmation page where each pax get confirmed seat 

         Examples:
            |username| password  | 
            |00006305|test@123   |

      @MMB_AddFrequent_Flyer_Free_SeatBooking
         Scenario Outline: EC Bronze customer perform free seating for SH basic booking through MMB while travel date is within 7 days of departure 
            Given User is on MMB Page
            When  User search for Booked PNR "<Booking Route>"
            Then  User click on add frequent flyer link and provided flyer details
            When  User perform Seating through MMB
            Then free seating should be performed through MMB for Bronze member

            Examples:
            |Booking Route|
            |Oneway_SH_FF_Free_SeatBooking|
            |Twoway_SH_FF_Free_SeatBooking|


      @MMB_ComCus_Paid_seating
         Scenario Outline: As a ba.com normal commercial customer I want to be able to perform paid seating for SH basic booking <booking route>
            Given User is on MMB Page
            When  User search for Booked PNR "<Booking Route>"
            When  User perform Seating through MMB
            Then  paid seating should be performed through MMB for commercial customer

            Examples:
            |Booking Route|
            |Oneway_SH_ComCus_Paid_SeatBooking|
            |Twoway_SH_ComCus_Paid_SeatBooking|

      @MMB_SilverMem_Free_seating
         Scenario Outline: As a ba.com EC Silver customer I want to be able to perform free seating for SH basic booking <booking route>
           Given User is on MMB Page
            When  User search for Booked PNR "<Booking Route>"
            When  User perform Seating through MMB
            Then free seating should be performed through MMB for Silver member

            Examples:
            |Booking Route|
            |Oneway_SH_SilMem_Free_SeatBooking|
            |Twoway_SH_SilMem_Free_SeatBooking|

      @MMB_GoldMem_Free_seating
         Scenario Outline: As a ba.com EC Gold customer I want to be able to perform free seating for SH basic booking <booking route>
            Given User is on MMB Page
            When  User search for Booked PNR "<Booking Route>"
            When  User perform Seating through MMB
            Then free seating should be performed through MMB for Gold member

            Examples:
            |Booking Route|
            |Oneway_SH_GoldMem_Free_SeatBooking|
            |Twoway_SH_GoldMem_Free_SeatBooking|

      @MMB_BlueMem_Paid_seating
         Scenario Outline: As a ba.com EC Blue customer I want to be able to perform paid seating for SH basic booking <booking route>
            Given User is on MMB Page
            When  User search for Booked PNR "<Booking Route>"
            When  User perform Seating through MMB
            Then  paid seating should be performed through MMB for Blue member

            Examples:
            |Booking Route|
            |Oneway_SH_BlueMem_Paid_SeatBooking|
            |Twoway_SH_BlueMem_Paid_SeatBooking|

      @AdultandChildExitSeat
         Scenario: Children who has child description should not be able to sit in a exit seat
            Given User is on MMB Page
            When  User search for Booked PNR "AdultandChildExitSeat"
            Then  User verify Choose seats link is shown and it is functional
            When  User try to choose exit seat for child will get Exit seat unavailable popup

      @AdultandInfantExitSeat
         Scenario: Infant if adult has an infant attached should not be able to sit in an exit seat
            Given User is on MMB Page
            When  User search for Booked PNR "AdultandInfantExitSeat"
            Then  User verify Choose seats link is shown and it is functional
            When  User try to choose exit seat with infant will get Exit seat unavailable popup

      @AdultandYAExitSeat
         Scenario: Young Person should be able to sit in an exit seat
            Given User is on MMB Page
            When  User search for Booked PNR "AdultandYAExitSeat"
            Then  User verify Choose seats link is shown and it is functional
            When  User try to choose exit seat with infant will get Exit seat    

                     