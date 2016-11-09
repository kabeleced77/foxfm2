import {LoggerInterface, LogLevel} from "../Common/CrossCutting/Logger/LoggerInterface"
import {Logger} from "../Common/CrossCutting/Logger/Logger"

class FoxfmBackground {
  private log: LoggerInterface;
  private thisModule: string = "FoxfmBackground";

  constructor(logger: LoggerInterface) {
    this.log = logger;
    this.log.setLogLevel(LogLevel.All);
    this.log.activateModuleForLogging("all");
  }

  main(): void {
    this.log.debug(this.thisModule, "S t a r t e d");
    this.createContextMenu();
  }

  private createContextMenu() {
    chrome.contextMenus.create({ "title": "Foxfm settings", "onclick": this.contextMenuSettingCallback });
  }

  private contextMenuSettingCallback(info: any, tab: any) {
    chrome.tabs.create({ url: "settings.html" });
  }
}

var logger = new Logger();
var background = new FoxfmBackground(logger);
background.main();
