var gulp = require('gulp');
var runSequence = require('run-sequence');
var changed = require('gulp-changed');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var paths = require('../paths');
var assign = Object.assign || require('object.assign');
var notify = require('gulp-notify');
var browserSync = require('browser-sync');
var typescript = require('gulp-typescript');
var htmlmin = require('gulp-htmlmin');
var merge = require('gulp-merge-json');

// transpiles changed es6 files to SystemJS format
// the plumber() call prevents 'pipe breaking' caused
// by errors from other gulp plugins
// https://www.npmjs.com/package/gulp-plumber
var typescriptCompiler = typescriptCompiler || null;
gulp.task('build-system', function() {
  if(!typescriptCompiler) {
    typescriptCompiler = typescript.createProject('tsconfig.json', {
      "typescript": require('typescript')
    });
  }
  return gulp.src(paths.dtsSrc.concat(paths.source))
    .pipe(plumber())
    .pipe(changed(paths.output, {extension: '.ts'}))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(typescript(typescriptCompiler))
    .pipe(sourcemaps.write('.', {includeContent: false, sourceRoot: '/src'}))
    .pipe(gulp.dest(paths.output));
});

gulp.task('build-manifest', function() {
  gulp.src('configurations/**/*.json')
    .pipe(merge('manifest.json'))
    .pipe(gulp.dest('./dist')); 
});

gulp.task('build-locales-en', function() {
  gulp.src('src/**/*-en.json')
    .pipe(merge('messages.json'))
    .pipe(gulp.dest('./dist/_locales/en')); 
});

gulp.task('build-locales-de', function() {
  gulp.src('src/**/*-de.json')
    .pipe(merge('messages.json'))
    .pipe(gulp.dest('./dist/_locales/de')); 
});

gulp.task('build-systemjs-config', function() {
  gulp.src('./config.js')
    .pipe(gulp.dest('./dist')); 
});

// copies changed html files to the output directory
gulp.task('build-html', function() {
  return gulp.src(paths.html)
    .pipe(changed(paths.output, {extension: '.html'}))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(paths.output));
});

// copies changed css files to the output directory
gulp.task('build-css', function() {
  return gulp.src(paths.css)
    .pipe(changed(paths.output, {extension: '.css'}))
    .pipe(gulp.dest(paths.output))
    .pipe(browserSync.stream());
});

// this task calls the clean task (located
// in ./clean.js), then runs the build-system
// and build-html tasks in parallel
// https://www.npmjs.com/package/gulp-run-sequence
gulp.task('build', function(callback) {
  return runSequence(
    'clean',
    ['build-system',
     'build-locales-en',
     'build-locales-de',
     'build-manifest',
     'build-systemjs-config',
     'build-html',
     'build-css'],
    callback
  );
});
