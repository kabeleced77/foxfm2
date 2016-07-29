module.exports = {
  "bundles": {
    "dist/Scripts/app-common-build": {
      "includes": [
        "[Common/**/*.js]",
        "Common/**/*.html!text",
        "Common/**/*.css!text"
      ],
      "options": {
        "inject": true,
        "minify": false,
        "depCache": true,
        "rev": false
      }
    },
    "dist/Scripts/app-backgroundpage-build": {
      "includes": [
        "[BackgroundPage/**/*.js]",
        "BackgroundPage/**/*.html!text",
        "BackgroundPage/**/*.css!text"
      ],
      "options": {
        "inject": true,
        "minify": false,
        "depCache": true,
        "rev": false
      }
    },
    "dist/Scripts/app-settingspage-build": {
      "includes": [
        "[SettingsPage/**/*.js]",
        "SettingsPage/**/*.html!text",
        "SettingsPage/**/*.css!text"
      ],
      "options": {
        "inject": true,
        "minify": false,
        "depCache": true,
        "rev": false
      }
    },
    "dist/Scripts/aurelia": {
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
        "minify": true,
        "depCache": false,
        "rev": false
      }
    }
  }
};
