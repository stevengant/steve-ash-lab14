'use strict';

const { newOrder, thanksDriver } = require('./handler');
const { io } = require('socket.io-client');

const socket = io.connect('http://localhost:3001/caps');

socket.emit('getAll', {queueId: '1-206-flowers'});

socket.on('DELIVERED', (payload) => {
  thanksDriver(payload);
  socket.emit('RECEIVED', payload);
});

setInterval(() => {
  newOrder(socket);
}, 5000);