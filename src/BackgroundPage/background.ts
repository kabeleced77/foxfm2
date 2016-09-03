import {LoggerInterface, LogLevel} from "../Common/CrossCutting/Logger/LoggerInterface"
import {Logger} from "../Common/CrossCutting/Logger/Logger"
import {SettingsRepository} from "../Common/DataAccess/SettingsRepository"
import {SettingsRepositoryInterface} from "../Common/DataAccess/SettingsRepositoryInterface"

class foxfmBackground {
  private log: LoggerInterface;
  private settingsRepository: SettingsRepositoryInterface;
  private thisModule: string = "foxfmBackground";

  constructor() {
    this.log = new Logger();
    this.log.setLogLevel(LogLevel.All);
    this.log.activateModuleForLogging("all");
    this.settingsRepository = new SettingsRepository(this.log);
  }

  main(): void {
    this.log.debug(this.thisModule, "S t a r t e d");
    this.createContextMenu();
  }

  private createContextMenu() {
    chrome.contextMenus.create({ "title": "foxfm - Options", "onclick": this.contextMenuSettingCallback });
  }

  private contextMenuSettingCallback(info: any, tab: any) {
    chrome.tabs.create({ url: "settings.html" });
  }
}

var foxfmBckgrnd = new foxfmBackground();
foxfmBckgrnd.main();
