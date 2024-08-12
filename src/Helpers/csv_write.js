const fs = require('fs');

// Create a new Map to store CSV data
const csvDataMap = new Map();

// Read the CSV file
fs.readFile('sample.csv', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the CSV file:', err);
    return;
  }

  // Remove \r characters from the data
  const cleanedData = data.replace(/\r/g, '');

  // Split the cleaned data into lines
  const lines = cleanedData.split('\n');

  // Get the header row to use as keys
  const headers = lines[0].split(',');

  // Process the remaining rows for values
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',');
    const rowData = {};

    for (let j = 0; j < headers.length; j++) {
      rowData[headers[j]] = values[j];
    }

    csvDataMap.set(rowData.TestCaseName, rowData);
  }

  // Log the map
  //console.log(csvDataMap);
  console.log(csvDataMap.get('b'));

  // Write the data to a new CSV file
  const csvContent = [headers.join(',')].concat(lines.slice(1)).join('\n');
  fs.writeFile('output.csv', csvContent, 'utf8', (writeErr) => {
    if (writeErr) {
      console.error('Error writing to CSV file:', writeErr);
      return;
    }
    console.log('CSV file has been written successfully.');
  });
});
