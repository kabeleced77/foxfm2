import { IStadiumBlock } from './StadiumBlock';

export interface IStadiumBlocks {
  blocks(): Array<IStadiumBlock>;
  blockByName(name: String): IStadiumBlock;
  blocksPricesOffsetActivated(): Boolean;
  activateBlocksPricesOffset(status: Boolean): void;
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

  public activateBlocksPricesOffset(status: Boolean): void {
    this.stadiumBlocks.forEach((block: IStadiumBlock) => block.activatePricesOffset(status));
  }

  public blockByName(name: String): IStadiumBlock {
    if (this.stadiumBlocks.length === 0) throw new Error(`${this.blockByName.name}: could not find stadium block '${name}' as there are no blocks at all.`);

    let blocks = this.stadiumBlocks.filter(block => block.name().name() === name);
    if (blocks.length == 1) {
      return blocks[0];
    }
    if (blocks.length == 0) {
      throw new Error(`${this.blockByName.name}: none of the stadium blocks matched the name of '${name}'.`);
    } else {
      throw new Error(`${this.blockByName.name}: too many stadium blocks matched the name of '${name}'.`);
    }
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
