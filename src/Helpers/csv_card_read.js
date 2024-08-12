const fs = require('fs');

class CSVCardReader {
  csvCardMap = 'new Map();'

  constructor() {
    this.csvCardMap = new Map();
    fs.readFile('./src/test_data/card.csv', 'utf8', (err, data) => {
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
        this.csvCardMap.set(values[0], values[1]+','+values[2]);
      }
    })
  
  }

  async getCardName(CardName){
    let values = await this.csvCardMap.get (CardName);
    let value = values.split(',');
    return  await value ;
  }
  
  
};

module.exports = CSVCardReader;