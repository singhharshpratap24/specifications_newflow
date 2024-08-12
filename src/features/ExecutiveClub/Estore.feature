Feature: Accessing EStore
@AccessingEStoreFromCollectingAvios_Uk @Regression
Scenario: UK member accessing EStore from Collecting Avios on EC HomePage
    Given I am an EC "<member type>" logged in to my account
    And I view my profile
    When I have chose to access EStore from Collecting Avios on EC HomePage
    Then I am shown the Collecting Avios link on EC HomePage
    Examples:
        | member type          |
        | UK Resident          |