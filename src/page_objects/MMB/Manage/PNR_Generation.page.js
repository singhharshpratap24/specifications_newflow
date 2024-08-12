const { assert, expect } = require('chai')
const ExecutiveClubMemberHelper = require('../../../models/ExecutiveClubMemberHelper.json');
const axios = require('axios');
const qs = require('qs');
const fs = require('fs');
const logger = require("../../../setup/PNR_API_Logger");
const { Logger } = require('winston');

const client_applicationName = 'ba.com';
const client_organisation = 'BA';
const ConnectionState = 'keep-alive';
const ba_deviceType = 'DESKTOP';
const api_context = 'https://' + process.env.NODE_ENV + '/api/sc4';
var basketID;
var bid;
var basketQuoteResponse;
var accessToken;
var refreshToken;
var OutboundResponse = {};
var InboundResponse = {};
var ConnectingResponse = {};

class APIcalls {
    static PNRData = [];
    async authcall(ecMember) {
        let user = ExecutiveClubMemberHelper.userType[ecMember];
        const payload = {
            grant_type: 'password',
            username: user.username,
            password: user.password,
        };

        try {
            const response = await axios.post('https://' + process.env.NODE_ENV + '/api/grant', qs.stringify(payload), {
                headers: {
                    Authorization: `Client client_id="bacomng>prl"`,
                    connection: ConnectionState
                },
                body: {
                    grant_type: 'password',
                    username: user.username,
                    password: user.password,
                },
                form: true,
            });
            accessToken = response.data.access_token;
            refreshToken = response.data.refresh_token;
            // logger.info('---------------------ACCESS TOKEN------------------------------\n\n' + accessToken);
            // logger.info('---------------------REFRESH TOKEN------------------------------\n\n' + refreshToken);
        }
        catch {
            logger.error('Error in Authentication call API');
        }
    }

    async OutBound_InBoundApiCall(depDate, depAirport, CarrierCode, arrivalAirport, FlightNumber, type) {
        // logger.info(depDate, depAirport, CarrierCode, arrivalAirport, FlightNumber, type)
        try {
            var response = await axios.get('https://' + process.env.NODE_ENV + '/api/sc4/fli-cfm/rs/v2/flights/summaries;departureDateTime=' + depDate + ';departureAirportCode=' + depAirport + ';marketingCarrierCode=' + CarrierCode + ';marketingFlightNumber=' + FlightNumber + ';arrivalAirportCode=' + arrivalAirport, {
                headers: {
                    Authorization: 'Bearer ' + accessToken,
                    connection: ConnectionState,
                    ba_client_sessionId: refreshToken,
                    ba_client_applicationName: client_applicationName,
                    ba_client_organisation: client_organisation,
                    ba_api_context: api_context
                }
            });
            if (type === 'OutBound') {
                OutboundResponse = response.data;
                // logger.info('----------------OUTBOUND RESPONSE---------------------\n\n' + JSON.stringify(OutboundResponse))
            }

            else if (type === 'InBound') {
                InboundResponse = response.data;
                // logger.info('----------------INBOUND RESPONSE---------------------\n\n' + JSON.stringify(InboundResponse))
            }
            else if (type === 'Connecting') {
                ConnectingResponse = response.data;
                // logger.info('----------------Connecting RESPONSE---------------------\n\n' + JSON.stringify(ConnectingResponse))
            }
        }
        catch {
            logger.error('Error in outbound/Inbound call API');
        }
    }

