var util = require("util");
var serialport = require("serialport");
var http = require('http');
var static = require('node-static');


// getting data from serial

var serial = new serialport.SerialPort("/dev/ttyUSB0", { 
  parser: serialport.parsers.readline("\n")
});

var lastData;

serial.on("data", function (data) {
  if (data != lastData){
    console.log(data);
    lastData = data;
  }
});

// static file server
var file = new(static.Server)('./static');
require('http').createServer(function (request, response) {
  request.addListener('end', function () {
    file.serve(request, response);
  });
}).listen(8080);
