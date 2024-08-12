Feature: Solo Traveller Banner

    Scenario Outline: "<banner>" message is getting displayed on flight list page for "<voucher type>" having "<number of vouchers>" voucher
        Given I am logged in with "<member type>" EC Member and making a booking for "<payment type>" having voucher and route type "<routeType>"
        When I go to Flight List page
        Then "<banner>" message will be displayed on Flight list page

        @Solotravellerbannerfor121voucher
        Examples:
          |member type  |                 payment type                       |            banner                  | routeType |
          |Gold_R_R     | BA American Express Credit Card Companion Voucher  | Solo traveller Avios discount      |  oneway   |