System.config({
  defaultJSExtensions: true,
  transpiler: false,
  paths: {
    "*": "dist/*",
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
    "aurelia-animator-css": "npm:aurelia-animator-css@1.0.3",
    "aurelia-bootstrapper": "npm:aurelia-bootstrapper@2.1.1",
    "aurelia-fetch-client": "npm:aurelia-fetch-client@1.1.3",
    "aurelia-framework": "npm:aurelia-framework@1.1.5",
    "aurelia-history-browser": "npm:aurelia-history-browser@1.1.0",
    "aurelia-loader-default": "npm:aurelia-loader-default@1.0.3",
    "aurelia-logging-console": "npm:aurelia-logging-console@1.0.0",
    "aurelia-pal-browser": "npm:aurelia-pal-browser@1.3.0",
    "aurelia-polyfills": "npm:aurelia-polyfills@1.2.2",
    "aurelia-router": "npm:aurelia-router@1.4.0",
    "aurelia-templating-binding": "npm:aurelia-templating-binding@1.4.0",
    "aurelia-templating-resources": "npm:aurelia-templating-resources@1.5.1",
    "aurelia-templating-router": "npm:aurelia-templating-router@1.2.0",
    "bootstrap": "github:twbs/bootstrap@3.3.7",
    "chrome": "npm:chrome@0.1.0",
    "dexie": "npm:dexie@2.0.1",
    "fetch": "github:github/fetch@2.0.3",
    "font-awesome": "npm:font-awesome@4.6.3",
    "jquery": "npm:jquery@3.2.1",
    "text": "github:systemjs/plugin-text@0.0.11",
    "github:jspm/nodelibs-assert@0.1.0": {
      "assert": "npm:assert@1.4.1"
    },
    "github:jspm/nodelibs-buffer@0.1.1": {
      "buffer": "npm:buffer@5.1.0"
    },
    "github:jspm/nodelibs-events@0.1.1": {
      "events": "npm:events@1.0.2"
    },
    "github:jspm/nodelibs-os@0.1.0": {
      "os-browserify": "npm:os-browserify@0.1.2"
    },
    "github:jspm/nodelibs-path@0.1.0": {
      "path-browserify": "npm:path-browserify@0.0.0"
    },
    "github:jspm/nodelibs-process@0.1.2": {
      "process": "npm:process@0.11.10"
    },
    "github:jspm/nodelibs-util@0.1.0": {
      "util": "npm:util@0.10.3"
    },
    "github:jspm/nodelibs-vm@0.1.0": {
      "vm-browserify": "npm:vm-browserify@0.0.4"
    },
    "github:twbs/bootstrap@3.3.7": {
      "jquery": "npm:jquery@3.2.1"
    },
    "npm:assert@1.4.1": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "util": "npm:util@0.10.3"
    },
    "npm:aurelia-animator-css@1.0.3": {
      "aurelia-metadata": "npm:aurelia-metadata@1.0.3",
      "aurelia-pal": "npm:aurelia-pal@1.4.0",
      "aurelia-templating": "npm:aurelia-templating@1.6.0"
    },
    "npm:aurelia-binding@1.5.0": {
      "aurelia-logging": "npm:aurelia-logging@1.3.1",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.3",
      "aurelia-pal": "npm:aurelia-pal@1.4.0",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.2.1"
    },
    "npm:aurelia-bootstrapper@2.1.1": {
      "aurelia-event-aggregator": "npm:aurelia-event-aggregator@1.0.1",
      "aurelia-framework": "npm:aurelia-framework@1.1.5",
      "aurelia-history": "npm:aurelia-history@1.1.0",
      "aurelia-history-browser": "npm:aurelia-history-browser@1.1.0",
      "aurelia-loader-default": "npm:aurelia-loader-default@1.0.3",
      "aurelia-logging-console": "npm:aurelia-logging-console@1.0.0",
      "aurelia-pal": "npm:aurelia-pal@1.4.0",
      "aurelia-pal-browser": "npm:aurelia-pal-browser@1.3.0",
      "aurelia-polyfills": "npm:aurelia-polyfills@1.2.2",
      "aurelia-router": "npm:aurelia-router@1.4.0",
      "aurelia-templating": "npm:aurelia-templating@1.6.0",
      "aurelia-templating-binding": "npm:aurelia-templating-binding@1.4.0",
      "aurelia-templating-resources": "npm:aurelia-templating-resources@1.5.1",
      "aurelia-templating-router": "npm:aurelia-templating-router@1.2.0"
    },
    "npm:aurelia-dependency-injection@1.3.2": {
      "aurelia-metadata": "npm:aurelia-metadata@1.0.3",
      "aurelia-pal": "npm:aurelia-pal@1.4.0"
    },
    "npm:aurelia-event-aggregator@1.0.1": {
      "aurelia-logging": "npm:aurelia-logging@1.3.1"
    },
    "npm:aurelia-framework@1.1.5": {
      "aurelia-binding": "npm:aurelia-binding@1.5.0",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.3.2",
      "aurelia-loader": "npm:aurelia-loader@1.0.0",
      "aurelia-logging": "npm:aurelia-logging@1.3.1",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.3",
      "aurelia-pal": "npm:aurelia-pal@1.4.0",
      "aurelia-path": "npm:aurelia-path@1.1.1",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.2.1",
      "aurelia-templating": "npm:aurelia-templating@1.6.0"
    },
    "npm:aurelia-history-browser@1.1.0": {
      "aurelia-history": "npm:aurelia-history@1.1.0",
      "aurelia-pal": "npm:aurelia-pal@1.4.0"
    },
    "npm:aurelia-loader-default@1.0.3": {
      "aurelia-loader": "npm:aurelia-loader@1.0.0",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.3",
      "aurelia-pal": "npm:aurelia-pal@1.4.0"
    },
    "npm:aurelia-loader@1.0.0": {
      "aurelia-metadata": "npm:aurelia-metadata@1.0.3",
      "aurelia-path": "npm:aurelia-path@1.1.1"
    },
    "npm:aurelia-logging-console@1.0.0": {
      "aurelia-logging": "npm:aurelia-logging@1.3.1"
    },
    "npm:aurelia-metadata@1.0.3": {
      "aurelia-pal": "npm:aurelia-pal@1.4.0"
    },
    "npm:aurelia-pal-browser@1.3.0": {
      "aurelia-pal": "npm:aurelia-pal@1.4.0"
    },
    "npm:aurelia-polyfills@1.2.2": {
      "aurelia-pal": "npm:aurelia-pal@1.4.0"
    },
    "npm:aurelia-route-recognizer@1.1.1": {
      "aurelia-path": "npm:aurelia-path@1.1.1"
    },
    "npm:aurelia-router@1.4.0": {
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.3.2",
      "aurelia-event-aggregator": "npm:aurelia-event-aggregator@1.0.1",
      "aurelia-history": "npm:aurelia-history@1.1.0",
      "aurelia-logging": "npm:aurelia-logging@1.3.1",
      "aurelia-path": "npm:aurelia-path@1.1.1",
      "aurelia-route-recognizer": "npm:aurelia-route-recognizer@1.1.1"
    },
    "npm:aurelia-task-queue@1.2.1": {
      "aurelia-pal": "npm:aurelia-pal@1.4.0"
    },
    "npm:aurelia-templating-binding@1.4.0": {
      "aurelia-binding": "npm:aurelia-binding@1.5.0",
      "aurelia-logging": "npm:aurelia-logging@1.3.1",
      "aurelia-templating": "npm:aurelia-templating@1.6.0"
    },
    "npm:aurelia-templating-resources@1.5.1": {
      "aurelia-binding": "npm:aurelia-binding@1.5.0",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.3.2",
      "aurelia-loader": "npm:aurelia-loader@1.0.0",
      "aurelia-logging": "npm:aurelia-logging@1.3.1",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.3",
      "aurelia-pal": "npm:aurelia-pal@1.4.0",
      "aurelia-path": "npm:aurelia-path@1.1.1",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.2.1",
      "aurelia-templating": "npm:aurelia-templating@1.6.0"
    },
    "npm:aurelia-templating-router@1.2.0": {
      "aurelia-binding": "npm:aurelia-binding@1.5.0",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.3.2",
      "aurelia-logging": "npm:aurelia-logging@1.3.1",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.3",
      "aurelia-pal": "npm:aurelia-pal@1.4.0",
      "aurelia-path": "npm:aurelia-path@1.1.1",
      "aurelia-router": "npm:aurelia-router@1.4.0",
      "aurelia-templating": "npm:aurelia-templating@1.6.0"
    },
    "npm:aurelia-templating@1.6.0": {
      "aurelia-binding": "npm:aurelia-binding@1.5.0",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.3.2",
      "aurelia-loader": "npm:aurelia-loader@1.0.0",
      "aurelia-logging": "npm:aurelia-logging@1.3.1",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.3",
      "aurelia-pal": "npm:aurelia-pal@1.4.0",
      "aurelia-path": "npm:aurelia-path@1.1.1",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.2.1"
    },
    "npm:bluebird@3.5.1": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:buffer@5.1.0": {
      "base64-js": "npm:base64-js@1.2.3",
      "ieee754": "npm:ieee754@1.1.8"
    },
    "npm:chrome@0.1.0": {
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "exeq": "npm:exeq@2.4.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "plist": "npm:plist@1.2.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:dexie@2.0.1": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:exeq@2.4.0": {
      "bluebird": "npm:bluebird@3.5.1",
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "native-or-bluebird": "npm:native-or-bluebird@1.2.0",
      "os": "github:jspm/nodelibs-os@0.1.0",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:font-awesome@4.6.3": {
      "css": "github:systemjs/plugin-css@0.1.36"
    },
    "npm:inherits@2.0.1": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:lodash@3.10.1": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:native-or-bluebird@1.2.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:os-browserify@0.1.2": {
      "os": "github:jspm/nodelibs-os@0.1.0"
    },
    "npm:path-browserify@0.0.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:plist@1.2.0": {
      "base64-js": "npm:base64-js@0.0.8",
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "util-deprecate": "npm:util-deprecate@1.0.2",
      "xmlbuilder": "npm:xmlbuilder@4.0.0",
      "xmldom": "npm:xmldom@0.1.27"
    },
    "npm:process@0.11.10": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "vm": "github:jspm/nodelibs-vm@0.1.0"
    },
    "npm:util-deprecate@1.0.2": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:util@0.10.3": {
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:vm-browserify@0.0.4": {
      "indexof": "npm:indexof@0.0.1"
    },
    "npm:xmlbuilder@4.0.0": {
      "lodash": "npm:lodash@3.10.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:xmldom@0.1.27": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    }
  },
  bundles: {
    "app-backgroundpage-build.js": [
      "BackgroundPage/background.js"
    ],
    "app-contentscript-build.js": [
      "ContentScript/Player/PlayerInformationWebPage.js",
      "ContentScript/Player/PlayerTransferMarketDurationSelect.js",
      "ContentScript/Player/PlayerTransferMarketPlayerWebPage.js",
      "ContentScript/Player/PlayerTransferMarketWebPage.js",
      "ContentScript/Stadium/StadiumManagerUi.js",
      "ContentScript/Team/TeamPlayerTable.js",
      "ContentScript/Team/TeamWebPage.js",
      "ContentScript/TransferMarket/TransferMarketAmateurPlayerTable.js",
      "ContentScript/TransferMarket/TransferMarketAmateurWebPage.js",
      "ContentScript/TransferMarket/TransferMarketOfferDurationSelect.js",
      "ContentScript/TransferMarket/TransferMarketOfferPlayerTable.js",
      "ContentScript/TransferMarket/TransferMarketOfferWebPage.js",
      "ContentScript/TransferMarket/TransferMarketProfessionalPlayerTable.js",
      "ContentScript/TransferMarket/TransferMarketProfessionalWebPage.js",
      "ContentScript/foxfmApp.js"
    ],
    "app-settingspage-build.js": [
      "SettingsPage/app.html!github:systemjs/plugin-text@0.0.11.js",
      "SettingsPage/app.js",
      "SettingsPage/main.js",
      "SettingsPage/nav-bar.html!github:systemjs/plugin-text@0.0.11.js",
      "SettingsPage/settings-logging.html!github:systemjs/plugin-text@0.0.11.js",
      "SettingsPage/settings-logging.js",
      "SettingsPage/settings-stadium.html!github:systemjs/plugin-text@0.0.11.js",
      "SettingsPage/settings-stadium.js",
      "SettingsPage/settings-strength-awp-limits.html!github:systemjs/plugin-text@0.0.11.js",
      "SettingsPage/settings-strength-awp-limits.js",
      "SettingsPage/settings-teamtable.html!github:systemjs/plugin-text@0.0.11.js",
      "SettingsPage/settings-teamtable.js",
      "SettingsPage/settings-tm-amateur-table.html!github:systemjs/plugin-text@0.0.11.js",
      "SettingsPage/settings-tm-amateur-table.js",
      "SettingsPage/settings-tm-offer-table.html!github:systemjs/plugin-text@0.0.11.js",
      "SettingsPage/settings-tm-offer-table.js",
      "SettingsPage/settings-tm-pro-table.html!github:systemjs/plugin-text@0.0.11.js",
      "SettingsPage/settings-tm-pro-table.js",
      "SettingsPage/settings-tm-selling.html!github:systemjs/plugin-text@0.0.11.js",
      "SettingsPage/settings-tm-selling.js",
      "SettingsPage/welcome.html!github:systemjs/plugin-text@0.0.11.js",
      "SettingsPage/welcome.js"
    ],
    "aurelia.js": [
      "github:github/fetch@2.0.3.js",
      "github:github/fetch@2.0.3/fetch.js",
      "github:twbs/bootstrap@3.3.7.js",
      "github:twbs/bootstrap@3.3.7/css/bootstrap.css!github:systemjs/plugin-text@0.0.11.js",
      "github:twbs/bootstrap@3.3.7/js/bootstrap.js",
      "npm:aurelia-animator-css@1.0.3.js",
      "npm:aurelia-animator-css@1.0.3/aurelia-animator-css.js",
      "npm:aurelia-binding@1.5.0.js",
      "npm:aurelia-binding@1.5.0/aurelia-binding.js",
      "npm:aurelia-bootstrapper@2.1.1.js",
      "npm:aurelia-bootstrapper@2.1.1/aurelia-bootstrapper.js",
      "npm:aurelia-dependency-injection@1.3.2.js",
      "npm:aurelia-dependency-injection@1.3.2/aurelia-dependency-injection.js",
      "npm:aurelia-event-aggregator@1.0.1.js",
      "npm:aurelia-event-aggregator@1.0.1/aurelia-event-aggregator.js",
      "npm:aurelia-fetch-client@1.1.3.js",
      "npm:aurelia-fetch-client@1.1.3/aurelia-fetch-client.js",
      "npm:aurelia-framework@1.1.5.js",
      "npm:aurelia-framework@1.1.5/aurelia-framework.js",
      "npm:aurelia-history-browser@1.1.0.js",
      "npm:aurelia-history-browser@1.1.0/aurelia-history-browser.js",
      "npm:aurelia-history@1.1.0.js",
      "npm:aurelia-history@1.1.0/aurelia-history.js",
      "npm:aurelia-loader-default@1.0.3.js",
      "npm:aurelia-loader-default@1.0.3/aurelia-loader-default.js",
      "npm:aurelia-loader@1.0.0.js",
      "npm:aurelia-loader@1.0.0/aurelia-loader.js",
      "npm:aurelia-logging-console@1.0.0.js",
      "npm:aurelia-logging-console@1.0.0/aurelia-logging-console.js",
      "npm:aurelia-logging@1.3.1.js",
      "npm:aurelia-logging@1.3.1/aurelia-logging.js",
      "npm:aurelia-metadata@1.0.3.js",
      "npm:aurelia-metadata@1.0.3/aurelia-metadata.js",
      "npm:aurelia-pal-browser@1.3.0.js",
      "npm:aurelia-pal-browser@1.3.0/aurelia-pal-browser.js",
      "npm:aurelia-pal@1.4.0.js",
      "npm:aurelia-pal@1.4.0/aurelia-pal.js",
      "npm:aurelia-path@1.1.1.js",
      "npm:aurelia-path@1.1.1/aurelia-path.js",
      "npm:aurelia-polyfills@1.2.2.js",
      "npm:aurelia-polyfills@1.2.2/aurelia-polyfills.js",
      "npm:aurelia-route-recognizer@1.1.1.js",
      "npm:aurelia-route-recognizer@1.1.1/aurelia-route-recognizer.js",
      "npm:aurelia-router@1.4.0.js",
      "npm:aurelia-router@1.4.0/aurelia-router.js",
      "npm:aurelia-task-queue@1.2.1.js",
      "npm:aurelia-task-queue@1.2.1/aurelia-task-queue.js",
      "npm:aurelia-templating-binding@1.4.0.js",
      "npm:aurelia-templating-binding@1.4.0/aurelia-templating-binding.js",
      "npm:aurelia-templating-resources@1.5.1.js",
      "npm:aurelia-templating-resources@1.5.1/abstract-repeater.js",
      "npm:aurelia-templating-resources@1.5.1/analyze-view-factory.js",
      "npm:aurelia-templating-resources@1.5.1/array-repeat-strategy.js",
      "npm:aurelia-templating-resources@1.5.1/attr-binding-behavior.js",
      "npm:aurelia-templating-resources@1.5.1/aurelia-hide-style.js",
      "npm:aurelia-templating-resources@1.5.1/aurelia-templating-resources.js",
      "npm:aurelia-templating-resources@1.5.1/binding-mode-behaviors.js",
      "npm:aurelia-templating-resources@1.5.1/binding-signaler.js",
      "npm:aurelia-templating-resources@1.5.1/compose.js",
      "npm:aurelia-templating-resources@1.5.1/css-resource.js",
      "npm:aurelia-templating-resources@1.5.1/debounce-binding-behavior.js",
      "npm:aurelia-templating-resources@1.5.1/dynamic-element.js",
      "npm:aurelia-templating-resources@1.5.1/else.js",
      "npm:aurelia-templating-resources@1.5.1/focus.js",
      "npm:aurelia-templating-resources@1.5.1/hide.js",
      "npm:aurelia-templating-resources@1.5.1/html-resource-plugin.js",
      "npm:aurelia-templating-resources@1.5.1/html-sanitizer.js",
      "npm:aurelia-templating-resources@1.5.1/if-core.js",
      "npm:aurelia-templating-resources@1.5.1/if.js",
      "npm:aurelia-templating-resources@1.5.1/map-repeat-strategy.js",
      "npm:aurelia-templating-resources@1.5.1/null-repeat-strategy.js",
      "npm:aurelia-templating-resources@1.5.1/number-repeat-strategy.js",
      "npm:aurelia-templating-resources@1.5.1/repeat-strategy-locator.js",
      "npm:aurelia-templating-resources@1.5.1/repeat-utilities.js",
      "npm:aurelia-templating-resources@1.5.1/repeat.js",
      "npm:aurelia-templating-resources@1.5.1/replaceable.js",
      "npm:aurelia-templating-resources@1.5.1/sanitize-html.js",
      "npm:aurelia-templating-resources@1.5.1/self-binding-behavior.js",
      "npm:aurelia-templating-resources@1.5.1/set-repeat-strategy.js",
      "npm:aurelia-templating-resources@1.5.1/show.js",
      "npm:aurelia-templating-resources@1.5.1/signal-binding-behavior.js",
      "npm:aurelia-templating-resources@1.5.1/throttle-binding-behavior.js",
      "npm:aurelia-templating-resources@1.5.1/update-trigger-binding-behavior.js",
      "npm:aurelia-templating-resources@1.5.1/with.js",
      "npm:aurelia-templating-router@1.2.0.js",
      "npm:aurelia-templating-router@1.2.0/aurelia-templating-router.js",
      "npm:aurelia-templating-router@1.2.0/route-href.js",
      "npm:aurelia-templating-router@1.2.0/route-loader.js",
      "npm:aurelia-templating-router@1.2.0/router-view.js",
      "npm:aurelia-templating@1.6.0.js",
      "npm:aurelia-templating@1.6.0/aurelia-templating.js",
      "npm:jquery@3.2.1.js",
      "npm:jquery@3.2.1/dist/jquery.js"
    ],
    "app-common-build.js": [
      "Common/ArrayInStorage.js",
      "Common/ExperienceAndTrainingColumn.js",
      "Common/GameKind.js",
      "Common/Logger/EasyLogger.js",
      "Common/Logger/LogLevel.js",
      "Common/Logger/Logger.js",
      "Common/Logger/RegisteredLoggingModule.js",
      "Common/Logger/RegisteredLoggingModules.js",
      "Common/Ressource.js",
      "Common/Settings/FocusElementSetting.js",
      "Common/Settings/FocusElementsSetting.js",
      "Common/Settings/PlayerTransferMarketPageFocusElementSettingName.js",
      "Common/Settings/PlayerTransferMarketPlayerPageFocusElementSettingName.js",
      "Common/Settings/SettingNameApplicationLogLevel.js",
      "Common/Settings/SettingNameLoggingModules.js",
      "Common/Settings/SettingNamePlayerInformationWebPageFocusElement.js",
      "Common/Settings/SettingNameStrengthsLimits.js",
      "Common/Settings/SettingNameTeamTable.js",
      "Common/Settings/SettingNameTransferMarketAmateurTable.js",
      "Common/Settings/SettingNameTransferMarketDuration.js",
      "Common/Settings/SettingNameTransferMarketProfessionalsSearchResultTable.js",
      "Common/Settings/SettingNameTransferTablePossibleOffers.js",
      "Common/Settings/StadiumBlocksSetting.js",
      "Common/Settings/StadiumOverallEntryPricesSetting.js",
      "Common/Settings/StrengthsLimitsSetting.js",
      "Common/Settings/TeamTableSetting.js",
      "Common/Settings/TransferMarketAmateurPlayerTableSettings.js",
      "Common/Settings/TransferMarketSearchResultTableSettings.js",
      "Common/Settings/TransferMarketSellingDurationSettings.js",
      "Common/Settings/TransferOfferTableSettings.js",
      "Common/SettingsDefaultValues/PlayerInformationPageFocusElementSettingDefaultValue.js",
      "Common/SettingsDefaultValues/PlayerTransferMarketPageFocusElementSettingDefaultValue.js",
      "Common/SettingsDefaultValues/PlayerTransferMarketPlayerPageFocusElementSettingDefaultValue.js",
      "Common/SettingsDefaultValues/TransferMarketSellingDurationSettingsDefaultValue.js",
      "Common/StadiumBlock.js",
      "Common/StadiumBlockName.js",
      "Common/StadiumBlocks.js",
      "Common/StadiumEntryPrice.js",
      "Common/StadiumEntryPrices.js",
      "Common/StadiumOverallEntryPrices.js",
      "Common/StrengthLevel.js",
      "Common/StrengthLevels.js",
      "Common/StrengthLimits.js",
      "Common/StrengthValues.js",
      "Common/StrengthsLimits.js",
      "Common/Toolkit/Awp.js",
      "Common/Toolkit/AwpPoints.js",
      "Common/Toolkit/DOMHelper.js",
      "Common/Toolkit/Dom.js",
      "Common/Toolkit/ExtendExisitingColumn.js",
      "Common/Toolkit/ExtendWebPage.js",
      "Common/Toolkit/ExtendWebPages.js",
      "Common/Toolkit/FirstElementInXPathNodeOrParents.js",
      "Common/Toolkit/FocusElementByXPath.js",
      "Common/Toolkit/FocusElementByXPathConfigureable.js",
      "Common/Toolkit/FocusElementsByXPaths.js",
      "Common/Toolkit/HtmlAttribute.js",
      "Common/Toolkit/HtmlElement.js",
      "Common/Toolkit/HtmlElementWithChilds.js",
      "Common/Toolkit/HtmlId.js",
      "Common/Toolkit/HtmlSelect.js",
      "Common/Toolkit/HtmlSelectById.js",
      "Common/Toolkit/HtmlTable.js",
      "Common/Toolkit/HtmlTableById.js",
      "Common/Toolkit/HtmlTableByXPath.js",
      "Common/Toolkit/HtmlTableColumn.js",
      "Common/Toolkit/HtmlTableColumnByXpath.js",
      "Common/Toolkit/HtmlTableColumnHeader.js",
      "Common/Toolkit/HtmlTableColumnNumberValues.js",
      "Common/Toolkit/HtmlTableColumnStringValues.js",
      "Common/Toolkit/HtmlTableColumnValues.js",
      "Common/Toolkit/Mutex.js",
      "Common/Toolkit/NumberFromNode.js",
      "Common/Toolkit/NumberFromString.js",
      "Common/Toolkit/NumberHelper.js",
      "Common/Toolkit/NumberValues.js",
      "Common/Toolkit/Select.js",
      "Common/Toolkit/Setting.js",
      "Common/Toolkit/SettingName.js",
      "Common/Toolkit/SplitString.js",
      "Common/Toolkit/SplitStrings.js",
      "Common/Toolkit/StorageLocal.js",
      "Common/Toolkit/StorageLocalSync.js",
      "Common/Toolkit/Table.js",
      "Common/Toolkit/Url.js",
      "Common/Toolkit/UserSetting.js",
      "Common/Toolkit/Values.js",
      "Common/Toolkit/WebElementToExtend.js",
      "Common/Toolkit/WebElementToFocus.js",
      "Common/Toolkit/WebPageToExtend.js",
      "Common/Toolkit/XPathAllResults.js",
      "Common/Toolkit/XPathHtmlTableCell.js",
      "Common/Toolkit/XPathSingleResult.js",
      "Common/Toolkit/XPathString.js",
      "Common/TypeInStorage.js",
      "Common/Urls/PlayerInformationWebPageUrl.js",
      "Common/Urls/PlayerTransferMarketPlayerWebPageUrl.js",
      "Common/Urls/PlayerTransferMarketWebPageUrl.js",
      "Common/Urls/StadiumWebPageUrl.js",
      "Common/Urls/TeamWebPageUrl.js",
      "Common/Urls/TransferMarketAmateurWebPageUrl.js",
      "Common/Urls/TransferMarketProfessionalsUiUrl.js",
      "Common/Urls/TransferOfferWebPageUrl.js",
      "Common/ViewModels/CheckboxViewModel.js",
      "Common/ViewModels/CheckboxWithSelectViewModel.js",
      "Common/ViewModels/FocusElementViewModel.js",
      "Common/ViewModels/SelectViewModel.js",
      "github:jspm/nodelibs-process@0.1.2.js",
      "github:jspm/nodelibs-process@0.1.2/index.js",
      "npm:dexie@2.0.1.js",
      "npm:dexie@2.0.1/dist/dexie.js",
      "npm:process@0.11.10.js",
      "npm:process@0.11.10/browser.js"
    ]
  }
});