class flightSearchRequest {
  static flightSearchContext

  static setContext(flightSearchContext) {
    this.flightSearchContext = flightSearchContext
  }

  static getDefaultData() {
    return this.flightSearchContext
  }

  static setDefaultLongHaulOneWayJourneyLHRDEL() {
    return {
      depart: 'LHR',
      arrival: 'DEL',
      outbound: 62,
      inbound: 91,
      adult: 1,
      youngAdult: 0,
      child: 0,
      infant: 0,
      ticketType: 'Economy',
      operator: 'British Airways',
      cabinClass: 'Economy',
      flightType: 'Direct Flights',
      journeyType: 'oneway',
    }
  }
  static setDefaultLongHaulReturnJourneyLHRDEL() {
    return {
      depart: 'LHR',
      arrival: 'DEL',
      outbound: 62,
      inbound: 91,
      adult: 1,
      youngAdult: 0,
      child: 0,
      infant: 0,
      ticketType: 'Economy',
      operator: 'British Airways',
      cabinClass: 'Economy',
      flightType: 'Direct Flights',
      journeyType: 'return',
    }
  }
  static setDefaultShortHaulOneWayJourneyLHRCDG() {
    return {
      depart: 'LHR',
      arrival: 'CDG',
      outbound: 62,
      inbound: 91,
      adult: 1,
      youngAdult: 0,
      child: 0,
      infant: 0,
      ticketType: 'Economy',
      operator: 'British Airways',
      cabinClass: 'Economy',
      flightType: 'Direct Flights',
      journeyType: 'oneway',
    }
  }
  static setDefaultShortHaulReturnJourneyLHRCDG() {
    return {
      depart: 'LHR',
      arrival: 'CDG',
      outbound: 42,
      inbound: 60,
      adult: 1,
      youngAdult: 0,
      child: 0,
      infant: 0,
      ticketType: 'Economy',
      operator: 'British Airways',
      cabinClass: 'Economy',
      flightType: 'Direct Flights',
      journeyType: 'return',
    }
  }

  static setDefaultShortHaulOneWayFlexibleJourneyLHRCDG() {
    return {
      depart: 'LHR',
      arrival: 'CDG',
      outbound: 63,
      inbound: 92,
      adult: 1,
      youngAdult: 0,
      child: 0,
      infant: 0,
      ticketType: 'Economy',
      operator: 'British Airways',
      cabinClass: 'Economy Plus',
      flightType: 'Direct Flights',
      journeyType: 'oneway',
    }
  }

  static setDefaultLongHaulReturnUSJourneyLHRJFK() {
    return {
      depart: 'LHR',
      arrival: 'JFK',
      outbound: 35,
      inbound: 60,
      adult: 1,
      youngAdult: 0,
      child: 0,
      infant: 0,
      ticketType: 'Economy',
      operator: 'British Airways',
      cabinClass: 'Economy',
      flightType: 'Direct Flights',
      journeyType: 'return',
    }
  }

