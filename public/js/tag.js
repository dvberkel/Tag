(function(tag){
    function extend(){
        var result = {};
        Array.prototype.slice.call(arguments).forEach(function(object){
            for (var key in object){
                if (result[key] == undefined) {
                    result[key] = object[key];
                } else if(typeof result[key] == 'object' && typeof object[key] == 'object') {
                    result[key] = extend(result[key], object[key]);
                }
            }
        });
        return result;
    };

    var Game = tag.Game = function(){
        this.updateState({
            'tagger': [],
            'players': [],
            'tagged': []
        })
    };
    Game.prototype.updateState = function(state) {
        this.state = state;
    }

    var GameView = tag.GameView = function(game, canvas, options){
        this.options = extend(options || {}
                              , { 'players' : { 'fillStyle': 'blue', 'radius': 10 }}
                              , { 'tagger': { 'fillStyle': 'orange', 'radius': 50 }}
                              , { 'tagged': { 'fillStyle': 'gray', 'radius': 5 }});
        this.game = game;
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d');
    }
    GameView.prototype.update = function(){
        this.clear()
        this.paintTagged();
        this.paintTagger();
        this.paintPlayers();
    };
    GameView.prototype.clear = function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };
    GameView.prototype.paintTagged = function(){
        this.paintObjects(this.game.state.tagged, this.options.tagged);
    };
    GameView.prototype.paintTagger = function(){
        this.paintObjects(this.game.state.tagger, this.options.tagger);
    }
    GameView.prototype.paintPlayers = function(){
        this.paintObjects(this.game.state.players, this.options.players);
    };
    GameView.prototype.paintObjects = function(objects, options){
        var ctx = this.context;
        ctx.fillStyle = options.fillStyle;
        ctx.beginPath();
        objects.forEach(function(object){
            ctx.arc(object.x, object.y, options.radius, 0, 2 * Math.PI);
        });
        ctx.fill();
    };
})(window.tag = window.tag || {});
