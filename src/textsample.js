const DataHandler = require('./DataHandler');

const getChars = require('../res/chars');

const dataHandler = new DataHandler();

dataHandler.push(['!{"command":"INIT"}']);

const sentence = 'The quick brown fox jumps over the lazy dog! Franz jagt im komplett verwahrlosten Taxi quer durch Bayern. Jagen zwölf Boxkämpfer Viktor quer über den großen Sylter Deich? -_';

const tuples = sentence.match(/.{1,2}/gi);

for (let i = 0; i < 20 * 16; i += 1) {
  dataHandler.push([getChars(tuples[i % tuples.length])]);
}

dataHandler.push(['!{"command":"DATA","compressed":0,"more":0}']);

process.on('beforeExit', () => {
  dataHandler.done();
});
