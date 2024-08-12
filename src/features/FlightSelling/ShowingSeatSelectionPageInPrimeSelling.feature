Feature: Showing seat selection page in prime selling
      """ As a ba.com business
  I want to show paid for seats on a separate seat selection page and/or
  confirm whether seat selected during selling flow is correctly displayed in manage my booking """

  @ShowingSeatSelectionPageInPrimeSelling
  Scenario:Display same seating on MMB as selected from Passenger Details Page for a British Airways and Iberia combination flight while making seat selection in greater than 14 days window
    Given I am planning commercial booking with "One Adult"
    And   continue till seating page
    When  I pay for the booking with "<cardName>"
    Then  confirmed seats during booking should match with seating on MMB

    Examples:
      | cardName      |
      | VISA Personal |

  @ShowingSameSeatOnMmb @Regression
  Scenario:Display same seating on MMB as selected from Passenger Details Page for a British Airways and Quantas Airways combination flight while making seat selection in greater than 14 days window
    Given I travel as a Standard customer in Club Class with departure date greater than 14 days with "One Adult"
    And   continue till seating page
    When  I pay for the booking with "<cardName>"
    Then  confirmed seats during booking should match with seating on MMB

    Examples:
      | cardName      |
      | VISA Personal |
