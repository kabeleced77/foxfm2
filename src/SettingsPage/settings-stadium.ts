import { ILogger, Logger } from '../Common/Logger/Logger';
import { ILogLevel, LogLevelError } from '../Common/Logger/LogLevel';
import { IRegisteredLoggingModule, RegisteredLoggingModule } from '../Common/Logger/RegisteredLoggingModule';
import { IRegisteredLoggingModules, RegisteredLoggingModules } from '../Common/Logger/RegisteredLoggingModules';
import {
  RessourceCommonButtonApply,
  RessourceStadiumAddOffsetPrices,
  RessourceStadiumAddOverallPrices,
  RessourceStadiumHeading,
} from '../Common/Ressource';
import { SettingNameApplicationLogLevel } from '../Common/Settings/SettingNameApplicationLogLevel';
import { SettingNameLoggingModules } from '../Common/Settings/SettingNameLoggingModules';
import { IStadiumBlocksSetting, StadiumBlocksSetting } from '../Common/Settings/StadiumBlocksSetting';
import {
  IStadiumOverallEntryPricesSetting,
  StadiumOverallEntryPricesSetting,
} from '../Common/Settings/StadiumOverallEntryPricesSetting';
import { StadiumOverallEntryPrices } from '../Common/StadiumOverallEntryPrices';
import { Mutex } from '../Common/Toolkit/Mutex';
import { StorageLocal } from '../Common/Toolkit/StorageLocal';
import { StorageLocalSync } from '../Common/Toolkit/StorageLocalSync';

export class SettingsStadium {
  private thisModule: string = "SettingsStadium";
  private log: ILogger;
  private stadiumOverallPrices: IStadiumOverallEntryPricesSetting;
  private stadiumBlocks: IStadiumBlocksSetting;

  ressourceHeading: String;
  ressourceStadiumAddOverallPrices: String;
  ressourceStadiumAddOffsetPrices: String;
  ressourceButtonApply: String;
  stadiumOverallPricesActivated: Boolean;
  stadiumOffsetPricesActivated: Boolean;

  constructor() {
    this.log = new Logger(
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
    var loggingModule = new RegisteredLoggingModule(this.thisModule, new LogLevelError());
    this.log.registerModuleForLogging(loggingModule);

    this.stadiumBlocks = new StadiumBlocksSetting();
    this.stadiumOverallPrices = new StadiumOverallEntryPricesSetting();
    this.stadiumOverallPrices.overallEntryPrices().then((stadiumEntryPrices: StadiumOverallEntryPrices) => {
      this.stadiumOverallPricesActivated = stadiumEntryPrices.activated();
    });
    this.stadiumBlocks.blocksEntryPricesOffsetActivated().then((status: Boolean) => {
      this.stadiumOffsetPricesActivated = status;
    });

    this.ressourceHeading = new RessourceStadiumHeading().value();
    this.ressourceStadiumAddOverallPrices = new RessourceStadiumAddOverallPrices().value();
    this.ressourceStadiumAddOffsetPrices = new RessourceStadiumAddOffsetPrices().value();
    this.ressourceButtonApply = new RessourceCommonButtonApply().value();
  }

  submit() {
    this.info(`status overall prices: ${this.stadiumOverallPricesActivated}`);
    this.info(`status offset prices: ${this.stadiumOffsetPricesActivated}`);

    this.stadiumOverallPrices.changeOverallEntryPricesStatus(this.stadiumOverallPricesActivated);
    this.stadiumBlocks.changeBlockEntryPricesOffsetStatus(this.stadiumOffsetPricesActivated);
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
