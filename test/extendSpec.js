var expect = require('chai').expect;

var extend = require('../lib/extend');

describe('extend', function(){
    var original;

    beforeEach(function(){
        original = { 'a': 1 };
    });

    it('should exist', function(){
        expect(extend).to.exist;
    });

    it('should clone an object', function(){
        var clone = extend(original);

        expect(clone).to.eql({ 'a': 1 });
    });

    it('should extend it with defaults', function(){
        var clone = extend(original, { 'b': 2 }, { 'c': 3 });

        expect(clone).to.eql({ 'a': 1, 'b': 2, 'c': 3 });
    });

    it('should first default determines value', function(){
        var clone = extend(original, { 'a': 2, 'b': 2 }, { 'b': 3 });

        expect(clone).to.eql({ 'a': 1, 'b': 2 });
    });

    it('should fill object values recursively', function(){
        var clone = extend({ 'a': {} },
                           { 'a': { 'b': 1, 'c': {} } },
                           { 'a': { 'c': { 'd': 2 } } });

        expect(clone).to.eql({ 'a': { 'b': 1, 'c': { 'd': 2 } } });
    });
});
