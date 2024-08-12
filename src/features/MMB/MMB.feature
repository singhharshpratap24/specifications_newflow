Feature: MMB Flight Search for Booked PNR

    @VerifyBookingReferenceOnMMB
    Scenario: Verify that the customer retrieve a booking.
        Given I generate my booking reference and navigate to ba.com homepage
        When I retreive my booking
        Then verify my booking reference

    @mmb @TestCaseKey=BTATWO-T6
    Scenario: MMB Validate Booked PNR 
        Given User is on MMB Page
        When User search for Booked PNR "mmb"
        Then User go for change Booking
    
    @mmb @Linkverfiy
    Scenario:To Verify add to calendar link
        Given I navigate to ba and retrieve my booking in new beta pages "Linkverfiy"
        Then I verify ADD FLIGHTS TO MY CALENDAR link
	
	  
    Scenario:To verify MMB open and close
        Given I navigate to ba and retrieve my booking in new beta pages
        Then I verify MMB menu is closed by default in MMB page
        And I open MMB menu
       
            
    Scenario: I verify ESTA message for USA travelers
        Given I navigate to ba and retrieve "passenger_1" booking in new beta pages
        Then I verify below ESTA/eTA header text
            | All passengers require a valid visa or ESTA to enter the USA |
        And I verify below ESTA/eTA link
            | Who should apply for an ESTA? |
        And I verify ESTA/eTA Message
            | An ESTA is the Electronic System for Travel Authorization. You should apply if you're a citizen of a country that participates in the Visa Waiver Program, and don't already have a valid visa. |
            | You must now apply no later than 72 hours before your flight's departure time. If you don't have an ESTA or valid visa you may not be able to board your flight to the USA.                     |

   
    

    

     
    

