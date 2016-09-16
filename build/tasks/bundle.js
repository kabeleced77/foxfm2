var gulp = require('gulp');
var bundler = require('aurelia-bundler');
var bundles = require('../bundles.js');
var paths = require('../paths.js');

var config = {
  force: true,
  baseURL: '.',
  configPath: './config.js',
  bundles: bundles.bundles
};

gulp.task('bundle-chrome', ['build-chrome'], function() {
  return bundler.bundle(config);
});

gulp.task('bundle-firefox', ['build-firefox'], function() {
  return bundler.bundle(config);
});

gulp.task('unbundle', function() {
  return bundler.unbundle(config);
});
