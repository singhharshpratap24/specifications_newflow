Feature: Add, Edit, Remove Friends & Family

    @AddNewFnFMember
    Scenario Outline: An eligible EC member should be allowed to add FnF member
        Given I am an EC "<member type>" logged in to my account
        And I view my profile
        When I add a new member under My Family and Friends
        Then I can see newly added FnF member details
        Examples:
            | member type          |
            | member with FnF list |

    @EditFriendsAndFamily
    Scenario Outline: An eligible EC member should be allowed to change FnF member within 24hr of creation
        Given User is on Home Page
        When User click on log in button and enter Valid credentials with login username "<username>" password "<password>"
        When User click on Friends and Family Option accordingly page displayed
        When User should be allowed to change within 24hr window

        Examples:
            | username | password |
            | 00008393 | Test@123 |

    @RemoveFriendsAndFamily
    Scenario Outline: An eligible EC member who has FnF list should not be allowed to remove FnF member and correct error message is displayed for 6 months after 24 hrs of creation
        Given User is on Home Page
        When User click on log in button and enter Valid credentials with login username "<username>" password "<password>"
        And User click on Friends and Family Option accordingly page displayed
        And User click on the Remove button and Error message "<errorMessage>" is displayed

        Examples:
            | username | password | errorMessage                               |
            | 00008393 | Test@123 | Sorry we are unable to remove this person. |
