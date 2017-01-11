import { computedFrom } from 'aurelia-framework';
import { bindable } from 'aurelia-framework';
import { LoggerInterface } from '../Common/Logger/LoggerInterface';
import { Logger } from '../Common/Logger/Logger';
import { RegisteredLoggingModule } from '../Common/Logger/RegisteredLoggingModule';
import { RegisteredLoggingModulesSetting } from '../Common/Logger/RegisteredLoggingModulesSetting';
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
import { SettingInStorage } from "../Common/SettingInStorage"
import { RessourceStadiumHeading} from "../Common/Ressource"
import { RessourceStadiumAddOverallPrices } from "../Common/Ressource"
import { RessourceStadiumAddOffsetPrices } from "../Common/Ressource"

export class SettingsStadium {
  private thisModule: string = "SettingsStadium";
  private log: LoggerInterface;
  private stadiumOverallPrices: IStadiumOverallEntryPricesSetting;
  private stadiumBlocks: IStadiumBlocksSetting;

  ressourceHeading: String;
  ressourceStadiumAddOverallPrices: String;
  ressourceStadiumAddOffsetPrices: String;
  stadiumOverallPricesActivated: Boolean;
  stadiumOffsetPricesActivated: Boolean;

  constructor() {
    this.log = new Logger();
    var loggingModule = new RegisteredLoggingModule(this.thisModule, false, new LogLevelError());
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
