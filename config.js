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
    "aurelia-animator-css": "npm:aurelia-animator-css@1.0.0-rc.1.0.0",
    "aurelia-bootstrapper": "npm:aurelia-bootstrapper@1.0.0-rc.1.0.0",
    "aurelia-fetch-client": "npm:aurelia-fetch-client@1.1.3",
    "aurelia-framework": "npm:aurelia-framework@1.0.0-rc.1.0.11",
    "aurelia-history": "npm:aurelia-history@1.1.0",
    "aurelia-history-browser": "npm:aurelia-history-browser@1.0.0-rc.1.0.0",
    "aurelia-loader-default": "npm:aurelia-loader-default@1.0.0-rc.1.0.0",
    "aurelia-logging-console": "npm:aurelia-logging-console@1.0.0-rc.1.0.0",
    "aurelia-pal-browser": "npm:aurelia-pal-browser@1.0.0-rc.1.0.0",
    "aurelia-polyfills": "npm:aurelia-polyfills@1.0.0-rc.1.0.0",
    "aurelia-router": "npm:aurelia-router@1.4.0",
    "aurelia-templating-binding": "npm:aurelia-templating-binding@1.0.0-rc.1.0.0",
    "aurelia-templating-resources": "npm:aurelia-templating-resources@1.0.0-rc.1.0.0",
    "aurelia-templating-router": "npm:aurelia-templating-router@1.0.0-rc.1.0.0",
    "bootstrap": "github:twbs/bootstrap@3.3.7",
    "chrome": "npm:chrome@0.1.0",
    "fetch": "github:github/fetch@2.0.3",
    "font-awesome": "npm:font-awesome@4.6.3",
    "jquery": "npm:jquery@2.2.4",
    "text": "github:systemjs/plugin-text@0.0.11",
    "github:jspm/nodelibs-assert@0.1.0": {
      "assert": "npm:assert@1.4.1"
    },
    "github:jspm/nodelibs-buffer@0.1.0": {
      "buffer": "npm:buffer@3.6.0"
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
      "process": "npm:process@0.11.6"
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
      "aurelia-metadata": "npm:aurelia-metadata@1.0.3",
      "aurelia-pal": "npm:aurelia-pal@1.4.0",
      "aurelia-templating": "npm:aurelia-templating@1.0.0-rc.1.0.3"
    },
    "npm:aurelia-binding@1.0.0-rc.1.0.4": {
      "aurelia-logging": "npm:aurelia-logging@1.3.1",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.3",
      "aurelia-pal": "npm:aurelia-pal@1.4.0",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.0.0-rc.1.0.0"
    },
    "npm:aurelia-bootstrapper@1.0.0-rc.1.0.0": {
      "aurelia-event-aggregator": "npm:aurelia-event-aggregator@1.0.1",
      "aurelia-framework": "npm:aurelia-framework@1.0.0-rc.1.0.11",
      "aurelia-history": "npm:aurelia-history@1.1.0",
      "aurelia-history-browser": "npm:aurelia-history-browser@1.0.0-rc.1.0.0",
      "aurelia-loader-default": "npm:aurelia-loader-default@1.0.0-rc.1.0.0",
      "aurelia-logging-console": "npm:aurelia-logging-console@1.0.0-rc.1.0.0",
      "aurelia-pal": "npm:aurelia-pal@1.4.0",
      "aurelia-pal-browser": "npm:aurelia-pal-browser@1.0.0-rc.1.0.0",
      "aurelia-polyfills": "npm:aurelia-polyfills@1.0.0-rc.1.0.0",
      "aurelia-router": "npm:aurelia-router@1.4.0",
      "aurelia-templating": "npm:aurelia-templating@1.0.0-rc.1.0.3",
      "aurelia-templating-binding": "npm:aurelia-templating-binding@1.0.0-rc.1.0.0",
      "aurelia-templating-resources": "npm:aurelia-templating-resources@1.0.0-rc.1.0.0",
      "aurelia-templating-router": "npm:aurelia-templating-router@1.0.0-rc.1.0.0"
    },
    "npm:aurelia-dependency-injection@1.3.2": {
      "aurelia-metadata": "npm:aurelia-metadata@1.0.3",
      "aurelia-pal": "npm:aurelia-pal@1.4.0"
    },
    "npm:aurelia-event-aggregator@1.0.1": {
      "aurelia-logging": "npm:aurelia-logging@1.3.1"
    },
    "npm:aurelia-framework@1.0.0-rc.1.0.11": {
      "aurelia-binding": "npm:aurelia-binding@1.0.0-rc.1.0.4",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.3.2",
      "aurelia-loader": "npm:aurelia-loader@1.0.0-rc.1.0.0",
      "aurelia-logging": "npm:aurelia-logging@1.3.1",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.3",
      "aurelia-pal": "npm:aurelia-pal@1.4.0",
      "aurelia-path": "npm:aurelia-path@1.1.1",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.0.0-rc.1.0.0",
      "aurelia-templating": "npm:aurelia-templating@1.0.0-rc.1.0.3"
    },
    "npm:aurelia-history-browser@1.0.0-rc.1.0.0": {
      "aurelia-history": "npm:aurelia-history@1.1.0",
      "aurelia-pal": "npm:aurelia-pal@1.4.0"
    },
    "npm:aurelia-loader-default@1.0.0-rc.1.0.0": {
      "aurelia-loader": "npm:aurelia-loader@1.0.0-rc.1.0.0",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.3",
      "aurelia-pal": "npm:aurelia-pal@1.4.0"
    },
    "npm:aurelia-loader@1.0.0-rc.1.0.0": {
      "aurelia-metadata": "npm:aurelia-metadata@1.0.3",
      "aurelia-path": "npm:aurelia-path@1.1.1"
    },
    "npm:aurelia-logging-console@1.0.0-rc.1.0.0": {
      "aurelia-logging": "npm:aurelia-logging@1.3.1"
    },
    "npm:aurelia-metadata@1.0.3": {
      "aurelia-pal": "npm:aurelia-pal@1.4.0"
    },
    "npm:aurelia-pal-browser@1.0.0-rc.1.0.0": {
      "aurelia-pal": "npm:aurelia-pal@1.4.0"
    },
    "npm:aurelia-polyfills@1.0.0-rc.1.0.0": {
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
    "npm:aurelia-task-queue@1.0.0-rc.1.0.0": {
      "aurelia-pal": "npm:aurelia-pal@1.4.0"
    },
    "npm:aurelia-templating-binding@1.0.0-rc.1.0.0": {
      "aurelia-binding": "npm:aurelia-binding@1.0.0-rc.1.0.4",
      "aurelia-logging": "npm:aurelia-logging@1.3.1",
      "aurelia-templating": "npm:aurelia-templating@1.0.0-rc.1.0.3"
    },
    "npm:aurelia-templating-resources@1.0.0-rc.1.0.0": {
      "aurelia-binding": "npm:aurelia-binding@1.0.0-rc.1.0.4",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.3.2",
      "aurelia-loader": "npm:aurelia-loader@1.0.0-rc.1.0.0",
      "aurelia-logging": "npm:aurelia-logging@1.3.1",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.3",
      "aurelia-pal": "npm:aurelia-pal@1.4.0",
      "aurelia-path": "npm:aurelia-path@1.1.1",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.0.0-rc.1.0.0",
      "aurelia-templating": "npm:aurelia-templating@1.0.0-rc.1.0.3"
    },
    "npm:aurelia-templating-router@1.0.0-rc.1.0.0": {
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.3.2",
      "aurelia-logging": "npm:aurelia-logging@1.3.1",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.3",
      "aurelia-pal": "npm:aurelia-pal@1.4.0",
      "aurelia-path": "npm:aurelia-path@1.1.1",
      "aurelia-router": "npm:aurelia-router@1.4.0",
      "aurelia-templating": "npm:aurelia-templating@1.0.0-rc.1.0.3"
    },
    "npm:aurelia-templating@1.0.0-rc.1.0.3": {
      "aurelia-binding": "npm:aurelia-binding@1.0.0-rc.1.0.4",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.3.2",
      "aurelia-loader": "npm:aurelia-loader@1.0.0-rc.1.0.0",
      "aurelia-logging": "npm:aurelia-logging@1.3.1",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.3",
      "aurelia-pal": "npm:aurelia-pal@1.4.0",
      "aurelia-path": "npm:aurelia-path@1.1.1",
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
    "npm:chrome@0.1.0": {
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "exeq": "npm:exeq@2.4.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "plist": "npm:plist@1.2.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:exeq@2.4.0": {
      "bluebird": "npm:bluebird@3.4.1",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "native-or-bluebird": "npm:native-or-bluebird@1.2.0",
      "os": "github:jspm/nodelibs-os@0.1.0",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:font-awesome@4.6.3": {
      "css": "github:systemjs/plugin-css@0.1.23"
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
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "util-deprecate": "npm:util-deprecate@1.0.2",
      "xmlbuilder": "npm:xmlbuilder@4.0.0",
      "xmldom": "npm:xmldom@0.1.22"
    },
    "npm:process@0.11.6": {
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
    "npm:xmldom@0.1.22": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    }
  },
  depCache: {
    "BackgroundPage/background.js": [
      "../Common/Logger/Logger",
      "../Common/Logger/RegisteredLoggingModule",
      "../Common/Logger/RegisteredLoggingModules",
      "../Common/Logger/LogLevel",
      "../Common/Ressource",
      "../Common/Toolkit/Mutex",
      "../Common/Settings/SettingNameLoggingModules",
      "../Common/Toolkit/StorageLocal",
      "../Common/Toolkit/StorageLocalSync",
      "../Common/Settings/SettingNameApplicationLogLevel"
    ],
    "ContentScript/foxfmApp.js": [
      "../Common/Logger/Logger",
      "../Common/Logger/RegisteredLoggingModule",
      "../Common/Logger/LogLevel",
      "./Stadium/StadiumManagerUi",
      "./Team/TeamWebPage",
      "../Common/Settings/StrengthsLimitsSetting",
      "../Common/Settings/TeamTableSetting",
      "./TransferMarket/TransferMarketOfferWebPage",
      "../Common/Settings/TransferOfferTableSettings",
      "../Common/Toolkit/XPathHtmlTableCell",
      "../Common/Toolkit/XPathSingleResult",
      "../Common/Toolkit/XPathAllResults",
      "../Common/Toolkit/XPathString",
      "../Common/Urls/TransferOfferWebPageUrl",
      "./TransferMarket/TransferMarketProfessionalWebPage",
      "./TransferMarket/TransferMarketProfessionalPlayerTable",
      "../Common/Urls/TransferMarketProfessionalsUiUrl",
      "../Common/Urls/TransferMarketAmateurWebPageUrl",
      "../Common/Toolkit/Url",
      "../Common/Toolkit/HtmlTableColumnByXpath",
      "../Common/Toolkit/Mutex",
      "../Common/Logger/RegisteredLoggingModules",
      "../Common/Settings/SettingNameLoggingModules",
      "../Common/Settings/SettingNameTransferTablePossibleOffers",
      "../Common/Settings/SettingNameTransferMarketProfessionalsSearchResultTable",
      "../Common/Settings/SettingNameTransferMarketAmateurTable",
      "../Common/Toolkit/StorageLocal",
      "../Common/Toolkit/StorageLocalSync",
      "../Common/Settings/SettingNameApplicationLogLevel",
      "../Common/Logger/EasyLogger",
      "../Common/Toolkit/ExtendWebPage",
      "../Common/Toolkit/Dom",
      "../Common/Toolkit/ExtendWebPages",
      "../Common/Urls/TeamWebPageUrl",
      "../Common/Urls/StadiumWebPageUrl",
      "../Common/Settings/TransferMarketAmateurPlayerTableSettings",
      "./TransferMarket/TransferMarketAmateurWebPage",
      "./TransferMarket/TransferMarketAmateurPlayerTable",
      "../Common/Toolkit/HtmlTable",
      "../Common/Toolkit/HtmlTableByXPath",
      "../Common/Toolkit/FirstElementInXPathNodeOrParents",
      "../Common/Toolkit/HtmlTableColumnNumberValues",
      "../Common/StrengthLevels",
      "../Common/Toolkit/AwpPoints",
      "../Common/StrengthValues",
      "./Team/TeamPlayerTable",
      "./TransferMarket/TransferMarketOfferPlayerTable",
      "../Common/Settings/TransferMarketSearchResultTableSettings",
      "../Common/Toolkit/HtmlTableColumnStringValues",
      "../Common/Toolkit/SplitStrings",
      "../Common/Settings/SettingNameTeamTable"
    ],
    "ContentScript/Stadium/StadiumManagerUi.js": [
      "../../Common/Toolkit/NumberHelper",
      "../../Common/Toolkit/DOMHelper",
      "../../Common/GameKind",
      "../../Common/Settings/StadiumBlocksSetting",
      "../../Common/Settings/StadiumOverallEntryPricesSetting",
      "../../Common/Toolkit/XPathString",
      "../../Common/Toolkit/XPathSingleResult",
      "../../Common/Toolkit/XPathAllResults",
      "../../Common/Toolkit/XPathHtmlTableCell",
      "../../Common/Ressource"
    ],
    "ContentScript/Team/TeamPlayerTable.js": [
      "../../Common/Toolkit/HtmlTableColumn",
      "../../Common/Toolkit/HtmlElement",
      "../../Common/Toolkit/HtmlAttribute",
      "../../Common/Toolkit/HtmlElementWithChilds",
      "../../Common/Ressource"
    ],
    "ContentScript/TransferMarket/TransferMarketAmateurPlayerTable.js": [
      "../../Common/Toolkit/HtmlTableColumn",
      "../../Common/Toolkit/HtmlElementWithChilds",
      "../../Common/Toolkit/HtmlAttribute",
      "../../Common/Toolkit/HtmlElement",
      "../../Common/Ressource"
    ],
    "ContentScript/TransferMarket/TransferMarketOfferPlayerTable.js": [
      "../../Common/Toolkit/HtmlTableColumn",
      "../../Common/Toolkit/HtmlElementWithChilds",
      "../../Common/Toolkit/HtmlAttribute",
      "../../Common/Toolkit/HtmlElement",
      "../../Common/Ressource"
    ],
    "ContentScript/TransferMarket/TransferMarketProfessionalPlayerTable.js": [
      "../../Common/Toolkit/HtmlTableColumn",
      "../../Common/Toolkit/HtmlElementWithChilds",
      "../../Common/Toolkit/HtmlAttribute",
      "../../Common/Toolkit/HtmlElement",
      "../../Common/Ressource"
    ],
    "SettingsPage/app.js": [
      "../Common/Ressource"
    ],
    "SettingsPage/main.js": [
      "bootstrap"
    ],
    "SettingsPage/settings-logging.js": [
      "../Common/Logger/Logger",
      "../Common/Logger/RegisteredLoggingModule",
      "../Common/Logger/RegisteredLoggingModules",
      "../Common/Logger/LogLevel",
      "../Common/Ressource",
      "../Common/Toolkit/Mutex",
      "../Common/Settings/SettingNameLoggingModules",
      "../Common/Toolkit/StorageLocal",
      "../Common/Toolkit/StorageLocalSync",
      "../Common/Settings/SettingNameApplicationLogLevel"
    ],
    "SettingsPage/settings-stadium.js": [
      "../Common/Logger/Logger",
      "../Common/Logger/RegisteredLoggingModule",
      "../Common/Logger/RegisteredLoggingModules",
      "../Common/Logger/LogLevel",
      "../Common/Settings/StadiumBlocksSetting",
      "../Common/Settings/StadiumOverallEntryPricesSetting",
      "../Common/Ressource",
      "../Common/Toolkit/Mutex",
      "../Common/Settings/SettingNameLoggingModules",
      "../Common/Toolkit/StorageLocal",
      "../Common/Toolkit/StorageLocalSync",
      "../Common/Settings/SettingNameApplicationLogLevel"
    ],
    "SettingsPage/settings-strength-awp-limits.js": [
      "../Common/Logger/Logger",
      "../Common/Logger/RegisteredLoggingModule",
      "../Common/Logger/RegisteredLoggingModules",
      "../Common/Logger/LogLevel",
      "../Common/Ressource",
      "../Common/Toolkit/Mutex",
      "../Common/Settings/SettingNameLoggingModules",
      "../Common/Toolkit/StorageLocal",
      "../Common/Toolkit/StorageLocalSync",
      "../Common/Settings/SettingNameApplicationLogLevel",
      "../Common/Logger/EasyLogger",
      "../Common/Settings/StrengthsLimitsSetting",
      "../Common/StrengthLimits"
    ],
    "SettingsPage/settings-teamtable.js": [
      "../Common/Logger/Logger",
      "../Common/Logger/RegisteredLoggingModule",
      "../Common/Logger/RegisteredLoggingModules",
      "../Common/Logger/LogLevel",
      "../Common/Ressource",
      "../Common/Toolkit/Mutex",
      "../Common/Settings/SettingNameLoggingModules",
      "../Common/Toolkit/StorageLocal",
      "../Common/Toolkit/StorageLocalSync",
      "../Common/Settings/SettingNameApplicationLogLevel",
      "../Common/Settings/TeamTableSetting",
      "../Common/Settings/SettingNameTeamTable",
      "../Common/Logger/EasyLogger"
    ],
    "SettingsPage/settings-tm-amateur-table.js": [
      "../Common/Logger/Logger",
      "../Common/Logger/RegisteredLoggingModule",
      "../Common/Logger/RegisteredLoggingModules",
      "../Common/Logger/LogLevel",
      "../Common/Toolkit/Mutex",
      "../Common/Settings/SettingNameLoggingModules",
      "../Common/Toolkit/StorageLocal",
      "../Common/Toolkit/StorageLocalSync",
      "../Common/Settings/SettingNameApplicationLogLevel",
      "../Common/Logger/EasyLogger",
      "../Common/Ressource",
      "../Common/Settings/TransferMarketAmateurPlayerTableSettings",
      "../Common/Settings/SettingNameTransferMarketAmateurTable"
    ],
    "SettingsPage/settings-tm-offer-table.js": [
      "../Common/Logger/Logger",
      "../Common/Logger/RegisteredLoggingModule",
      "../Common/Logger/RegisteredLoggingModules",
      "../Common/Logger/LogLevel",
      "../Common/Toolkit/Mutex",
      "../Common/Settings/SettingNameLoggingModules",
      "../Common/Toolkit/StorageLocal",
      "../Common/Toolkit/StorageLocalSync",
      "../Common/Settings/SettingNameApplicationLogLevel",
      "../Common/Settings/TeamTableSetting",
      "../Common/Logger/EasyLogger",
      "../Common/Settings/TransferOfferTableSettings",
      "../Common/Settings/SettingNameTransferTablePossibleOffers",
      "../Common/Ressource"
    ],
    "SettingsPage/settings-tm-pro-table.js": [
      "../Common/Logger/Logger",
      "../Common/Logger/RegisteredLoggingModule",
      "../Common/Logger/RegisteredLoggingModules",
      "../Common/Logger/LogLevel",
      "../Common/Toolkit/Mutex",
      "../Common/Settings/SettingNameLoggingModules",
      "../Common/Toolkit/StorageLocal",
      "../Common/Toolkit/StorageLocalSync",
      "../Common/Settings/SettingNameApplicationLogLevel",
      "../Common/Logger/EasyLogger",
      "../Common/Ressource",
      "../Common/Settings/TransferMarketSearchResultTableSettings",
      "../Common/Settings/SettingNameTransferMarketProfessionalsSearchResultTable"
    ],
    "SettingsPage/welcome.js": [
      "../Common/Ressource"
    ],
    "Common/ExperienceAndTrainingColumn.js": [
      "../Common/Toolkit/NumberHelper",
      "./Toolkit/Awp"
    ],
    "Common/Logger/Logger.js": [
      "./LogLevel"
    ],
    "Common/Logger/RegisteredLoggingModules.js": [
      "./RegisteredLoggingModule",
      "./LogLevel"
    ],
    "Common/Settings/StadiumBlocksSetting.js": [
      "../GameKind",
      "../StadiumBlocks",
      "../StadiumBlock",
      "../StadiumBlockName",
      "../StadiumEntryPrices",
      "../StadiumEntryPrice",
      "../Toolkit/StorageLocal"
    ],
    "Common/Settings/StadiumOverallEntryPricesSetting.js": [
      "../GameKind",
      "../StadiumOverallEntryPrices",
      "../StadiumEntryPrices",
      "../StadiumEntryPrice",
      "../Toolkit/StorageLocal"
    ],
    "Common/Settings/StrengthsLimitsSetting.js": [
      "../StrengthLimits",
      "../StrengthsLimits",
      "../Toolkit/StorageLocal",
      "./SettingNameStrengthsLimits"
    ],
    "Common/StrengthLevels.js": [
      "./StrengthLevel"
    ],
    "Common/StrengthsLimits.js": [
      "./StrengthLimits"
    ],
    "Common/StrengthValues.js": [
      "./Toolkit/NumberHelper"
    ],
    "Common/Toolkit/AwpPoints.js": [
      "./Awp"
    ],
    "Common/Toolkit/HtmlTableColumnNumberValues.js": [
      "./NumberHelper"
    ],
    "Common/Toolkit/NumberFromNode.js": [
      "./NumberFromString"
    ],
    "Common/Toolkit/SplitString.js": [
      "./NumberFromString"
    ],
    "Common/Toolkit/SplitStrings.js": [
      "./SplitString",
      "./NumberValues"
    ],
    "Common/Toolkit/XPathHtmlTableCell.js": [
      "./FirstElementInXPathNodeOrParents"
    ]
  },
  bundles: {
    "app-backgroundpage-build.js": [
      "BackgroundPage/background.js"
    ],
    "app-contentscript-build.js": [
      "ContentScript/Stadium/StadiumManagerUi.js",
      "ContentScript/Team/TeamPlayerTable.js",
      "ContentScript/Team/TeamWebPage.js",
      "ContentScript/TransferMarket/TransferMarketAmateurPlayerTable.js",
      "ContentScript/TransferMarket/TransferMarketAmateurWebPage.js",
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
      "SettingsPage/welcome.html!github:systemjs/plugin-text@0.0.11.js",
      "SettingsPage/welcome.js"
    ],
    "aurelia.js": [
      "github:github/fetch@2.0.3.js",
      "github:github/fetch@2.0.3/fetch.js",
      "github:twbs/bootstrap@3.3.7.js",
      "github:twbs/bootstrap@3.3.7/css/bootstrap.css!github:systemjs/plugin-text@0.0.11.js",
      "github:twbs/bootstrap@3.3.7/js/bootstrap.js",
      "npm:aurelia-animator-css@1.0.0-rc.1.0.0.js",
      "npm:aurelia-animator-css@1.0.0-rc.1.0.0/aurelia-animator-css.js",
      "npm:aurelia-binding@1.0.0-rc.1.0.4.js",
      "npm:aurelia-binding@1.0.0-rc.1.0.4/aurelia-binding.js",
      "npm:aurelia-bootstrapper@1.0.0-rc.1.0.0.js",
      "npm:aurelia-bootstrapper@1.0.0-rc.1.0.0/aurelia-bootstrapper.js",
      "npm:aurelia-dependency-injection@1.3.2.js",
      "npm:aurelia-dependency-injection@1.3.2/aurelia-dependency-injection.js",
      "npm:aurelia-event-aggregator@1.0.1.js",
      "npm:aurelia-event-aggregator@1.0.1/aurelia-event-aggregator.js",
      "npm:aurelia-fetch-client@1.1.3.js",
      "npm:aurelia-fetch-client@1.1.3/aurelia-fetch-client.js",
      "npm:aurelia-framework@1.0.0-rc.1.0.11.js",
      "npm:aurelia-framework@1.0.0-rc.1.0.11/aurelia-framework.js",
      "npm:aurelia-history-browser@1.0.0-rc.1.0.0.js",
      "npm:aurelia-history-browser@1.0.0-rc.1.0.0/aurelia-history-browser.js",
      "npm:aurelia-history@1.1.0.js",
      "npm:aurelia-history@1.1.0/aurelia-history.js",
      "npm:aurelia-loader-default@1.0.0-rc.1.0.0.js",
      "npm:aurelia-loader-default@1.0.0-rc.1.0.0/aurelia-loader-default.js",
      "npm:aurelia-loader@1.0.0-rc.1.0.0.js",
      "npm:aurelia-loader@1.0.0-rc.1.0.0/aurelia-loader.js",
      "npm:aurelia-logging-console@1.0.0-rc.1.0.0.js",
      "npm:aurelia-logging-console@1.0.0-rc.1.0.0/aurelia-logging-console.js",
      "npm:aurelia-logging@1.3.1.js",
      "npm:aurelia-logging@1.3.1/aurelia-logging.js",
      "npm:aurelia-metadata@1.0.3.js",
      "npm:aurelia-metadata@1.0.3/aurelia-metadata.js",
      "npm:aurelia-pal-browser@1.0.0-rc.1.0.0.js",
      "npm:aurelia-pal-browser@1.0.0-rc.1.0.0/aurelia-pal-browser.js",
      "npm:aurelia-pal@1.4.0.js",
      "npm:aurelia-pal@1.4.0/aurelia-pal.js",
      "npm:aurelia-path@1.1.1.js",
      "npm:aurelia-path@1.1.1/aurelia-path.js",
      "npm:aurelia-polyfills@1.0.0-rc.1.0.0.js",
      "npm:aurelia-polyfills@1.0.0-rc.1.0.0/aurelia-polyfills.js",
      "npm:aurelia-route-recognizer@1.1.1.js",
      "npm:aurelia-route-recognizer@1.1.1/aurelia-route-recognizer.js",
      "npm:aurelia-router@1.4.0.js",
      "npm:aurelia-router@1.4.0/aurelia-router.js",
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
    ],
    "app-common-build.js": [
      "Common/ExperienceAndTrainingColumn.js",
      "Common/GameKind.js",
      "Common/Logger/EasyLogger.js",
      "Common/Logger/LogLevel.js",
      "Common/Logger/Logger.js",
      "Common/Logger/RegisteredLoggingModule.js",
      "Common/Logger/RegisteredLoggingModules.js",
      "Common/Ressource.js",
      "Common/Settings/SettingNameApplicationLogLevel.js",
      "Common/Settings/SettingNameLoggingModules.js",
      "Common/Settings/SettingNameStrengthsLimits.js",
      "Common/Settings/SettingNameTeamTable.js",
      "Common/Settings/SettingNameTransferMarketAmateurTable.js",
      "Common/Settings/SettingNameTransferMarketProfessionalsSearchResultTable.js",
      "Common/Settings/SettingNameTransferTablePossibleOffers.js",
      "Common/Settings/StadiumBlocksSetting.js",
      "Common/Settings/StadiumOverallEntryPricesSetting.js",
      "Common/Settings/StrengthsLimitsSetting.js",
      "Common/Settings/TeamTableSetting.js",
      "Common/Settings/TransferMarketAmateurPlayerTableSettings.js",
      "Common/Settings/TransferMarketSearchResultTableSettings.js",
      "Common/Settings/TransferOfferTableSettings.js",
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
      "Common/Toolkit/HtmlAttribute.js",
      "Common/Toolkit/HtmlElement.js",
      "Common/Toolkit/HtmlElementWithChilds.js",
      "Common/Toolkit/HtmlId.js",
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
      "Common/Toolkit/Setting.js",
      "Common/Toolkit/SettingName.js",
      "Common/Toolkit/SplitString.js",
      "Common/Toolkit/SplitStrings.js",
      "Common/Toolkit/StorageLocal.js",
      "Common/Toolkit/StorageLocalSync.js",
      "Common/Toolkit/Table.js",
      "Common/Toolkit/Url.js",
      "Common/Toolkit/Values.js",
      "Common/Toolkit/WebElementToExtend.js",
      "Common/Toolkit/WebPageToExtend.js",
      "Common/Toolkit/XPathAllResults.js",
      "Common/Toolkit/XPathHtmlTableCell.js",
      "Common/Toolkit/XPathSingleResult.js",
      "Common/Toolkit/XPathString.js",
      "Common/TypeInStorage.js",
      "Common/Urls/StadiumWebPageUrl.js",
      "Common/Urls/TeamWebPageUrl.js",
      "Common/Urls/TransferMarketAmateurWebPageUrl.js",
      "Common/Urls/TransferMarketProfessionalsUiUrl.js",
      "Common/Urls/TransferOfferWebPageUrl.js"
    ]
  }
});