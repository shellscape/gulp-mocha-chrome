'use strict';

const fileUrl = require('file-url');
const fs = require('fs');
const gutil = require('gulp-util');
const path = require('path');
const through = require('through2');
const url = require('url');
const MochaChrome = require('mocha-chrome');

const pluginName = require('./package.json').name;

module.exports = function mochaChrome (options) {
  const opts = Object.assign({
    logLevel: 'error',
    mocha: {
      reporter: 'spec'
    }
  }, options);

  /* eslint-disable prefer-arrow-callback */
  return through.obj(function (file, enc, cb) {

    if (file.isStream()) {
      cb(new gutil.PluginError('gulp-mocha-chrome', 'Streaming not supported'));
      return;
    }

    file.mocha = {};
    opts.url = toURL(file.path);

    const runner = new MochaChrome(opts);

    runner.on('ended', stats => {
      file.mocha = { stats };

      if (stats.failures) {
        cb(new gutil.PluginError('gulp-mocha-chrome', `mocha-chrome: ${stats.failures} tests failed.`));
        return;
      }

      cb();
    });

    runner.on('failure', message => {
      cb(new gutil.PluginError('gulp-mocha-chrome', `mocha-chrome: ${message}`));
      return;
    });

    async function run (done) {
      await runner.connect();
      await runner.run();

      done();
    }

    run(function () {
      this.push(file);
    }.bind(this));

  });
};

function toURL (path) {
  var parsed = url.parse(path, true);

  if (['http:', 'https:', 'file:'].indexOf(parsed.protocol) > -1) {
    return url.format(parsed);
  }
  else {
    return fileUrl(url.format(parsed));
  }
}
