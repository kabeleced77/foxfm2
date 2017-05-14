import { IStadiumEntryPrices } from './StadiumEntryPrices'

export interface IStadiumOverallEntryPrices {
  activated(): Boolean;
  activate(status: Boolean): void;
  prices(): IStadiumEntryPrices;
  updatePrices(prices: IStadiumEntryPrices): void;
  fromJson(jsonString: String): IStadiumOverallEntryPrices;
}

export class StadiumOverallEntryPrices implements IStadiumOverallEntryPrices {
  private overallPricesActivated: Boolean;
  private overallPrices: IStadiumEntryPrices;

  constructor(activated: Boolean, prices: IStadiumEntryPrices) {
    this.overallPricesActivated = activated;
    this.overallPrices = prices;
  }

  public activated(): Boolean {
    return this.overallPricesActivated;
  }

  public activate(status: Boolean): void {
    this.overallPricesActivated = status;
  }

  public prices(): IStadiumEntryPrices {
    return this.overallPrices;
  }

  public updatePrices(prices: IStadiumEntryPrices): void {
    this.overallPrices = prices;
  }

  public fromJson(jsonString: String): IStadiumOverallEntryPrices {
    return new StadiumOverallEntryPrices(
      jsonString["overallPricesActivated"],
      this.overallPrices.fromJson(jsonString["overallPrices"])
    );
  }
}
