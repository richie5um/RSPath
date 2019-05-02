# RSPath

A small simple library to easily get/set/delete items from JSON objects based on a path.

## Installation

    npm install rspath --save

## Usage

    var rspath = require('rspath');

    // Simple

    var obj = {
        a: true
    };

    console.log(rspath.pathGet(obj, 'a'));

    rspath.pathSet(obj, 'a', false);
    console.log(rspath.pathGet(obj, 'a'));

    rspath.pathSet(obj, 'a', { hello: 'world' });
    console.log(rspath.pathGet(obj, 'a'));

    rspath.pathDelete(obj, 'a.hello');
    console.log(rspath.pathGet(obj, 'a.hello'));

    console.log(rspath.pathGet(obj, 'a'));

    // Arrays

    obj = {
        a: true,
        b: {
            ba: [],
            bb: [0, 1, 2, 3, 4]
        }
    };

    console.log(rspath.pathGet(obj, 'b'));
    console.log(rspath.pathGet(obj, 'b.bb'));
    console.log(rspath.pathGet(obj, 'b.bb[0]'));
    console.log(rspath.pathGet(obj, 'b.bb[1]'));
    console.log(rspath.pathGet(obj, 'b.bb[2]'));
    console.log(rspath.pathGet(obj, 'b.bb[3]'));
    console.log(rspath.pathGet(obj, 'b.bb[4]'));
    console.log(rspath.pathGet(obj, 'b/bb[4]', '/'));

    // Arrays and Objects

    obj = {
        a: true,
        b: {
            ba: [{
                baa: [0, 1, 2, 3, 4]
            }, {
                bab: [0, 1, 2, 3, 4]
            }]
        }
    };

    console.log(rspath.pathGet(obj, 'b'));
    console.log(rspath.pathGet(obj, 'b.ba[0].baa[3]'));
    console.log(rspath.pathGet(obj, 'b.ba[1].bab[4]'));
    console.log(rspath.pathGet(obj, 'b.ba[1].bab[5]'));
    console.log(rspath.pathGet(obj, 'b.ba[2]'));
    console.log(rspath.pathGet(obj, 'b.ba[2].bac[4]'));

## Tests

    npm test
