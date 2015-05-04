var extend = require('./extend');

function toState(player){
    return { id: player.id, x: player.currentX, y: player.currentY };
};

function distance(a, b) {
    var dx = a.currentX - b.currentX;
    var dy = a.currentY - b.currentY;
    return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
}

var Game = function(options){
    this.options = extend(options||{},
                          { velocity : 5 },
                          { tagger: { boost: 3, radius: 10 } },
                          { players: { radius: 5 }});
    this.tagger = undefined;
    this.players = {};
}
Game.prototype.addPlayer = function(id){
    if (this.tagger == undefined) {
        this.tagger = id;
    }
    this.players[id] = { 'id': id };
}
Game.prototype.removePlayer = function(id){
    delete this.players[id];
    if (id == this.tagger) {
        this.tagger = this.foldPlayer(undefined, function(currentId, player){ return player.id });
        this.reset();
    }
}
Game.prototype.forEachPlayer = function(callback){
    for(var id in this.players) {
        callback(this.players[id]);
    }
}
Game.prototype.foldPlayer = function(accumulator, callback){
    var result = accumulator;
    this.forEachPlayer(function(player){
        result = callback(result, player);
    });
    return result;
}
Game.prototype.update = function(id, data){
    var player = this.players[id];
    if (player != undefined) {
        for (var key in data) {
            player[key] = data[key];
        }
    }
};
Game.prototype.tick = function(){
    this.movePlayers();
    this.tag();
};
Game.prototype.movePlayers = function(){
    this.forEachPlayer(function(player){
        if (player.isTagged) {
            return;
        }
        player.x = player.x || 0; player.y = player.y || 0;
        if(player.currentX == undefined || isNaN(player.currentX)) {
            player.currentX = player.x;
        }
        if (player.currentY == undefined || isNaN(player.currentY)) {
            player.currentY = player.y;
        }
        {
            var velocity = this.options.velocity;
            if (player.id == this.tagger) {
                velocity += this.options.tagger.boost
            }
            var dx = player.x - player.currentX;
            var dy = player.y - player.currentY;
            var norm = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
            if (norm > velocity) {
                var factor = velocity / norm;
                dx *= factor
                dy *= factor
                player.currentX += dx;
                player.currentY += dy;
            }
        }
    }.bind(this));
};
Game.prototype.tag = function(){
    var tagger = this.players[this.tagger];
    var radius = this.options.tagger.radius;
    this.forEachPlayer(function(player){

        if (player != tagger && distance(tagger, player) <= radius) {
            player.isTagged = true;
        }
    });
};
Game.prototype.reset = function(){
    this.forEachPlayer(function(player){ delete player.isTagged });
};
Game.prototype.state = function(){
    var players = []
    this.forEachPlayer(function(player){ players.push(player); });
    return {
        'tagger': players.filter(function(player){ return player.id == this.tagger }.bind(this)).map(toState),
        'players': players.filter(function(player){ return player.id != this.tagger && !player.isTagged }.bind(this)).map(toState),
        'tagged': players.filter(function(player){ return player.isTagged }).map(toState)
    }
};

module.exports = Game
