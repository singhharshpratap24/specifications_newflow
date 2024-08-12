Feature: Donations

	@doanationsFixed @Regression
	Scenario Outline: As a Ba.com customer I should be able to add charity Donation to my booking.
		Given I am planning commercial booking with "<Paxmix Type>"
		And I continue till Payment page
		When I select "BA Better World" donation
		Then charity donation amount is added total price.

		Examples:
			| Paxmix Type |
			| 2A,1Y,1I,0C |

	@donationNoThanks @Regression
	Scenario: As A Ba.com customer I should be able to remove charity donation if aleardy selected
		Given I am on Payment page having  "BA Better World" charity donation already selected with "<Paxmix Type>"
		When I select "No thanks" option for BA Better World charity donation
		Then the donation is removed from journey

		Examples:
			| Paxmix Type |
			| 1A,0Y,0I,0C |

	@VerifyCarbonDonationOnHoldBookingTest @Regression
	Scenario Outline: As a ba.com customer, I should be allowed to purchase a BA Better World Donation while held purchase booking
 		Given I am planning commercial booking with "One Adult"
        And I complete held booking with "<cardName>"
		When I select "BA Better World" option for BA Better World charity donation
		Then the selected charity donation amount should be shown along with the booking amount
		And I proceed till Confirmation page for Hold booking with BA Better World donation completed successfully
		
		Examples: 
		| cardName |
 		| VISA DEBIT |

		