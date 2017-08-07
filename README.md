# gulp-mocha-phantomjs

:coffee:  Run Mocha tests using headless Google Chrome through Gulp

[![Build Status](https://travis-ci.org/shellscape/gulp-mocha-chrome.svg?branch=master)](https://travis-ci.org/shellscape/gulp-mocha-chrome)
[![Known Vulnerabilities](https://snyk.io/test/github/shellscape/gulp-mocha-chrome/badge.svg)](https://snyk.io/test/github/shellscape/gulp-mocha-chrome)
[![npm version](https://badge.fury.io/js/gulp-mocha-chrome.svg)](https://badge.fury.io/js/gulp-mocha-chrome)
[![GitHub version](https://badge.fury.io/gh/shellscape%2Fmocha-chrome.svg)](http://badge.fury.io/gh/shellscape%2Fmocha-chrome)
[![Open Source Love](https://badges.frapsoft.com/os/mit/mit.svg?v=102)](https://github.com/ellerbrock/open-source-badge/)
[![Dependency Status](https://david-dm.org/shellscape/gulp-mocha-chrome.svg)](https://david-dm.org/shellscape/gulp-mocha-chrome)
[![devDependencies Status](https://david-dm.org/shellscape/gulp-mocha-chrome/dev-status.svg)](https://david-dm.org/shellscape/gulp-mocha-chrome?type=dev)

## Getting Started

To begin, you'll need to install `gulp-mocha-chrome`:

```console
$ npm install gulp-mocha-chrome --save-dev
```

Then you'll need a local npm install of mocha for your test html files to reference:

```console
$ npm install mocha --save-dev
```

To run the tests, you'll need an HTML file with some basics:

```html
<!doctype>
<html>
  <head>
    <title>Test</title>
    <meta charset="utf-8">
    <link rel="stylesheet" href="node_modules/mocha/mocha.css" />
    <script src="node_modules/mocha/mocha.js"></script>
    <script src="node_modules/chai/chai.js"></script>
  </head>
  <body>
    <div id="mocha"></div>
    <script>
      expect = chai.expect;

      // add tests here

      mocha.run();
    </script>
  </body>
</html>

```

You can then add your tests either through an external script file or
inline within a `<script>` tag.

## Gulpfile

Next, you'll need to add the tests to your gulpfile.js.

```js
const gulp = require('gulp');
const mochaChrome = require('gulp-mocha-chrome');

gulp.task('test', function () {
  return gulp
    .src('test/runner.html')
    .pipe(mochaChrome());
});
```

### Remote URLs

Because `mocha-chrome` uses the Chrome Devtools Protocol under the hood, you can
also connect to remote (or locally served) urls for testing. eg:

```js
gulp.task('test', function () {
  const stream = mochaPhantomJS();
  stream.write({path: 'http://localhost:8000/index.html'});
  stream.end();
  return stream;
});
```

## Mocha Test Stats

If you're using a Gulp plugin like [gulp-tap](https://www.npmjs.com/package/gulp-tap)
to inspect the results after the tests run, you can access the Mocha results for
individual file via the `file.mocha` property. eg:

```js
gulp.src('test/runner.html')
  .pipe(mochaChrome())
  .pipe(tap(function(file, t) {
      file.mocha;
  }));

/*
file.mocha -> {
  stats:
  {
    suites: 2,
    tests: 2,
    passes: 2,
    pending: 0,
    failures: 0,
    start: '2017-08-07T14:50:33.989Z',
    end: '2017-08-07T14:50:34.003Z',
    duration: 14
  }
}
*/
```

## Contributing

We welcome your contributions! Please have a read of [CONTRIBUTING](CONTRIBUTING.md).