  static setDefaultLongHaulOneWayUSJourneyLHRJFK() {
    return {
      depart: 'LHR',
      arrival: 'JFK',
      outbound: 42,
      inbound: 82,
      adult: 1,
      youngAdult: 0,
      child: 0,
      infant: 0,
      ticketType: 'Economy',
      operator: 'British Airways',
      cabinClass: 'Economy',
      flightType: 'Direct Flights',
      journeyType: 'oneway',
    }
  }
  static setShortHaulReturnJourneyForLHRMAD() {
    return {
      depart: 'LHR',
      arrival: 'MAD',
      outbound: 90,
      inbound: 98,
      adult: 1,
      youngAdult: 0,
      child: 0,
      infant: 0,
      ticketType: 'Economy',
      operator: 'British Airways',
      cabinClass: 'Economy',
      flightType: 'Direct Flights',
      journeyType: 'return',
    }
  }
  static setLongHaulOneWayConnectingJourneyForDXBBOM() {
    return {
      depart: 'DXB',
      arrival: 'BOM',
      outbound: 25,
      inbound: 28,
      adult: 1,
      youngAdult: 0,
      child: 0,
      infant: 0,
      ticketType: 'Economy',
      operator: 'British Airways',
      cabinClass: 'Economy',
      flightType: 'Connecting flights',
      journeyType: 'oneway',
    }
  }
  static setLongHaulReturnConnectingJourneyForDXBBOM() {
    return {
      depart: 'DXB',
      arrival: 'BOM',
      outbound: 51,
      inbound: 56,
      adult: 1,
      youngAdult: 0,
      child: 0,
      infant: 0,
      ticketType: 'Economy',
      operator: 'British Airways',
      cabinClass: 'Economy',
      flightType: 'Connecting flights',
      journeyType: 'return',
    }
  }
  static setLongHaulReturnJourneyForLHRBOM() {
    return {
      depart: 'LHR',
      arrival: 'BOM',
      outbound: 33,
      inbound: 66,
      adult: 1,
      youngAdult: 0,
      child: 1,
      infant: 0,
      ticketType: 'Economy',
      operator: 'British Airways',
      cabinClass: 'Economy',
      flightType: 'Direct Flights',
      journeyType: 'return',
    }
  }
  static setLongHaulReturnJourneyForLHRKWI() {
    return {
      depart: 'KWI',
      arrival: 'LHR',
      outbound: 39,
      inbound: 45,
      adult: 1,
      youngAdult: 0,
      child: 0,
      infant: 0,
      ticketType: 'Economy',
      operator: 'British Airways',
      cabinClass: 'Economy',
      flightType: 'Direct Flights',
      journeyType: 'return',
    }
  }
  static setLongHaulOneWayConnectingJourneyForMANDEL() {
    return {
      depart: 'MAN',
      arrival: 'DEL',
      outbound: 114,
      inbound: 133,
      adult: 1,
      youngAdult: 0,
      child: 0,
      infant: 0,
      ticketType: 'Economy',
      operator: 'British Airways',
      cabinClass: 'Economy',
      flightType: 'Connecting flights',
      journeyType: 'oneway',
    }
  }
  static setShortHaulIberiaOneWayJourneyForBCNMAD() {
    return {
      depart: 'BCN',
      arrival: 'MAD',
      outbound: 60,
      inbound: 80,
      adult: 1,
      youngAdult: 0,
      child: 0,
      infant: 0,
      ticketType: 'Economy',
      operator: 'Iberia',
      cabinClass: 'Economy (Checked baggage)',
      flightType: 'Direct Flights',
      journeyType: 'oneway',
    }
  }
  static setShortHaulCityFlyerReturnJourneyForLCYIBZ() {
    return {
      depart: 'LCY',
      arrival: 'IBZ',
      outbound: 29,
      inbound: 50,
      adult: 1,
      youngAdult: 0,
      child: 0,
      infant: 0,
      ticketType: 'Business',
      operator: 'BA CityFlyer',
      cabinClass: 'Business',
      flightType: 'Direct Flights',
      journeyType: 'return',
    }
  }
  static setHighRiskOneWayJourneyForLHRACC() {
    return {
      depart: 'ACC',
      arrival: 'LHR',
      outbound: 50,
      inbound: 61,
      adult: 1,
      youngAdult: 0,
      child: 0,
      infant: 0,
      ticketType: 'Economy',
      operator: 'British Airways',
      cabinClass: 'Economy',
      flightType: 'Direct Flights',
      journeyType: 'return',
    }
  }
  static setLongHaulReturnJourneyForCORLHR() {
    return {
      depart: 'COR',
      arrival: 'LHR',
      outbound: 23,
      inbound: 24,
      adult: 1,
      youngAdult: 0,
      child: 0,
      infant: 0,
      ticketType: 'Economy',
      operator: ' LATAM AIRLINES PERU , Iberia ',
      cabinClass: 'Economy',
      flightType: 'Connecting flights',
      journeyType: 'connection combination oneway',
    }
  }
  static setLongHaulReturnJourneyForBOGLHR() {
    return {
      depart: 'BOG',
      arrival: 'LHR',
      outbound: 30,
      inbound: 45,
      adult: 1,
      youngAdult: 0,
      child: 0,
      infant: 0,
      ticketType: 'Economy',
      operator: 'Iberia',
      cabinClass: 'Business',
      flightType: 'Connecting flights',
      journeyType: 'oneway',
    }
  }
  static setLongHaulReturnJourneyForORKLHR() {
    return {
      depart: 'ORK',
      arrival: 'LHR',
      outbound: 31,
      inbound: 45,
      adult: 1,
      youngAdult: 0,
      child: 0,
      infant: 0,
      ticketType: 'Economy',
      operator: 'Aer Lingus',
      cabinClass: 'Economy (Checked baggage)',
      flightType: 'Direct Flights',
      journeyType: 'oneway',
    }
  }
  static setLongHaulReturnJourneyForJFKLHR() {
    return {
      depart: 'JFK',
      arrival: 'LHR',
      outbound: 40,
      inbound: 43,
      adult: 1,
      youngAdult: 0,
      child: 0,
      infant: 0,
      ticketType: 'Economy',
      operator: 'British Airways',
      cabinClass: 'Economy',
      flightType: 'Direct Flights',
      journeyType: 'return',
    }
  }
  static setShortHaulOneWayJourneyForLHRAMS() {
    return {
      depart: 'LHR',
      arrival: 'AMS',
      outbound: 42,
      inbound: 49,
      adult: 1,
      youngAdult: 1,
      child: 1,
      infant: 1,
      ticketType: 'Economy',
      operator: 'British Airways',
      cabinClass: 'Economy',
      flightType: 'Direct Flights',
      journeyType: 'oneway',
    }
  }
  static setLongHaulOneWayJourneyForLHRMAA() {
    return {
      depart: 'LHR',
      arrival: 'MAA',
      outbound: 45,
      inbound: 51,
      adult: 3,
      youngAdult: 0,
      child: 3,
      infant: 3,
      ticketType: 'Economy',
      operator: 'British Airways',
      cabinClass: 'Economy',
      flightType: 'Direct Flights',
      journeyType: 'oneway',
    }
  }
  static setLongHaulReturnJourneyForLHRSIN() {
    return {
      depart: 'LHR',
      arrival: 'SIN',
      outbound: 42,
      inbound: 48,
      adult: 1,
      youngAdult: 1,
      child: 0,
      infant: 0,
      ticketType: 'Economy',
      operator: 'British Airways',
      cabinClass: 'Economy',
      flightType: 'Direct Flights',
      journeyType: 'return',
    }
  }
  static setShortHaulConnectingOneWayJourneyForEDICDG() {
    return {
      depart: 'EDI',
      arrival: 'CDG',
      outbound: 42,
      inbound: 48,
      adult: 1,
      youngAdult: 0,
      child: 0,
      infant: 0,
      ticketType: 'Economy',
      operator: 'British Airways',
      cabinClass: 'Economy Plus',
      flightType: 'Connecting flights',
      journeyType: 'oneway',
    }
  }
  static setShortHaulConnectingReturnJourneyForEDICDG() {
    return {
      depart: 'EDI',
      arrival: 'CDG',
      outbound: 42,
      inbound: 48,
      adult: 1,
      youngAdult: 0,
      child: 0,
      infant: 0,
      ticketType: 'Economy',
      operator: 'British Airways',
      cabinClass: 'Economy Plus',
      flightType: 'Connecting flights',
      journeyType: 'return',
    }
  }
  static setShortHaulConnectingReturnJourneyForEDIMAD() {
    return {
      depart: 'EDI',
      arrival: 'MAD',
      outbound: 42,
      inbound: 48,
      adult: 1,
      youngAdult: 0,
      child: 0,
      infant: 0,
      ticketType: 'Economy',
      operator: 'British Airways',
      cabinClass: 'Economy',
      flightType: 'Connecting flights',
      journeyType: 'return',
    }
  }
  static setDefaultDomesticOneWayJourneyForLHREDI() {
    return {
      depart: 'LHR',
      arrival: 'EDI',
      outbound: 42,
      inbound: 48,
      adult: 1,
      youngAdult: 0,
      child: 0,
      infant: 0,
      ticketType: 'Economy',
      operator: 'British Airways',
      cabinClass: 'Economy',
      flightType: 'Direct Flights',
      journeyType: 'oneway',
    }
  }
  static setLongHaulReturnConnectingJourneyForLHRSYD() {
    return {
      depart: 'LHR',
      arrival: 'SYD',
      outbound: 14,
      inbound: 56,
      adult: 1,
      youngAdult: 0,
      child: 0,
      infant: 0,
      ticketType: 'Business',
      operator: ' British Airways , Qantas Airways Ltd ',
      cabinClass: 'Business',
      flightType: 'Connecting flights',
      journeyType: 'connection combination oneway',
    }
  }
  static setLongHaulReturnConnectingJourneyForEDIMAD() {
    return {
      depart: 'EDI',
      arrival: 'MAD',
      outbound: 24,
      inbound: 56,
      adult: 1,
      youngAdult: 0,
      child: 0,
      infant: 0,
      ticketType: 'Business',
      operator: ' British Airways , Iberia ',
      cabinClass: 'Business',
      flightType: 'Connecting flights',
      journeyType: 'connection combination oneway',
    }
  }
    
