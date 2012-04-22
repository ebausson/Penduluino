/*
 
var socket = io.connect('http://127.0.0.1:8001');
//var socket = io.connect('http://192.168.43.130:8000');

socket.on('handshake', function(data){
	console.log(data);
	socket.emit('handshake', { my: navigator.userAgent });
});

socket.on('pendulum', function (event) {
	if( typeof(captors) === "undefined" )	return;
	Object.keys(event).forEach(function(captor){
		var value	= captors[captor];
		console.log("captor", captor, "value", value);
		var object	= captors[captor];
		object && object.tick();
	})
});
*/


var socketLocation = window.location.hostname;
var socketLocation = 'http://' + socketLocation + ":" + 8000;
var socket;


window.addEventListener('load', function() {
  if (navigator.userAgent.indexOf('Mobi') > -1) {
    mobileInit();
  } else {
    computerInit();
  }
}, false)




function mobileInit(){
  
  
  // initMobileDom();
  
  orientationData = {
    alpha : true,
    beta  : true,
    gamma : true
  };
  
  // device seems to be a mobile, now we can try to send acceleration data & stuff.
  socket = io.connect(socketLocation + "/mobile");
  
  socket.on('connect', function () {
    
    socket.on('handshake', function (data) {
      socket.emit('handshake', { my: navigator.userAgent });
    });
    
    if (window.DeviceOrientationEvent) {
      
      window.addEventListener("deviceorientation", function( event ) {
        //absolute: diff with earth (at least, that's what I understand
        var rotateDegrees = event.alpha;
        //gamma: left to right
        var leftToRight = event.gamma;
        //beta: front back motion
        var frontToBack = event.beta;
        handleOrientationEvent( frontToBack, leftToRight, rotateDegrees );
      }, false);
    }
    
    var handleOrientationEvent = function( beta, gamma, alpha ){
      //do something amazing
      var newBeta  = beta  > 0;
      var newGamma = gamma > 0;
      var newAlpha = alpha > 180;
      
      var emit = false;
      var response = {};
      if (newGamma != orientationData.gamma) {
        orientationData.gamma = newGamma;
        response.gamma = newGamma;
        emit = true;
      }
      /*
      if (newBeta != orientationData.beta) {
        orientationData.beta = newBeta;
        response.beta = newBeta;
        emit = true;
      }
      if (newAlpha != orientationData.alpha) {
        orientationData.alpha = newAlpha;
        response.alpha = newAlpha;
        emit = true;
      }
      */
      if (emit) {
        socket.emit("mobile", response);
      }
    };
  });
}


function initMobileDom(){
  var body = "";
  for (var i = 1; i <= 3; i++){
    body += '<div class="mobileBlock" id="c' + i + '"></div>';
  }
  var bodyElement = document.getElementById("body");
  bodyElement.innerHTML = body;
  bodyElement.className = 'mobile';
}




function computerInit(){
  
  initComputerDom();
  
  
  // device seems to be a computer, here come the rendering code.
  socket = io.connect(socketLocation + "/computer");
  socket.on('handshake', function (data) {
    console.log(data);
    socket.emit('handshake', { my: navigator.userAgent });
  });
  
  socket.on('pendulum', function (data) {
    if( typeof(captors) === "undefined" )	return;
    Object.keys(event).forEach(function(captor){
      var value	= captors[captor];
      console.log("captor", captor, "value", value);
      var object	= captors[captor];
      object && object.tick();
    })
    
    /*
    console.log(data);
    for(var p in data){
      document.getElementById(p).className = data[p] ? 'on' : 'off';
    }
    */
  });
      
  socket.on('mobile', function(data){
    console.log('+MOBILE');
    console.log(data);
  });
}


function initComputerDom(){
  var bodyNewContent = "";
  for (var i = 1; i <= 6; i++){
    bodyNewContent += '<div id="p' + i + '"></div>';
  }
  var bodyElement = document.getElementById("body");
  bodyElement.innerHTML = bodyNewContent;
  bodyElement.className = 'computer';
}
