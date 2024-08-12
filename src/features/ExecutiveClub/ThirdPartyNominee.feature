Feature: Adding Third Party Nominee

@Addthirdpartynominee @Regression
Scenario Outline: AS Silver Executive Club member, I can add third party nominee
  Given I am an EC "<member type>" logged in to my account
  And I view my profile
  When I add third party nominee
  Then I should be able to add successfully

  Examples:
    | member type                          |
    | Silver member with thirdPartyNominee |