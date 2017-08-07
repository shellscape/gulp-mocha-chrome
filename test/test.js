'use strict';

const expect = require('chai').expect;
const gutil = require('gulp-util');
const path = require('path');
const mochaChrome = require('../index');

describe ('gulp-mocha-chrome', function () {
  this.timeout(0);

  it('should pass when test passed', done => {
    let file = new gutil.File({ path: path.join(__dirname, 'html', 'pass.html') }),
      stream = mochaChrome({ mocha: { useColors: false }});

    stream.on('error', () => {
      expect.fail(undefined, undefined, 'should not emit error');
    });

    stream.on('finish', () => {
      done();
    });

    stream.write(file);
    stream.end();
  });

  it('should fail when tests failed', done => {
    let file = new gutil.File({ path: path.join(__dirname, 'html', 'fail.html') }),
      stream = mochaChrome({ mocha: { useColors: false }});

    stream.on('error', (err) => {
      expect(err.message).to.equal('mocha-chrome: 1 tests failed.');
      expect(err.plugin).to.equal(require('../package.json').name);
      done();
    });

    stream.write(file);
    stream.end();
  });

});
