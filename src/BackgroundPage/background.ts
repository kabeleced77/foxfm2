import {LoggerInterface, LogLevel} from "../Common/CrossCutting/Logger/LoggerInterface"
import {Logger} from "../Common/CrossCutting/Logger/Logger"
import {SettingsRepository} from "../Common/DataAccess/SettingsRepository"
import {SettingsRepositoryInterface} from "../Common/DataAccess/SettingsRepositoryInterface"

class FoxfmBackground {
  private log: LoggerInterface;
  private settingsRepository: SettingsRepositoryInterface;
  private thisModule: string = "FoxfmBackground";

  constructor(logger: LoggerInterface, settingsRepository: SettingsRepositoryInterface) {
    this.log = logger;
    this.log.setLogLevel(LogLevel.All);
    this.log.activateModuleForLogging("all");
    this.settingsRepository = settingsRepository;
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
var settingsRepository = new SettingsRepository(logger);
var background = new FoxfmBackground(logger, settingsRepository);
background.main();
