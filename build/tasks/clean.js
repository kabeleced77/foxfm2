var gulp = require('gulp');
var clean = require('gulp-clean');
var paths = require('../paths');
var del = require('del');
var vinylPaths = require('vinyl-paths');

// deletes all files in the output path
gulp.task('clean', ['clean-manifestfile', 'unbundle'], function() {
  return gulp.src([paths.output])
    .pipe(vinylPaths(del));
});

gulp.task('clean-manifestfile', function () {
    return gulp.src(paths.root + '/manifest.json', {read: false})
        .pipe(clean());
});
