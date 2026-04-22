import { IStadiumEntryPrices } from './StadiumEntryPrices'

export interface IStadiumOverallEntryPrices {
  activated(): boolean;
  activate(status: boolean): void;
  prices(): IStadiumEntryPrices;
  updatePrices(prices: IStadiumEntryPrices): void;
  fromJson(jsonString: String): IStadiumOverallEntryPrices;
}

export class StadiumOverallEntryPrices implements IStadiumOverallEntryPrices {
  private overallPricesActivated: boolean;
  private overallPrices: IStadiumEntryPrices;

  constructor(activated: boolean, prices: IStadiumEntryPrices) {
    this.overallPricesActivated = activated;
    this.overallPrices = prices;
  }

  public activated(): boolean {
    return this.overallPricesActivated;
  }

  public activate(status: boolean): void {
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
