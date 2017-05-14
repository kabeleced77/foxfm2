import { ILogger, Logger } from '../Common/Logger/Logger';
import { RegisteredLoggingModule, IRegisteredLoggingModule } from '../Common/Logger/RegisteredLoggingModule';
import { IRegisteredLoggingModules, RegisteredLoggingModules } from "../Common/Logger/RegisteredLoggingModules";
import { ILogLevel } from '../Common/Logger/LogLevel';
import { LogLevelError } from '../Common/Logger/LogLevel';
import { IStadiumBlocks } from '../Common/stadiumBlocks';
import { IStadiumBlocksSetting } from '../Common/StadiumBlocksSetting';
import { StadiumBlocksSetting } from '../Common/StadiumBlocksSetting';
import { IStadiumOverallEntryPricesSetting } from '../Common/StadiumOverallEntryPricesSetting';
import { StadiumOverallEntryPricesSetting } from '../Common/StadiumOverallEntryPricesSetting';
import { StadiumOverallEntryPrices } from '../Common/StadiumOverallEntryPrices';
import { StadiumEntryPrices } from '../Common/StadiumEntryPrices';
import { StadiumEntryPrice } from '../Common/StadiumEntryPrice';
import { GameKindLeague, GameKindFriendly, GameKindCup } from '../Common/GameKind';
import { RessourceStadiumHeading } from "../Common/Ressource"
import { RessourceStadiumAddOverallPrices } from "../Common/Ressource"
import { RessourceStadiumAddOffsetPrices } from "../Common/Ressource"
import { Mutex } from "../Common/Toolkit/Mutex";
import { SettingNameLoggingModules } from "../Common/SettingNameLoggingModules";
import { StorageLocal } from "../Common/Storage";
import { StorageLocalSync } from "../Common/Toolkit/StorageLocalSync";
import { SettingNameApplicationLogLevel } from "../Common/SettingNameApplicationLogLevel";

export class SettingsStadium {
  private thisModule: string = "SettingsStadium";
  private log: ILogger;
  private stadiumOverallPrices: IStadiumOverallEntryPricesSetting;
  private stadiumBlocks: IStadiumBlocksSetting;

  ressourceHeading: String;
  ressourceStadiumAddOverallPrices: String;
  ressourceStadiumAddOffsetPrices: String;
  stadiumOverallPricesActivated: Boolean;
  stadiumOffsetPricesActivated: Boolean;

  constructor() {
    this.log = new Logger(
      new StorageLocal<ILogLevel>(
        new SettingNameApplicationLogLevel(),
        new LogLevelError()),
      new StorageLocalSync<IRegisteredLoggingModules>(
        new Mutex<IRegisteredLoggingModules>(),
        new SettingNameLoggingModules(),
        new RegisteredLoggingModules(
          new Array<IRegisteredLoggingModule>()))
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