  static setLongHaulOneWayBusinessCabinJourneyForLHRMAA() {
    return {
      depart: 'LHR',
      arrival: 'MAA',
      outbound: 42,
      inbound: 51,
      adult: 3,
      youngAdult: 0,
      child: 3,
      infant: 3,
      ticketType: 'Business',
      operator: 'British Airways',
      cabinClass: 'Business',
      flightType: 'Direct Flights',
      journeyType: 'oneway',
    }
  }

  static setJourneyDetailsForTwoSegmentsDefault() {
    return {
      type: 'Complex',
      depart: {
        segmentOne: 'LHR',
        segmentTwo: 'CDG',
      },
      arrival: {
        segmentOne: 'CDG',
        segmentTwo: 'MAD',
      },
      multicityDate: {
        segmentOne: 30,
        segmentTwo: 35,
      },
      adult: 1,
      youngAdult: 0,
      child: 0,
      infant: 0,
      ticketType: 'Economy',
      operator: 'British Airways',
      cabin: 'Economy',
      flightType: 'Direct Flights',
      journeyType: 'oneway',
      routeLegs: 2,
    }
  }

  static setJourneyDetailsForThreeSegmentsDefault() {
    return {
      type: 'Complex',
      depart: {
        segmentOne: 'LHR',
        segmentTwo: 'CDG',
        segmentThree: 'MAD',
      },
      arrival: {
        segmentOne: 'CDG',
        segmentTwo: 'MAD',
        segmentThree: 'JFK',
      },
      multicityDate: {
        segmentOne: 30,
        segmentTwo: 35,
        segmentThree: 40,
      },
      adult: 1,
      youngAdult: 0,
      child: 0,
      infant: 0,
      ticketType: 'Economy',
      operator: 'British Airways',
      cabin: 'Economy',
      flightType: 'Direct Flights',
      journeyType: 'oneway',
      routeLegs: 3,
    }
  }

