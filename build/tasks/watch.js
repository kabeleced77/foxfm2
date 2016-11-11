var gulp = require('gulp');
var paths = require('../paths');
var browserSync = require('browser-sync');
var merge = require('gulp-merge-json');

// outputs changes to files to the console
function reportChange(event) {
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
}

// this task wil watch for changes
// to js, html, and css files and call the
// reportChange method. Also, by depending on the
// serve task, it will instantiate a browserSync session
// gulp.task('watch-chrome', ['serve'], function() {
gulp.task('watch-chrome', function() {
  gulp.watch(paths.source, ['bundle-chrome']).on('change', reportChange);
  gulp.watch(paths.html, ['bundle-chrome']).on('change', reportChange);
  gulp.watch(paths.style, browserSync.reload).on('change', reportChange);
});

// this task wil watch for changes
// to js, html, and css files and call the
// reportChange method. Also, by depending on the
// serve task, it will instantiate a browserSync session
// gulp.task('watch-firefox', ['serve'], function() {
gulp.task('watch-firefox', function() {
  gulp.watch(paths.source, ['bundle-firefox']).on('change', reportChange);
  gulp.watch(paths.html, ['bundle-firefox']).on('change', reportChange);
  gulp.watch(paths.style, browserSync.reload).on('change', reportChange);
});
