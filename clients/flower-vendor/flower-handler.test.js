'use strict';

const socket = require('../socket.js');

const { thankDriver, generateOrder } = require('./handler');

console.log = jest.fn();
eventPool.emit = jest.fn();


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
      generateOrder(socket, payload);
      expect(console.log).toHaveBeenCalledWith('VENDOR: Order ready for pickup.');
      expect(socket.emit).toHaveBeenCalledWith('JOIN', 'testStore');
      expect(socket.emit).toHaveBeenCalledWith('PICKUP', payload);

  });

  it('confirms delivery as expected', () => {
    thankDriver(payload);
    expect(console.log).toHaveBeenCalledWith('VENDOR: Thank you for delivering testOrder');

  });
});