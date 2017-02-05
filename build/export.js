// this file provides a list of unbundled files that
// need to be included when exporting the application
// for production.
module.exports = {
  'list_common': [
    '_locales/**',
    'favicon.ico',
    'foxfm16.png',
    'foxfm32.png',
    'foxfm64.png',
    'foxfm128.png',
    'styles/styles.css',
    'LICENSE',
    'config.js',
    "jspm_packages/npm/bluebird@3.4.1/js/browser/bluebird.min.js", 
    'jspm_packages/system-polyfills.js',
    'jspm_packages/system-csp-production.js',
    'manifest.json',
    'background.html',
    'settings.html',
    'loadContentScript.js',
    'loadAurelia.js',
    'loadBackground.js'
  ],
  // this section lists any jspm packages that have
  // unbundled resources that need to be exported.
  // these files are in versioned folders and thus
  // must be 'normalized' by jspm to get the proper
  // path.
  'normalize': [
    [
      // include font-awesome.css and its fonts files
      'font-awesome', [
        '/css/font-awesome.min.css',
        '/fonts/*'
      ]
    ], [
      // include bootstrap's font files
      'bootstrap', [
        '/fonts/*'
      ]
    ], [
      'bluebird', [
        '/js/browser/bluebird.min.js'
      ]
    ]
  ]
};
