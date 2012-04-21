var serialport = require("serialport");
var socketio = require("socket.io");
var http = require('http');
var static = require('node-static');



// static file server
var file = new(static.Server)('./static', { cache: 1 });
require('http').createServer(function (request, response) {
  request.addListener('end', function () {
    file.serve(request, response);
  });
}).listen(8080);


// socket.io server

var io = socketio.listen(8000);
io.set('log level', 1);

var computers = io.of('/computer');
computers.on('connection', function (socket) {
  socket.emit('handshake', { hello: 'client' });
  socket.on('handshake', function (data) {
    console.log('+COMPUTER');
    console.log(data);
  });
});



var mobiles = io.of('/mobile');
mobiles.on('connection', function (socket) {
  socket.emit('handshake', { hello: 'client' });
  socket.on('handshake', function (data) {
    console.log('+MOBILE');
    console.log(data);
  });
  socket.on('mobile', function(data){
    console.log(data);
    computers.emit('mobile', data);
  });
});

// getting data from serial
var serial;
try {
  console.log('trying logging in /dev/ttyUSB0');
  serial = new serialport.SerialPort("/dev/ttyUSB0", { 
    parser: serialport.parsers.readline("\n")
  });
} catch (e) {
  try {
    console.log('trying logging in /dev/ttyUSB1');
    serial = new serialport.SerialPort("/dev/ttyUSB1", { 
      parser: serialport.parsers.readline("\n")
    });
  } catch (f) {
    console.log('ERROR, arduino no found in /dev');
    process.exit(1);
  }
}


var lastData = 0;

serial.on("data", function (data) {
  if (data != lastData){
    computers.emit('pendulum', getDiffObject(lastData, data));
    lastData = data;
  }
});

var getDiffObject = function(oldData, newData){
  var result = {};
  
  var mask = 0x01;
  var name ="p1";
  if ((newData & mask) != (oldData & mask)){
    result[name] = !! (newData & mask);
  }
  
  var mask = 0x02;
  var name ="p2";
  if ((newData & mask) != (oldData & mask)){
    result[name] = !! (newData & mask);
  }
  
  var mask = 0x04;
  var name ="p3";
  if ((newData & mask) != (oldData & mask)){
    result[name] = !! (newData & mask);
  }
  
  var mask = 0x08;
  var name ="p4";
  if ((newData & mask) != (oldData & mask)){
    result[name] = !! (newData & mask);
  }
  
  var mask = 0x10;
  var name ="p5";
  if ((newData & mask) != (oldData & mask)){
    result[name] = !! (newData & mask);
  }
  
  var mask = 0x20;
  var name ="p6";
  if ((newData & mask) != (oldData & mask)){
    result[name] = !! (newData & mask);
  }
  return result;
}