    async CreateBasketTokenAPIcall(AdultCount, Scenario) {

        if (Scenario === 'TwoWay') {
            var payload = {
                passengerCount: [
                    {
                        passengerType: "ADULT",
                        count: AdultCount
                    }
                ],
                originAndDestinations: [
                    {
                        originDestinationId: 1,
                        segments: [
                            {
                                operatingCarrierCode: OutboundResponse.marketingCarrierCode,
                                operatingCarrier: OutboundResponse.marketingCarrier,
                                originCity: OutboundResponse.originCity,
                                originAirport: OutboundResponse.originAirport,
                                originAirportName: OutboundResponse.originAirportName,
                                originTerminal: OutboundResponse.originTerminal,
                                destinationCity: OutboundResponse.destinationCity,
                                destinationAirport: OutboundResponse.destinationAirport,
                                destinationAirportName: OutboundResponse.destinationAirportName,
                                destinationTerminal: OutboundResponse.destinationTerminal
                            }
                        ]
                    },
                    {
                        originDestinationId: 2,
                        segments: [
                            {
                                operatingCarrierCode: InboundResponse.marketingCarrierCode,
                                operatingCarrier: InboundResponse.marketingCarrier,
                                originCity: InboundResponse.originCity,
                                originAirport: InboundResponse.originAirport,
                                originAirportName: InboundResponse.originAirportName,
                                originTerminal: InboundResponse.originTerminal,
                                destinationCity: InboundResponse.destinationCity,
                                destinationAirport: InboundResponse.destinationAirport,
                                destinationAirportName: InboundResponse.destinationAirportName,
                                destinationTerminal: InboundResponse.destinationTerminal
                            }
                        ]
                    }
                ],
                availabilityEngine: "FlexPricer",
                functionalArea: "FLIGHTSELECTION",
                cugBasket: false,
                type: "[Core Basket] Create Basket"
            };
        }

        else if (Scenario === 'OneWay') {
            var payload = {
                passengerCount: [
                    {
                        passengerType: "ADULT",
                        count: AdultCount
                    }
                ],
                originAndDestinations: [
                    {
                        originDestinationId: 1,
                        segments: [
                            {
                                operatingCarrierCode: OutboundResponse.marketingCarrierCode,
                                operatingCarrier: OutboundResponse.marketingCarrier,
                                originCity: OutboundResponse.originCity,
                                originAirport: OutboundResponse.originAirport,
                                originAirportName: OutboundResponse.originAirportName,
                                originTerminal: OutboundResponse.originTerminal,
                                destinationCity: OutboundResponse.destinationCity,
                                destinationAirport: OutboundResponse.destinationAirport,
                                destinationAirportName: OutboundResponse.destinationAirportName,
                                destinationTerminal: OutboundResponse.destinationTerminal
                            }
                        ]
                    }
                ],
                availabilityEngine: "FlexPricer",
                functionalArea: "FLIGHTSELECTION",
                cugBasket: false,
                type: "[Core Basket] Create Basket"
            };
        }
        else if (Scenario === 'Connecting') {
            var payload = {
                passengerCount: [
                    {
                        passengerType: "ADULT",
                        count: AdultCount
                    }
                ],
                originAndDestinations: [
                    {
                        originDestinationId: 1,
                        segments: [
                            {
                                operatingCarrierCode: OutboundResponse.marketingCarrierCode,
                                operatingCarrier: OutboundResponse.marketingCarrier,
                                originCity: OutboundResponse.originCity,
                                originAirport: OutboundResponse.originAirport,
                                originAirportName: OutboundResponse.originAirportName,
                                originTerminal: OutboundResponse.originTerminal,
                                destinationCity: OutboundResponse.destinationCity,
                                destinationAirport: OutboundResponse.destinationAirport,
                                destinationAirportName: OutboundResponse.destinationAirportName,
                                destinationTerminal: OutboundResponse.destinationTerminal
                            }
                        ]
                    },
                    {
                        originDestinationId: 2,
                        segments: [
                            {
                                operatingCarrierCode: InboundResponse.marketingCarrierCode,
                                operatingCarrier: InboundResponse.marketingCarrier,
                                originCity: InboundResponse.originCity,
                                originAirport: InboundResponse.originAirport,
                                originAirportName: InboundResponse.originAirportName,
                                originTerminal: InboundResponse.originTerminal,
                                destinationCity: InboundResponse.destinationCity,
                                destinationAirport: InboundResponse.destinationAirport,
                                destinationAirportName: InboundResponse.destinationAirportName,
                                destinationTerminal: InboundResponse.destinationTerminal
                            }
                        ]
                    },
                    {
                        originDestinationId: 3,
                        segments: [
                            {
                                operatingCarrierCode: ConnectingResponse.marketingCarrierCode,
                                operatingCarrier: ConnectingResponse.marketingCarrier,
                                originCity: ConnectingResponse.originCity,
                                originAirport: ConnectingResponse.originAirport,
                                originAirportName: ConnectingResponse.originAirportName,
                                originTerminal: ConnectingResponse.originTerminal,
                                destinationCity: ConnectingResponse.destinationCity,
                                destinationAirport: ConnectingResponse.destinationAirport,
                                destinationAirportName: ConnectingResponse.destinationAirportName,
                                destinationTerminal: ConnectingResponse.destinationTerminal
                            }
                        ]
                    }
                ],
                availabilityEngine: "FlexPricer",
                functionalArea: "FLIGHTSELECTION",
                cugBasket: false,
                type: "[Core Basket] Create Basket"
            };
        }

        try {
            const response = await axios.post('https://' + process.env.NODE_ENV + '/api/sc4/sse-sbkm/rs/v2/customers/baskets', payload, {
                headers: {
                    Authorization: 'Bearer ' + accessToken,
                    connection: ConnectionState,
                    ba_client_sessionId: refreshToken,
                    ba_client_applicationName: client_applicationName,
                    ba_client_organisation: client_organisation,
                    ba_api_context: api_context
                }
            });
            basketID = response.headers.location;
            bid = basketID.slice(-12);
            // logger.info('-----------------BASKET TOKEN-------------------\n\n' + basketID)
        }
        catch {
            logger.error('Error in create basket token API');
        }
    }

