Feature: EC reedemption booking - Book with avios


  Scenario Outline: Book flight with Avios
    Given I am an EC "Gold R" logged in to my account
    When I am making a shorthaul "<routeType>" redemption booking using "<payment type>"
    And I go to see my fare quote
    Then Price quote shows total avios in an account

    @OnewayShortHaulBookWithAviosBooking
    Examples:
      | payment type    | routeType |
      | Book with Avios | oneway    |

    @RoundTripShortHaulBookWithAviosBooking
    Examples:
      | payment type    | routeType |
      | Book with Avios | return    |  

  Scenario Outline: Passenger category wise price is displayed for <Booking_type> booking
    Given I am an EC "UK Gold" logged in to my account
    When I am making a shorthaul "<routeType>" redemption booking using "<payment type>"
    Then Passenger category wise Adult, child, Infant prices are displayed
  
  @PassengerWisePriceDisplayedOnlyAvios @Regression
  Examples:
      | payment type    | routeType |
      | Book with Avios | oneway    |
  @PassengerWisePriceDisplayedUpgradeWithGoldVoucher @Regression
  Examples:
      | payment type                               | routeType |
      | Book with avios, upgrade with gold voucher | oneway    |

  Scenario Outline: "<payment type>" can successfully confirmed and ticketed
    Given I am an EC "<Member Type>" logged in to my account
    And I am making a longhaul "<route>" redemption booking using "<payment type>"
    When I pay for my redemption booking with card as "<cardName>"
    Then the confirmation page is displayed with booking reference

    @RoundTripLongHaulUSBookWithAviosBooking
    Examples:
      | Member Type | route       | payment type    | cardName      |
      | Gold R      | MEX-LHR-MEX | Book with Avios | VISA Personal |
    @RoundTripLongHaulUSBookWithMoneyUpgradeUsingAviosBooking
    Examples:
      | Member Type | route       | payment type                        | cardName      |
      | Gold R      | MEX-LHR-MEX | Book with Money,Upgrade using Avios | MASTERCARD    |
    @BookwithAviosUpgradeWithGoldVoucherGUFT
    Examples:
      | Member Type | Country | route       | payment type                               | cardName      |
      | UK Gold     | UK      | MEX-LHR-MEX | Book with avios, upgrade with gold voucher | VISA Personal |  
    @BookwithAviosUpgradeWithGoldVoucherGUFO
    Examples:
      | Member Type | Country | route       | payment type                               | cardName      |
      | UK Gold     | UK      | MEX-LHR-MEX | Book with avios, upgrade with gold voucher | VISA Personal |  
    @BookingWithMoneyUpgradeWithgGoldVoucher @Regression
    Examples:
      | Member Type | route       | payment type                              | cardName      |
      | Premier R   | JFK-LHR-JFK | Book with Money,Upgrade with Gold Voucher | VISA Personal |


  Scenario Outline: <Details> should be displayed on Fare Quote page for  <payment type>
    Given I am an EC "<member type>" logged in to my account
    When I am making a shorthaul "<routeType>" redemption booking using "<payment type>"
    When I go to see my fare quote
    Then following "<Details>" gets displayed in Price Breakdown section
    
    @BookWithAviosDetailsDisplayedForPriceBreakdownSection @Regression
    Examples:
     |member type | payment type    | routeType | Details                                                                  |
     |UK Gold      | Book with Avios | return    | Avios per person,Price per person,TFC's per person,Inclusive Total |

    @BookwithMoneyUpgradeUsingAviosDetailsDisplayedForPriceBreakdownSection @Regression
    Examples:
     |member type  | payment type                        | routeType | Details                                                                  |
      |UK Gold      | Book with Money,Upgrade using Avios | return    | Avios per person,Price per person,TFC's per person,Inclusive Total |

    @BookwithAviosUpgradeWithGoldVoucherDetailsDisplayedForPriceBreakdownSection @Regression
    Examples:
     |member type | payment type                               | routeType | Details                                                                  |
     |UK Gold      | Book with avios, upgrade with gold voucher | return    | Avios per person,Price per person,TFC's per person,Inclusive Total |

    @BookwithMoneyUpgradeWithGoldVoucherDetailsDisplayedForPriceBreakdownSection @Regression
    Examples:
     |member type | payment type                               | routeType | Details                                           |
     |Premier R      | Book with Money,Upgrade with Gold Voucher | return    | Price per person,TFC's per person,Inclusive Total |

    @BookwithAviosCompanionVoucherDetails
    Examples:
     |member type  | payment type                          | routeType | Details                                                             |
     |UK Gold     |BA American Express Companion Voucher  | return    | Total Avios,Price per person,TFC's per person,Total price      |
 
   @BookwithAviosAmexCreditCardCompVoucherDetails
    Examples:
     |member type  | payment type                                      | routeType | Details                                                       |
     |Gold_R_R     |BA American Express Credit Card Companion Voucher  | return    | Total Avios,Price per person,TFC's per person,Total price |
 
  @BookwithAviosAmexPremiumCompVoucherDetails
    Examples:
     |member type  | payment type                                      | routeType | Details                                                       |
     |UK Gold      |BA American Express Premium Plus Companion Voucher  | return    | Total Avios,Price per person,TFC's per person,Total price |
 

  Scenario Outline: Change in Avios Price option will change the avios , price , tfc's per person
    Given I am an EC "Silver member with thirdPartyNominee" logged in to my account
    When I am making a shorthaul "<routeType>" redemption booking using "<payment type>"
    And I go to see my fare quote
    And I change avios price option on Fare Quote
    Then avios fare and tfc's per person under price breakdown section also change

    @ChangeAviosPriceOption @Regression
    Examples:
      | payment type    | routeType |
      | Book with Avios | return    |
      

   Scenario Outline: Verify Redemption fare quote shows the selected flight itinerary
    Given I am an EC "<member type>" logged in to my account
    When I am making a shorthaul "<routeType>" redemption booking using "<payment type>"
    When I go to see my fare quote
    Then itinerary is displayed as selected on flight list page
    @TwoWayBookWithAviosItinerary
    Examples:
      | payment type     | member type | routeType |
      | Book with Avios  | US Silver   |return     |

  @VerifyCorrectSeatingMessageForInfantBookWithAviosBooking @Regression
  Scenario Outline: Verify correct infant seating message is displayed on fare quote for avios booking
    Given I am an EC "<member type>" logged in to my account
    When I am making a shorthaul "<route>" redemption booking using "<payment type>"
    And I go to see my fare quote
    Then correct infant seating "<message>" is displayed
    Examples:
      | payment type    | member type | route       | message                                                                                                                                                                        |
      | Book with Avios | Gold R      | LHR-CDG-LHR | Please note that infants are not entitled to a seat.If you do require a seat for your infant, please start again and book them as a child. The appropriate fare will be quoted.|

  
  Scenario Outline: Creating a "<payment type>" booking with "<airline>"
    Given I am an EC "<Member Type>" logged in to my account
    And I am making a longhaul "<route>" redemption booking using "<payment type>"
    When I pay for my redemption booking with card as "<cardName>"
    Then the confirmation page is displayed with booking reference
    And  following "<Details>" displayed are correct for "<Member Type>"
    @ecselling_DetailTestUS_Gold
    Examples:
      | Member Type | route   | payment type    | airline | Details                                                                                       | cardName      |
      | US Gold     | LHR-JFK | Book with Avios | BA      | Booking Reference , Total Amount , Avios , Email Address , passenger names , Flight Itinerary | VISA Personal |
    @ecselling_DetailTestUK_Premier
    Examples:
      | Member Type | route   | payment type    | airline | Details                                                                                       | cardName      |
      | UK Premier  | LHR-DEL | Book with Avios | BA      | Booking Reference , Total Amount , Avios , Email Address , passenger names , Flight Itinerary | VISA Personal |
    @ecselling_DetailTestUK_Silver
    Examples:
      | Member Type | route   | payment type    | airline      | Details                                                                                      | cardName      |
      | UK Silver   | LCY-EDI | Book with Avios | BA+CityFlyer | Booking Reference , Total Amount , Avios , Email Address , passenger names , Flight Itineary | VISA Personal |
    @ecselling_DetailTestAustria_Gold
    Examples:
      | Member Type  | route       | payment type    | airline      | Details                                                                                      | cardName      |
      | Austria Gold | VIE-EDI-VIE | Book with Avios | BA+CityFlyer | Booking Reference , Total Amount , Avios , Email Address , passenger names , Flight Itineary | VISA Personal |
    @ecselling_DetailTestUK_PremierConnecting
    Examples:
      | Member Type | route       | payment type       | airline | Details                                                                                       | cardName      |
      | UK Premier  | EDI-JFK-EDI | PartAvios PartCash | BA+BA   | Booking Reference , Total Amount , Avios , Email Address , passenger names , Flight Itinerary | VISA Personal |

