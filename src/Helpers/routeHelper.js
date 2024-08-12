"use strict";

class RouteHelper {
    static routeType = null;
    static departing = null;
    static arrival = null;
    static stopover = null;

    static departingSegmentOne = null;
    static arrivalSegmentOne = null;
    static departingSegmentTwo = null;
    static arrivalSegmentTwo = null;
    static departingSegmentThree = null;
    static arrivalSegmentThree = null;
    static routeLegs = null;
    static multicityDate = null;

    static async routeSplit(route) {
        const routeSplit = route.split("-");
        this.departing = routeSplit[0];

        if (routeSplit.length === 2 || routeSplit.length === 3) {
            this.routeType = "oneway";
            this.arrival = routeSplit[1];
            this.stopover = null;
            if (routeSplit[0] === routeSplit[2]) {
                this.routeType = "return";
            }
        }
        else {
            this.arrival = routeSplit[2];
            this.stopover = routeSplit[1];
            if (routeSplit.length === 5) {
                this.routeType = "return";
            } else {
                this.routeType = "oneway";
            }
        }
    }

    static async routeSplitMulticity(route) {
        const routeSplit = route.split("/");
        this.routeLegs = routeSplit.length;

        if(routeSplit.length === 2) {
            const segmentOne = routeSplit[0];
            const segmentTwo = routeSplit[1]; 
            
            const routesSegmentOne = segmentOne.split("-");
            const routesSegmentTwo = segmentTwo.split("-");
            
            const departSegmentOne = routesSegmentOne[0];
            const departSegmentTwo = routesSegmentTwo[0];
            
            const arrivalSegmentOne = routesSegmentOne[1];
            const arrivalSegmentTwo = routesSegmentTwo[1];
        
            this.departingSegmentOne = departSegmentOne;
            this.arrivalSegmentOne = arrivalSegmentOne;
            this.departingSegmentTwo = departSegmentTwo;
            this.arrivalSegmentTwo = arrivalSegmentTwo;
        } else if(routeSplit.length === 3) {
            const segmentOne = routeSplit[0];
            const segmentTwo = routeSplit[1]; 
            const segmentThree = routeSplit[2];
            
            const routesSegmentOne = segmentOne.split("-");
            const routesSegmentTwo = segmentTwo.split("-");
            const routesSegmentThree = segmentThree.split("-");
            
            const departSegmentOne = routesSegmentOne[0];
            const departSegmentTwo = routesSegmentTwo[0];
            const departSegmentThree = routesSegmentThree[0];
            
            const arrivalSegmentOne = routesSegmentOne[1];
            const arrivalSegmentTwo = routesSegmentTwo[1];
            const arrivalSegmentThree = routesSegmentThree[1];
        
            this.departingSegmentOne = departSegmentOne;
            this.arrivalSegmentOne = arrivalSegmentOne;
            this.departingSegmentTwo = departSegmentTwo;
            this.arrivalSegmentTwo = arrivalSegmentTwo;
            this.departingSegmentThree = departSegmentThree;
            this.arrivalSegmentThree = arrivalSegmentThree;
        }
    }

    static get getRouteType() {
        return this.routeType;
    }

    static get getDeparting() {
        return this.departing;
    }

    static get getArrival() {
        return this.arrival;
    }

    static get getRouteLegs() {
        return this.routeLegs;
    }

    static get getDepartingSegmentOne() {
        return this.departingSegmentOne;
    }

    static get getDepartingSegmentTwo() {
        return this.departingSegmentTwo;
    }

    static get getArrivalSegmentOne() {
        return this.arrivalSegmentOne;
    }

    static get getArrivalSegmentTwo() {
        return this.arrivalSegmentTwo;
    }

    static get getDepartingSegmentThree() {
        return this.departingSegmentThree;
    }

    static get getArrivalSegmentThree() {
        return this.arrivalSegmentThree;
    }

    static get getMulticityDate() {
        return this.multicityDate;
    }
}
module.exports = RouteHelper;
