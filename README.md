# RSPath

A small simple library to easily get/set/delete items from JSON objects based on a path.

## Installation

    npm install rspath --save

## Usage

    var rspath = require('rspath');

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

## Tests

    npm test