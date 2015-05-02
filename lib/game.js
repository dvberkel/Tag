var Game = function(){
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

module.exports = Game
