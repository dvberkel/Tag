(function(tag){
    var canvas = document.getElementById('playground');

    var game = new tag.Game();

    var view = new tag.GameView(game, canvas);

    function animate(){
        view.update();
        requestAnimationFrame(animate);
    }
    animate();

    function mouseMoveHandler(event){
        var state = game.state;
        state.tagger = { 'x': event.x, 'y': event.y };
        game.updateState(state);
    }
    canvas.addEventListener('mouseenter', function(){
        canvas.addEventListener('mousemove', mouseMoveHandler);
    });
    canvas.addEventListener('mouseleave', function(){
        canvas.removeEventListener('mousemove', mouseMoveHandler);
    });
})(tag);
