'use strict';

const gulp = require('gulp');
const runSequence = require('run-sequence');
const del = require('del');
const vinylPaths = require('vinyl-paths');
const jspm = require('jspm');
const paths = require('../paths');
const bundles = require('../bundles.js');
const resources = require('../export.js');

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

  let promises =  pathsToNormalize.map(pathSet => {
    const packageName = pathSet[ 0 ];
    const fileList = pathSet[ 1 ];

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
gulp.task('clean-export', function() {
  return gulp.src([ paths.exportSrv ])
    .pipe(vinylPaths(del));
});

gulp.task('export-copy-common', function() {
  return gulp.src(getExportListCommon(), { base: '.' })
    .pipe(gulp.dest(paths.exportSrv));
});

gulp.task('export-copy-bundles', function() {
  return gulp.src(getBundles(), { base: '.' })
    .pipe(gulp.dest(paths.exportSrv));
});

gulp.task('export-normalized-resources', function() {
  return normalizeExportPaths().then(normalizedPaths => {
    return gulp.src(normalizedPaths, { base: '.' })
      .pipe(gulp.dest(paths.exportSrv));
  });
});

// use after prepare-release
gulp.task('export-chrome', function(callback) {
  return runSequence(
    'bundle-chrome',
    'clean-export',
    'export-normalized-resources',
    'export-copy-common',
    'export-copy-bundles',
    callback
  );
});

// use after prepare-release
gulp.task('export-firefox', function(callback) {
  return runSequence(
    'bundle-firefox',
    'clean-export',
    'export-normalized-resources',
    'export-copy-common',
    'export-copy-bundles',
    callback
  );
});
