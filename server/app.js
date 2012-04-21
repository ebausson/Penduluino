var util = require("util");
var serialport = require("serialport");

console.log(serialport);

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
