Feature: Contains scenarios to make PNR Booking for Non EC Members.
  '''  covers all interment scenaiors of flight search, selection, assertions,
  seat selection, passenger entry, payment etc.  '''

  
  Scenario: PNR booking One Way Trip, with multiple Business class, flight, cabin, seat selection
    Given I am planning commercial booking with "One Adult"
    And   I pay for my booking with "<cardName>"
    Then  I land on flight booking confirmation page with PNR details
    @oneway_Direct_pnrbooking_farequoteAgreeAndContinue
    Examples:
      | cardName      |
      | VISA Personal |

    @oneway_Connecting_pnrbooking_farequoteAgreeAndContinue
    Examples:
      | cardName   |
      | MASTERCARD |

  @Regression
  Scenario: PNR booking One Way Trip, with multiple Business class, flight, cabin, seat selection
    Given I am planning commercial booking with "3A,0Y,3I,3C"
    And   I pay for my booking with "<cardName>" without seat selection
    Then  I land on flight booking confirmation page with PNR details
    @roundtrip_direct_pnrbooking_farequoteAgreeAndContinue
    Examples:
      | cardName      |
      | VISA Personal |

    @roundtrip_connecting_pnrbooking_farequoteAgreeAndContinue
    Examples:
      | cardName   |
      | MASTERCARD |

  @oneway_pnrbooking_farequoteApplyVoucher @Regression
  Scenario Outline: Voucher discount is applied to total cost of flight
    Given I am planning commercial booking with "One Adult"
    And   I continue till Booking summary page
    When  I click on Add link for 'Apply an eVoucher' option
    And   voucher discount is applied to total cost of flight and pay by card "<cardName>"
    And   booking using voucher created successfully

    Examples:
      | cardName      |
      | VISA Personal |

  @oneway_pnrbooking_farequote_disabilityAssistance
  Scenario Outline: Validate passenger page
    Given I am planning commercial booking with "One Adult"
    And   I continue till Booking summary page
    When  I click on 'disability assistance' button
    Then  disability assistance page is displayed

  @oneway_pnrbooking_farequote_holdBooking
  Scenario Outline: Hold Booking
    Given I am planning commercial booking with "One Adult"
    When  I continue till Booking summary page
    Then  Hold Booking Pod is Displayed

  
  Scenario: PNR booking Round Trip, with multiple Business class, flight, cabin, seat selection
    Given I am planning commercial booking with "One Adult"
    And   I pay for my booking with "<cardName>"
    Then  I land on flight booking confirmation page with PNR details
    @twoway_Shorthhaul_Direct_pnrbooking_farequoteAgreeAndContinue
    Examples:
      | cardName      |
      | VISA Personal |

    @twoway_Longhaul_Direct_pnrbooking_farequoteAgreeAndContinue
    Examples:
      | cardName      |
      | VISA Personal |

  @twoway_Connecting_pnrbooking_farequoteAgreeAndContinue
  Scenario: PNR booking Round Trip, with multiple Business class, flight, cabin, seat selection
    Given I am planning commercial booking with "3A,0Y,3I,3C"
    And   I pay for my booking with "<cardName>"
    Then  I land on flight booking confirmation page with PNR details
    Examples:
      | cardName      |
      | VISA Personal |

  @paymentSurchargeChargedForSurchargeCountry @Regression
  Scenario: Surcharge is applied when using payment registered in a country that does attract payment surcharge
    Given I am planning commercial booking with "One Adult"
    And   I pay for my booking
    Then  Payment surcharge is being charged according to currency with "<cardName>"
    And   I land on flight booking confirmation page with PNR details
    Examples:
      | cardName |
      | UATP     |

  @FlightListPageDisplayed @Regression
  Scenario: Check the option to go back and change flights even from the Booking Summary page
    Given I am searching for flights with "One Adult"
    When I proceed till Booking Summary page
    And I click on Back to flight selection link
    Then Flight Selection page is displayed
    And It allows us to change flights

  @PrimesellingWithThirdPartyAsPayerTest @Regression
  Scenario: Book a flight where passenger is not a payer
    Given I am planning commercial booking with "One Adult" where passenger is not payer
    And adding payer details for booking with "<cardName>"
    Then  I land on flight booking confirmation page with PNR details
    Examples:
      | cardName      |
      | VISA Personal |

  @GhanaCommercialBooking @Regression
  Scenario: Verify completion of pre-pin booking with money when country of residence, country of departure and billing country are all Ghana
    Given I create a booking departing from "<country>"
    And   I pay for my booking with "<cardName>"
    Then  I land on flight booking confirmation page with PNR details
    Examples:
      | country | cardName   |
      | gh      | MASTERCARD |

  @Regression
  Scenario: Ticket flexibility is eligible for <ticketType>
    Given I am planning commercial booking with "One Adult"
    When  I continue till Booking summary page
    Then  upgrade my ticket flexiblity "<section>" on Booking summary page for "<ticketType>"

    @UpgradeAvailableEconomy
    Examples:
      | section                     | ticketType    |
      | More Fare Options Available | Economy Basic |

    @UpgradeAvailableHBO
    Examples:
      | Section                         | ticketType             |
      | More Fare Options Not Available | Economy Plus (Non HBO) |

  @Paxmix_type_booking_summary_page @Regression
  Scenario Outline: Correct pax-mix displayed on Booking Summary page
    Given I book my journey on "<Route>" in "<Cabin>" with "<Paxmix Type>"
    And I continue till Booking summary page
    Then the correct number of Paxmix should be displayed on Booking Summary page as selected

    Examples:
      | Route   | Cabin   | Paxmix Type  |
      | LHR-CDG | Economy | 3A,2C,2I,1YA |

  @paymentCardValidationsForBookingFromGhana @Regression
  Scenario: Verify payment cards offered for pre-pin booking with money when country of residence and country of departure are both Ghana
    Given I am not logged-in and my country of residence is Ghana "gh"
    And I am making a booking with money departing from Ghana
    When I proceed till Payment Page
    Then Payment cards "<icons>" available are as follows

    Examples:
      | icons                                           | Paxmix Type  |
      | Visa,Mastercard,Discover,Diner,American Express | 1A,0C,0I,0YA |


  @SecureOnlinePaymentCards @Regression
  Scenario: Secure online payment cards display security frame before taking payments using "<cardName>"
    Given I am planning commercial booking with "One Adult"
    Then I have selected all details on Flight search selection
    When continue till Payment page
    Then I pay for the booking with Secure online "<cardName>"
    Then user is prompted to authenticate with their bank before payment is taken
    Examples:
      | cardName  |
      | SOLP Card |

  @AddOnBusinessMemberShipdetailsOnPaymentPage @Regression
  Scenario Outline: To obtain the relevant reward points I can add membership details to the booking - <type>
    Given I am planning commercial booking with "One Adult"
    When  I continue till Payment page
    And   I add "<member type>" membership details 
    Then I should be able to add membership details to the booking with "<cardName>"
     Examples:
      | cardName      |  member type |
      | VISA Personal |  On Business |
      
  @PaymentChargedForAllFlightLegs @Regression
  Scenario: Correct amount is charged based on fares selected
    Given I am creating any multi-Leg booking with "1A,1Y,1I,1C"
    And I have selected flights for all legs on Flight search selection
    Then I compare the price on farequote with final price on payment page

  @CommercialFlowAssertBetaMMB @Regression
  Scenario Outline: Bookings are successful on longhaul "<route>" in "<cabin>" with "<paxmix type>"
    Given I book my journey on "<route>" in "<cabin>" with "<paxmix Type>"
    And   I pay for my booking with "<cardName>"
    Then   MMB as Confirmation Page is displayed
    Examples:
      | route       | cabin   | paxmix type  | cardName      |
      | LHR-SIN-LHR | Economy | 3A,1C,0I,2YA | VISA Personal |
      
  @Payment_Surcharge_Surcharge_Removed_Test
  Scenario: Changing billing country removes the surcharge
    Given I have flights departing Surcharge attracting "fi" in my booking
    And I select same country as my billing country
    When I change billing country to another billing country
    Then surcharge is removed from my booking

  @VerifyPrePin_EconomyBasicAttibutes @Regression
  Scenario Outline: BA customer can view cabin attributes for an Economy Basic (Hand Baggage Only / HBO) fare on the flight list page
    Given I am a Pre-pin customer on ba.com homepage with "One Adult"
    And I am viewing the flight list for an Economy Lowest commercial booking on a short-haul route
    When I click on the Flight Details link displayed below any flight
    Then Flight attributes should be displayed
    
  @ChangeFlightSearchPopUpDisplayed @Regression
  Scenario: Edit Search link on Flight Selection page expand Edit Search section
    Given I am on Flight Selection page
    When I click on Edit Search link
    Then Edit Search section is displayed
