var util = require("util");
var serialport = require("serialport");
var socketio = require("socket.io");
var http = require('http');
var static = require('node-static');



// static file server
var file = new(static.Server)('./static');
require('http').createServer(function (request, response) {
  request.addListener('end', function () {
    file.serve(request, response);
  });
}).listen(8080);


// socket.io server

var io = socketio.listen(8000);
io.sockets.on('connection', function (socket) {
  socket.emit('handshake', { hello: 'client' });
  socket.on('handshake', function (data) {
    console.log(data);
  });
  socket.on('disconnect', function () {
    io.sockets.emit('news', 'user disconnected');
  });
});


// getting data from serial
var serial = new serialport.SerialPort("/dev/ttyUSB0", { 
  parser: serialport.parsers.readline("\n")
});

var lastData = 0;

serial.on("data", function (data) {
  if (data != lastData){
    console.log(data);
    lastData = data;
    io.sockets.emit('pendulum', data);
  }
});
