'use strict';

const gulp = require('gulp');
const runSequence = require('run-sequence');
const del = require('del');
const vinylPaths = require('vinyl-paths');
const jspm = require('jspm');
const paths = require('../paths');
const bundles = require('../bundles.js');
const resources = require('../export.js');
const zip = require('gulp-zip');

function getBundles() {
  let bl = [];
  for (let b in bundles.bundles) {
    bl.push(b + '*.js');
  }
  return bl;
}

function getExportListCommon() {
  return resources.list_common.concat();
}

function normalizeExportPaths() {
  const pathsToNormalize = resources.normalize;

  let promises = pathsToNormalize.map(pathSet => {
    const packageName = pathSet[0];
    const fileList = pathSet[1];

    return jspm.normalize(packageName).then((normalized) => {
      const packagePath = normalized.substring(normalized.indexOf('jspm_packages'), normalized.lastIndexOf('.js'));
      return fileList.map(file => packagePath + file);
    });
  });

  return Promise.all(promises)
    .then((normalizedPaths) => {
      return normalizedPaths.reduce((prev, curr) => prev.concat(curr), []);
    });
}

// deletes all files in the output path
gulp.task('clean-export-chrome', function () {
  return gulp.src([paths.exportChrome])
    .pipe(vinylPaths(del));
});

gulp.task('clean-export-firefox', function () {
  return gulp.src([paths.exportFirefox])
    .pipe(vinylPaths(del));
});

gulp.task('export-copy-common-chrome', function () {
  return gulp.src(getExportListCommon(), { base: '.' })
    .pipe(gulp.dest(paths.exportChrome));
});

gulp.task('export-copy-bundles-chrome', function () {
  return gulp.src(getBundles(), { base: '.' })
    .pipe(gulp.dest(paths.exportChrome));
});

gulp.task('export-normalized-resources-chrome', function () {
  return normalizeExportPaths().then(normalizedPaths => {
    return gulp.src(normalizedPaths, { base: '.' })
      .pipe(gulp.dest(paths.exportChrome));
  });
});

gulp.task('export-copy-common-firefox', function () {
  return gulp.src(getExportListCommon(), { base: '.' })
    .pipe(gulp.dest(paths.exportFirefox));
});

gulp.task('export-copy-bundles-firefox', function () {
  return gulp.src(getBundles(), { base: '.' })
    .pipe(gulp.dest(paths.exportFirefox));
});

gulp.task('export-normalized-resources-firefox', function () {
  return normalizeExportPaths().then(normalizedPaths => {
    return gulp.src(normalizedPaths, { base: '.' })
      .pipe(gulp.dest(paths.exportFirefox));
  });
});

gulp.task('create-addon-chrome', function () {
  return gulp.src(paths.exportChrome + "/**")
    .pipe(zip(paths.addonChrome))
    .pipe(gulp.dest("."));
});

gulp.task('create-addon-firefox', function () {
  return gulp.src(paths.exportFirefox + "/**")
    .pipe(zip(paths.addonFirefox))
    .pipe(gulp.dest("."));
});

// use after prepare-release
gulp.task('export-chrome', function (callback) {
  return runSequence(
    'bundle-chrome',
    'clean-export-chrome',
    'remove-addon-chrome',
    'export-normalized-resources-chrome',
    'export-copy-common-chrome',
    'export-copy-bundles-chrome',
    'create-addon-chrome',
    callback
  );
});

// use after prepare-release
gulp.task('export-firefox', function (callback) {
  return runSequence(
    'bundle-firefox',
    'clean-export-firefox',
    'remove-addon-firefox',
    'export-normalized-resources-firefox',
    'export-copy-common-firefox',
    'export-copy-bundles-firefox',
    'create-addon-firefox',
    callback
  );
});
