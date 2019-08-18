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
    "aurelia-animator-css": "npm:aurelia-animator-css@1.0.4",
    "aurelia-bootstrapper": "npm:aurelia-bootstrapper@2.3.3",
    "aurelia-fetch-client": "npm:aurelia-fetch-client@1.8.2",
    "aurelia-framework": "npm:aurelia-framework@1.3.1",
    "aurelia-history-browser": "npm:aurelia-history-browser@1.4.0",
    "aurelia-loader-default": "npm:aurelia-loader-default@1.2.1",
    "aurelia-logging-console": "npm:aurelia-logging-console@1.1.1",
    "aurelia-pal-browser": "npm:aurelia-pal-browser@1.8.1",
    "aurelia-polyfills": "npm:aurelia-polyfills@1.3.4",
    "aurelia-router": "npm:aurelia-router@1.7.1",
    "aurelia-templating-binding": "npm:aurelia-templating-binding@1.5.3",
    "aurelia-templating-resources": "npm:aurelia-templating-resources@1.12.0",
    "aurelia-templating-router": "npm:aurelia-templating-router@1.4.0",
    "bootstrap": "github:twbs/bootstrap@3.4.1",
    "chrome": "npm:chrome@0.1.0",
    "dexie": "npm:dexie@2.0.4",
    "fetch": "github:github/fetch@3.0.0",
    "font-awesome": "npm:font-awesome@4.7.0",
    "jquery": "npm:jquery@3.4.1",
    "systemjs/plugin-text": "github:systemjs/plugin-text@0.0.11",
    "text": "github:systemjs/plugin-text@0.0.11",
    "github:jspm/nodelibs-assert@0.1.0": {
      "assert": "npm:assert@1.5.0"
    },
    "github:jspm/nodelibs-buffer@0.1.1": {
      "buffer": "npm:buffer@5.4.0"
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
    "github:twbs/bootstrap@3.4.1": {
      "jquery": "npm:jquery@3.4.1"
    },
    "npm:assert@1.5.0": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "object-assign": "npm:object-assign@4.1.1",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "util": "npm:util@0.10.3"
    },
    "npm:aurelia-animator-css@1.0.4": {
      "aurelia-metadata": "npm:aurelia-metadata@1.0.6",
      "aurelia-pal": "npm:aurelia-pal@1.8.2",
      "aurelia-templating": "npm:aurelia-templating@1.10.2"
    },
    "npm:aurelia-binding@2.4.0": {
      "aurelia-logging": "npm:aurelia-logging@1.5.2",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.6",
      "aurelia-pal": "npm:aurelia-pal@1.8.2",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.3.3"
    },
    "npm:aurelia-bootstrapper@2.3.3": {
      "aurelia-event-aggregator": "npm:aurelia-event-aggregator@1.0.3",
      "aurelia-framework": "npm:aurelia-framework@1.3.1",
      "aurelia-history": "npm:aurelia-history@1.2.1",
      "aurelia-history-browser": "npm:aurelia-history-browser@1.4.0",
      "aurelia-loader-default": "npm:aurelia-loader-default@1.2.1",
      "aurelia-logging-console": "npm:aurelia-logging-console@1.1.1",
      "aurelia-pal": "npm:aurelia-pal@1.8.2",
      "aurelia-pal-browser": "npm:aurelia-pal-browser@1.8.1",
      "aurelia-polyfills": "npm:aurelia-polyfills@1.3.4",
      "aurelia-router": "npm:aurelia-router@1.7.1",
      "aurelia-templating": "npm:aurelia-templating@1.10.2",
      "aurelia-templating-binding": "npm:aurelia-templating-binding@1.5.3",
      "aurelia-templating-resources": "npm:aurelia-templating-resources@1.12.0",
      "aurelia-templating-router": "npm:aurelia-templating-router@1.4.0"
    },
    "npm:aurelia-dependency-injection@1.5.0": {
      "aurelia-metadata": "npm:aurelia-metadata@1.0.6",
      "aurelia-pal": "npm:aurelia-pal@1.8.2"
    },
    "npm:aurelia-event-aggregator@1.0.3": {
      "aurelia-logging": "npm:aurelia-logging@1.5.2"
    },
    "npm:aurelia-fetch-client@1.8.2": {
      "aurelia-pal": "npm:aurelia-pal@1.8.2"
    },
    "npm:aurelia-framework@1.3.1": {
      "aurelia-binding": "npm:aurelia-binding@2.4.0",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.5.0",
      "aurelia-loader": "npm:aurelia-loader@1.0.2",
      "aurelia-logging": "npm:aurelia-logging@1.5.2",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.6",
      "aurelia-pal": "npm:aurelia-pal@1.8.2",
      "aurelia-path": "npm:aurelia-path@1.1.3",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.3.3",
      "aurelia-templating": "npm:aurelia-templating@1.10.2"
    },
    "npm:aurelia-history-browser@1.4.0": {
      "aurelia-history": "npm:aurelia-history@1.2.1",
      "aurelia-pal": "npm:aurelia-pal@1.8.2"
    },
    "npm:aurelia-loader-default@1.2.1": {
      "aurelia-loader": "npm:aurelia-loader@1.0.2",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.6",
      "aurelia-pal": "npm:aurelia-pal@1.8.2"
    },
    "npm:aurelia-loader@1.0.2": {
      "aurelia-metadata": "npm:aurelia-metadata@1.0.6",
      "aurelia-path": "npm:aurelia-path@1.1.3"
    },
    "npm:aurelia-logging-console@1.1.1": {
      "aurelia-logging": "npm:aurelia-logging@1.5.2"
    },
    "npm:aurelia-metadata@1.0.6": {
      "aurelia-pal": "npm:aurelia-pal@1.8.2"
    },
    "npm:aurelia-pal-browser@1.8.1": {
      "aurelia-pal": "npm:aurelia-pal@1.8.2"
    },
    "npm:aurelia-polyfills@1.3.4": {
      "aurelia-pal": "npm:aurelia-pal@1.8.2"
    },
    "npm:aurelia-route-recognizer@1.3.2": {
      "aurelia-path": "npm:aurelia-path@1.1.3"
    },
    "npm:aurelia-router@1.7.1": {
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.5.0",
      "aurelia-event-aggregator": "npm:aurelia-event-aggregator@1.0.3",
      "aurelia-history": "npm:aurelia-history@1.2.1",
      "aurelia-logging": "npm:aurelia-logging@1.5.2",
      "aurelia-path": "npm:aurelia-path@1.1.3",
      "aurelia-route-recognizer": "npm:aurelia-route-recognizer@1.3.2"
    },
    "npm:aurelia-task-queue@1.3.3": {
      "aurelia-pal": "npm:aurelia-pal@1.8.2"
    },
    "npm:aurelia-templating-binding@1.5.3": {
      "aurelia-binding": "npm:aurelia-binding@2.4.0",
      "aurelia-logging": "npm:aurelia-logging@1.5.2",
      "aurelia-templating": "npm:aurelia-templating@1.10.2"
    },
    "npm:aurelia-templating-resources@1.12.0": {
      "aurelia-binding": "npm:aurelia-binding@2.4.0",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.5.0",
      "aurelia-loader": "npm:aurelia-loader@1.0.2",
      "aurelia-logging": "npm:aurelia-logging@1.5.2",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.6",
      "aurelia-pal": "npm:aurelia-pal@1.8.2",
      "aurelia-path": "npm:aurelia-path@1.1.3",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.3.3",
      "aurelia-templating": "npm:aurelia-templating@1.10.2"
    },
    "npm:aurelia-templating-router@1.4.0": {
      "aurelia-binding": "npm:aurelia-binding@2.4.0",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.5.0",
      "aurelia-logging": "npm:aurelia-logging@1.5.2",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.6",
      "aurelia-pal": "npm:aurelia-pal@1.8.2",
      "aurelia-path": "npm:aurelia-path@1.1.3",
      "aurelia-router": "npm:aurelia-router@1.7.1",
      "aurelia-templating": "npm:aurelia-templating@1.10.2"
    },
    "npm:aurelia-templating@1.10.2": {
      "aurelia-binding": "npm:aurelia-binding@2.4.0",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.5.0",
      "aurelia-loader": "npm:aurelia-loader@1.0.2",
      "aurelia-logging": "npm:aurelia-logging@1.5.2",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.6",
      "aurelia-pal": "npm:aurelia-pal@1.8.2",
      "aurelia-path": "npm:aurelia-path@1.1.3",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.3.3"
    },
    "npm:bluebird@3.5.5": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:buffer@5.4.0": {
      "base64-js": "npm:base64-js@1.3.1",
      "ieee754": "npm:ieee754@1.1.13"
    },
    "npm:chrome@0.1.0": {
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "exeq": "npm:exeq@2.4.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "plist": "npm:plist@1.2.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:dexie@2.0.4": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:exeq@2.4.0": {
      "bluebird": "npm:bluebird@3.5.5",
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "native-or-bluebird": "npm:native-or-bluebird@1.2.0",
      "os": "github:jspm/nodelibs-os@0.1.0",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:font-awesome@4.7.0": {
      "css": "github:systemjs/plugin-css@0.1.37"
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
      "BackgroundPage/FoxfmBackground.js",
      "BackgroundPage/PlayerTransfers/IImportedPlayerTransfers.js",
      "BackgroundPage/PlayerTransfers/IUserInteractionImportPlayerTransfers.js",
      "BackgroundPage/PlayerTransfers/ImportedPlayerTransfers.js",
      "BackgroundPage/PlayerTransfers/UserInteractionImportPlayerTransfers.js",
      "BackgroundPage/foxfmBackgroundScriptApp.js"
    ],
    "app-contentscript-build.js": [
      "ContentScript/FoxfmContentScript.js",
      "ContentScript/Player/PlayerTransferMarketDurationSelect.js",
      "ContentScript/Stadium/StadiumManagerUi.js",
      "ContentScript/Team/TeamPlayerTable.js",
      "ContentScript/TransferMarket/ITables.js",
      "ContentScript/TransferMarket/MessagingImportTransfers.js",
      "ContentScript/TransferMarket/PlayerTransfersMessaging.js",
      "ContentScript/TransferMarket/TransferMarketAmateurPlayerTable.js",
      "ContentScript/TransferMarket/TransferMarketOfferDurationSelect.js",
      "ContentScript/TransferMarket/TransferMarketOfferPlayerTable.js",
      "ContentScript/TransferMarket/TransferMarketProfessionalPlayerTable.js",
      "ContentScript/foxfmContentScriptApp.js"
    ],
    "app-settingspage-build.js": [
      "SettingsPage/app.html!github:systemjs/plugin-text@0.0.11.js",
      "SettingsPage/app.js",
      "SettingsPage/application/application.html!github:systemjs/plugin-text@0.0.11.js",
      "SettingsPage/application/application.js",
      "SettingsPage/logging/settings-logging.html!github:systemjs/plugin-text@0.0.11.js",
      "SettingsPage/logging/settings-logging.js",
      "SettingsPage/main.js",
      "SettingsPage/nav-bar.html!github:systemjs/plugin-text@0.0.11.js",
      "SettingsPage/stadium/settings-stadium.html!github:systemjs/plugin-text@0.0.11.js",
      "SettingsPage/stadium/settings-stadium.js",
      "SettingsPage/strength-awp-limits/settings-strength-awp-limits.html!github:systemjs/plugin-text@0.0.11.js",
      "SettingsPage/strength-awp-limits/settings-strength-awp-limits.js",
      "SettingsPage/team-table/settings-teamtable.html!github:systemjs/plugin-text@0.0.11.js",
      "SettingsPage/team-table/settings-teamtable.js",
      "SettingsPage/tm-amateur-table/settings-tm-amateur-table.html!github:systemjs/plugin-text@0.0.11.js",
      "SettingsPage/tm-amateur-table/settings-tm-amateur-table.js",
      "SettingsPage/tm-offer-table/settings-tm-offer-table.html!github:systemjs/plugin-text@0.0.11.js",
      "SettingsPage/tm-offer-table/settings-tm-offer-table.js",
      "SettingsPage/tm-pro-table/settings-tm-pro-table.html!github:systemjs/plugin-text@0.0.11.js",
      "SettingsPage/tm-pro-table/settings-tm-pro-table.js",
      "SettingsPage/tm-selling/settings-tm-selling.html!github:systemjs/plugin-text@0.0.11.js",
      "SettingsPage/tm-selling/settings-tm-selling.js"
    ],
    "aurelia.js": [
      "github:github/fetch@3.0.0.js",
      "github:github/fetch@3.0.0/fetch.js",
      "github:twbs/bootstrap@3.4.1.js",
      "github:twbs/bootstrap@3.4.1/css/bootstrap.css!github:systemjs/plugin-text@0.0.11.js",
      "github:twbs/bootstrap@3.4.1/js/bootstrap.js",
      "npm:aurelia-animator-css@1.0.4.js",
      "npm:aurelia-animator-css@1.0.4/aurelia-animator-css.js",
      "npm:aurelia-binding@2.4.0.js",
      "npm:aurelia-binding@2.4.0/aurelia-binding.js",
      "npm:aurelia-bootstrapper@2.3.3.js",
      "npm:aurelia-bootstrapper@2.3.3/aurelia-bootstrapper.js",
      "npm:aurelia-dependency-injection@1.5.0.js",
      "npm:aurelia-dependency-injection@1.5.0/aurelia-dependency-injection.js",
      "npm:aurelia-event-aggregator@1.0.3.js",
      "npm:aurelia-event-aggregator@1.0.3/aurelia-event-aggregator.js",
      "npm:aurelia-fetch-client@1.8.2.js",
      "npm:aurelia-fetch-client@1.8.2/aurelia-fetch-client.js",
      "npm:aurelia-framework@1.3.1.js",
      "npm:aurelia-framework@1.3.1/aurelia-framework.js",
      "npm:aurelia-history-browser@1.4.0.js",
      "npm:aurelia-history-browser@1.4.0/aurelia-history-browser.js",
      "npm:aurelia-history@1.2.1.js",
      "npm:aurelia-history@1.2.1/aurelia-history.js",
      "npm:aurelia-loader-default@1.2.1.js",
      "npm:aurelia-loader-default@1.2.1/aurelia-loader-default.js",
      "npm:aurelia-loader@1.0.2.js",
      "npm:aurelia-loader@1.0.2/aurelia-loader.js",
      "npm:aurelia-logging-console@1.1.1.js",
      "npm:aurelia-logging-console@1.1.1/aurelia-logging-console.js",
      "npm:aurelia-logging@1.5.2.js",
      "npm:aurelia-logging@1.5.2/aurelia-logging.js",
      "npm:aurelia-metadata@1.0.6.js",
      "npm:aurelia-metadata@1.0.6/aurelia-metadata.js",
      "npm:aurelia-pal-browser@1.8.1.js",
      "npm:aurelia-pal-browser@1.8.1/aurelia-pal-browser.js",
      "npm:aurelia-pal@1.8.2.js",
      "npm:aurelia-pal@1.8.2/aurelia-pal.js",
      "npm:aurelia-path@1.1.3.js",
      "npm:aurelia-path@1.1.3/aurelia-path.js",
      "npm:aurelia-polyfills@1.3.4.js",
      "npm:aurelia-polyfills@1.3.4/aurelia-polyfills.js",
      "npm:aurelia-route-recognizer@1.3.2.js",
      "npm:aurelia-route-recognizer@1.3.2/aurelia-route-recognizer.js",
      "npm:aurelia-router@1.7.1.js",
      "npm:aurelia-router@1.7.1/aurelia-router.js",
      "npm:aurelia-task-queue@1.3.3.js",
      "npm:aurelia-task-queue@1.3.3/aurelia-task-queue.js",
      "npm:aurelia-templating-binding@1.5.3.js",
      "npm:aurelia-templating-binding@1.5.3/aurelia-templating-binding.js",
      "npm:aurelia-templating-resources@1.12.0.js",
      "npm:aurelia-templating-resources@1.12.0/aurelia-templating-resources.js",
      "npm:aurelia-templating-router@1.4.0.js",
      "npm:aurelia-templating-router@1.4.0/aurelia-templating-router.js",
      "npm:aurelia-templating@1.10.2.js",
      "npm:aurelia-templating@1.10.2/aurelia-templating.js",
      "npm:jquery@3.4.1.js",
      "npm:jquery@3.4.1/dist/jquery.js"
    ],
    "app-common-build.js": [
      "Common/ArrayInStorage.js",
      "Common/DataModel/DataModelIDbClub.js",
      "Common/DataModel/DataModelIDbGameServer.js",
      "Common/DataModel/DataModelIDbImportedTransfersOfMatchday.js",
      "Common/DataModel/DataModelIDbMatchday.js",
      "Common/DataModel/DataModelIDbPlayerTransfer.js",
      "Common/DataModel/DataModelIDbTaskConfiguration.js",
      "Common/DataModel/DataModelIDbTaskExecution.js",
      "Common/DataModel/DataModelIDbTaskName.js",
      "Common/DataModel/DataModelIDbTaskStatus.js",
      "Common/DataModel/DataModelMessagingContentImportTransfers.js",
      "Common/DataModel/IMessagingMessageDataModelTransferPricesAverage.js",
      "Common/DataModel/IMessagingMessageDataModelTransferPricesAverages.js",
      "Common/DataModel/MessagingMessageDataModelTransferPricesAverage.js",
      "Common/DataModel/MessagingMessageDataModelTransferPricesAverages.js",
      "Common/DataModel/PersistClubMessagingDataModel.js",
      "Common/DataModel/PersistMatchdayMessagingDataModel.js",
      "Common/DataModel/PersistedClubMessagingDataModel.js",
      "Common/GameKind.js",
      "Common/GameServerConst.js",
      "Common/IClub.js",
      "Common/IClubs.js",
      "Common/IGameServer.js",
      "Common/IGameServerWithId.js",
      "Common/IGameServers.js",
      "Common/IImportedTransfersOfMatchday.js",
      "Common/IImportedTransfersOfMatchdays.js",
      "Common/IMatchday.js",
      "Common/IMatchdayWithId.js",
      "Common/IMatchdays.js",
      "Common/IPlayer.js",
      "Common/IPlayerCategories.js",
      "Common/IPlayerCategory.js",
      "Common/IPlayerTransfer.js",
      "Common/IPlayerTransfers.js",
      "Common/IPlayers.js",
      "Common/IndexedDb/ClubIDb.js",
      "Common/IndexedDb/ClubsIDb.js",
      "Common/IndexedDb/FoxfmIndexedDb.js",
      "Common/IndexedDb/GameServerIDb.js",
      "Common/IndexedDb/GameServersIDb.js",
      "Common/IndexedDb/ImportedTransfersOfMatchdayIDb.js",
      "Common/IndexedDb/ImportedTransfersOfMatchdaysIDb.js",
      "Common/IndexedDb/MatchdayIDb.js",
      "Common/IndexedDb/MatchdaysIDb.js",
      "Common/IndexedDb/PlayerTransferIDb.js",
      "Common/IndexedDb/PlayerTransfersIDb.js",
      "Common/IndexedDb/TaskConfigurationIDb.js",
      "Common/IndexedDb/TaskConfigurationsIDb.js",
      "Common/IndexedDb/TaskExecutionIDb.js",
      "Common/IndexedDb/TaskExecutionNotFound.js",
      "Common/IndexedDb/TaskExecutionsIDb.js",
      "Common/IndexedDb/TaskNameIDb.js",
      "Common/IndexedDb/TaskNameNotFound.js",
      "Common/IndexedDb/TaskNamesIDb.js",
      "Common/IndexedDb/TaskStatusIDb.js",
      "Common/IndexedDb/TaskStatusesIDb.js",
      "Common/Logger/EasyLogger.js",
      "Common/Logger/LogLevel.js",
      "Common/Logger/Logger.js",
      "Common/Logger/RegisteredLoggingModule.js",
      "Common/Logger/RegisteredLoggingModules.js",
      "Common/MatchdayConst.js",
      "Common/Messaging/ClubsMessaging.js",
      "Common/Messaging/DataModelMessagingTypeImportTransfers.js",
      "Common/Messaging/IMessaging.js",
      "Common/Messaging/IMessagingMessage.js",
      "Common/Messaging/IMessagingMessageTypeDataModel.js",
      "Common/Messaging/IPlayerTransfersMessaging.js",
      "Common/Messaging/MatchdaysMessaging.js",
      "Common/Messaging/MessagingBackgroundScript.js",
      "Common/Messaging/MessagingContentScript.js",
      "Common/Messaging/MessagingMessage.js",
      "Common/Messaging/MessagingMessageTypeIndexedDbAddClub.js",
      "Common/Messaging/MessagingMessageTypeIndexedDbAddMatchday.js",
      "Common/Messaging/MessagingMessageTypeIndexedDbTransferPricesAverage.js",
      "Common/Messaging/MessagingMessageTypeIndexedDbTransferPricesAverages.js",
      "Common/Messaging/MessagingPort.js",
      "Common/Messaging/MessagingPortIndexedDb.js",
      "Common/Player.js",
      "Common/PlayerCategories.js",
      "Common/PlayerCategory.js",
      "Common/Players.js",
      "Common/Ressource.js",
      "Common/Settings/FocusElementSetting.js",
      "Common/Settings/FocusElementsSetting.js",
      "Common/Settings/FoxfmSetting.js",
      "Common/Settings/FoxfmSettingName.js",
      "Common/Settings/ISettingImportTransfers.js",
      "Common/Settings/PlayerTransferMarketPageFocusElementSettingName.js",
      "Common/Settings/PlayerTransferMarketPlayerPageFocusElementSettingName.js",
      "Common/Settings/SettingImportTransfers.js",
      "Common/Settings/SettingNameApplicationLogLevel.js",
      "Common/Settings/SettingNameImports.js",
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
      "Common/Settings/TransferMarketSaveSoldPlayersSetting.js",
      "Common/Settings/TransferMarketSaveSoldPlayersSettingName.js",
      "Common/Settings/TransferMarketSearchResultTableSettings.js",
      "Common/Settings/TransferMarketSellingDurationSettings.js",
      "Common/Settings/TransferOfferTableSettings.js",
      "Common/SettingsDefaultValues/FoxfmSettingDefaultValue.js",
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
      "Common/Tasking/ITask.js",
      "Common/Tasking/ITaskConfiguration.js",
      "Common/Tasking/ITaskConfigurations.js",
      "Common/Tasking/ITaskExecution.js",
      "Common/Tasking/ITaskExecutions.js",
      "Common/Tasking/ITaskName.js",
      "Common/Tasking/ITaskNames.js",
      "Common/Tasking/ITaskStatus.js",
      "Common/Tasking/ITaskStatuses.js",
      "Common/Tasking/ITasks.js",
      "Common/Tasking/TaskLogDateTime.js",
      "Common/Tasking/TaskStatusExecuted.js",
      "Common/Tasking/TaskStatusFailed.js",
      "Common/Tasking/TaskStatusRunning.js",
      "Common/Tasking/TaskStatusUnknown.js",
      "Common/Tasking/Tasks.js",
      "Common/Toolkit/Awp.js",
      "Common/Toolkit/AwpPoints.js",
      "Common/Toolkit/DOMHelper.js",
      "Common/Toolkit/Dom.js",
      "Common/Toolkit/DomFromStringAsync.js",
      "Common/Toolkit/DomNodes.js",
      "Common/Toolkit/DomNodesByXpath.js",
      "Common/Toolkit/ExtendWebPage.js",
      "Common/Toolkit/FetchedText.js",
      "Common/Toolkit/FirstElementInXPathNodeOrParents.js",
      "Common/Toolkit/FocusElementByXPath.js",
      "Common/Toolkit/FocusElementByXPathConfigureable.js",
      "Common/Toolkit/FocusElementOnWebPage.js",
      "Common/Toolkit/FocusWebElement.js",
      "Common/Toolkit/HrefTextFromAnchorElement.js",
      "Common/Toolkit/HtmlAttribute.js",
      "Common/Toolkit/HtmlElement.js",
      "Common/Toolkit/HtmlElementTextContent.js",
      "Common/Toolkit/HtmlElementWrapped.js",
      "Common/Toolkit/HtmlId.js",
      "Common/Toolkit/HtmlSelect.js",
      "Common/Toolkit/HtmlSelectById.js",
      "Common/Toolkit/HtmlSelectValue.js",
      "Common/Toolkit/HtmlTable.js",
      "Common/Toolkit/HtmlTableById.js",
      "Common/Toolkit/HtmlTableByXPath.js",
      "Common/Toolkit/HtmlTableColumn.js",
      "Common/Toolkit/HtmlTableColumnByXpath.js",
      "Common/Toolkit/HtmlTableColumnNumberValues.js",
      "Common/Toolkit/HtmlTableColumnStringValues.js",
      "Common/Toolkit/HtmlTableColumnValues.js",
      "Common/Toolkit/HtmlTableConst.js",
      "Common/Toolkit/HtmlTablesByTagName.js",
      "Common/Toolkit/IDomAsync.js",
      "Common/Toolkit/IExtendWebElement.js",
      "Common/Toolkit/IImport.js",
      "Common/Toolkit/IImports.js",
      "Common/Toolkit/IValue.js",
      "Common/Toolkit/IXPathFirstResult.js",
      "Common/Toolkit/Imports.js",
      "Common/Toolkit/LabelsOfCheckedCheckboxes.js",
      "Common/Toolkit/Mutex.js",
      "Common/Toolkit/NumberFromString.js",
      "Common/Toolkit/NumberHelper.js",
      "Common/Toolkit/Select.js",
      "Common/Toolkit/Setting.js",
      "Common/Toolkit/SettingName.js",
      "Common/Toolkit/SplitString.js",
      "Common/Toolkit/SplitStringToString.js",
      "Common/Toolkit/SplitStrings.js",
      "Common/Toolkit/StorageLocal.js",
      "Common/Toolkit/StorageLocalSync.js",
      "Common/Toolkit/Sum.js",
      "Common/Toolkit/Table.js",
      "Common/Toolkit/TextContentFromNode.js",
      "Common/Toolkit/Url.js",
      "Common/Toolkit/UserSetting.js",
      "Common/Toolkit/Value.js",
      "Common/Toolkit/ValueAsync.js",
      "Common/Toolkit/Values.js",
      "Common/Toolkit/XPathAllResults.js",
      "Common/Toolkit/XPathFirstResult.js",
      "Common/Toolkit/XPathHtmlTableCell.js",
      "Common/Toolkit/XPathSingleResult.js",
      "Common/Toolkit/XPathString.js",
      "Common/TypeInStorage.js",
      "Common/Urls/HeaderWebPageUrl.js",
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
      "npm:dexie@2.0.4.js",
      "npm:dexie@2.0.4/dist/dexie.js",
      "npm:process@0.11.10.js",
      "npm:process@0.11.10/browser.js"
    ]
  }
});