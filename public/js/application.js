(function(tag){
    var canvas = document.getElementById('playground');

    var game = new tag.Game();
    var view = new tag.GameView(game, canvas);
    function animate(){
        view.update();
        requestAnimationFrame(animate);
    }
    animate();

    var socket = io();
    socket.on('state', function(state){
        game.updateState(state);
    });

    function mouseMoveHandler(event){
        socket.emit('position', {
            'x': event.pageX - this.offsetLeft,
            'y': event.pageY - this.offsetTop
        });
    }
    canvas.addEventListener('mouseenter', function(){
        canvas.addEventListener('mousemove', mouseMoveHandler);
    });
    canvas.addEventListener('mouseleave', function(){
        canvas.removeEventListener('mousemove', mouseMoveHandler);
    });
})(tag);
