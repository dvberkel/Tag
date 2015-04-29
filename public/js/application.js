(function(tag){
    var canvas = document.getElementById('playground');

    var game = new tag.Game();

    var view = new tag.GameView(game, canvas);

    function animate(){
        view.update();
        requestAnimationFrame(animate);
    }
    animate();
})(tag);
