import {computedFrom} from 'aurelia-framework';
import {bindable} from 'aurelia-framework';
import {SettingsManagerInterface} from '../Common/BusinessLogic/SettingsManagerInterface';
import {SettingsManager} from '../Common/BusinessLogic/SettingsManager';
import {LogLevel, LoggerInterface} from '../Common/CrossCutting/Logger/LoggerInterface';
import {Logger} from '../Common/CrossCutting/Logger/Logger';

export class SettingsStadium {
  private thisModule: string = "SettingsStadium";
  private settingsManager: SettingsManagerInterface;
  private log: LoggerInterface;

  heading = 'Stadium settings';
  settingStadiumOverallPrices: boolean;

  constructor() {
    this.log = new Logger();
    this.log.setLogLevel(LogLevel.All);
    this.log.registerModuleForLogging(this.thisModule);
    this.log.activateModuleForLogging("all");

    this.settingsManager = new SettingsManager(this.log);

    //      this.lastName = chrome.i18n.getMessage("addOverallPrices");
    this.settingStadiumOverallPrices = true;
  }

  submit() {
    this.info(`status: ${this.settingStadiumOverallPrices}`);
  }

  private info(msg: string): void {
    this.log.info(this.thisModule, msg);
  }
  private debug(msg: string): void {
    this.log.debug(this.thisModule, msg);
  }
  private warn(msg: string): void {
    this.log.warn(this.thisModule, msg);
  }
}
