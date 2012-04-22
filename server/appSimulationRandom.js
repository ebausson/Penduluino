var socketio	= require("socket.io");

var io	= socketio.listen(8000);
io.sockets.on('connection', function (socket) {
	socket.emit('handshake', { hello: 'client' });
	socket.on('handshake', function (data) {
		console.log(data);
	});
	socket.on('disconnect', function () {
		io.sockets.emit('news', 'user disconnected');
	});
});

setInterval(function(){
	var key		= 'p'+(1 + Math.floor(Math.random()*3));
	var val		= Math.random() > 0.5 ? true : false;
	var event	= {};
	event[key]	= val;
	io.sockets.emit('pendulum', event);
}, 1 * 100);
