'use strict';

let eventPool = require('./eventPool');
require('./clients/vendor');
require('./clients/driver');
var Chance = require('chance');
var chance = new Chance();


eventPool.on('PICKUP', (payload) => logger('PICKUP', payload));
eventPool.on('IN-TRANSIT', (payload) => logger('IN-TRANSIT', payload));
eventPool.on('DELIVERED', (payload) => logger('DELIVERED', payload));

function logger(event, payload) {
  console.log({
    event,
    time: new Date().toISOString(),
    payload,
  });
}



const start = () => {
  setInterval(() => {
    let store = chance.company();
    eventPool.emit('VENDOR', store);
  }, 5000);
};

start();

