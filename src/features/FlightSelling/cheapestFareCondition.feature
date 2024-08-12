Feature:To show cheapest fares available

  In-order promote repeat business
  As a ba.com customer
  I want to offer cheapest fares


  @CheapestFare_bacom_FlightSellingWeb_Test_01
  Scenario Outline: Display Cheapest fares based on regions - <Country of residence>, <city>
    Given I am on ba.com homepage for "<Country of residence>"
    Then I navigate to Find your cheapest fare link
    And cheapest fare page is displayed
    Then Cheapest fares from "<city>" to various destinations are displayed

    @CheapestFare_bacom_FlightSellingWeb_Test_01
    Examples:
      | Country of residence | city   |
      | United Kingdom       | London |

  @CheapestFare_bacom_FlightSellingWeb_Test_03
  Scenario: UK residents offered an option to enter destination station of your choice and find lowest price to that destination on cheapest fare page
    Given I select COR as UK
    When I navigate to Find your cheapest fare link
    Then I am offered an option to enter destination on cheapest fare page

  @CheapestFare_bacom_FlightSellingWeb_Test_04
  Scenario:Show lowest price for 14 nights at max
    Given I am searching for lowest fares
    When number of nights is selected
    Then it gives an option to see lowest fares for 14 nights at max

  Scenario Outline:Display cabin based lowest fares - <cabin>
    Given I am on cheapest fares page
    When I select cabin "<cabin>"
    Then I can see cheapest fares for that particular selected "<cabin>"

    @CheapestFare_bacom_FlightSellingWeb_Test_05
    Examples:
      | cabin   |
      | Economy |

    @CheapestFare_bacom_FlightSellingWeb_Test_06
    Examples:
      | cabin           |
      | Premium economy |

    @CheapestFare_bacom_FlightSellingWeb_Test_07
    Examples:
      | cabin          |
      | Business class |

    @CheapestFare_bacom_FlightSellingWeb_Test_08
    Examples:
      | cabin       |
      | First class |
