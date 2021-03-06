var gulp = require('gulp');
var paths = require('../paths');

// outputs changes to files to the console
function reportChange(event) {
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
}

// this task will watch for changes
// to js, html, css and ressource files and call the
// reportChange method. Also, by depending on the
//   --> deactivated as not usable when developing a WebExtension
// gulp.task('watch-chrome', ['serve'], function() {
gulp.task('watch-chrome', function() {
  gulp.watch(paths.source, ['bundle-chrome']).on('change', reportChange);
  gulp.watch(paths.html, ['bundle-chrome']).on('change', reportChange);
  gulp.watch(paths.ressourcesDe, ['bundle-chrome']).on('change', reportChange);
  gulp.watch(paths.ressourcesEn, ['bundle-chrome']).on('change', reportChange);
});

// this task wil watch for changes
// to js, html, and css files and call the
// reportChange method. Also, by depending on the
//   --> deactivated as not usable when developing a WebExtension
// gulp.task('watch-firefox', ['serve'], function() {
gulp.task('watch-firefox', function() {
  gulp.watch(paths.source, ['bundle-firefox']).on('change', reportChange);
  gulp.watch(paths.html, ['bundle-firefox']).on('change', reportChange);
  gulp.watch(paths.ressourcesDe, ['bundle-chrome']).on('change', reportChange);
  gulp.watch(paths.ressourcesEn, ['bundle-chrome']).on('change', reportChange);
});
