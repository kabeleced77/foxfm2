module.exports = {
  "bundles": {
    "dist/app-common-build": {
      "includes": [
        "[Common/**/*.js]"
      ],
      "options": {
        "inject": true,
        "minify": false,
        "depCache": false,
        "rev": false
      }
    },
    "dist/app-backgroundpage-build": {
      "includes": [
        "[BackgroundPage/**/*.js]"
      ],
      "options": {
        "inject": true,
        "minify": false,
        "depCache": false,
        "rev": false
      }
    },
    "dist/app-settingspage-build": {
      "includes": [
        "[SettingsPage/**/*.js]",
        "SettingsPage/**/*.html!text",
        "SettingsPage/**/*.css!text"
      ],
      "options": {
        "inject": true,
        "minify": false,
        "depCache": false,
        "rev": false
      }
    },
    "dist/app-contentscript-build": {
      "includes": [
        "[ContentScript/**/*.js]"
      ],
      "options": {
        "inject": true,
        "minify": false,
        "depCache": false,
        "rev": false
      }
    },
    "dist/aurelia": {
      "includes": [
        "aurelia-framework",
        "aurelia-bootstrapper",
        "aurelia-fetch-client",
        "aurelia-router",
        "aurelia-animator-css",
        "aurelia-templating-binding",
        "aurelia-polyfills",
        "aurelia-templating-resources",
        "aurelia-templating-router",
        "aurelia-loader-default",
        "aurelia-history-browser",
        "aurelia-logging-console",
        "bootstrap",
        "bootstrap/css/bootstrap.css!text",
        "fetch",
        "jquery"
      ],
      "options": {
        "inject": true,
        "minify": false,
        "depCache": false,
        "rev": false
      }
    }
  }
};