  static setJourneyDetailsForMulticity() {
    return {
      type: 'Complex',
      depart: {
        segmentOne: 'LHR',
        segmentTwo: 'CDG',
        segmentThree: 'MAD',
      },
      arrival: {
        segmentOne: 'CDG',
        segmentTwo: 'MAD',
        segmentThree: 'JFK',
      },
      multicityDate: {
        segmentOne: 30,
        segmentTwo: 35,
        segmentThree: 40,
      },
      adult: 3,
      youngAdult: 0,
      child: 0,
      infant: 0,
      ticketType: 'Economy',
      operator: 'British Airways',
      cabinClass: 'Economy',
      flightType: 'Direct Flights',
      journeyType: 'oneway',
      routeLegs: 3,
    }
  }

  static setJourneyDetailsTypeOfFlight() {
    return {
      type: "Complex",
      depart: {
        segmentOne: 'NCL',
        segmentTwo: 'LHR',
        segmentThree: 'CDG',
      },
      arrival: {
        segmentOne: 'LHR',
        segmentTwo: 'CDG',
        segmentThree: 'MAD',
      },
      multicityDate: {
        segmentOne: 28,
        segmentTwo: 33,
        segmentThree: 35,
      },
      adult: 1,
      youngAdult: 0,
      child: 0,
      infant: 0,
      ticketType: 'Economy',
      operator: 'British Airways',
      cabinClass: 'Economy',
      flightType: 'Direct Flights',
      journeyType: 'oneway',
      routeLegs: 3,
    }
  }

