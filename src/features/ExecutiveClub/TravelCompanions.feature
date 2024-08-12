Feature: As a ba.com customer and my name and address contains special characters
    I want ba.com to recognise them so that I can make a booking with the name which is on my passport
    and that any back end systems are not affected by entering one the characters

    @AddTravelCompanionWithSpecialCharacterName
    Scenario: Adding Travel Companions which contains special characters works correctly
        Given I am an EC "<member type>" logged in to my account
        And I view my profile
        When I click on My travel companions under manage my booking tab
        Then I add a new person and add their name details to my account
        And their details are successfully added to my account
        Examples:
            | member type |
            |  UK Gold    |
