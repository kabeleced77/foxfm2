System.config({
  defaultJSExtensions: true,
  transpiler: false,
  paths: {
    "*": "Scripts/*",
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*"
  },
  meta: {
    "bootstrap": {
      "deps": [
        "jquery"
      ]
    }
  },
  map: {
    "aurelia-animator-css": "npm:aurelia-animator-css@1.0.0-rc.1.0.0",
    "aurelia-bootstrapper": "npm:aurelia-bootstrapper@1.0.0-rc.1.0.0",
    "aurelia-fetch-client": "npm:aurelia-fetch-client@1.0.0-rc.1.0.1",
    "aurelia-framework": "npm:aurelia-framework@1.0.0-rc.1.0.11",
    "aurelia-history": "npm:aurelia-history@1.0.0-rc.1.0.0",
    "aurelia-history-browser": "npm:aurelia-history-browser@1.0.0-rc.1.0.0",
    "aurelia-loader-default": "npm:aurelia-loader-default@1.0.0-rc.1.0.0",
    "aurelia-logging-console": "npm:aurelia-logging-console@1.0.0-rc.1.0.0",
    "aurelia-pal-browser": "npm:aurelia-pal-browser@1.0.0-rc.1.0.0",
    "aurelia-polyfills": "npm:aurelia-polyfills@1.0.0-rc.1.0.0",
    "aurelia-router": "npm:aurelia-router@1.0.0-rc.1.0.0",
    "aurelia-templating-binding": "npm:aurelia-templating-binding@1.0.0-rc.1.0.0",
    "aurelia-templating-resources": "npm:aurelia-templating-resources@1.0.0-rc.1.0.0",
    "aurelia-templating-router": "npm:aurelia-templating-router@1.0.0-rc.1.0.0",
    "bluebird": "npm:bluebird@3.4.1",
    "bootstrap": "github:twbs/bootstrap@3.3.7",
    "fetch": "github:github/fetch@1.0.0",
    "font-awesome": "npm:font-awesome@4.6.3",
    "jquery": "npm:jquery@2.2.4",
    "text": "github:systemjs/plugin-text@0.0.8",
    "github:jspm/nodelibs-assert@0.1.0": {
      "assert": "npm:assert@1.4.1"
    },
    "github:jspm/nodelibs-buffer@0.1.0": {
      "buffer": "npm:buffer@3.6.0"
    },
    "github:jspm/nodelibs-process@0.1.2": {
      "process": "npm:process@0.11.5"
    },
    "github:jspm/nodelibs-util@0.1.0": {
      "util": "npm:util@0.10.3"
    },
    "github:jspm/nodelibs-vm@0.1.0": {
      "vm-browserify": "npm:vm-browserify@0.0.4"
    },
    "github:twbs/bootstrap@3.3.7": {
      "jquery": "npm:jquery@2.2.4"
    },
    "npm:assert@1.4.1": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "util": "npm:util@0.10.3"
    },
    "npm:aurelia-animator-css@1.0.0-rc.1.0.0": {
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-rc.1.0.1",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-rc.1.0.0",
      "aurelia-templating": "npm:aurelia-templating@1.0.0-rc.1.0.3"
    },
    "npm:aurelia-binding@1.0.0-rc.1.0.4": {
      "aurelia-logging": "npm:aurelia-logging@1.0.0-rc.1.0.1",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-rc.1.0.1",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-rc.1.0.0",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.0.0-rc.1.0.0"
    },
    "npm:aurelia-bootstrapper@1.0.0-rc.1.0.0": {
      "aurelia-event-aggregator": "npm:aurelia-event-aggregator@1.0.0-rc.1.0.0",
      "aurelia-framework": "npm:aurelia-framework@1.0.0-rc.1.0.11",
      "aurelia-history": "npm:aurelia-history@1.0.0-rc.1.0.0",
      "aurelia-history-browser": "npm:aurelia-history-browser@1.0.0-rc.1.0.0",
      "aurelia-loader-default": "npm:aurelia-loader-default@1.0.0-rc.1.0.0",
      "aurelia-logging-console": "npm:aurelia-logging-console@1.0.0-rc.1.0.0",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-rc.1.0.0",
      "aurelia-pal-browser": "npm:aurelia-pal-browser@1.0.0-rc.1.0.0",
      "aurelia-polyfills": "npm:aurelia-polyfills@1.0.0-rc.1.0.0",
      "aurelia-router": "npm:aurelia-router@1.0.0-rc.1.0.0",
      "aurelia-templating": "npm:aurelia-templating@1.0.0-rc.1.0.3",
      "aurelia-templating-binding": "npm:aurelia-templating-binding@1.0.0-rc.1.0.0",
      "aurelia-templating-resources": "npm:aurelia-templating-resources@1.0.0-rc.1.0.0",
      "aurelia-templating-router": "npm:aurelia-templating-router@1.0.0-rc.1.0.0"
    },
    "npm:aurelia-dependency-injection@1.0.0-rc.1.0.1": {
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-rc.1.0.1",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-rc.1.0.0"
    },
    "npm:aurelia-event-aggregator@1.0.0-rc.1.0.0": {
      "aurelia-logging": "npm:aurelia-logging@1.0.0-rc.1.0.1"
    },
    "npm:aurelia-framework@1.0.0-rc.1.0.11": {
      "aurelia-binding": "npm:aurelia-binding@1.0.0-rc.1.0.4",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0-rc.1.0.1",
      "aurelia-loader": "npm:aurelia-loader@1.0.0-rc.1.0.0",
      "aurelia-logging": "npm:aurelia-logging@1.0.0-rc.1.0.1",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-rc.1.0.1",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-rc.1.0.0",
      "aurelia-path": "npm:aurelia-path@1.0.0-rc.1.0.0",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.0.0-rc.1.0.0",
      "aurelia-templating": "npm:aurelia-templating@1.0.0-rc.1.0.3"
    },
    "npm:aurelia-history-browser@1.0.0-rc.1.0.0": {
      "aurelia-history": "npm:aurelia-history@1.0.0-rc.1.0.0",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-rc.1.0.0"
    },
    "npm:aurelia-loader-default@1.0.0-rc.1.0.0": {
      "aurelia-loader": "npm:aurelia-loader@1.0.0-rc.1.0.0",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-rc.1.0.1",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-rc.1.0.0"
    },
    "npm:aurelia-loader@1.0.0-rc.1.0.0": {
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-rc.1.0.1",
      "aurelia-path": "npm:aurelia-path@1.0.0-rc.1.0.0"
    },
    "npm:aurelia-logging-console@1.0.0-rc.1.0.0": {
      "aurelia-logging": "npm:aurelia-logging@1.0.0-rc.1.0.1"
    },
    "npm:aurelia-metadata@1.0.0-rc.1.0.1": {
      "aurelia-pal": "npm:aurelia-pal@1.0.0-rc.1.0.0"
    },
    "npm:aurelia-pal-browser@1.0.0-rc.1.0.0": {
      "aurelia-pal": "npm:aurelia-pal@1.0.0-rc.1.0.0"
    },
    "npm:aurelia-polyfills@1.0.0-rc.1.0.0": {
      "aurelia-pal": "npm:aurelia-pal@1.0.0-rc.1.0.0"
    },
    "npm:aurelia-route-recognizer@1.0.0-rc.1.0.0": {
      "aurelia-path": "npm:aurelia-path@1.0.0-rc.1.0.0"
    },
    "npm:aurelia-router@1.0.0-rc.1.0.0": {
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0-rc.1.0.1",
      "aurelia-event-aggregator": "npm:aurelia-event-aggregator@1.0.0-rc.1.0.0",
      "aurelia-history": "npm:aurelia-history@1.0.0-rc.1.0.0",
      "aurelia-logging": "npm:aurelia-logging@1.0.0-rc.1.0.1",
      "aurelia-path": "npm:aurelia-path@1.0.0-rc.1.0.0",
      "aurelia-route-recognizer": "npm:aurelia-route-recognizer@1.0.0-rc.1.0.0"
    },
    "npm:aurelia-task-queue@1.0.0-rc.1.0.0": {
      "aurelia-pal": "npm:aurelia-pal@1.0.0-rc.1.0.0"
    },
    "npm:aurelia-templating-binding@1.0.0-rc.1.0.0": {
      "aurelia-binding": "npm:aurelia-binding@1.0.0-rc.1.0.4",
      "aurelia-logging": "npm:aurelia-logging@1.0.0-rc.1.0.1",
      "aurelia-templating": "npm:aurelia-templating@1.0.0-rc.1.0.3"
    },
    "npm:aurelia-templating-resources@1.0.0-rc.1.0.0": {
      "aurelia-binding": "npm:aurelia-binding@1.0.0-rc.1.0.4",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0-rc.1.0.1",
      "aurelia-loader": "npm:aurelia-loader@1.0.0-rc.1.0.0",
      "aurelia-logging": "npm:aurelia-logging@1.0.0-rc.1.0.1",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-rc.1.0.1",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-rc.1.0.0",
      "aurelia-path": "npm:aurelia-path@1.0.0-rc.1.0.0",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.0.0-rc.1.0.0",
      "aurelia-templating": "npm:aurelia-templating@1.0.0-rc.1.0.3"
    },
    "npm:aurelia-templating-router@1.0.0-rc.1.0.0": {
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0-rc.1.0.1",
      "aurelia-logging": "npm:aurelia-logging@1.0.0-rc.1.0.1",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-rc.1.0.1",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-rc.1.0.0",
      "aurelia-path": "npm:aurelia-path@1.0.0-rc.1.0.0",
      "aurelia-router": "npm:aurelia-router@1.0.0-rc.1.0.0",
      "aurelia-templating": "npm:aurelia-templating@1.0.0-rc.1.0.3"
    },
    "npm:aurelia-templating@1.0.0-rc.1.0.3": {
      "aurelia-binding": "npm:aurelia-binding@1.0.0-rc.1.0.4",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0-rc.1.0.1",
      "aurelia-loader": "npm:aurelia-loader@1.0.0-rc.1.0.0",
      "aurelia-logging": "npm:aurelia-logging@1.0.0-rc.1.0.1",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-rc.1.0.1",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-rc.1.0.0",
      "aurelia-path": "npm:aurelia-path@1.0.0-rc.1.0.0",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.0.0-rc.1.0.0"
    },
    "npm:bluebird@3.4.1": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:buffer@3.6.0": {
      "base64-js": "npm:base64-js@0.0.8",
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "ieee754": "npm:ieee754@1.1.6",
      "isarray": "npm:isarray@1.0.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:font-awesome@4.6.3": {
      "css": "github:systemjs/plugin-css@0.1.23"
    },
    "npm:inherits@2.0.1": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:process@0.11.5": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "vm": "github:jspm/nodelibs-vm@0.1.0"
    },
    "npm:util@0.10.3": {
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:vm-browserify@0.0.4": {
      "indexof": "npm:indexof@0.0.1"
    }
  },
  depCache: {
    "BackgroundPage/background.js": [
      "../Common/CrossCutting/Logger/LoggerInterface",
      "../Common/CrossCutting/Logger/Logger",
      "../Common/DataAccess/SettingsRepository"
    ],
    "Common/CrossCutting/Logger/Logger.js": [
      "./LoggerInterface"
    ],
    "SettingsPage/src/app.js": [
      "aurelia-framework",
      "../../Common/CrossCutting/Logger/LoggerInterface",
      "../../Common/CrossCutting/Logger/Logger"
    ],
    "SettingsPage/src/blur-image.js": [
      "aurelia-framework"
    ],
    "SettingsPage/src/main.js": [
      "bootstrap"
    ],
    "SettingsPage/src/settings-stadium.js": [
      "aurelia-framework",
      "../../Common/BusinessLogic/SettingsManager",
      "../../Common/CrossCutting/Logger/Logger"
    ],
    "SettingsPage/src/users.js": [
      "aurelia-framework",
      "aurelia-fetch-client",
      "fetch"
    ]
  },
  bundles: {
    "Scripts/app-backgroundpage-build.js": [
      "BackgroundPage/background.html!github:systemjs/plugin-text@0.0.8.js",
      "BackgroundPage/background.js"
    ],
    "Scripts/app-common-build.js": [
      "Common/BusinessLogic/SettingsManager.js",
      "Common/BusinessLogic/SettingsManagerInterface.js",
      "Common/BusinessLogic/StadiumManagerUi.js",
      "Common/CrossCutting/Logger/Logger.js",
      "Common/CrossCutting/Logger/LoggerInterface.js",
      "Common/CrossCutting/Messageing/SettingMessage.js",
      "Common/CrossCutting/Settings/AppSettings.js",
      "Common/CrossCutting/Toolkit/DOMHelper.js",
      "Common/CrossCutting/Toolkit/NumberHelper.js",
      "Common/CrossCutting/Toolkit/XPathHelper.js",
      "Common/DataAccess/SettingsRepository.js",
      "Common/DataAccess/SettingsRepositoryInterface.js"
    ],
    "Scripts/app-settingspage-build.js": [
      "SettingsPage/index.html!github:systemjs/plugin-text@0.0.8.js",
      "SettingsPage/src/app.html!github:systemjs/plugin-text@0.0.8.js",
      "SettingsPage/src/app.js",
      "SettingsPage/src/blur-image.js",
      "SettingsPage/src/child-router.html!github:systemjs/plugin-text@0.0.8.js",
      "SettingsPage/src/child-router.js",
      "SettingsPage/src/main.js",
      "SettingsPage/src/nav-bar.html!github:systemjs/plugin-text@0.0.8.js",
      "SettingsPage/src/settings-stadium.html!github:systemjs/plugin-text@0.0.8.js",
      "SettingsPage/src/settings-stadium.js",
      "SettingsPage/src/users.html!github:systemjs/plugin-text@0.0.8.js",
      "SettingsPage/src/users.js",
      "SettingsPage/src/welcome.html!github:systemjs/plugin-text@0.0.8.js",
      "SettingsPage/src/welcome.js"
    ],
    "Scripts/aurelia.js": [
      "github:github/fetch@1.0.0.js",
      "github:github/fetch@1.0.0/fetch.js",
      "github:twbs/bootstrap@3.3.7.js",
      "github:twbs/bootstrap@3.3.7/css/bootstrap.css!github:systemjs/plugin-text@0.0.8.js",
      "github:twbs/bootstrap@3.3.7/js/bootstrap.js",
      "npm:aurelia-animator-css@1.0.0-rc.1.0.0.js",
      "npm:aurelia-animator-css@1.0.0-rc.1.0.0/aurelia-animator-css.js",
      "npm:aurelia-binding@1.0.0-rc.1.0.4.js",
      "npm:aurelia-binding@1.0.0-rc.1.0.4/aurelia-binding.js",
      "npm:aurelia-bootstrapper@1.0.0-rc.1.0.0.js",
      "npm:aurelia-bootstrapper@1.0.0-rc.1.0.0/aurelia-bootstrapper.js",
      "npm:aurelia-dependency-injection@1.0.0-rc.1.0.1.js",
      "npm:aurelia-dependency-injection@1.0.0-rc.1.0.1/aurelia-dependency-injection.js",
      "npm:aurelia-event-aggregator@1.0.0-rc.1.0.0.js",
      "npm:aurelia-event-aggregator@1.0.0-rc.1.0.0/aurelia-event-aggregator.js",
      "npm:aurelia-fetch-client@1.0.0-rc.1.0.1.js",
      "npm:aurelia-fetch-client@1.0.0-rc.1.0.1/aurelia-fetch-client.js",
      "npm:aurelia-framework@1.0.0-rc.1.0.11.js",
      "npm:aurelia-framework@1.0.0-rc.1.0.11/aurelia-framework.js",
      "npm:aurelia-history-browser@1.0.0-rc.1.0.0.js",
      "npm:aurelia-history-browser@1.0.0-rc.1.0.0/aurelia-history-browser.js",
      "npm:aurelia-history@1.0.0-rc.1.0.0.js",
      "npm:aurelia-history@1.0.0-rc.1.0.0/aurelia-history.js",
      "npm:aurelia-loader-default@1.0.0-rc.1.0.0.js",
      "npm:aurelia-loader-default@1.0.0-rc.1.0.0/aurelia-loader-default.js",
      "npm:aurelia-loader@1.0.0-rc.1.0.0.js",
      "npm:aurelia-loader@1.0.0-rc.1.0.0/aurelia-loader.js",
      "npm:aurelia-logging-console@1.0.0-rc.1.0.0.js",
      "npm:aurelia-logging-console@1.0.0-rc.1.0.0/aurelia-logging-console.js",
      "npm:aurelia-logging@1.0.0-rc.1.0.1.js",
      "npm:aurelia-logging@1.0.0-rc.1.0.1/aurelia-logging.js",
      "npm:aurelia-metadata@1.0.0-rc.1.0.1.js",
      "npm:aurelia-metadata@1.0.0-rc.1.0.1/aurelia-metadata.js",
      "npm:aurelia-pal-browser@1.0.0-rc.1.0.0.js",
      "npm:aurelia-pal-browser@1.0.0-rc.1.0.0/aurelia-pal-browser.js",
      "npm:aurelia-pal@1.0.0-rc.1.0.0.js",
      "npm:aurelia-pal@1.0.0-rc.1.0.0/aurelia-pal.js",
      "npm:aurelia-path@1.0.0-rc.1.0.0.js",
      "npm:aurelia-path@1.0.0-rc.1.0.0/aurelia-path.js",
      "npm:aurelia-polyfills@1.0.0-rc.1.0.0.js",
      "npm:aurelia-polyfills@1.0.0-rc.1.0.0/aurelia-polyfills.js",
      "npm:aurelia-route-recognizer@1.0.0-rc.1.0.0.js",
      "npm:aurelia-route-recognizer@1.0.0-rc.1.0.0/aurelia-route-recognizer.js",
      "npm:aurelia-router@1.0.0-rc.1.0.0.js",
      "npm:aurelia-router@1.0.0-rc.1.0.0/aurelia-router.js",
      "npm:aurelia-task-queue@1.0.0-rc.1.0.0.js",
      "npm:aurelia-task-queue@1.0.0-rc.1.0.0/aurelia-task-queue.js",
      "npm:aurelia-templating-binding@1.0.0-rc.1.0.0.js",
      "npm:aurelia-templating-binding@1.0.0-rc.1.0.0/aurelia-templating-binding.js",
      "npm:aurelia-templating-resources@1.0.0-rc.1.0.0.js",
      "npm:aurelia-templating-resources@1.0.0-rc.1.0.0/abstract-repeater.js",
      "npm:aurelia-templating-resources@1.0.0-rc.1.0.0/analyze-view-factory.js",
      "npm:aurelia-templating-resources@1.0.0-rc.1.0.0/array-repeat-strategy.js",
      "npm:aurelia-templating-resources@1.0.0-rc.1.0.0/aurelia-hide-style.js",
      "npm:aurelia-templating-resources@1.0.0-rc.1.0.0/aurelia-templating-resources.js",
      "npm:aurelia-templating-resources@1.0.0-rc.1.0.0/binding-mode-behaviors.js",
      "npm:aurelia-templating-resources@1.0.0-rc.1.0.0/binding-signaler.js",
      "npm:aurelia-templating-resources@1.0.0-rc.1.0.0/compose.js",
      "npm:aurelia-templating-resources@1.0.0-rc.1.0.0/css-resource.js",
      "npm:aurelia-templating-resources@1.0.0-rc.1.0.0/debounce-binding-behavior.js",
      "npm:aurelia-templating-resources@1.0.0-rc.1.0.0/dynamic-element.js",
      "npm:aurelia-templating-resources@1.0.0-rc.1.0.0/focus.js",
      "npm:aurelia-templating-resources@1.0.0-rc.1.0.0/hide.js",
      "npm:aurelia-templating-resources@1.0.0-rc.1.0.0/html-resource-plugin.js",
      "npm:aurelia-templating-resources@1.0.0-rc.1.0.0/html-sanitizer.js",
      "npm:aurelia-templating-resources@1.0.0-rc.1.0.0/if.js",
      "npm:aurelia-templating-resources@1.0.0-rc.1.0.0/map-repeat-strategy.js",
      "npm:aurelia-templating-resources@1.0.0-rc.1.0.0/null-repeat-strategy.js",
      "npm:aurelia-templating-resources@1.0.0-rc.1.0.0/number-repeat-strategy.js",
      "npm:aurelia-templating-resources@1.0.0-rc.1.0.0/repeat-strategy-locator.js",
      "npm:aurelia-templating-resources@1.0.0-rc.1.0.0/repeat-utilities.js",
      "npm:aurelia-templating-resources@1.0.0-rc.1.0.0/repeat.js",
      "npm:aurelia-templating-resources@1.0.0-rc.1.0.0/replaceable.js",
      "npm:aurelia-templating-resources@1.0.0-rc.1.0.0/sanitize-html.js",
      "npm:aurelia-templating-resources@1.0.0-rc.1.0.0/set-repeat-strategy.js",
      "npm:aurelia-templating-resources@1.0.0-rc.1.0.0/show.js",
      "npm:aurelia-templating-resources@1.0.0-rc.1.0.0/signal-binding-behavior.js",
      "npm:aurelia-templating-resources@1.0.0-rc.1.0.0/throttle-binding-behavior.js",
      "npm:aurelia-templating-resources@1.0.0-rc.1.0.0/update-trigger-binding-behavior.js",
      "npm:aurelia-templating-resources@1.0.0-rc.1.0.0/with.js",
      "npm:aurelia-templating-router@1.0.0-rc.1.0.0.js",
      "npm:aurelia-templating-router@1.0.0-rc.1.0.0/aurelia-templating-router.js",
      "npm:aurelia-templating-router@1.0.0-rc.1.0.0/route-href.js",
      "npm:aurelia-templating-router@1.0.0-rc.1.0.0/route-loader.js",
      "npm:aurelia-templating-router@1.0.0-rc.1.0.0/router-view.js",
      "npm:aurelia-templating@1.0.0-rc.1.0.3.js",
      "npm:aurelia-templating@1.0.0-rc.1.0.3/aurelia-templating.js",
      "npm:jquery@2.2.4.js",
      "npm:jquery@2.2.4/dist/jquery.js"
    ]
  }
});