  static setJourneyDetailsForOpenJaw() {
    return {
      depart: {
        segmentOne: 'LHR',
        segmentTwo: 'MAD',
      },
      arrival: {
        segmentOne: 'CDG',
        segmentTwo: 'LHR',
      },
      multicityDate: {
        segmentOne: 28,
        segmentTwo: 33,
      },
      adult: 1,
      youngAdult: 0,
      child: 0,
      infant: 0,
      ticketType: 'Economy',
      operator: 'British Airways',
      cabinClass: 'Economy',
      flightType: 'Direct Flights',
      journeyType: 'oneway',
      routeLegs: 2,
    }
  }
    static setLongHaulReturnJourneyForLHRDEL() {
        return {
            depart: "LHR",
            arrival: "SIN",
            outbound: 42,
            inbound: 48,
            adult: 1,
            youngAdult: 1,
            child: 0,
            infant: 0,
            ticketType: "Economy Standard",
            operator: "British Airways",
            cabinClass: "Economy Standard",
            flightType: "Direct Flights",
            journeyType: "return"
        }
    }    
    static setDefaultLongHaulReturnJourneyMEXLHR() {
        return {
            depart: "MEX",
            arrival: "LHR",
            outbound: 62,
            inbound: 91,
            adult: 1,
            youngAdult: 0,
            child: 0,
            infant: 0,
            ticketType: "Economy",
            operator: "British Airways",
            cabinClass: "Economy",
            flightType: "Direct Flights",
            journeyType: "return"
        
        }
    }
    static setDefaultLongHaulReturnJourneyPremiumEconomyMEXLHR() {
        return {
            depart: "MEX",
            arrival: "LHR",
            outbound: 62,
            inbound: 91,
            adult: 1,
            youngAdult: 0,
            child: 0,
            infant: 0,
            ticketType: "Economy",
            operator: "British Airways",
            cabinClass: "Premium Economy",
            flightType: "Direct Flights",
            journeyType: "return"
        
        }
    }
    static setDefaultLongHaulReturnJourneyPremiumEconomyMEXLHR2Adults() {
        return {
            depart: "MEX",
            arrival: "LHR",
            outbound: 62,
            inbound: 94,
            adult: 2,
            youngAdult: 0,
            child: 0,
            infant: 0,
            ticketType: "Economy",
            operator: "British Airways",
            cabinClass: "Premium Economy",
            flightType: "Direct Flights",
            journeyType: "return"
        
        }
    }
    static setDefaultLongHaulReturnJourneyLHRDOH() {
      return {
          depart: "LHR",
          arrival: "DOH",
          outbound: 62,
          inbound: 91,
          adult: 1,
          youngAdult: 0,
          child: 0,
          infant: 0,
          ticketType: "Economy",
          operator: "Qantas Airlines",
          cabinClass: "Economy",
          flightType: "Direct Flights",
          journeyType: "return"
      
      }
  }
  static setDefaultLongHaulReturnJourneyMAAKUL() {
    return {
        depart: "MAA",
        arrival: "KUL",
        outbound: 62,
        inbound: 91,
        adult: 1,
        youngAdult: 0,
        child: 0,
        infant: 0,
        ticketType: "Economy",
        operator: "Malaysia Airlines",
        cabinClass: "Economy",
        flightType: "Direct Flights",
        journeyType: "return"
    
    }
}
static setDefaultLongHaulReturnJourneyLHRAMM() {
  return {
      depart: "LHR",
      arrival: "AMM",
      outbound: 62,
      inbound: 91,
      adult: 1,
      youngAdult: 0,
      child: 0,
      infant: 0,
      ticketType: "Economy",
      operator: "Royal Jordanian",
      cabinClass: "Economy",
      flightType: "Direct Flights",
      journeyType: "return"
  
  }
}
static setDefaultLongHaulReturnJourneyLHRCMB() {
  return {
      depart: "LHR",
      arrival: "CMB",
      outbound: 62,
      inbound: 91,
      adult: 1,
      youngAdult: 0,
      child: 0,
      infant: 0,
      ticketType: "Economy",
      operator: "SriLankan Airlines",
      cabinClass: "Economy",
      flightType: "Direct Flights",
      journeyType: "return"
  
  }
  
}
static setDefaultLongHaulOnewayJourneyLHREDI(){
  return {
    depart: "LHR",
    arrival: "EDI",
    outbound: 62,
    inbound: 91,
    adult: 1,
    youngAdult: 1,
    child: 0,
    infant: 1,
    ticketType: "Economy",
    operator: "British Airways",
    cabinClass: "Economy",
    flightType: "Direct Flights",
    journeyType: "oneway"

}
}
static setShortHaulPartnerAirlinesReturnJourneyForLHRMAD() {
  return {
    depart: 'LHR',
    arrival: 'MAD',
    outbound: 60,
    inbound: 64,
    adult: 1,
    youngAdult: 0,
    child: 0,
    infant: 0,
    ticketType: 'Economy',
    operator: 'British Airways,Iberia',
    cabinClass: 'Economy',
    flightType: 'Direct Flights',
    journeyType: 'return',
  }
}
  static setDefaultLongHaulReturnWorldTravellerJourneyMEXLHR() {
    return {
      depart: "MEX",
      arrival: "LHR",
      outbound: 62,
      inbound: 74,
      adult: 1,
      youngAdult: 0,
      child: 0,
      infant: 0,
      ticketType: "Economy",
      operator: "British Airways",
      cabinClass: "World Traveller Plus",
      flightType: "Direct Flights",
      journeyType: "return"
    }
  }

