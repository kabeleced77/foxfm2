import { computedFrom } from 'aurelia-framework';
import { bindable } from 'aurelia-framework';
import { LogLevel, LoggerInterface } from '../Common/CrossCutting/Logger/LoggerInterface';
import { Logger } from '../Common/CrossCutting/Logger/Logger';
import { IStadium } from '../Common/DataAccess/Stadium';
import { Stadium } from '../Common/DataAccess/Stadium';
import { StadiumOverallEntryPrices } from '../Common/DataAccess/StadiumOverallEntryPrices';
import { StadiumEntryPrices } from '../Common/DataAccess/StadiumEntryPrices';
import { StadiumEntryPrice } from '../Common/DataAccess/StadiumEntryPrice';
import { GameKindLeague, GameKindFriendly, GameKindCup } from '../Common/DataAccess/GameKind';
import { SettingInStorage } from "../Common/DataAccess/SettingInStorage"

export class SettingsStadium {
  private thisModule: string = "SettingsStadium";
  private log: LoggerInterface;
  private stadium: IStadium;

  heading = 'Stadium Settings';
  settingStadiumOverallPrices: Boolean;
  settingStadiumOffsetPrices: Boolean;

  constructor() {
    this.log = new Logger();
    this.log.setLogLevel(LogLevel.All);
    this.log.registerModuleForLogging(this.thisModule);
    this.log.activateModuleForLogging("all");

    this.stadium = new Stadium(
      "Eckcouche",
      new SettingInStorage<StadiumOverallEntryPrices>(
        "foxfm2.stadium",
        new StadiumOverallEntryPrices(
          true,
          new StadiumEntryPrices(
            new StadiumEntryPrice(
              new GameKindLeague(),
              5
            ),
            new StadiumEntryPrice(
              new GameKindFriendly(),
              6
            ),
            new StadiumEntryPrice(
              new GameKindCup(),
              7
            )
          )
        )
      )
    );

    //      this.lastName = chrome.i18n.getMessage("addOverallPrices");
    this.stadium.overallEntryPrices().then((stadiumEntryPrices: StadiumOverallEntryPrices) => {
      this.settingStadiumOverallPrices = stadiumEntryPrices.activated();
    });
  }

  submit() {
    this.info(`status:${this.settingStadiumOverallPrices}`);

    this.stadium.overallEntryPrices().then(
      (overallEntryPrices: StadiumOverallEntryPrices) => {
        this.stadium.changeOverallEntryPrices(
          new StadiumOverallEntryPrices(
            this.settingStadiumOverallPrices,
            overallEntryPrices.prices()
          ));
      });
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
