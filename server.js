const express = require('express');
const app = express();
const http = require('http').Server(app);
const socket = require('socket.io')(http);

const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/src'));


function onConnection(socket) {
  socket.on('drawing', (data) => socket.broadcast.emit('drawing', data));
}

socket.on('connection', onConnection);

http.listen(port, () => {
  console.log('Listening on port ', port);
});
