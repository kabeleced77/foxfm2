var gulp = require('gulp');
var runSequence = require('run-sequence');
var changed = require('gulp-changed');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var paths = require('../paths');
var assign = Object.assign || require('object.assign');
var typescript = require('gulp-typescript');
var htmlmin = require('gulp-htmlmin');
var merge = require('gulp-merge-json');
const tsNameof = require("ts-nameof");

// transpiles changed es6 files to SystemJS format
// the plumber() call prevents 'pipe breaking' caused
// by errors from other gulp plugins
// https://www.npmjs.com/package/gulp-plumber
var typescriptCompiler = typescriptCompiler || null;
gulp.task('build-system', function () {
  if (!typescriptCompiler) {
    typescriptCompiler = typescript.createProject('tsconfig.json', {
      "typescript": require('typescript'),
      getCustomTransformers: () => ({ before: [tsNameof] })
    });
  }
  return typescriptCompiler.src()
    .pipe(plumber())
    .pipe(changed(paths.output, { extension: '.ts' }))
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(typescriptCompiler())
    .pipe(sourcemaps.write('.', { includeContent: false, sourceRoot: '/src' }))
    .pipe(gulp.dest(paths.output));
});

var mergeFileManifest = { fileName: 'manifest.json' };
gulp.task('build-manifest-chrome', function () {
  gulp.src('configurations/manifest-base.json')
    .pipe(merge(mergeFileManifest))
    .pipe(gulp.dest(paths.root));
});

gulp.task('build-manifest-firefox', function () {
  gulp.src('configurations/**/*.json')
    .pipe(merge(mergeFileManifest))
    .pipe(gulp.dest(paths.root));
});

var mergeFileMessage = { fileName: 'messages.json' };
gulp.task('build-locales-en', function () {
  gulp.src(paths.ressourcesEn)
    .pipe(merge(mergeFileMessage))
    .pipe(gulp.dest(paths.ressourcesEnDir));
});

gulp.task('build-locales-de', function () {
  gulp.src(paths.ressourcesDe)
    .pipe(merge(mergeFileMessage))
    .pipe(gulp.dest(paths.ressourcesDeDir));
});

// copies changed html files to the output directory
gulp.task('build-html', function () {
  return gulp.src(paths.html)
    .pipe(changed(paths.output, { extension: '.html' }))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(paths.output));
});

// copies changed css files to the output directory
gulp.task('build-css', function () {
  return gulp.src(paths.css)
    .pipe(changed(paths.output, { extension: '.css' }))
    .pipe(gulp.dest(paths.output));
});

// this task calls the clean task (located
// in ./clean.js), then runs the build-system
// and build-html tasks in parallel
// https://www.npmjs.com/package/gulp-run-sequence
gulp.task('build-chrome', function (callback) {
  return runSequence(
    'clean',
    ['build-system',
      'build-locales-en',
      'build-locales-de',
      'build-manifest-chrome',
      'build-html',
      'build-css'],
    callback
  );
});

// this task calls the clean task (located
// in ./clean.js), then runs the build-system
// and build-html tasks in parallel
// https://www.npmjs.com/package/gulp-run-sequence
gulp.task('build-firefox', function (callback) {
  return runSequence(
    'clean',
    ['build-system',
      'build-locales-en',
      'build-locales-de',
      'build-manifest-firefox',
      'build-html',
      'build-css'],
    callback
  );
});
