Feature:Adding/Removing member to HHA account

    @EC_Servicing_Passenger_AddedTest
    Scenario: EC member can add Non-EC member(above 18) to HHA account
        Given I am an EC "R Gold" logged in to my account
        And I view my profile
        When I add Non EC member whose age is above 18 to HHA
        Then Non EC member added to HHA account successfully