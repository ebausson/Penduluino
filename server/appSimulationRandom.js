var socketio	= require("socket.io");

var io	= socketio.listen(8000);
io.of('/computer').on('connection', function (socket) {
	socket.emit('handshake', { hello: 'client' });
	socket.on('handshake', function (data) {
		console.log(data);
	});
	socket.on('disconnect', function () {
		io.of('/computer').emit('news', 'user disconnected');
	});
});

setInterval(function(){
	var key		= 'p'+(1 + Math.floor(Math.random()*6));
	var val		= Math.random() > 0.5 ? true : false;
	var event	= {};
	event[key]	= val;
	io.of('/computer').emit('pendulum', event);
}, 1 * 100);
