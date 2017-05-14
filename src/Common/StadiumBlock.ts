import { IStadiumBlockName } from "./StadiumBlockName"
import { IStadiumEntryPrices } from "./StadiumEntryPrices"

export interface IStadiumBlock {
  name(): IStadiumBlockName;
  pricesOffsetActivated(): Boolean;
  activatePricesOffset(status: Boolean): void;
  pricesOffset(): IStadiumEntryPrices;
  updateOffsetPrices(prices: IStadiumEntryPrices): void;
  xPathToTribune(): String;
  fromJson(jsonString: String): IStadiumBlock;
}

export class StadiumBlock implements IStadiumBlock {
  private blockName: IStadiumBlockName;
  private blockPricesOffsetActivated: Boolean;
  private blockPricesOffset: IStadiumEntryPrices;
  private xPath: String;

  constructor(
    name: IStadiumBlockName,
    pricesOffestActivated: Boolean,
    pricesOffset: IStadiumEntryPrices,
    xPathToTribune: String
  ) {
    this.blockName = name;
    this.blockPricesOffsetActivated = pricesOffestActivated;
    this.blockPricesOffset = pricesOffset;
    this.xPath = xPathToTribune;
  }

  public name(): IStadiumBlockName {
    return this.blockName;
  }
  public pricesOffset(): IStadiumEntryPrices {
    return this.blockPricesOffset;
  }
  public updateOffsetPrices(prices: IStadiumEntryPrices): void {
    this.blockPricesOffset = prices;
  }
  public pricesOffsetActivated(): Boolean {
    return this.blockPricesOffsetActivated;
  }
  public activatePricesOffset(status: Boolean): void {
    this.blockPricesOffsetActivated = status;
  }
  public xPathToTribune(): String {
    return this.xPath;
  }
  public fromJson(jsonString: String): IStadiumBlock {
    return new StadiumBlock(
      this.blockName.fromJson(jsonString["blockName"]),
      jsonString["blockPricesOffsetActivated"],
      this.blockPricesOffset.fromJson(jsonString["blockPricesOffset"]),
      jsonString["xPath"]
    )
  }
}