Scenario Outline:  Verify that avios deducted is shown under Price Breakdown section for <Booking_type> booking
    Given I am an EC "Gold R" logged in to my account
    When I am making a shorthaul "<routeType>" redemption booking using "<bookingType>"
    When I go to see my fare quote
    Then Avios deducted is displayed under price breakdown section
    @ecselling_bookwithavios_upgrade_gold_voucher
    Examples:
        | bookingType                                | routeType |
        | Book with avios, upgrade with gold voucher | return    | 

   @ecselling_bookwithmoney_upgrade_with_avios
   Examples:
       | bookingType                                 | routeType |
       | Book with Money,Upgrade using Avios         | return    |    
  
  Scenario Outline:Verify <Fields> are displayed for <Card Type> on the Payment page for Book with Avios booking.
    Given I am an EC "<member type>" logged in to my account
    And I am making a shorthaul "<routeType>" redemption booking using "<payment type>"
    When I select a "<cardName>"
    Then Following fields "<Fields>" are displayed as Mandatory fields  
   
    @VerifyPaymentfieldforMasterCard @Regression
    Examples:
      | cardName| Fields                                                                  | member type | payment type    |routeType  |
      | Master  | Card number , Expiry date Expiry month , Expiry date Expiry year , CVV  | US Gold     | Book with Avios |oneway     |
    
    @VerifyPaymentfieldforVisaCreditCard @Regression  
    Examples:
      | cardName   | Fields                                                                  | member type | payment type    |routeType  |
      | Visa Credit| Card number , Expiry date Expiry month , Expiry date Expiry year , CVV  | US Silver   | Book with Avios |oneway     |
  
  @PersonPayingDetail @Regression
  Scenario Outline: Verify  if <Member Type> is selected as person paying for book with Avios booking travelling <Route> in <Cabin> with <Paxmix Type> then name is displayed as text in the payment details as the person paying
    Given that I am logged in as a "<Member Type>"
    And I create "<Payment Type>" booking travelling on "<Route>"
    When I selected myself as person paying is traveling on Passenger page and submit the passenger details
    Then my name is displayed as text in the payment details as the person paying
    Examples:
      | Member Type | Payment Type    | Route       |
      | UK Gold     | Book with Avios | LHR-JFK-LHR |

  Scenario Outline: <Details> should be displayed on Fare Quote page for  <payment type>
    Given I am an EC "<member type>" logged in to my account
    When I am making a shorthaul "<routeType>" redemption booking using "<payment type>"
    When I go to see my fare quote
    Then following "<details>" gets displayed correctly on farequote page

@FarerulesConditionsDetailsDisplayedForPriceBreakdownSection @Regression
    Examples:
     |member type  | payment type                        | routeType | details                                                   |
     |UK Gold      | Book with Money,Upgrade using Avios | return    | Price Breakdown,Avios per person,Total price,Fare rules condition |