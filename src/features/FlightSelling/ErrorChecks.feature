Feature: To verify Error messages while creating a commercial booking

    @ErrorCheckOnPassengerPage
    Scenario Outline: Error message is thrown on passenger page when age of young adult is not between 12-15 years
        Given I am planning commercial booking with "<Paxmix Type>"
        And I continue till Passenger page.
        Then I select age of young adult not between 12-15 years and error message "<AgeError>" is displayed
        Examples:
            | AgeError                                                                                                               | Paxmix Type |
            | A young adult should be at least 12 and under 16 on the date of departure but this passenger will be 16. Change search | 2A,1Y,1I,0C |

    @CVV_Errormessage_verify @Regression
    Scenario: Verify Error message display on Payment page if Incorrect security code
        Given I am planning commercial booking with "<Paxmix Type>"
        When I continue till Payment page
        And I enter incorrect security code details on the Payment page for card name "<cardName>"
        Then Error message for invalid security number details is displayed

        Examples:
            | cardName  | Paxmix Type |
            | CVV Error | 2A,1Y,1I,0C |

    @Address_Errormessage_verify_PaymentPage
    Scenario: Verify Error message display on Payment page if address not provided
        Given I am planning commercial booking with "<Paxmix Type>"
        When I continue till Payment page
        Then Error message "<AddressError>" for skipping address details is displayed

        Examples:
            | AddressError                 | Paxmix Type |
            | Please enter a valid address | 2A,1Y,1I,0C |

    @Postalcode_Errormessage_verify_PaymentPage
    Scenario: Verify Error message display on Payment page if Incorrect postal code
        Given I am planning commercial booking with "<Paxmix Type>"
        When  I continue till Payment page
        And   I enter invalid postal code details more than 10 digits on the Payment page
        Then  Error message "<PostalcodeError>" for invalid postalcode details is displayed

        Examples:
            | PostalcodeError               | Paxmix Type |
            | Please enter a valid postcode | 2A,1Y,1I,0C |

    @NumberOfPassengerError
    Scenario Outline: Correct error message displayed if number of passenger searched is more than 9
        Given I am on ba.com homepage
        Then I submit the search form with paxmix "5A,8C,8I,7Y"
        Then Correct error message "<NumberOfPassengerError>" should be displayed on plan your journey page
        Examples:
            | NumberOfPassengerError                                                                                                 |
            | Up to 9 customers can travel on one booking. This does not include infants. Find out more about group travel bookings. |

    @Missing_Card_Exp_ErrorMsg_verify_PaymentPage @Regression
    Scenario: Verify Error message display on Payment page if card expiry date is missing
        Given I am planning commercial booking with "One Adult"
        Then I continue till Payment page
        Then Error message "<CardExpiryError>" for Missing cardExpiryDate is displayed
        Examples:
            | CardExpiryError                   |
            | Enter a valid expiry date (MM/YY) | 

    @Verify_cards_available_for_payment_PaymentPage @Regression
    Scenario: Payment card type  images are shown when flying from / to low risk country
        Given I am planning commercial booking with "One Adult"
        And I continue till Payment page
        Then the payment card images "<Images>" displayed
        Examples:
            | Images                                                       |
            | Visa,Mastercard,Discover,Diners Club,American Express,PayPal |

    @Card_Errormessage_verify_PaymentPage_Type1
    Scenario: Verify Error message display on Payment page if card deatails not provided
        Given I am planning commercial booking with "One Adult"
        When I continue till Payment page
        Then Error message "<CardErrorType1>" for skipping card details is displayed
        Examples:
            | CardErrorType1       |
            | Enter a card number  |

    @Card_Errormessage_verify_PaymentPage_Type2
    Scenario: Verify Error message display on Payment page if card deatails not provided
        Given I am planning commercial booking with "One Adult"
        When I continue till Payment page
        And I enter incomplete card details on the Payment page for card name "<cardName>"
        Then Error message "<CardErrorType2>" for incomplete card details is displayed
        Examples:
            | CardErrorType2                   |cardName        |
            | Must contain at least 13 digits  |incompleteCardNo|

    @Card_Errormessage_verify_PaymentPage_Type3 @Regression
    Scenario: Verify Error message display on Payment page if card deatails not provided
        Given I am planning commercial booking with "One Adult"
        When I continue till Payment page
        And I enter invalid card details on the Payment page for card name "<cardName>"
        Then Error message "<CardErrorType3>" for invalid card details is displayed
        Examples:
            | CardErrorType3             |cardName        |
            | Enter a valid card number  |invalidCardNo   |   
    

