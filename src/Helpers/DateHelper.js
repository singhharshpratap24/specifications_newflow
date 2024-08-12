const flightSearchRequest = require("../Helpers/flightSearchRequest");
const constants = require("../Helpers/Constants");
const { format } = require("prettier");

class DateHelper {
    async setDate(format) {
        const date = new Date();
        let flightData = flightSearchRequest.getDefaultData();
        const outboundDate = await this.getOutBoundDateFS(date, flightData, format);
        const inboundDate = await this.getInBoundDateFS(date, flightData, format);
        const depArrDate = [outboundDate, inboundDate];
        return depArrDate;
    }

    async getOutBoundDateFS(date, flightData, format) {
        const outBoundDate = await this.getRollDateOutBound(date, flightData);
        const outbound = await this.getDateFormat(outBoundDate, format)
        return outbound;    
    }

    async getInBoundDateFS(date, flightData, format) {
        let inBoundDate = await this.getRollDateInBound(date, flightData);
        const inbound = await this.getDateFormat(inBoundDate, format)
        return inbound;
    }

    async getYear(date) {
        return date.getFullYear();
    }

    async getMonth(date) {
        return date.toLocaleDateString("default", { month: "2-digit" });
    }

    async getDay(date) {
        return String(date.getDate()).padStart(2, '0');
    }

    async getRollDateOutBound(date, flightData) {
        date.setDate(date.getDate() + parseInt(flightData.outbound));
        return date;
    }

    async getRollDateInBound(date, flightData) {
        date.setDate(date.getDate() + parseInt(flightData.inbound));
        return date;
    }

    async getDateFormat(Date, format) {
        let year = null;

        if(format === "DD/MM/YY") {
            year = await this.getYearEC(Date);
        } else {
            year = await this.getYear(Date);
        }
        const month = await this.getMonth(Date);
        const day = await this.getDay(Date);

        switch (format) {
            case "YYYY-MM-DD":
                return `${year}-${month}-${day}`;
            case "DD-MM-YYYY":
                return `${day}-${month}-${year}`;
            case "MM/DD/YYYY":
                return `${month}/${day}/${year}`;
            case "DD/MM/YY":
                return `${day}/${month}/${year}`;
            default:
                throw new Error(`Invalid format: ${format}`);
        }
    }

    static futureYearDeparture_Date = null;
    static futureMonthDeparture_Date_String = null;

    async setDateEC(format) {
        const instanceOne = new Date();
        const instanceTwo = new Date();
        let flightData = flightSearchRequest.getDefaultData();
        const outboundDate = await this.getOutBoundDateEC(instanceOne, flightData, format);
        const inboundDate = await this.getInBoundDateEC(instanceTwo, flightData, format);
        const depArrDate = [outboundDate, inboundDate];
        return depArrDate;
    }

    async getOutBoundDateEC(date, flightData, format) {
        const outBoundDate = await this.getRollDateOutBoundEC(date, flightData);
        const outbound = await this.getDateFormat(outBoundDate, format);
        return outbound;
    }

    async getInBoundDateEC(date, flightData, format) {
        let inBoundDate = await this.getRollDateInBoundEC(date, flightData);
        const inbound = await this.getDateFormat(inBoundDate, format);
        return inbound;
    }

    async getRollDateOutBoundEC(date, flightData) {
        date.setDate(date.getDate() + parseInt(flightData.outbound));
        return date;
    }

    async getRollDateInBoundEC(date, flightData) {
        date.setDate(date.getDate() + parseInt(flightData.inbound));
        return date;
    }

    static YEAR = null;

    async getYearEC(date) {
        DateHelper.YEAR = date.getFullYear();
        return String(DateHelper.YEAR).slice(-2);
    }

    async getMonthLongOutBound(date) {
        date = new Date();
        let flightData = flightSearchRequest.getDefaultData();
        date.setDate(date.getDate() + parseInt(flightData.outbound));
        return date.toLocaleDateString("default", { month: "long" });
    }
    
    async getMonthLongInBound(date) {
        date = new Date();
        let flightData = flightSearchRequest.getDefaultData();
        date.setDate(date.getDate() + parseInt(flightData.inbound));
        return date.toLocaleDateString("default", { month: "long" });
    }

    async getPreviousDate(day){
        const date = new Date();
        var getPreviousDate = new Date(date.getTime() - (day * 24 * 60 * 60 * 1000)).toLocaleDateString();
        return getPreviousDate;
    }
}

module.exports = DateHelper;