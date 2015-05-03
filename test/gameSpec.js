var expect = require('chai').expect;

var Game = require('../lib/game');

describe('Game', function(){
    it('should be created', function(){
        expect(new Game()).to.exist;
    });

    describe('players', function(){
        var game;

        beforeEach(function(){
            game = new Game();
        });

        it('should add them', function(){
            game.addPlayer('socket-id');

            var count = 0;
            game.forEachPlayer(function(player){
                count++
            });

            expect(count).to.equal(1);
        });

        it('should remove them', function(){
            game.addPlayer('lost-socket-id');
            game.addPlayer('found-socket-id');
            game.removePlayer('lost-socket-id');

            var count = 0; var foundSocketId;
            game.forEachPlayer(function(player){
                count++
                foundSocketId = player.id;
            });

            expect(count).to.equal(1);
            expect(foundSocketId).to.equal('found-socket-id');
        });
    });

    describe('update', function(){
        var id = 'socket-id-1';
        var game;

        beforeEach(function(){
            game = new Game();
            game.addPlayer(id);
        });

        it('should update the position of a player', function(){
            game.update(id, { x: 0, y: 1 });

            var data = undefined;
            game.forEachPlayer(function(player){
                data = player;
            });

            expect(data.x).to.equal(0);
            expect(data.y).to.equal(1);
        });
    });

    describe('tick', function(){
        var id = 'socket-id-1';
        var game;

        beforeEach(function(){
            game = new Game({velocity: 7});
            game.addPlayer(id);
        });

        it('should provide players with current position if it is missing', function(){
            game.update(id, { x: 0, y: 0 });
            game.tick();

            var data = undefined;
            game.forEachPlayer(function(player){
                data = player;
            });

            expect(data.currentX).to.equal(0);
            expect(data.currentY).to.equal(0);
        });

        it('should move players towards target', function(){
            game.update(id, { currentX: 0, currentY: 0 });
            game.update(id, { x: 10, y: 0 });
            game.tick();

            var data = undefined;
            game.forEachPlayer(function(player){
                data = player;
            });

            expect(data.currentX).to.equal(7);
            expect(data.currentY).to.equal(0);
        });
    });

    describe('state', function(){
        var id = 'socket-id-1';
        var game;

        beforeEach(function(){
            game = new Game();
            game.addPlayer(id);
            game.update(id, { x: 0, y: 0 });
            game.tick();
        });

        it('first player should be tagger', function(){
            var state = game.state();

            expect(state.tagger[0]).to.eql({ id: id, x: 0, y: 0 });
        });
    });
});
