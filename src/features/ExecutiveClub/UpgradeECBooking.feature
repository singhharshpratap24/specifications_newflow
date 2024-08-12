Feature: Ticket flexibility upgrade eligibility

    @UpgradeNotAvailableRedemption
    Scenario: Ticket flexibility not eligible for flights using redemption
        Given I am an EC Member "Gold R" logged in to my account
        And I am planning a "return" journey using "Book with Avios"
        When I proceed till Fare Quote page
        Then Upgrade my Ticket flexiblity section is not available on Fare Quote page.