  static setJourneyDetailsForGhana() {
    return {
      depart: 'ACC',
      arrival: 'LHR',
      outbound: 30,
      inbound: 45,
      adult: 1,
      youngAdult: 0,
      child: 0,
      infant: 0,
      ticketType: 'Economy',
      operator: 'British Airways',
      cabinClass: 'Economy',
      flightType: 'Direct Flights',
      journeyType: 'return'
    }
  }

  static setDefaultLongHaulReturnJourneyLHRSIN() {
    return {
      depart: 'LHR',
      arrival: 'SIN',
      outbound: 30,
      inbound: 45,
      adult: 1,
      youngAdult: 0,
      child: 0,
      infant: 0,
      ticketType: 'Economy',
      operator: 'British Airways',
      cabinClass: 'Economy',
      flightType: 'Direct Flights',
      journeyType: 'return'
    }
  }
  static setLongHaulReturnJourneyForHNDLHR() {
    return {
      depart: 'HND',
      arrival: 'LHR',
      outbound: 25,
      inbound: 45,
      adult: 1,
      youngAdult: 0,
      child: 0,
      infant: 0,
      ticketType: 'Economy',
      operator: 'Japan Airlines',
      cabinClass: 'Economy (Checked baggage)',
      flightType: 'Direct Flights',
      journeyType: 'return',
    }
  }

  static setLongHaulReturnJourneyForLHRMAD() {
    return {
      depart: 'LHR',
      arrival: 'MAD',
      outbound: 80,
      inbound: 120,
      adult: 1,
      youngAdult: 0,
      child: 0,
      infant: 0,
      ticketType: 'Economy',
      operator: 'Iberia',
      cabinClass: 'Economy',
      flightType: 'Direct Flights',
      journeyType: 'return',
    }
  }
  static setLongHaulReturnJourneyForHELLHR() {
    return {
      depart: 'HEL',
      arrival: 'LHR',
      outbound: 25,
      inbound: 45,
      adult: 1,
      youngAdult: 0,
      child: 0,
      infant: 0,
      ticketType: 'Economy',
      operator: 'Finnair',
      cabinClass: 'Economy',
      flightType: 'Direct Flights',
      journeyType: 'return',
    }
  }

  static setJourneyDetailsForSurchargeCountryHELLHR() {
    return {
      depart: "HEL",
      arrival: "LHR",
      outbound: 62,
      inbound: 91,
      adult: 1,
      youngAdult: 0,
      child: 0,
      infant: 0,
      ticketType: "Economy",
      operator: "Finnair",
      cabinClass: "Economy (Checked baggage)",
      flightType: "Direct Flights",
      journeyType: "return"
    }
  }
  static setJourneyDetailsForHELLHR() {
    return {
      depart: "HEL",
      arrival: "LHR",
      outbound: 62,
      inbound: 91,
      adult: 1,
      youngAdult: 0,
      child: 0,
      infant: 0,
      ticketType: "Economy",
      operator: "Finnair",
      cabinClass: "Economy",
      flightType: "Direct Flights",
      journeyType: "return"
    }
  }

