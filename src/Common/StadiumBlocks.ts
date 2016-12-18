import { IStadiumBlock } from './StadiumBlock';

export interface IStadiumBlocks {
  blocks(): Array<IStadiumBlock>;
  blocksPricesOffsetActivated(): Boolean;
  fromJson(jsonString: String): IStadiumBlocks;
}

export class StadiumBlocks implements IStadiumBlocks {
  private stadiumBlocks: Array<IStadiumBlock>;

  constructor(blocks: Array<IStadiumBlock>) {
    this.stadiumBlocks = blocks;
  }

  public blocks(): Array<IStadiumBlock> {
    return this.stadiumBlocks;
  }

  public blocksPricesOffsetActivated(): Boolean {
    return this.stadiumBlocks.every((block: IStadiumBlock) => block.pricesOffsetActivated().valueOf());
  } 

  public fromJson(jsonString: String): IStadiumBlocks {
    if (this.stadiumBlocks.length) {
      return new StadiumBlocks(
        jsonString["stadiumBlocks"].map((block: String, i: number) => {
          return this.stadiumBlocks[i].fromJson(block);
        })
      );
    } else {
      return new StadiumBlocks([]);
    }
  }
}
