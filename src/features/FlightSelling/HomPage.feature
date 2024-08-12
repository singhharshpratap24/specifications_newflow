Feature: Contains scenarios to check for the availability of all the UI Elements in booking section on homepage

   @homepage_assertions_booking_section_radio
   Scenario Outline: Check availability of all search type options under flight search section on BA.com homepage

      Given I am on ba.com homepage
      When  I see booking section on homepage
      Then  all the options "<options>" must be available

      Examples:
         | options                                      |
         | Flight,Flight + Hotel,Flight + Car,Hotel,Car |

   @homepage_assertions_booking_section
   Scenario Outline: Check availability of all flight search options under booking section on BA.com homepage

      Given I am on ba.com homepage
      When  I see booking section on homepage
      Then  fields "<fields>" must be available
      Examples:
         | fields                                             |
         | Fare,From,To,Depart,Return,Travel class,Passengers |

   @homepage_assertions_links_booking_section
   Scenario Outline: Check availability of links under booking section on BA.com homepage

      Given I am on ba.com homepage
      When  I see booking section on homepage
      Then  links "<links>" should be available
      Examples:
         | links                                     |
         | Looking for more stops?,Need inspiration? |

   @VerifyEditSearchPaxCount @Regression
   Scenario Outline: Edit search pop up displays same passenger paxmix as selected on home page
      Given I book my journey on "<Route>" in "<Cabin>" with "<Paxmix Type>"
      When I Click Edit Search option on Flight Selection page
      Then Edit search pop up displays
      And correct paxmix is displayed
      Examples:
         | Route       | Cabin   | Paxmix Type  |
         | LHR-SIN-LHR | Economy | 1A,2C,0I,3YA |
