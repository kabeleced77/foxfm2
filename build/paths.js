var appName = "foxfm";
var chrome = "chrome";
var firefox = "firefox";
var appRoot = 'src/';
var outputRoot = 'dist/';
var exporLocalesRoot = '_locales/'

module.exports = {
  addonChrome: appName + "-" + chrome + ".crx",
  addonFirefox: appName + "-" + firefox + ".xpi",
  root: appRoot,
  source: appRoot + '**/*.ts',
  html: appRoot + '**/*.html',
  css: appRoot + '**/*.css',
  style: 'styles/**/*.css',
  ressourcesEn: 'ressources/**/*-en.json',
  ressourcesDe: 'ressources/**/*-de.json',
  ressourcesRoot: exporLocalesRoot,
  ressourcesEnDir: exporLocalesRoot + 'en',
  ressourcesDeDir: exporLocalesRoot + 'de',
  output: outputRoot,
  root: '.',
  exportChrome: "export-" + chrome,
  exportFirefox: "export-" + firefox,
  doc: './doc',
  e2eSpecsSrc: 'test/e2e/src/**/*.ts',
  e2eSpecsDist: 'test/e2e/dist/',
  dtsSrc: [
    './typings/**/*.d.ts',
    './custom_typings/**/*.d.ts'
  ]
}
