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
