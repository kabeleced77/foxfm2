import { LoggerInterface } from "../Common/Logger/LoggerInterface"
import { Logger } from "../Common/Logger/Logger"
import { RegisteredLoggingModule } from '../Common/Logger/RegisteredLoggingModule';
import { RegisteredLoggingModulesSetting } from '../Common/Logger/RegisteredLoggingModulesSetting';
import { ILogLevel } from '../Common/Logger/LogLevel';
import { LogLevelError } from '../Common/Logger/LogLevel';
import { IRessource } from '../Common/Ressource';
import { Ressource } from '../Common/Ressource';

class FoxfmBackground {
  private log: LoggerInterface;
  private thisModule: string = "FoxfmBackground";
  private ressourceSettings: IRessource;

  constructor(logger: LoggerInterface) {
    this.log = logger;
    var loggingModule = new RegisteredLoggingModule(this.thisModule, new LogLevelError());
    this.log.registerModuleForLogging(loggingModule);
    this.ressourceSettings = new Ressource("backgroundPageContextMenuAddonSettings");
  }

  main(): void {
    this.log.info(this.thisModule, "S t a r t e d");
    this.createContextMenu();
  }

  private createContextMenu() {
    chrome.contextMenus.create({ "title": this.ressourceSettings.value().toString(), "onclick": this.contextMenuSettingCallback });
  }

  private contextMenuSettingCallback(info: any, tab: any) {
    chrome.tabs.create({ url: "settings.html" });
  }
}

var logger = new Logger();
var background = new FoxfmBackground(logger);
background.main();
