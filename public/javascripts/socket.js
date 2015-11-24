
io = io.connect('/');

console.log( "socket: browser ping (1)" )
io.emit('ping', { some: 'data' } );


io.on('pong', function (data) {
	console.log( 'socket: server pong (4)', data );
});