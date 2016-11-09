import { IStadiumEntryPrice } from './StadiumEntryPrice'

export interface IStadiumEntryPrices {
  league(): IStadiumEntryPrice;
  friendly(): IStadiumEntryPrice;
  cup(): IStadiumEntryPrice;
  fromJson(jsonString: String): IStadiumEntryPrices;
}

export class StadiumEntryPrices implements IStadiumEntryPrices {
  private priceLeague: IStadiumEntryPrice;
  private priceFriendly: IStadiumEntryPrice;
  private priceCup: IStadiumEntryPrice;

  constructor(
    league: IStadiumEntryPrice,
    friendly: IStadiumEntryPrice,
    cup: IStadiumEntryPrice
  ) {
    this.priceLeague = league;
    this.priceFriendly = friendly;
    this.priceCup = cup;
  }

  public league() {
    return this.priceLeague;
  }
  public friendly() {
    return this.priceFriendly;
  }
  public cup() {
    return this.priceCup;
  }
  public fromJson(jsonString: String): IStadiumEntryPrices {
    return new StadiumEntryPrices(
      this.priceLeague.fromJson(jsonString["priceLeague"]),
      this.priceFriendly.fromJson(jsonString["priceFriendly"]),
      this.priceCup.fromJson(jsonString["priceCup"])
    );
  }
}