  static setJourneyDetailsForSFOLHRSFO() {
    return {
      depart: "SFO",
      arrival: "LHR",
      outbound: 62,
      inbound: 91,
      adult: 1,
      youngAdult: 0,
      child: 0,
      infant: 0,
      ticketType: "Economy",
      operator: "British Airways",
      cabinClass: "Economy",
      flightType: "Direct Flights",
      journeyType: "return"
    }
  }
  static setJourneyDetailsForSurchargeCountryTYOLHR() {
    return {
      depart: "TYO",
      arrival: "LHR",
      outbound: 62,
      inbound: 91,
      adult: 1,
      youngAdult: 0,
      child: 0,
      infant: 0,
      ticketType: "Economy",
      operator: "Japan Airlines",
      cabinClass: "Economy",
      flightType: "Direct Flights",
      journeyType: "return"
    }
  }
  static setLongHaulReturnJourneyForZCOLHR() {
    return {
      depart: "ZCO",
      arrival: "LHR",
      outbound: 62,
      inbound: 91,
      adult: 1,
      youngAdult: 0,
      child: 0,
      infant: 0,
      ticketType: "Economy",
      operator: "Latam Airlines Group",
      cabinClass: "Economy",
      flightType: "Direct Flights",
      journeyType: "return"
    }
  }
  static setLongHaulReturnJourneyForLHRDOH() {
    return {
      depart: "LHR",
      arrival: "DOH",
      outbound: 62,
      inbound: 91,
      adult: 1,
      youngAdult: 0,
      child: 0,
      infant: 0,
      ticketType: "Economy",
      operator: "Qatar Airways",
      cabinClass: "Economy (Checked baggage)",
      flightType: "Direct Flights",
      journeyType: "return"
    }
  }
  static setDefaultReturnJourneyLHRJFK() {
    return {
      depart: 'LHR',
      arrival: 'JFK',
      outbound: 28,
      inbound: 63,
      adult: 1,
      youngAdult: 0,
      child: 0,
      infant: 0,
      ticketType: 'Economy',
      operator: 'British Airways',
      cabinClass: 'World Traveller Plus',
      flightType: 'Direct Flights',
      journeyType: 'return',
    }
  }
  static setDefaultShortHaulJourneyCompVoucherLHRCDG() {
    return {
      depart: 'LHR',
      arrival: 'CDG',
      outbound: 62,
      inbound: 91,
      adult: 2,
      youngAdult: 0,
      child: 0,
      infant: 0,
      ticketType: 'Economy',
      operator: 'British Airways',
      cabinClass: 'Economy',
      flightType: 'Direct Flights',
      journeyType: 'oneway',
    }
  }  static setDefaultLongHaulReturnJourneyHELLHR() {
    return {
        depart: "HEL",
        arrival: "LHR",
        outbound: 62,
        inbound: 91,
        adult: 1,
        youngAdult: 0,
        child: 0,
        infant: 0,
        ticketType: "Economy",
        operator: "Finnair",
        cabinClass: "Economy",
        flightType: "Direct Flights",
        journeyType: "return"
    
    }
}
static setShortHaulCityFlyerOneWayJourneyForLCYEDI() {
    return {
      depart: "LCY",
      arrival: "EDI",
      outbound: 41,
      inbound: 60,
      adult: 1,
      youngAdult: 0,
      child: 0,
      infant: 0,
      ticketType: "Economy",
      operator: "BA CityFlyer",
      cabinClass: "Economy",
      flightType: "Direct Flights",
      journeyType: "oneway"
    }
  }
static setLongHaulReturnConnectingJourneyForEDIJFK() {
    return {
      depart: "EDI",
      arrival: "JFK",
      outbound: 42,
      inbound: 82,
      adult: 1,
      youngAdult: 0,
      child: 0,
      infant: 0,
      ticketType: "Economy",
      operator: "British Airways,British Airways",
      cabinClass: "Economy",
      flightType: "Connecting Flights",
      journeyType: "connection return"
    }
  }
  static setDefaultCityFlyerConnectingReturnJourneyForVIEEDI() {
    return {
      depart: "VIE",
      arrival: "EDI",
      outbound: 41,
      inbound: 82,
      adult: 1,
      youngAdult: 0,
      child: 0,
      infant: 0,
      ticketType: "Economy",
      operator: "British Airways,BA CityFlyer",
      cabinClass: "Economy",
      flightType: "Connecting Flights",
      journeyType: "connection combination return"
    }
  }
}
module.exports = flightSearchRequest
