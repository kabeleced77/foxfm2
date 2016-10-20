import { IStadiumBlockName } from "./StadiumBlockName"
import { IStadiumEntryPrices } from "./StadiumEntryPrices"

export interface IStadiumBlock {
  name(): IStadiumBlockName;
  pricesOffsetActivated(): Boolean;
  pricesOffset(): IStadiumEntryPrices;
  fromJson(jsonString: String): IStadiumBlock;
}

export class StadiumBlock implements IStadiumBlock {
  private blockName: IStadiumBlockName;
  private blockPricesOffsetActivated: Boolean;
  private blockPricesOffset: IStadiumEntryPrices;

  constructor(
    name: IStadiumBlockName,
    pricesOffestActivated: Boolean,
    pricesOffset: IStadiumEntryPrices
  ) {
    this.blockName = name;
    this.blockPricesOffsetActivated = pricesOffestActivated;
    this.blockPricesOffset = pricesOffset;
  }

  public name(): IStadiumBlockName {
    return this.blockName;
  }
  public pricesOffset(): IStadiumEntryPrices {
    return this.blockPricesOffset;
  }
  public pricesOffsetActivated(): Boolean {
    return this.blockPricesOffsetActivated;
  }
  public fromJson(jsonString: String): IStadiumBlock {
    return new StadiumBlock(
      this.blockName.fromJson(jsonString["blockName"]),
      jsonString["blockPricesOffsetActivated"],
      this.blockPricesOffset.fromJson(jsonString["blockPricesOffset"])
    )
  }
}
