'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');
const mochaChrome = require('./');

gulp.task('lint', () => {
  return gulp
    .src(['**/*.js', '!node_modules/**'])
    .pipe(eslint());
});

gulp.task('test', ['lint'], () => {
  return gulp
    .src('test/test.js')
    .pipe(mocha({reporter: 'spec'}));
});

gulp.task('run:pass', () => {
  return gulp
    .src('test/fixture-pass.html')
    .pipe(mochaChrome({reporter: 'spec'}));
});

gulp.task('run:http', () => {
  var stream = mochaChrome();
  stream.write({path: 'http://localhost:8000/test/fixture-pass.html'});
  stream.end();
  return stream;
});

gulp.task('default', ['test']);
