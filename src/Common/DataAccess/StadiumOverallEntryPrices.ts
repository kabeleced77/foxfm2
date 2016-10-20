import { IStadiumEntryPrices } from './StadiumEntryPrices'
import { IStadiumEntryPrice } from './StadiumEntryPrice'

export interface IStadiumOverallEntryPrices {
  activated(): Boolean;
  prices(): IStadiumEntryPrices;
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
  public prices(): IStadiumEntryPrices {
    return this.overallPrices;
  }
  public fromJson(jsonString: String): IStadiumOverallEntryPrices {
    return new StadiumOverallEntryPrices(
      jsonString["overallPricesActivated"],
      this.overallPrices.fromJson(jsonString["overallPrices"])
    );
  }
}
