const flightSearchRequest = require("./flightSearchRequest");
 
class ScenarioDataHelper {
 
    static updateScenarioData(scenarioData, adult, youngAdult, child, infant, routeType, departing, arrival, cabin) {
        if (arguments.length === 5) {
            if (scenarioData) {
                scenarioData.adult = adult;
                scenarioData.youngAdult = youngAdult;
                scenarioData.child = child;
                scenarioData.infant = infant;
            } else {
                console.error(`Scenario "${scenarioName}" not found.`);
            }
        } else if (arguments.length === 9) {
            if (scenarioData) {
                scenarioData.adult = adult;
                scenarioData.youngAdult = youngAdult;
                scenarioData.child = child;
                scenarioData.infant = infant;
                scenarioData.journeyType = routeType;
                scenarioData.depart = departing;
                scenarioData.arrival = arrival;
                scenarioData.ticketType = cabin;
            } else {
                console.error(`Scenario "${scenarioName}" not found.`);
            }
        }
        flightSearchRequest.setContext(scenarioData);
    }
 
    static updateScenarioDataForEC(scenarioData, routeType, departing, arrival) {
        if (arguments.length === 2) {
            if (scenarioData) {
                scenarioData.journeyType = routeType;
            } else {
                console.error(`Scenario "${scenarioName}" not found.`);
            }
        } else if (arguments.length === 4) {
            if (scenarioData) {
                scenarioData.journeyType = routeType;
                scenarioData.depart = departing;
                scenarioData.arrival = arrival;
            } else {
                console.error(`Scenario "${scenarioName}" not found.`);
            }
        }
        flightSearchRequest.setContext(scenarioData);
    }

    static updateScenarioDataMulticity(
      scenarioData,
      adult,
      youngAdult,
      child,
      infant,
      departingSegmentOne,
      departingSegmentTwo,
      departingSegmentThree,
      arrivalSegmentOne,
      arrivalSegmentTwo,
      arrivalSegmentThree,
      cabin
    ) {
      if (arguments.length === 5) {
        scenarioData.adult = adult
        scenarioData.youngAdult = youngAdult
        scenarioData.child = child
        scenarioData.infant = infant
      } else if (arguments.length === 10) {
        scenarioData.adult = adult
        scenarioData.youngAdult = youngAdult
        scenarioData.child = child
        scenarioData.infant = infant
        scenarioData.departingSegmentOne = departingSegmentOne
        scenarioData.arrivalSegmentOne = arrivalSegmentOne
        scenarioData.departingSegmentTwo = departingSegmentTwo
        scenarioData.arrivalSegmentTwo = arrivalSegmentTwo
        scenarioData.ticketType = cabin
      } else if (arguments.length === 12) {
        scenarioData.adult = adult
        scenarioData.youngAdult = youngAdult
        scenarioData.child = child
        scenarioData.infant = infant
        scenarioData.departingSegmentOne = departingSegmentOne
        scenarioData.arrivalSegmentOne = arrivalSegmentOne
        scenarioData.departingSegmentTwo = departingSegmentTwo
        scenarioData.arrivalSegmentTwo = arrivalSegmentTwo
        scenarioData.departingSegmentThree = departingSegmentThree
        scenarioData.arrivalSegmentThree = arrivalSegmentThree
      } else {
        console.error(`Scenario "${scenarioName}" not found.`)
      }
      flightSearchRequest.setContext(scenarioData)
    }
}
module.exports = ScenarioDataHelper;