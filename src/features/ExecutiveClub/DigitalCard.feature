Feature: Digital Card options

Scenario Outline: Newly enrolled "<member type>" can order this "<Option>" executive club item successfully
  Given A newly enrolled EC member logged in to my account "<member type>"
  When Navigate to Executive Club Items
  And I choose "<Option>" on a blue tier card image
  Then The correct "<Option>" page is displayed

@DigitalcardsoptionsBlueSpainPrintCopyTest-bacom_executiveClubSellingWeb
Examples:
  | Option                              | member type |
  | Print a copy of my membership card  | Spain Blue  |

@DigitalcardsoptionsBlueSpainReceiveEmailTest-bacom_executiveClubSellingWeb @Regression
Examples:
  | Option                              | member type |
  | Receive my membership card by email | Spain Blue  |

@DigitalcardsoptionsBlueSpainDownloadCardTest-bacom_executiveClubSellingWeb @Regression
Examples:
  | Option                                             | member type |
  | Download the BA app and my digital membership card | Spain Blue  |

@DigitalcardsoptionsBlueSpainNewMembershipTest-bacom_executiveClubSellingWeb
Examples:
  | Option                            | member type |
  | Save a copy of my membership card | Spain Blue  |

