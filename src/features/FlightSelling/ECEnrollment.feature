Feature: Successful EC Enrollment with allowed password with Join the club link

  @ECEnrollment_with_join_the_club @Regression
  Scenario Outline: Successful EC Enrollment with allowed password
    Given I am on ba.com homepage
    And I click on Join the Club link displayed under Manage tab
    When I fill in details along with allowed password format on Join the Club form.
    Then I am able to successfully enrolled for EC program.

  @InetEnrollment_with_join_the_club
  Scenario Outline: Successful Inet Enrollment with allowed password
    Given I am on ba.com homepage
    When I click on Login Button on top right corner to navigate to IDP page
    Then I click on Sign Up link to navigate to Register or join the Executive Club for free page
    When I fill in all details along with allowed password format to
    Then I am able to successfully enrolled for Inet program