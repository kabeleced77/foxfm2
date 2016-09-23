import { IStadiumOverallEntryPrices } from "./StadiumOverallEntryPrices"
import { ISetting } from "./Setting"

export interface IStadium {
  name(): String;
  overallEntryPrices(): Promise<IStadiumOverallEntryPrices>;
  changeOverallEntryPrices(value: IStadiumOverallEntryPrices);
}

export class Stadium implements IStadium {
  private stadiumName: String;
  private stadiumOverallEntryPrices: ISetting<IStadiumOverallEntryPrices>;

  constructor(
    name: String,
    overallEntryPrices: ISetting<IStadiumOverallEntryPrices>
  ) {
    this.stadiumName = name;
    this.stadiumOverallEntryPrices = overallEntryPrices;
  }

  public name(): String {
    return this.stadiumName;
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
