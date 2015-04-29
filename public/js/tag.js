(function(tag){
    var Game = tag.Game = function(state){
	this.updateState(state)
    };
    Game.prototype.updateState = function(state) {
	this.state = state;
    }

    var GameView = tag.GameView = function(game, canvas){
	this.game = game;
	this.canvas = canvas;
	this.context = this.canvas.getContext('2d');
    }
    GameView.prototype.update = function(){
	this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };

})(window.tag = window.tag || {});
