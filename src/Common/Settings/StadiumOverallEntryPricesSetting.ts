import { ISetting } from "./Setting"
import { IGameKind } from '../GameKind';
import { GameKindLeague, GameKindFriendly, GameKindCup } from '../GameKind';
import { IStadiumOverallEntryPrices } from '../StadiumOverallEntryPrices';
import { StadiumOverallEntryPrices } from '../StadiumOverallEntryPrices';
import { StadiumEntryPrices } from '../StadiumEntryPrices';
import { StadiumEntryPrice } from '../StadiumEntryPrice';
import { ISettingName } from "./SettingName";
import { StorageLocal } from "../Storage";

export interface IStadiumOverallEntryPricesSetting {
  overallEntryPrices(): Promise<IStadiumOverallEntryPrices>;
  changeOverallEntryPrice(kindOfGame: IGameKind, price: Number);
  changeOverallEntryPricesStatus(status: Boolean): void;
  changeOverallEntryPriceLeague(price: Number): void;
  changeOverallEntryPriceFriendly(price: Number): void;
  changeOverallEntryPriceCup(price: Number): void;
}

export class SettingNameStadiumOverllEntryPrices implements ISettingName {
  private settingName: String = "foxfm2.stadium.overallEntryPrices";
  constructor() {}
  public name(): String {
    return this.settingName;
  }
}


export class StadiumOverallEntryPricesSetting implements IStadiumOverallEntryPricesSetting {
  private stadiumOverallEntryPrices: ISetting<IStadiumOverallEntryPrices>;

  constructor() {
    this.stadiumOverallEntryPrices = new StorageLocal<IStadiumOverallEntryPrices>(
      new SettingNameStadiumOverllEntryPrices(),
      new StadiumOverallEntryPrices(
        false,
        new StadiumEntryPrices(
          new StadiumEntryPrice(
            new GameKindLeague(),
            1
          ),
          new StadiumEntryPrice(
            new GameKindFriendly(),
            1
          ),
          new StadiumEntryPrice(
            new GameKindCup(),
            1
          )
        )
      )
    );
  }

  public overallEntryPrices(): Promise<IStadiumOverallEntryPrices> {
    return this.stadiumOverallEntryPrices.value();
  }

  public changeOverallEntryPricesStatus(status: Boolean): void {
    this.stadiumOverallEntryPrices.update((prices: IStadiumOverallEntryPrices) => {
      prices.activate(status);
      return prices;
    });
  }

  public changeOverallEntryPrice(kindOfGame: IGameKind, price: Number): void {
    switch (kindOfGame.name()) {
      case new GameKindLeague().name():
        this.changeOverallEntryPriceLeague(price);
        break;
      case new GameKindFriendly().name():
        this.changeOverallEntryPriceFriendly(price);
        break;
      case new GameKindCup().name():
        this.changeOverallEntryPriceCup(price);
        break;
      default:
        break;
    }
  }

  public changeOverallEntryPriceLeague(price: Number): void {
    this.stadiumOverallEntryPrices.update((overallEntryPrices: IStadiumOverallEntryPrices) => {
      overallEntryPrices.updatePrices(
        new StadiumEntryPrices(
          new StadiumEntryPrice(
            new GameKindLeague(),
            price
          ),
          overallEntryPrices.prices().friendly(),
          overallEntryPrices.prices().cup()
        )
      );
      return overallEntryPrices;
    });
  }

  public changeOverallEntryPriceFriendly(price: Number): void {
    this.stadiumOverallEntryPrices.update((overallEntryPrices: IStadiumOverallEntryPrices) => {
      overallEntryPrices.updatePrices(
        new StadiumEntryPrices(
          overallEntryPrices.prices().league(),
          new StadiumEntryPrice(
            new GameKindFriendly(),
            price
          ),
          overallEntryPrices.prices().cup()
        )
      );
      return overallEntryPrices;
    });
  }

  public changeOverallEntryPriceCup(price: Number): void {
    this.stadiumOverallEntryPrices.update((overallEntryPrices: IStadiumOverallEntryPrices) => {
      overallEntryPrices.updatePrices(
        new StadiumEntryPrices(
          overallEntryPrices.prices().league(),
          overallEntryPrices.prices().friendly(),
          new StadiumEntryPrice(
            new GameKindCup(),
            price
          )
        )
      );
      return overallEntryPrices;
    });
  }
}
