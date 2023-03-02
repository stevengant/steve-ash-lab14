'use strict';

var Chance = require('chance');
var chance = new Chance();

const newOrder = (socket, payload = null) => {
  if (!payload) {
    payload = {
      store: 'acme-widgets',
      orderID: chance.guid(),
      customer: chance.name(),
      address: chance.address(),
    };
  }
  console.log('VENDOR: order ready for pickup');
  socket.emit('JOIN', payload.store);
  socket.emit('PICKUP', payload);

};

const thanksDriver = (payload) => {

  console.log(`VENDOR: Thank you for delivering ${payload.orderID}`);

};

module.exports = { thanksDriver, newOrder };