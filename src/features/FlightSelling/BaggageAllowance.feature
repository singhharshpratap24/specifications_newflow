Feature: Baggage Allowance

  @Regression
  Scenario Outline: Correct checked baggage allowance is displayed on Booking summary Page
    Given I create commercial booking  on "<Route>" in "<Cabin>" with "<Paxmix Type>"
    When I continue till Booking summary page
    Then the correct checked baggage allowance is displayed

    @BaggageAllowanceShortHaul
    Examples:
      | Route   | Cabin   | Paxmix Type |
      | LHR-AMS | Economy | 2A,1Y,1I,0C |

    @BaggageAllowanceLongHaul
    Examples:
      | Route   | Cabin   | Paxmix Type |
      | LHR-MAA | Economy | 2A,1Y,1I,0C |

  @BaggageAllowanceForUpgradedCabin @Regression
  Scenario Outline: Correct checked baggage allowance is displayed on Booking summary Page after upgrade of <Cabin>
    Given I book my journey on "<Route>" in "<Cabin>" with "<Paxmix Type>"
    When I continue till Booking summary page
    Then the correct checked baggage allowance is displayed
    Examples:
      | Route   | Cabin    | Paxmix Type  |
      | LHR-DEL | Business | 1A,1C,1I,1YA |

  @VerifyNoCheckedBaggageAllowance
  Scenario: Hand baggage only customer don't have checked baggage allowance
    Given I book my journey on "<Route>" in "<Cabin>" with "<Paxmix Type>"
    When  I continue till farequote page
    Then fare quote page is displayed
    And I view the baggage allowance and I dont have checked allowance
    Examples:
      | Route       | Cabin   | Paxmix Type |
      | LHR-CDG-LHR | Economy | 2A,0Y,0I,0C |

  @StandardHBOFeatures @Regression
  Scenario: Economy ticket for short haul
    Given I am on fare quote page for a short haul, economy flight with "One Adult"
    When I view your ticket features disclosure
    Then following "<feature>" and "<value>" should be presented

    Examples:
      | feature                                                                                       | value                                                                                     |
      | seating,change flight,change flight on the day of travel,checked baggage,refund if you cancel | For a fee,For a fee + fare difference,For a fee + fare difference,For a fee,not available |