    async BasketQuotesApiCall(CabinCode, AdultCount, Scenario) {
        const request = basketID + '/quotes'

        if (Scenario === 'TwoWay') {
            var payload = {
                passengerCount: [
                    {
                        passengerType: "ADULT",
                        count: AdultCount
                    }
                ],
                originAndDestinations: [
                    {
                        originDestinationId: 1,
                        segments: [
                            {
                                marketingCarrierCode: OutboundResponse.marketingCarrierCode,
                                marketingFlightNumber: OutboundResponse.marketingFlightNumber,
                                originAirport: OutboundResponse.originAirport,
                                destinationAirport: OutboundResponse.destinationAirport,
                                departureDateTime: OutboundResponse.originDepartureDateTime,
                                arrivalDateTime: OutboundResponse.destinationArrivalDateTime,
                                cabinCode: CabinCode,
                                sellingClass: 'Y',
                                handBaggageOnlyFare: true,
                                fareBreakPoint: true
                            }
                        ]
                    },
                    {
                        originDestinationId: 2,
                        segments: [
                            {
                                marketingCarrierCode: InboundResponse.marketingCarrierCode,
                                marketingFlightNumber: InboundResponse.marketingFlightNumber,
                                originAirport: InboundResponse.originAirport,
                                destinationAirport: InboundResponse.destinationAirport,
                                departureDateTime: InboundResponse.originDepartureDateTime,
                                arrivalDateTime: InboundResponse.destinationArrivalDateTime,
                                cabinCode: CabinCode,
                                sellingClass: 'Y',
                                handBaggageOnlyFare: true,
                                fareBreakPoint: true
                            }
                        ]
                    }
                ],
                availabilityEngine: "FlexPricer",
                functionalArea: "FLIGHTSELECTION",
                cugBasket: false,
                type: "[Core Basket] Create Basket"
            }
        }
        else if (Scenario === 'OneWay') {
            var payload = {
                passengerCount: [
                    {
                        passengerType: "ADULT",
                        count: AdultCount
                    }
                ],
                originAndDestinations: [
                    {
                        originDestinationId: 1,
                        segments: [
                            {
                                marketingCarrierCode: OutboundResponse.marketingCarrierCode,
                                marketingFlightNumber: OutboundResponse.marketingFlightNumber,
                                originAirport: OutboundResponse.originAirport,
                                destinationAirport: OutboundResponse.destinationAirport,
                                departureDateTime: OutboundResponse.originDepartureDateTime,
                                arrivalDateTime: OutboundResponse.destinationArrivalDateTime,
                                cabinCode: CabinCode,
                                sellingClass: 'Y',
                                handBaggageOnlyFare: true,
                                fareBreakPoint: true
                            }
                        ]
                    }
                ],
                availabilityEngine: "FlexPricer",
                functionalArea: "FLIGHTSELECTION",
                cugBasket: false,
                type: "[Core Basket] Create Basket"
            }
        }
        if (Scenario === 'Connecting') {
            var payload = {
                passengerCount: [
                    {
                        passengerType: "ADULT",
                        count: AdultCount
                    }
                ],
                originAndDestinations: [
                    {
                        originDestinationId: 1,
                        segments: [
                            {
                                marketingCarrierCode: OutboundResponse.marketingCarrierCode,
                                marketingFlightNumber: OutboundResponse.marketingFlightNumber,
                                originAirport: OutboundResponse.originAirport,
                                destinationAirport: OutboundResponse.destinationAirport,
                                departureDateTime: OutboundResponse.originDepartureDateTime,
                                arrivalDateTime: OutboundResponse.destinationArrivalDateTime,
                                cabinCode: CabinCode,
                                sellingClass: 'Y',
                                handBaggageOnlyFare: true,
                                fareBreakPoint: true
                            }
                        ]
                    },
                    {
                        originDestinationId: 2,
                        segments: [
                            {
                                marketingCarrierCode: InboundResponse.marketingCarrierCode,
                                marketingFlightNumber: InboundResponse.marketingFlightNumber,
                                originAirport: InboundResponse.originAirport,
                                destinationAirport: InboundResponse.destinationAirport,
                                departureDateTime: InboundResponse.originDepartureDateTime,
                                arrivalDateTime: InboundResponse.destinationArrivalDateTime,
                                cabinCode: CabinCode,
                                sellingClass: 'Y',
                                handBaggageOnlyFare: true,
                                fareBreakPoint: true
                            }
                        ]
                    },
                    {
                        originDestinationId: 3,
                        segments: [
                            {
                                marketingCarrierCode: ConnectingResponse.marketingCarrierCode,
                                marketingFlightNumber: ConnectingResponse.marketingFlightNumber,
                                originAirport: ConnectingResponse.originAirport,
                                destinationAirport: ConnectingResponse.destinationAirport,
                                departureDateTime: ConnectingResponse.originDepartureDateTime,
                                arrivalDateTime: ConnectingResponse.destinationArrivalDateTime,
                                cabinCode: CabinCode,
                                sellingClass: 'Y',
                                handBaggageOnlyFare: true,
                                fareBreakPoint: true
                            }
                        ]
                    }
                ],
                availabilityEngine: "FlexPricer",
                functionalArea: "FLIGHTSELECTION",
                cugBasket: false,
                type: "[Core Basket] Create Basket"
            }
        }
        const allHeaders = {
            Authorization: 'Bearer ' + accessToken,
            connection: ConnectionState,
            ba_client_sessionId: refreshToken,
            ba_client_applicationName: client_applicationName,
            ba_client_organisation: client_organisation,
            ba_api_context: api_context,
            ba_integrity_disabled: true
        }

        try {
            const response = await axios.put(request, payload, {
                headers: allHeaders,
            }).then(response => response);

            // logger.info('-----------------BASKET QUOTE-------------------\n\n' + JSON.stringify(response.data))
            basketQuoteResponse = response.data;
        }
        catch {
            logger.error('Error in create basket quote API');
        }
    }

