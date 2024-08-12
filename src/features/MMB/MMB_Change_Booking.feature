Feature: MMB Change booking 

    Feature Description
    @MMB_Change_Date
    Scenario Outline: I am travelling on BA, I can perform change Date via Old flow on any redemption booking
    Given User is on EC member Home Page
    When  User click on log in button and enter Valid credentials with login username "<username>" password "<password>"
    When  User go to manage and search for Booked PNR
    Then  User click on change date time button and perform change date action with details contactNumber "<ContactNo>" card type "<CardType>" card Number "<CardNo>" address1 "<Address1>" address2 "<Address2>" security number "<CVV>" post code "<PCode>"
    Then  Confirmation page should display with new flight details

    Examples:
    |username| password  |ContactNo|CardType     |CardNo          |Address1  |Address2  |CVV|PCode| 
    |00030941| test@123  |123456789|Visa Personal|4111111111111111|addressOne|addressTwo|345|12345|

    @MMB_Change_Time
    Scenario Outline: I am travelling on BA, I can perform change time with same Date via Old flow on any redemption booking
    Given User is on EC member Home Page
    When  User click on log in button and enter Valid credentials with login username "<username>" password "<password>"
    When  User go to manage and search for Booked PNR
    Then  User click on change date time button and perform change time action with details contactNumber "<ContactNo>" card type "<CardType>" card Number "<CardNo>" address1 "<Address1>" address2 "<Address2>" security number "<CVV>" post code "<PCode>"
    Then  Confirmation page should display with new flight details

    Examples:
    |username| password  |ContactNo|CardType     |CardNo          |Address1  |Address2  |CVV|PCode| 
    |00030941| test@123  |123456789|Visa Personal|4111111111111111|addressOne|addressTwo|345|12345|
