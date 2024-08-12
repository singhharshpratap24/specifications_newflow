Feature: Generate PNR

    @PNRGeneration
    Scenario: Generate PNR for cases uploaded in excel
        Given Authentication API call with "Gold" member
        When Data is Fetched from Excel with "<TestCaseName>"
        And All Api calls are hit
        Then Write PNR into Excel row

        Examples:
            | TestCaseName                               |
            | purchase_XSB_MultipleE_TicketABCTest       |
            | MMBContactDetailsSectionDataValidationTest |
            | Connecting_FLights                         |
            | 4                                          |