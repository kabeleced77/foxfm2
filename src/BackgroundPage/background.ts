import { ILogger, Logger } from "../Common/Logger/Logger"
import { RegisteredLoggingModule, IRegisteredLoggingModule } from '../Common/Logger/RegisteredLoggingModule';
import { IRegisteredLoggingModules, RegisteredLoggingModules } from "../Common/Logger/RegisteredLoggingModules";
import { ILogLevel } from '../Common/Logger/LogLevel';
import { LogLevelError } from '../Common/Logger/LogLevel';
import { IRessource } from '../Common/Ressource';
import { Ressource } from '../Common/Ressource';
import { Mutex } from "../Common/Toolkit/Mutex";
import { SettingNameLoggingModules } from "../Common/Settings/SettingNameLoggingModules";
import { StorageLocal } from "../Common/Toolkit/StorageLocal";
import { StorageLocalSync } from "../Common/Toolkit/StorageLocalSync";
import { SettingNameApplicationLogLevel } from "../Common/Settings/SettingNameApplicationLogLevel";
import { MessagingBackgroundScript } from "../Common/Messaging/MessagingBackgroundScript";
import { EasyLogger } from "../Common/Logger/EasyLogger";

class FoxfmBackground {
  private log: ILogger;
  private thisModule: string = "FoxfmBackground";
  private ressourceSettings: IRessource;

  constructor(logger: ILogger) {
    this.log = logger;
    var loggingModule = new RegisteredLoggingModule(this.thisModule, new LogLevelError());
    this.log.registerModuleForLogging(loggingModule);
    this.ressourceSettings = new Ressource("backgroundPageContextMenuAddonSettings");
  }

  public main(): void {
    this.log.info(this.thisModule, "S t a r t e d");
    this.createContextMenu();
    let messaging = new MessagingBackgroundScript(
      "",
      new EasyLogger(
        this.log,
        new RegisteredLoggingModule(
          "MessagingBackgroundScript",
          new LogLevelError())));
    messaging.connect();
  }

  private createContextMenu() {
    chrome.contextMenus.create({ "title": this.ressourceSettings.value().toString(), "onclick": this.contextMenuSettingCallback });
  }

  private contextMenuSettingCallback(info: any, tab: any) {
    chrome.tabs.create({ url: "settings.html" });
  }
}

var logger = new Logger(
  new StorageLocal<ILogLevel>(
    new SettingNameApplicationLogLevel(),
    new LogLevelError()),
  new StorageLocalSync<IRegisteredLoggingModules>(
    new Mutex<IRegisteredLoggingModules>(),
    new StorageLocal<IRegisteredLoggingModules>(
      new SettingNameLoggingModules(),
      new RegisteredLoggingModules(
        new Array<IRegisteredLoggingModule>())))
);
var background = new FoxfmBackground(logger);
background.main();
