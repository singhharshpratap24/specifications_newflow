Feature: Payment surcharge

  in order to neutralise cost of processing payment
  As a business owner
  I want to apply a surcharge to a booking based on payment type

  @Payment_Surcharge_Not_Charged_For_NonSurcharge_Country_Test @Regression
  Scenario: Surcharge is not applied when using payment registered in a country that does not attract payment surcharge
    Given I have flights departing "<NonSurchargeCountry>" attracting country in my booking with "One Adult"
    When I paid for my booking with "<cardName>"
    Then Payment surcharge is not being charged
    Examples:
      | cardName       |NonSurchargeCountry|
      | Visa Corporate |Japan          |
