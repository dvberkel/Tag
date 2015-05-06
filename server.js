var express = require('express');
var http = require('http');

var Game = require('./lib/game');
var options = require('./public/options.json');
var app = express();

app.use(express.static('public'));
app.get('/', function(request, response){
    response.send('Hello World');
});

var server = http.Server(app);

server.listen(3000, function(){
    var host = server.address().address;
    var port = server.address().port;

    console.log('Listening on http://%s:%s', host, port);
});

var game = new Game(options);
function emitGameState() {
    game.tick();

};
setInterval(emitGameState, 1000/60);
