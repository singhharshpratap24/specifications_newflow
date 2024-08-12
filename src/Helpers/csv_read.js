const fs = require('fs');

class CSVReader {
  csvDataMap = 'new Map();'

  constructor() {
    this.csvDataMap = new Map();
    fs.readFile('./src/test_data/pnr.csv', 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading the CSV file:', err);
        return;
      }
      // Remove \r characters from the data
      let cleanedData = data.replace(/\r/g, '');

      // Split the cleaned data into lines
      let alldata = cleanedData.split('\n');

      // Process the remaining rows for values
      for (let i = 1; i < alldata.length; i++) {
        let values = alldata[i].split(',');
        this.csvDataMap.set(values[0], values[1]+','+values[2]);
      }
    })
  
  }

  async getPNRName(testcase){
    let values = await this.csvDataMap.get (testcase);
    let value = values.split(',');
    return  await value ;
  }
  
  
};

module.exports = CSVReader;