    async PaymentAndConfirmationCall(Scenario, AdultCount, FirstName, LastName, eMAIL, OriginCountry, CardNumber, CardType, CardExpiryMonth, CardExpiryYear, CardCSC) {
        var request = 'https://' + process.env.NODE_ENV + '/api/sc4/orm-obk/rs/v1/orders;bid=' + bid + '?locale=en_GB';

        var feesJson = basketQuoteResponse.fare[0].fees[0];
        feesJson['feeType'] = 'YQ';
        feesJson = [feesJson];
        if (Scenario === 'TwoWay') {
            var payload = {
                "basket": {
                    "availabilityEngine": "FlexPricer",
                    "cugBasket": false,
                    "flight": {
                        "fares": [
                            {
                                "baseFare": `${basketQuoteResponse.fare[0].baseFare}`,
                                "currencyCode": basketQuoteResponse.currencyCode,
                                "tax": basketQuoteResponse.fare[0].taxes,
                                "fee": feesJson,
                                "passengerType": basketQuoteResponse.fare[0].passengerType,
                                "totalFare": {
                                    "amount": `${basketQuoteResponse.fareTotal}`,
                                    "currencyCode": basketQuoteResponse.currencyCode
                                }
                            }
                        ],
                        "originAndDestinations": [
                            {
                                "originDestinationId": 1,
                                "segments": [
                                    {
                                        "arrivalDateTime": basketQuoteResponse.segments[0].arrivalDateTime,
                                        "baggageAllowance": [
                                            {
                                                "count": 0,
                                                "passengerType": basketQuoteResponse.fare[0].passengerType,
                                                "weight": 0
                                            }
                                        ],
                                        "cabinCode": basketQuoteResponse.segments[0].cabinCode,
                                        "departureDateTime": basketQuoteResponse.segments[0].departureDateTime,
                                        "destinationAirport": basketQuoteResponse.segments[0].destinationAirport,
                                        "fareBasisCodes": [
                                            {
                                                "fareBasisCode": basketQuoteResponse.segments[0].fareBasisCode,
                                                "passengerType": basketQuoteResponse.fare[0].passengerType
                                            }
                                        ],
                                        "fareBreakPoint": true,
                                        "handBaggageOnlyFare": true,
                                        "marketingCarrierCode": basketQuoteResponse.segments[0].carrierCode,
                                        "marketingFlightNumber": basketQuoteResponse.segments[0].flightNumber,
                                        "originAirport": basketQuoteResponse.segments[0].originAirport,
                                        "segmentId": "1000000",
                                        "sellingClass": basketQuoteResponse.segments[0].sellingClass
                                    }
                                ]
                            },
                            {
                                "originDestinationId": 2,
                                "segments": [
                                    {
                                        "arrivalDateTime": basketQuoteResponse.segments[1].arrivalDateTime,
                                        "baggageAllowance": [
                                            {
                                                "count": 0,
                                                "passengerType": basketQuoteResponse.fare[0].passengerType,
                                                "weight": 0
                                            }
                                        ],
                                        "cabinCode": basketQuoteResponse.segments[0].cabinCode,
                                        "departureDateTime": basketQuoteResponse.segments[1].departureDateTime,
                                        "destinationAirport": basketQuoteResponse.segments[1].destinationAirport,
                                        "fareBasisCodes": [
                                            {
                                                "fareBasisCode": basketQuoteResponse.segments[1].fareBasisCode,
                                                "passengerType": basketQuoteResponse.fare[0].passengerType
                                            }
                                        ],
                                        "fareBreakPoint": true,
                                        "handBaggageOnlyFare": true,
                                        "marketingCarrierCode": basketQuoteResponse.segments[0].carrierCode,
                                        "marketingFlightNumber": basketQuoteResponse.segments[1].flightNumber,
                                        "originAirport": basketQuoteResponse.segments[1].originAirport,
                                        "segmentId": "1000010",
                                        "sellingClass": basketQuoteResponse.segments[1].sellingClass
                                    }
                                ]
                            }
                        ],
                        "passengerCount": [
                            {
                                "count": AdultCount,
                                "passengerType": basketQuoteResponse.fare[0].passengerType
                            }
                        ],
                        "selectedTicketType": "LOWEST"
                    },
                    "isLowAvailability": false,
                    "lastQuoted": basketQuoteResponse.lastQuoted,
                    "passengers": [
                        {
                            "gender": "Male",
                            "id": "100000000001",
                            "name": FirstName + ' ' + LastName,
                            "nameWithTitle": 'Mr ' + FirstName + ' ' + LastName,
                            "passengerData": {
                                "contactDetails": {
                                    "email": eMAIL,
                                    "phone": "+44 11111111111"
                                },
                                "dateOfBirth": "1995-03-27",
                                "firstName": FirstName,
                                "gender": "Male",
                                "lastName": LastName,
                                "title": "Mr",
                                "type": basketQuoteResponse.fare[0].passengerType
                            },
                            "type": basketQuoteResponse.fare[0].passengerType,
                            "updatePending": false
                        }
                    ],
                    "quote": {
                        "price": {
                            "amount": `${basketQuoteResponse.fareTotal}`,
                            "currency": basketQuoteResponse.currencyCode
                        }
                    }
                },
                "billingAddress": {
                    "line1": "qwerty",
                    "line2": "qwerty",
                    "postalCode": "123456"
                },
                "billingCountry": OriginCountry,
                "cardDetails": {
                    "csc": `${CardCSC}`,
                    "customerReference": null,
                    "expiryDate": `${CardExpiryMonth + '/' + CardExpiryYear}`,
                    "name": 'Mr ' + FirstName + ' ' + LastName,
                    "number": `${CardNumber}`,
                    "type": CardType
                },
                "payer": {
                    "email": eMAIL,
                    "firstName": FirstName,
                    "lastName": LastName,
                    "title": "Mr"
                },
                "paymentMethod": "Card",
                "type": "[Core Basket] Create Standard Booking by Card",
                "validatePaymentMethodOperation": "VALIDATE_NEW_CARD"
            }
        }

        else if (Scenario === 'OneWay') {
            var payload = {
                "basket": {
                    "availabilityEngine": "FlexPricer",
                    "cugBasket": false,
                    "flight": {
                        "fares": [
                            {
                                "baseFare": `${basketQuoteResponse.fare[0].baseFare}`,
                                "currencyCode": basketQuoteResponse.currencyCode,
                                "tax": basketQuoteResponse.fare[0].taxes,
                                "fee": feesJson,
                                "passengerType": basketQuoteResponse.fare[0].passengerType,
                                "totalFare": {
                                    "amount": `${basketQuoteResponse.fareTotal}`,
                                    "currencyCode": basketQuoteResponse.currencyCode
                                }
                            }
                        ],
                        "originAndDestinations": [
                            {
                                "originDestinationId": 1,
                                "segments": [
                                    {
                                        "arrivalDateTime": basketQuoteResponse.segments[0].arrivalDateTime,
                                        "baggageAllowance": [
                                            {
                                                "count": 0,
                                                "passengerType": basketQuoteResponse.fare[0].passengerType,
                                                "weight": 0
                                            }
                                        ],
                                        "cabinCode": basketQuoteResponse.segments[0].cabinCode,
                                        "departureDateTime": basketQuoteResponse.segments[0].departureDateTime,
                                        "destinationAirport": basketQuoteResponse.segments[0].destinationAirport,
                                        "fareBasisCodes": [
                                            {
                                                "fareBasisCode": basketQuoteResponse.segments[0].fareBasisCode,
                                                "passengerType": basketQuoteResponse.fare[0].passengerType
                                            }
                                        ],
                                        "fareBreakPoint": true,
                                        "handBaggageOnlyFare": true,
                                        "marketingCarrierCode": basketQuoteResponse.segments[0].carrierCode,
                                        "marketingFlightNumber": basketQuoteResponse.segments[0].flightNumber,
                                        "originAirport": basketQuoteResponse.segments[0].originAirport,
                                        "segmentId": "1000000",
                                        "sellingClass": basketQuoteResponse.segments[0].sellingClass
                                    }
                                ]
                            }
                        ],
                        "passengerCount": [
                            {
                                "count": AdultCount,
                                "passengerType": basketQuoteResponse.fare[0].passengerType
                            }
                        ],
                        "selectedTicketType": "LOWEST"
                    },
                    "isLowAvailability": false,
                    "lastQuoted": basketQuoteResponse.lastQuoted,
                    "passengers": [
                        {
                            "gender": "Male",
                            "id": "100000000001",
                            "name": FirstName + ' ' + LastName,
                            "nameWithTitle": 'Mr ' + FirstName + ' ' + LastName,
                            "passengerData": {
                                "contactDetails": {
                                    "email": eMAIL,
                                    "phone": "+44 11111111111"
                                },
                                "dateOfBirth": "1995-03-27",
                                "firstName": FirstName,
                                "gender": "Male",
                                "lastName": LastName,
                                "title": "Mr",
                                "type": basketQuoteResponse.fare[0].passengerType
                            },
                            "type": basketQuoteResponse.fare[0].passengerType,
                            "updatePending": false
                        }
                    ],
                    "quote": {
                        "price": {
                            "amount": `${basketQuoteResponse.fareTotal}`,
                            "currency": basketQuoteResponse.currencyCode
                        }
                    }
                },
                "billingAddress": {
                    "line1": "qwerty",
                    "line2": "qwerty",
                    "postalCode": "123456"
                },
                "billingCountry": OriginCountry,
                "cardDetails": {
                    "csc": `${CardCSC}`,
                    "customerReference": null,
                    "expiryDate": `${CardExpiryMonth + '/' + CardExpiryYear}`,
                    "name": 'Mr ' + FirstName + ' ' + LastName,
                    "number": `${CardNumber}`,
                    "type": CardType
                },
                "payer": {
                    "email": eMAIL,
                    "firstName": FirstName,
                    "lastName": LastName,
                    "title": "Mr"
                },
                "paymentMethod": "Card",
                "type": "[Core Basket] Create Standard Booking by Card",
                "validatePaymentMethodOperation": "VALIDATE_NEW_CARD"
            }
        }



        else if (Scenario === 'Connecting') {
            let taxDetails = await basketQuoteResponse.fare[0].taxes;
            let updatedtaxDetails = taxDetails.map(item => ({ ...item, currencyCode: 'GBP' }));
            var payload =
            {
                "paymentMethod": "Card",
                "payer": {
                    "email": eMAIL,
                    "firstName": FirstName,
                    "lastName": LastName,
                    "title": "Mr"
                },
                "cardDetails": {
                    "csc": `${CardCSC}`,
                    "customerReference": null,
                    "expiryDate": `${CardExpiryMonth + '/' + CardExpiryYear}`,
                    "name": 'Mr ' + FirstName + ' ' + LastName,
                    "number": `${CardNumber}`,
                    "type": CardType
                },
                "billingAddress": {
                    "line1": "qwerty",
                    "line2": "qwerty",
                    "postalCode": "12345"
                },
                "holdBooking": false,
                "billingCountry": OriginCountry,
                "validatePaymentMethodOperation": "VALIDATE_NEW_CARD",
                "type": "[Core Basket] Create Standard Booking by Card",
                "basket": {
                    "availabilityEngine": "FlexPricer",
                    "flight": {
                        "selectedTicketType": "LOWEST",
                        "fares": [
                            {
                                "baseFare": `${basketQuoteResponse.fare[0].baseFare}`,
                                "currencyCode": basketQuoteResponse.currencyCode,
                                "tax": updatedtaxDetails,
                                "fee": feesJson,
                                "passengerType": basketQuoteResponse.fare[0].passengerType,
                                "totalFare": {
                                    "amount": `${basketQuoteResponse.fareTotal}`,
                                    "currencyCode": basketQuoteResponse.currencyCode
                                },
                                "totalTaxFee": {
                                    "amount": `${basketQuoteResponse.fare[0].totalTaxesAndFees}`,
                                    "currencyCode": basketQuoteResponse.currencyCode
                                }
                            }
                        ],
                        "passengerCount": [
                            {
                                "count": AdultCount,
                                "passengerType": basketQuoteResponse.fare[0].passengerType
                            }
                        ],
                        "originAndDestinations": [
                            {
                                "originDestinationId": 1,
                                "segments": [
                                    {
                                        "arrivalDateTime": basketQuoteResponse.segments[0].arrivalDateTime,
                                        "baggageAllowance": [
                                            {
                                                "count": 0,
                                                "passengerType": basketQuoteResponse.fare[0].passengerType,
                                                "weight": 0
                                            }
                                        ],
                                        "cabinCode": basketQuoteResponse.segments[0].cabinCode,
                                        "departureDateTime": basketQuoteResponse.segments[0].departureDateTime,
                                        "destinationAirport": basketQuoteResponse.segments[0].destinationAirport,
                                        "fareBasisCodes": [
                                            {
                                                "fareBasisCode": basketQuoteResponse.segments[0].fareBasisCode,
                                                "passengerType": basketQuoteResponse.fare[0].passengerType
                                            }
                                        ],
                                        "fareBreakPoint": true,
                                        "handBaggageOnlyFare": true,
                                        "marketingCarrierCode": basketQuoteResponse.segments[0].carrierCode,
                                        "marketingFlightNumber": basketQuoteResponse.segments[0].flightNumber,
                                        "originAirport": basketQuoteResponse.segments[0].originAirport,
                                        "segmentId": "1000000",
                                        "sellingClass": basketQuoteResponse.segments[0].sellingClass
                                    }
                                ]
                            },
                            {
                                "originDestinationId": 2,
                                "segments": [
                                    {
                                        "arrivalDateTime": basketQuoteResponse.segments[1].arrivalDateTime,
                                        "baggageAllowance": [
                                            {
                                                "count": 0,
                                                "passengerType": basketQuoteResponse.fare[0].passengerType,
                                                "weight": 32
                                            }
                                        ],
                                        "cabinCode": basketQuoteResponse.segments[0].cabinCode,
                                        "departureDateTime": basketQuoteResponse.segments[1].departureDateTime,
                                        "destinationAirport": basketQuoteResponse.segments[1].destinationAirport,
                                        "fareBasisCodes": [
                                            {
                                                "fareBasisCode": basketQuoteResponse.segments[1].fareBasisCode,
                                                "passengerType": basketQuoteResponse.fare[0].passengerType
                                            }
                                        ],
                                        "fareBreakPoint": false,
                                        "handBaggageOnlyFare": false,
                                        "marketingCarrierCode": basketQuoteResponse.segments[0].carrierCode,
                                        "marketingFlightNumber": basketQuoteResponse.segments[1].flightNumber,
                                        "originAirport": basketQuoteResponse.segments[1].originAirport,
                                        "segmentId": "1000010",
                                        "sellingClass": basketQuoteResponse.segments[1].sellingClass
                                    }
                                ]
                            },
                            {
                                "originDestinationId": 3,
                                "segments": [
                                    {
                                        "arrivalDateTime": basketQuoteResponse.segments[2].arrivalDateTime,
                                        "baggageAllowance": [
                                            {
                                                "count": 0,
                                                "passengerType": basketQuoteResponse.fare[0].passengerType,
                                                "weight": 32
                                            }
                                        ],
                                        "cabinCode": basketQuoteResponse.segments[0].cabinCode,
                                        "departureDateTime": basketQuoteResponse.segments[2].departureDateTime,
                                        "destinationAirport": basketQuoteResponse.segments[2].destinationAirport,
                                        "fareBasisCodes": [
                                            {
                                                "fareBasisCode": basketQuoteResponse.segments[2].fareBasisCode,
                                                "passengerType": basketQuoteResponse.fare[0].passengerType
                                            }
                                        ],
                                        "fareBreakPoint": true,
                                        "handBaggageOnlyFare": false,
                                        "marketingCarrierCode": basketQuoteResponse.segments[0].carrierCode,
                                        "marketingFlightNumber": basketQuoteResponse.segments[2].flightNumber,
                                        "originAirport": basketQuoteResponse.segments[2].originAirport,
                                        "segmentId": "1000010",
                                        "sellingClass": basketQuoteResponse.segments[2].sellingClass
                                    }
                                ]
                            }
                        ]
                    },
                    "passengers": [
                        {
                            "id": "100000000001",
                            "name": FirstName + ' ' + LastName,
                            "nameWithTitle": 'Mr ' + FirstName + ' ' + LastName,
                            "passengerData": {
                                "contactDetails": {
                                    "email": eMAIL,
                                    "phone": "+44 11111111111"
                                },
                                "firstName": FirstName,
                                "lastName": LastName,
                                "title": "Mr",
                                "type": basketQuoteResponse.fare[0].passengerType
                            },
                            "type": basketQuoteResponse.fare[0].passengerType,
                            "updatePending": false
                        }
                    ],
                    "quote": {
                        "price": {
                            "amount": `${basketQuoteResponse.fareTotal}`,
                            "currency": basketQuoteResponse.currencyCode
                        }
                    },
                    "cugBasket": false,
                    "isLowAvailability": false,
                    "lastQuoted": basketQuoteResponse.lastQuoted,
                    "quote": {
                        "price": {
                            "amount": `${basketQuoteResponse.fareTotal}`,
                            "currency": basketQuoteResponse.currencyCode
                        }
                    }
                }
            }
        }
        var allHeaders = {
            Authorization: 'Bearer ' + accessToken,
            connection: ConnectionState,
            ba_client_sessionId: refreshToken,
            ba_client_applicationName: 'test',
            ba_client_organisation: client_organisation,
            ba_api_context: api_context,
            ba_integrity_disabled: true,
            ba_client_deviceType: ba_deviceType,
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
        // logger.info('------------------REQUEST PAYLOAD FOR PAYMENT----------------------\n\n')
        // logger.info(JSON.stringify(payload) + '\n \n')
        try {
            var response = await axios.put(request, payload, {
                headers: allHeaders,
            }).then(response => response.data);

            // logger.info('----------------Payment Confirmation---------------------\n\n')
            // logger.info(JSON.stringify(response));

            APIcalls.PNRData.push(response.reference);
            APIcalls.PNRData.push(response.paxLastName);
            return response;
        }
        catch {
            logger.error('Error in payment confirmation API');
        }
    }
}
module.exports = APIcalls;