'use strict';

const socket = require('../socket.js');

const { newOrder, thanksDriver } = require('./handler');

console.log = jest.fn();
socket.emit = jest.fn();


jest.mock('../socket.js', () => {
  return{
    on: jest.fn(),
    emit: jest.fn()
  };
});

console.log = jest.fn();

describe('handle vendor', () => {
    let payload = {
      store: 'testStore',
      orderId: 'testOrder',
      customer: 'testCustomer',
      address: 'testAddress',
    }

    it('emits order as expected', () => {
      newOrder(socket, payload);
      expect(console.log).toHaveBeenCalledWith('VENDOR: order ready for pickup');
      expect(socket.emit).toHaveBeenCalledWith('JOIN', payload.store);
      expect(socket.emit).toHaveBeenCalledWith('PICKUP', payload);

  });

  it('confirms delivery as expected', () => {
    thanksDriver(payload);
    expect(console.log).toHaveBeenCalledWith(`VENDOR: Thank you for delivering ${payload.orderID}`);

  });
});