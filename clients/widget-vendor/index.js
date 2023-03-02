'use strict';

const { newOrder, thanksDriver } = require('./handler');
const { io } = require('socket.io-client');

const socket = io.connect('http://localhost:3001/caps');

socket.emit('getAll', {queueId: 'Acme Widgets'});

socket.on('delivered', (payload) => {
  thanksDriver(payload);
  socket.emit('received', payload);
});

setInterval(() => {
  newOrder(socket);
}, 5000);