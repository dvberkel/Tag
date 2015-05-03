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
}

var Game = function(options){
    this.options = extend(options||{}, { velocity : 5 });
    this.players = {};
}
Game.prototype.addPlayer = function(id){
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
        if (player.currentX == undefined && player.currentY == undefined) {
            player.currentX = player.x || 0;
            player.currentY = player.y || 0;
        } else {
            var dx = player.x - player.currentX;
            var dy = player.y - player.currentY;
            var norm = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
            var factor = this.options.velocity / norm;
            dx *= factor
            dy *= factor
            player.currentX += dx;
            player.currentY += dy;
        }
    }.bind(this));
};

module.exports = Game
