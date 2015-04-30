var express = require('express');
var http = require('http');
var socketio = require('socket.io');
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

var state = {
    'tagger': [ { 'x': 100, 'y': 100 } ],
    'players': [ { 'x': 300, 'y': 300 } ],
    'tagged': [ { 'x': 20, 'y': 50 }, { 'x': 80, 'y': 30 } ]
}
function emitGameState() {
    io.emit('state', state);
};
setInterval(emitGameState, 1000/60);

io.on('connection', function(socket){
    console.log('%s connected', socket.id);

    socket.on('disconnect', function(){
        console.log('%s disconnected', socket.id);
    });

    socket.on('position', function(data){
        console.log('%s is at (%s, %s)', socket.id, data.x, data.y);
        state.tagger = [ data ];
    })
});
