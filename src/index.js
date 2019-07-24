const fs = require('fs');
const path = require('path');
const DataHandler = require('./DataHandler');

const dataHandler = new DataHandler();

fs.readFile(path.join(process.cwd(), 'dump.txt'), { encoding: 'utf8' }, (error, data) => {
  if (error) {
    console.error(error);
    process.exit();
  }
  dataHandler.push(data.split('\n'));
});

process.on('beforeExit', () => {
  dataHandler.done();
});
