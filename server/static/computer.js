function computerInit(){
  
  initComputerDom();
  
  
  // device seems to be a computer, here come the rendering code.
  socket = io.connect(socketLocation + "/computer");
  socket.on('handshake', function (data) {
    console.log(data);
    socket.emit('handshake', { my: navigator.userAgent });
  });
  
  socket.on('pendulum', function (data) {
    console.log(data);
    for(var p in data){
      document.getElementById(p).className = data[p] ? 'on' : 'off';
    }
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
