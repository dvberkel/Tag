function extend(){
    var result = {};
    Array.prototype.slice.call(arguments).forEach(function(object){
        for (var key in object){
            if (result[key] == undefined) {
                result[key] = object[key];
            }
        }
    });
    return result;
};

function toState(player){
    return { id: player.id, x: player.currentX, y: player.currentY };
};

var Game = function(options){
    this.options = extend(options||{}, { velocity : 5 });
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
}
Game.prototype.forEachPlayer = function(callback){
    for(var id in this.players) {
        callback(this.players[id]);
    }
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
    this.forEachPlayer(function(player){
        player.x = player.x || 0; player.y = player.y || 0;
        if(player.currentX == undefined || isNaN(player.currentX)) {
            player.currentX = player.x;
        }
        if (player.currentY == undefined || isNaN(player.currentY)) {
            player.currentY = player.y;
        }
        {
            var dx = player.x - player.currentX;
            var dy = player.y - player.currentY;
            var norm = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
            if (norm > this.options.velocity) {
                var factor = this.options.velocity / norm;
                dx *= factor
                dy *= factor
                player.currentX += dx;
                player.currentY += dy;
            }
        }
    }.bind(this));
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
