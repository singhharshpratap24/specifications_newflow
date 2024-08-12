Feature: MMB Baggage operations for Booked PNR

    @baggage    @mmb
    Scenario: Baggage Selection
        Given User is on MMB Page
        When User search for Booked PNR "baggage"
        Then User click on MMB tab
        Then User proceed to add bags
        When User selects the number of bags "<numberofbags>" to be added on Baggage page
        Then user proceeds for selection of person paying
        Then user select country "<country>" cardType "<cardType>" cardNo "<cardNo>" CVV "<CVV>" address1 "<address1>" address2 "<address2>" postcode "<postcode>" and proceed for payment
        Then user lands on confirmation page of extra baggage purchase

        Examples:
            | numberofbags | country | cardType | cardNo           | CVV | address1 | address2 | postcode |
            | 5            | India   | VIP      | 4111111111111111 | 456 | address1 | address2 | 12345    |

  
    Scenario: Bookings containing a Silver Gold GGL Premier Executive Club member get additional piece of baggage
        Given User is on MMB Page
        When User search for Booked PNR "<BaggageConditions>"
        When User proceed to add bags
        Then User can see the correct baggage allowance is displayed

        Examples:
        |BaggageConditions|
        |Sil_OR_High_Eco_EcoBasic_Bag_Allow|
        |Sil_OR_High_Eco_Prim_Bag_Allow|
        |Sil_OR_High_Eco_Stand_Bag_Allow|
        |Sil_OR_High_Business_Bag_Allow|
        |Sil_OR_High_First_Bag_Allow|
