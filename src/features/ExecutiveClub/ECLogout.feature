Feature: EC Member Logout

@ECLogout-executiveClubSellingWeb
Scenario Outline: As an executive member, I should be able to logout from my profile
    Given I am an EC "UK Gold" logged in to my account
    When I view My Account link on homepage
    When I select logout option
    Then Home page gets displayed