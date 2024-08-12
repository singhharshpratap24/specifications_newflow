Feature: EC Cash flow booking

  Scenario Outline: As a ba.com customer, i should be allowed to make a booking using Blue Member
    Given I am an EC "<member type>" logged in to my account
    And I navigated till Payment Page with "One Adult"
    Then Confirmation Page is Displayed

    @ECMember_OneWay_LongHaul_Cash_PNRBooking
    Examples:
      | member type |
      | Spain Blue  |
    @ECMember_OneWay_Domestic_Cash_PNRBooking
    Examples:
      | member type |
      | Bronze      |
    @ECMember_OneWay_ShortHaul_Cash_PNRBooking
    Examples:
      | member type |
      | US Silver   |
    @ECMember_RoundTrip_Longhaul_Cash_PNRBooking
    Examples:
      | member type |
      | UK Gold     |