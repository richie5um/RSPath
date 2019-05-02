var rspath = require('./');

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
