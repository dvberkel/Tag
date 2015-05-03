var express = require('express');
var http = require('http');
var socketio = require('socket.io');
var Game = require('./lib/game');
var app = express();

app.use(express.static('public'));
app.get('/', function(request, response){
    response.send('Hello World');
});

var server = http.Server(app);
var io = socketio(server);
server.listen(3000, function(){
    var host = server.address().address;
    var port = server.address().port;

    console.log('Listening on http://%s:%s', host, port);
});

var game = new Game();
function emitGameState() {
    game.tick();
    io.emit('state', game.state());
};
setInterval(emitGameState, 1000/60);

io.on('connection', function(socket){
    console.log('%s connected', socket.id);
    game.addPlayer(socket.id);

    socket.on('disconnect', function(){
        console.log('%s disconnected', socket.id);
        game.removePlayer(socket.id);
    });

    socket.on('position', function(data){
        console.log('%s is at (%s, %s)', socket.id, data.x, data.y);
        game.update(socket.id, data);
    })
});
