var gulp = require('gulp');
var clean = require('gulp-clean');
var paths = require('../paths');
var del = require('del');
var vinylPaths = require('vinyl-paths');

// deletes all files generated through build and bundle tasks
gulp.task('clean', ['clean-manifestfile', 'unbundle'], function () {
  return gulp.src([paths.output])
    .pipe(vinylPaths(del));
});

gulp.task('clean-manifestfile', function () {
  return gulp.src(paths.root + '/manifest.json', { read: false })
    .pipe(clean());
});

gulp.task('clean-locales', function () {
  return gulp.src([paths.ressourcesRoot])
    .pipe(vinylPaths(del));
});

// deletes all files generated through export task
gulp.task('clean-export-chrome', function () {
  return gulp.src([paths.exportChrome])
    .pipe(vinylPaths(del));
});

gulp.task('clean-export-firefox', function () {
  return gulp.src([paths.exportFirefox])
    .pipe(vinylPaths(del));
});

gulp.task('remove-addon-chrome', function () {
  return gulp.src(paths.addonChrome)
    .pipe(clean());
});

gulp.task('remove-addon-firefox', function () {
  return gulp.src(paths.exportFirefox)
    .pipe(clean());
});
