var express = require('express');
var app = express();

app.use(express.static('public'));
app.get('/', function(request, response){
    response.send('Hello World');
});

var server = app.listen(3000, function(){
    var host = server.address().address;
    var port = server.address().port;

    console.log('Listening on http://%s:%s', host, port);
});
