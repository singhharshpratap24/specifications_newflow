Feature: Enrol/Update EC member as a BA.Com Customer

    @EC_Servicing_Verify_PopupTest-bacom_executiveClubSellingWeb @Regression
    Scenario Outline: As a "<Member Type>" I should be able to update personal information after submitting valid Date of birth
        Given I am an EC "<Member Type>" logged in to my account
        When I update my personal information
        Then Date of birth pop up should be prompted
        Examples:
            | Member Type |
            | UK Gold     |

    Scenario Outline: As a "<Member Type>" I should be able to update meal choice
        Given I logged in to my account as a "<Member Type>"
        When I view my profile
        When I update meal preference
        Then selected meal choice gets added to my profile

        @updateMealPreferences
        Examples:
            | Member Type |
            | Gold R      |


    @EC_Servicing_mail_unsubscriptionsTest @Regression
    Scenario Outline: As a "<Member Type>" I should be able to do unsubscription of Mail Preferences
        Given I logged in to my account as a "<Member Type>"
        And I view my personal information
        When I uncheck for marketing communication
        Then I should be be able to unsubscribe marketing mail
        Examples:
            | Member Type |
            | Gold R      |


@ValidateEcProfilePageInContactDetails @Regression
Scenario Outline: A customer can validate email id and mobile number in contact details section of EC Profile page
    Given I logged in to my account as a "<Member Type>" 
    When I go to EC member profile page
    And enter DOB 
    Then able to Validate email id and mobile number in contact details section of profile page.

    Examples:
            | Member Type |
            | Gold R      |