Feature: Air Passenger Duty taxes are shown on fare quote pafe for Passengers

    @Regression
    Scenario Outline: Correct APD taxes displayed on fare quote on <route> in <cabin> with <paxmix type>
        Given I book my journey on "<Route>" in "<Cabin>" with "<Paxmix Type>"
        And I continue till Booking summary page
        When I click on your breakdown link
        Then correct APD taxes are displayed

        @Shorthaul_APDTaxes_PNRBooking 
        Examples:
            | Route   | Cabin   | Paxmix Type |
            | LHR-AMS | Economy | 2A,1Y,1I,0C |

        @Longhaul_APDTaxes_PNRBooking 
        Examples:
            | Route   | Cabin   | Paxmix Type |
            | DXB-BOM | Economy | 2A,1Y,1I,0C |