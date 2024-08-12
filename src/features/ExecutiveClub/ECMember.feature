 Feature: Verify booking options and member details
 
  @verifyBookingOptionsandmemberdetails @Regression
       Scenario Outline: As an Executive member I can see avios, points and the various payment options available
        Given I am an EC "<member type>" logged in to my account
        And I view my profile
        When I see Book with Avios or money section
        Then following "<Options>" are displayed on EC home page
        And Member's Name, Avios and Tier Points are also displayed on EC home page
    
     Examples:
      | member type          | Options                                                                  |
      | R Gold | Book Reward Flights with Avios ; Book a flight with money ; Book a flight with money, upgrade with Avios |

@PaymentDetailsChecks
  Scenario Outline:Verify the correct details are displayed on Payment page for <member type> for Book with Avios booking.
    Given I am an EC "<member type>" logged in to my account
    And I am making a shorthaul "<routeType>" redemption booking using "<payment type>"
    When  I select a "<cardName>"
    Then following "<Details>" must appear
    Examples:
      | member type | Details                                                       | cardName    | routeType | payment type    |
      | UK Gold     | Passenger Names , Itinerary , Avios , Total Amount , Currency | Visa Credit | oneway    | Book with Avios |