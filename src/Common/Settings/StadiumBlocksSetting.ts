import { ISetting } from "./Setting"
import { IGameKind } from '../GameKind';
import { GameKindLeague, GameKindFriendly, GameKindCup } from '../GameKind';
import { IStadiumBlocks } from '../StadiumBlocks';
import { StadiumBlocks } from '../StadiumBlocks';
import { IStadiumBlock } from '../StadiumBlock';
import { StadiumBlock } from '../StadiumBlock';
import { IStadiumBlockName } from '../StadiumBlockName';
import { StadiumBlockName1 } from '../StadiumBlockName';
import { StadiumBlockName2 } from '../StadiumBlockName';
import { StadiumBlockName3 } from '../StadiumBlockName';
import { StadiumBlockName4 } from '../StadiumBlockName';
import { IStadiumEntryPrices } from '../StadiumEntryPrices';
import { StadiumEntryPrices } from '../StadiumEntryPrices';
import { StadiumEntryPrice } from '../StadiumEntryPrice';
import { ISettingName } from "./SettingName";
import { StorageLocal } from "../Toolkit/StorageLocal";

export interface IStadiumBlocksSetting {
  blocksEntryPricesOffsetActivated(): Promise<Boolean>;
  blocks(): Promise<IStadiumBlocks>;
  stadiumBlockByName(text: String): Promise<IStadiumBlock>;
  changeBlockEntryPricesOffsetStatus(status: Boolean): void;
  changeBlockEntryPricesOffset(block: IStadiumBlockName, kindOfGame: IGameKind, price: Number): void;
}

export class SettingNameStadiumBlocks implements ISettingName {
  private settingName: String = "foxfm2.stadium.blocks";

  constructor() {
  }

  public name(): String {
    return this.settingName;
  }
}

export class StadiumBlocksSetting implements IStadiumBlocksSetting {
  private stadiumBlocks: ISetting<IStadiumBlocks>;

  constructor() {
    this.stadiumBlocks = new StorageLocal<IStadiumBlocks>(
      new SettingNameStadiumBlocks(),
      new StadiumBlocks(
        [
          new StadiumBlock(
            new StadiumBlockName1(),
            false,
            new StadiumEntryPrices(
              new StadiumEntryPrice(
                new GameKindLeague(),
                0
              ),
              new StadiumEntryPrice(
                new GameKindFriendly(),
                0
              ),
              new StadiumEntryPrice(
                new GameKindCup(),
                0
              )
            ),
            "/html/body/div[1]/div/form/table/tbody/tr[3]/td/table/tbody/tr[1]/td[1]/div/div/table/tbody/tr/td/table/tbody/tr[1]/td"
          ),
          new StadiumBlock(
            new StadiumBlockName2(),
            false,
            new StadiumEntryPrices(
              new StadiumEntryPrice(
                new GameKindLeague(),
                0
              ),
              new StadiumEntryPrice(
                new GameKindFriendly(),
                0
              ),
              new StadiumEntryPrice(
                new GameKindCup(),
                0
              )
            ),
            "/html/body/div[1]/div/form/table/tbody/tr[3]/td/table/tbody/tr[1]/td[2]/div/div/table/tbody/tr/td/table/tbody/tr[1]/td"
          ),
          new StadiumBlock(
            new StadiumBlockName3(),
            false,
            new StadiumEntryPrices(
              new StadiumEntryPrice(
                new GameKindLeague(),
                0
              ),
              new StadiumEntryPrice(
                new GameKindFriendly(),
                0
              ),
              new StadiumEntryPrice(
                new GameKindCup(),
                0
              )
            ),
            "/html/body/div[1]/div/form/table/tbody/tr[3]/td/table/tbody/tr[2]/td[1]/div/div/table/tbody/tr/td/table/tbody/tr[1]/td"
          ),
          new StadiumBlock(
            new StadiumBlockName4(),
            false,
            new StadiumEntryPrices(
              new StadiumEntryPrice(
                new GameKindLeague(),
                0
              ),
              new StadiumEntryPrice(
                new GameKindFriendly(),
                0
              ),
              new StadiumEntryPrice(
                new GameKindCup(),
                0
              )
            ),
            "/html/body/div[1]/div/form/table/tbody/tr[3]/td/table/tbody/tr[2]/td[2]/div/div/table/tbody/tr/td/table/tbody/tr[1]/td"
          )
        ])
    );
  }

  public blocks(): Promise<IStadiumBlocks> {
    return this.stadiumBlocks.value();
  }
  public blocksEntryPricesOffsetActivated(): Promise<Boolean> {
    return this.blocks()
      .then((stadiumBlocks: IStadiumBlocks) => {
        return stadiumBlocks.blocksPricesOffsetActivated();
      });
  }
  public stadiumBlockByName(name: String): Promise<IStadiumBlock> {
    return this.blocks().then((stadiumBlocks: IStadiumBlocks) => {
      var blocks = stadiumBlocks
        .blocks()
        .map((block: IStadiumBlock) => {
          if (block.name().name() === name) {
            return block;
          }
        })
        .filter(block => block !== undefined);

      if (blocks.length == 1) {
        return blocks[0];
      }
      if (blocks.length == 0) {
        throw `${this.stadiumBlockByName.name}: No Stadium block could be identfied by text '${name}'.`;
      } else {
        throw `${this.stadiumBlockByName.name}: Too many stadium blocks were identfied by text '${name}'.`;
      }
    });
  }
  public changeBlockEntryPricesOffsetStatus(status: Boolean): void {
    this.stadiumBlocks.update((stadiumBlocks: IStadiumBlocks) => {
      stadiumBlocks.activateBlocksPricesOffset(status);
      return stadiumBlocks;
    });
  }
  public changeBlockEntryPricesOffset(blockName: IStadiumBlockName, kindOfGame: IGameKind, price: Number): void {
    this.stadiumBlocks.update((stadiumBlocks: IStadiumBlocks) => {
      var updatedBlocks = stadiumBlocks.blocks().map((block: IStadiumBlock) => {
        if (block.name().name() === blockName.name().toString()) {
          var stadiumEntryPrices: IStadiumEntryPrices;
          switch (kindOfGame.name()) {
            case new GameKindLeague().name():
              stadiumEntryPrices = new StadiumEntryPrices(
                new StadiumEntryPrice(
                  kindOfGame,
                  price
                ),
                block.pricesOffset().friendly(),
                block.pricesOffset().cup()
              );
              break;
            case new GameKindFriendly().name():
              stadiumEntryPrices = new StadiumEntryPrices(
                block.pricesOffset().league(),
                new StadiumEntryPrice(
                  kindOfGame,
                  price
                ),
                block.pricesOffset().cup()
              );
              break;
            case new GameKindCup().name():
              stadiumEntryPrices = new StadiumEntryPrices(
                block.pricesOffset().league(),
                block.pricesOffset().friendly(),
                new StadiumEntryPrice(
                  kindOfGame,
                  price
                )
              );
              break;
            default:
              throw `${this.changeBlockEntryPricesOffset.name}: No game kind could be identfied by '${kindOfGame.name()}'.`;
          }
          return new StadiumBlock(
            block.name(),
            block.pricesOffsetActivated(),
            stadiumEntryPrices,
            block.xPathToTribune()
          );
        } else {
          return block;
        }
      });
      return new StadiumBlocks(updatedBlocks);
    });
  }
}
