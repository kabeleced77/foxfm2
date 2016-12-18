import { ISetting } from "./Setting"
import { SettingInStorage } from "./SettingInStorage"
import { IGameKind } from './GameKind';
import { GameKindLeague, GameKindFriendly, GameKindCup } from './GameKind';
import { IStadiumOverallEntryPrices } from './StadiumOverallEntryPrices';
import { StadiumOverallEntryPrices } from './StadiumOverallEntryPrices';
import { StadiumEntryPrices } from './StadiumEntryPrices';
import { StadiumEntryPrice } from './StadiumEntryPrice';

export interface IStadiumOverallEntryPricesSetting {
  overallEntryPrices(): Promise<IStadiumOverallEntryPrices>;
  changeOverallEntryPrice(kindOfGame: IGameKind, price: Number);
  changeOverallEntryPricesStatus(status: Boolean): void;
  changeOverallEntryPriceLeague(price: Number): void;
  changeOverallEntryPriceFriendly(price: Number): void;
  changeOverallEntryPriceCup(price: Number): void;
}

export class StadiumOverallEntryPricesSetting implements IStadiumOverallEntryPricesSetting {
  private stadiumOverallEntryPrices: ISetting<IStadiumOverallEntryPrices>;

  constructor() {
    this.stadiumOverallEntryPrices = new SettingInStorage<IStadiumOverallEntryPrices>(
      "foxfm2.stadium.overallEntryPrices",
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
    this.overallEntryPrices().then((overallEntryPrices) => {
      this.stadiumOverallEntryPrices.change(new StadiumOverallEntryPrices(
        status,
        overallEntryPrices.prices()
      ));
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
    this.overallEntryPrices().then((overallEntryPrices) => {
      this.stadiumOverallEntryPrices.change(new StadiumOverallEntryPrices(
        overallEntryPrices.activated(),
        new StadiumEntryPrices(
          new StadiumEntryPrice(
            new GameKindLeague(),
            price
          ),
          overallEntryPrices.prices().friendly(),
          overallEntryPrices.prices().cup()
        )
      ));
    });
  }

  public changeOverallEntryPriceFriendly(price: Number): void {
    this.overallEntryPrices().then((overallEntryPrices) => {
      this.stadiumOverallEntryPrices.change(new StadiumOverallEntryPrices(
        overallEntryPrices.activated(),
        new StadiumEntryPrices(
          overallEntryPrices.prices().league(),
          new StadiumEntryPrice(
            new GameKindLeague(),
            price
          ),
          overallEntryPrices.prices().cup()
        )
      ));
    });
  }

  public changeOverallEntryPriceCup(price: Number): void {
    this.overallEntryPrices().then((overallEntryPrices) => {
      this.stadiumOverallEntryPrices.change(new StadiumOverallEntryPrices(
        overallEntryPrices.activated(),
        new StadiumEntryPrices(
          overallEntryPrices.prices().league(),
          overallEntryPrices.prices().friendly(),
          new StadiumEntryPrice(
            new GameKindCup(),
            price
          )
        )
      ));
    });
  }
}
