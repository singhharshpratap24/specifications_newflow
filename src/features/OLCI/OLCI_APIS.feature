Feature: OLCI APIS funtionality

@OLCIAPIS
     Scenario: To verify Choose seats MMB Action bar are displayed for eligible passengers
         Given User is on MMB Page
         When  User search for Booked PNR "OLCIAPIS"
         When  User Lands on mmb page with OLCI enabled button and clicked
         When  User lands on Online checkin page with APIs enable and User click APIs button
         When  User Lands on APIs Page and fill APIS form with passport number "<PassNo>" Nationality "<Nationality>" government "<Gov>"

         Examples:
           | PassNo | Nationality    |       Gov      |
           |A12345B | United Kingdom | United Kingdom |
         
