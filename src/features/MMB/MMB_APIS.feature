Feature: MMB APIS for Booked PNR

@MultiPaxAPIS @SinglePaxAPIS @APIS

    Scenario: I verify APIS details for MULTI-Passenger booking for INCOMPLETE APIS info
        Given User is on MMB Page

        When  User search for Booked PNR "<APISType>"
        Then  User verify passenger details header "<HeaderMessage>" displayed based on APIs status
        Then  User verify passenger_1 has APIs "<Warning_Message>"
        Then  User verify the list of passengers names in my booking
        Then  User verify passenger_1 name is clickable and it navigates to APIs form page
        Then  User fill the details on APIS summary page with passport number "<PassNo>" Nationality "<Nationality>" government "<Gov>" 

        Examples:
           |APISType      |                    HeaderMessage                         |               Warning_Message                   | PassNo | Nationality    |       Gov      |
           |MultiPaxAPIS  | Save time when checking in and add passenger details now | You need to provide more details before you fly |A12345B | United Kingdom | United Kingdom |
           |SinglePaxAPIS | Save time when checking in and add your details now      | You need to provide more details before you fly |B12345A | United Kingdom | United Kingdom |
