(function(tag){
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


    var Game = tag.Game = function(){
        this.updateState({
            'tagger': { 'x': 100, 'y': 100 },
            'players': [ { 'x': 300, 'y': 300 } ],
            'tagged': [ { 'x': 20, 'y': 50 }, { 'x': 80, 'y': 30 }]
        })
    };
    Game.prototype.updateState = function(state) {
        this.state = state;
    }

    var GameView = tag.GameView = function(game, canvas, options){
        this.options = extend(options || {}, { 'players' : { 'fillStyle': 'blue', 'radius': 10 }}
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
        var ctx = this.context; var options = this.options.tagged;
        ctx.fillStyle = options.fillStyle;
        ctx.beginPath();
        this.game.state.tagged.forEach(function(tag){
            ctx.arc(tag.x, tag.y, options.radius, 0, 2 * Math.PI);
        });
        ctx.fill();
    };
    GameView.prototype.paintPlayers = function(){
        var ctx = this.context; var options = this.options.players;
        ctx.fillStyle = options.fillStyle;
        ctx.beginPath();
        this.game.state.players.forEach(function(player){
            ctx.arc(player.x, player.y, options.radius, 0, 2 * Math.PI);
        });
        ctx.fill();
    };
    GameView.prototype.paintTagger = function(){
        var ctx = this.context; var tagger = this.game.state.tagger; var options = this.options.tagger;
        ctx.fillStyle = options.fillStyle;
        ctx.beginPath();
        ctx.arc(tagger.x, tagger.y, options.radius, 0, 2 * Math.PI);
        ctx.fill();
    }

})(window.tag = window.tag || {});
