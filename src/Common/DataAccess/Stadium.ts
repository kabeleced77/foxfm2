import { IStadiumOverallEntryPrices } from "./StadiumOverallEntryPrices"
import { ISetting } from "./Setting"

export interface IStadium {
  overallEntryPrices(): Promise<IStadiumOverallEntryPrices>;
  changeOverallEntryPrices(value: IStadiumOverallEntryPrices);
}

export class Stadium implements IStadium {
  private stadiumName: String;
  private stadiumOverallEntryPrices: ISetting<IStadiumOverallEntryPrices>;

  constructor(
    overallEntryPrices: ISetting<IStadiumOverallEntryPrices>
  ) {
    this.stadiumOverallEntryPrices = overallEntryPrices;
  }

  public overallEntryPrices(): Promise<IStadiumOverallEntryPrices> {
    return this.stadiumOverallEntryPrices.value().then((jsonString: String) => {
      return this.stadiumOverallEntryPrices.defaultValue().fromJson(jsonString);
    });
  };
  public changeOverallEntryPrices(value: IStadiumOverallEntryPrices) {
    this.stadiumOverallEntryPrices.change(value);
  }
}
