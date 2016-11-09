import { computedFrom } from 'aurelia-framework';
import { bindable } from 'aurelia-framework';
import { LogLevel, LoggerInterface } from '../Common/Logger/LoggerInterface';
import { Logger } from '../Common/Logger/Logger';
import { IStadiumBlocks } from '../Common/DataAccess/stadiumBlocks';
import { IStadiumBlocksSetting } from '../Common/DataAccess/StadiumBlocksSetting';
import { StadiumBlocksSetting } from '../Common/DataAccess/StadiumBlocksSetting';
import { IStadiumOverallEntryPricesSetting } from '../Common/DataAccess/StadiumOverallEntryPricesSetting';
import { StadiumOverallEntryPricesSetting } from '../Common/DataAccess/StadiumOverallEntryPricesSetting';
import { StadiumOverallEntryPrices } from '../Common/DataAccess/StadiumOverallEntryPrices';
import { StadiumEntryPrices } from '../Common/DataAccess/StadiumEntryPrices';
import { StadiumEntryPrice } from '../Common/DataAccess/StadiumEntryPrice';
import { GameKindLeague, GameKindFriendly, GameKindCup } from '../Common/DataAccess/GameKind';
import { SettingInStorage } from "../Common/DataAccess/SettingInStorage"
import { RessourceStadiumHeading} from "../Common/DataAccess/Ressource"
import { RessourceStadiumAddOverallPrices } from "../Common/DataAccess/Ressource"
import { RessourceStadiumAddOffsetPrices } from "../Common/DataAccess/Ressource"

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
    this.log.setLogLevel(LogLevel.All);
    this.log.registerModuleForLogging(this.thisModule);
    this.log.activateModuleForLogging("all");

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
