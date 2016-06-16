var expect = require('expect.js');
var rspath = require('./');

describe('get', function () {
    it('simple existence', function () {
        var obj = {
            a: true
        };
        expect(rspath.pathGet(obj, 'a')).to.be(true);
    });

    it('simple non-existance', function () {
        var obj = {
            a: true
        };
        expect(rspath.pathGet(obj, 'b')).to.be(undefined);
    });

    it('simple get', function () {
        var obj = {
            a: true
        };
        expect(rspath.pathGet(obj, 'a')).to.equal(true);
    });

    it('simple set', function () {
        var obj = {
            a: true
        };
        rspath.pathSet(obj, 'a', false);
        expect(rspath.pathGet(obj, 'a')).to.equal(false);
    });

    it('simple delete', function () {
        var obj = {
            a: true
        };
        rspath.pathDelete(obj, 'a');
        expect(rspath.pathGet(obj, 'a')).to.be(undefined);
    });

});