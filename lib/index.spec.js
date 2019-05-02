var expect = require('expect.js');
var rspath = require('./');

describe('simple', function () {
  it('existence', function () {
    var obj = {
      a: true
    };
    expect(rspath.pathGet(obj, 'a')).to.be(true);
  });

  it('non-existance', function () {
    var obj = {
      a: true
    };
    expect(rspath.pathGet(obj, 'b')).to.be(undefined);
  });

  it('get', function () {
    var obj = {
      a: true
    };
    expect(rspath.pathGet(obj, 'a')).to.equal(true);
  });

  it('set', function () {
    var obj = {
      a: true
    };
    rspath.pathSet(obj, 'a', false);
    expect(rspath.pathGet(obj, 'a')).to.equal(false);
  });

  it('delete', function () {
    var obj = {
      a: true
    };
    rspath.pathDelete(obj, 'a');
    expect(rspath.pathGet(obj, 'a')).to.be(undefined);
  });
});

describe('simple object', function () {
  it('get', function () {
    var obj = {
      a: true,
      b: {
        ba: true,
        bb: {
          bba: 'test'
        }
      }
    };
    expect(rspath.pathGet(obj, 'b')).to.equal(obj.b);
    expect(rspath.pathGet(obj, 'b.bb')).to.equal(obj.b.bb);
    expect(rspath.pathGet(obj, 'b.bb.bba')).to.equal('test');
  });
});

describe('slash separator', function () {
  it('get', function () {
    var obj = {
      a: true,
      b: {
        ba: true,
        bb: {
          bba: 'test'
        }
      }
    };
    expect(rspath.pathGet(obj, 'b', '/')).to.equal(obj.b);
    expect(rspath.pathGet(obj, 'b/bb', '/')).to.equal(obj.b.bb);
    expect(rspath.pathGet(obj, 'b/bb/bba', '/')).to.equal('test');
  });

  it('set', function () {
    var obj = {};
    rspath.pathSet(obj, 'b', true, '/');
    rspath.pathSet(obj, 'b/bb', 'hello', '/');
    rspath.pathSet(obj, 'a/aa', 'world', '/');
    rspath.pathSet(obj, 'c/cc', 'hello', '/');
    rspath.pathSet(obj, 'c.cc', 'hello!', '.');
    expect(rspath.pathGet(obj, 'b.bb')).to.equal('hello');
    expect(rspath.pathGet(obj, 'b/bb', '/')).to.equal('hello');
    expect(rspath.pathGet(obj, 'a.aa')).to.equal('world');
    expect(rspath.pathGet(obj, 'a/aa', '/')).to.equal('world');
    expect(rspath.pathGet(obj, 'c/cc', '/')).to.equal('hello!');
  });
});

describe('simple array', function () {
  it('get', function () {
    var obj = {
      a: true,
      b: {
        ba: [],
        bb: [0, 1, 2, 3, 4]
      }
    };
    expect(rspath.pathGet(obj, 'b')).to.equal(obj.b);
    expect(rspath.pathGet(obj, 'b.bb')).to.equal(obj.b.bb);
    expect(rspath.pathGet(obj, 'b.bb[0]')).to.equal(0);
    expect(rspath.pathGet(obj, 'b.bb[1]')).to.equal(1);
    expect(rspath.pathGet(obj, 'b.bb[2]')).to.equal(2);
    expect(rspath.pathGet(obj, 'b.bb[3]')).to.equal(3);
    expect(rspath.pathGet(obj, 'b.bb[4]')).to.equal(4);
  });
});

describe('complex array', function () {
  it('get', function () {
    var obj = {
      a: true,
      b: {
        ba: [{
          baa: [0, 1, 2, 3, 4]
        }, {
          bab: [0, 1, 2, 3, 4]
        }]
      }
    };
    expect(rspath.pathGet(obj, 'b')).to.equal(obj.b);
    expect(rspath.pathGet(obj, 'b.ba[0].baa[3]')).to.equal(3);
    expect(rspath.pathGet(obj, 'b.ba[1].bab[4]')).to.equal(4);
    expect(rspath.pathGet(obj, 'b.ba[1].bab[5]')).to.equal(undefined);
    expect(rspath.pathGet(obj, 'b.ba[2]')).to.equal(undefined);
    expect(rspath.pathGet(obj, 'b.ba[2].bac[4]')).to.equal(undefined);
  });
});