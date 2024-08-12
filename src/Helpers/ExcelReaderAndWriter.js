const { Console } = require('console');
const fs = require('fs');
const XLSX = require('xlsx');
const xlsxPopulate = require('xlsx-populate');
const logger = require('../setup/PNR_API_Logger');
const { Logger } = require('winston');
const fileLocation = './src/test_data/TC_BookingInfo_Mapping.xlsx';
var rowCount = 2;
const workbook = XLSX.readFile(fileLocation)
var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets['TestDataSheet']);

class ExcelReaderAndWriter {
    async convertExcelToJSON(CaseName) {
        var RowJsonObject;
        let Row;
        if (!excelRows[0]) {
            logger.info('No Data in excel sheet');
            return false;
        }
        else {
            for (var j = 0; j < excelRows.length; j++) {
                Row = excelRows[j];
                let Value = Object.entries(Row)[0][1];
                if (Value === CaseName) {
                    RowJsonObject = JSON.parse(JSON.stringify(Row));
                    break;
                }
            }
            if(!RowJsonObject){
                logger.info("No Test Data matching with "+ CaseName);
                return false;
            }
            else{
                return RowJsonObject;
            }
        }
    }

    async WritePNRtoExcel(PNR, CaseName, lastName, amount, currency) {

        for (var j = 0; j <= excelRows.length; j++) {
            let RowData = excelRows[j];
            let Value = Object.entries(RowData)[0][1];
            if (Value === CaseName) {
                rowCount = rowCount + j;
                break;
            }
        }
        xlsxPopulate.fromFileAsync(fileLocation)
            .then((book) => {
                book.sheet('TestDataSheet').cell("AY" + rowCount).value(PNR);
                book.sheet('TestDataSheet').cell("AZ" + rowCount).value(lastName);
                book.sheet('TestDataSheet').cell("BA" + rowCount).value(amount + ' ' + currency);
                const date = new Date();
                book.sheet('TestDataSheet').cell("BB" + rowCount).value(date);
                return book.toFileAsync(fileLocation);

            })
    }
}
module.exports = ExcelReaderAndWriter;