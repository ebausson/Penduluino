function mobileInit(){
  
  
  initMobileDom();
  
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
