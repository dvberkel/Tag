(function(tag){
    var socket = io();
    var canvas = document.getElementById('playground');

    var game = new tag.Game();

    var view = new tag.GameView(game, canvas);

    function animate(){
        view.update();
        requestAnimationFrame(animate);
    }
    animate();

    function mouseMoveHandler(event){
        socket.emit('position', {
            'x': event.pageX - this.offsetLeft,
            'y': event.pageY - this.offsetTop
        });
        var state = game.state ;
        state.tagger = [{
            'x': event.pageX - this.offsetLeft,
            'y': event.pageY - this.offsetTop
        }];
        game.updateState(state);
    }
    canvas.addEventListener('mouseenter', function(){
        canvas.addEventListener('mousemove', mouseMoveHandler);
    });
    canvas.addEventListener('mouseleave', function(){
        canvas.removeEventListener('mousemove', mouseMoveHandler);
    });
})(tag);
