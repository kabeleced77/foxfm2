import {AppSettings} from "../Common/CrossCutting/Settings/AppSettings"
import {LoggerInterface, LogLevel} from "../Common/CrossCutting/Logger/LoggerInterface"
import {Logger} from "../Common/CrossCutting/Logger/Logger"
import {SettingMessage, SettingAction} from "../Common/CrossCutting/Messageing/SettingMessage"
import {SettingsManagerInterface} from "../Common/BusinessLogic/SettingsManagerInterface"
import {SettingsManager} from "../Common/BusinessLogic/SettingsManager"
import {StadiumManagerUi} from "../Common/BusinessLogic/StadiumManagerUi"

class foxfmApp {

  private log: LoggerInterface;
  private thisModule: string = "foxfmApp";
  private stadiumManagerUi: StadiumManagerUi;
  private settingsManager: SettingsManagerInterface;

  constructor(log: LoggerInterface, settingsManager: SettingsManager) {
    this.log = log;
    this.log.setLogLevel(LogLevel.All);
    this.log.activateModuleForLogging("all");
    this.settingsManager = settingsManager;
    this.stadiumManagerUi = new StadiumManagerUi(this.log, this.settingsManager);
  }

  public main(): void {
    this.info("S t a r t e d");
    this.settingsManager.loadAppSettingsMessaging((as: AppSettings) => {
      this.debug("App settings loaded: " + JSON.stringify(this.settingsManager.appSettings));
      this.run();
    });
  }

  private run(): void {
    this.stadiumManagerUi.showOverallPricingControlElements();
  }

  private info(msg: string): void {
    this.log.info(this.thisModule, msg);
  }
  private debug(msg: string): void {
    this.log.debug(this.thisModule, msg);
  }
}

var logger = new Logger();
var settingsManager = new SettingsManager(logger);
var app = new foxfmApp(logger, settingsManager);
app.main();
