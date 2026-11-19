import { GameKindCup, GameKindFriendly, GameKindLeague } from "./GameKind";
import {
  StadiumBlockName1,
  StadiumBlockName2,
  StadiumBlockName3,
  StadiumBlockName4,
} from "./StadiumBlockName";

/** name of the OFM feature 'stadium' (table 'ofmFeatures') */
export const stadiumFeatureName = "stadium";

export interface IStadiumXPathEntry {
  /** name of the XPath within the feature 'stadium', e.g. "price.League.1" */
  name: string;
  block: string;
  kind: string;
}

/**
 * The XPaths of the stadium page: one per block and kind of game. Each one points
 * to the OFM select element in which the entry price of that block and
 * kind of game is chosen.
 */
export interface IStadiumXPathEntries {
  blocks(): string[];
  kinds(): string[];
  all(): IStadiumXPathEntry[];
  name(block: string, kind: string): string;
  /** name -> default XPath */
  defaults(): { [name: string]: string };
}

export class StadiumXPathEntries implements IStadiumXPathEntries {
  constructor(
    private readonly blockNames: string[],
    private readonly kindNames: string[],
    /** kind of game -> name attribute of the OFM select element */
    private readonly ofmSelectNames: { [kind: string]: string },
  ) { }

  public blocks(): string[] {
    return this.blockNames.slice();
  }
  public kinds(): string[] {
    return this.kindNames.slice();
  }
  public all(): IStadiumXPathEntry[] {
    const entries: IStadiumXPathEntry[] = [];
    this.kindNames.forEach((kind) =>
      this.blockNames.forEach((block) =>
        entries.push({ name: this.name(block, kind), block, kind }),
      ),
    );
    return entries;
  }
  public name(block: string, kind: string): string {
    return `price.${kind}.${block}`;
  }
  public defaults(): { [name: string]: string } {
    const defaults: { [name: string]: string } = {};
    this.all().forEach((entry) => {
      defaults[entry.name] =
        `//select[@name="block_price[${entry.block}][${this.ofmSelectNames[entry.kind]}]"]`;
    });
    return defaults;
  }
}

/** the stadium of the OFM: 4 blocks; league, friendly and cup games */
export class OfmStadiumXPathEntries extends StadiumXPathEntries {
  constructor() {
    super(
      [
        new StadiumBlockName1().name().toString(),
        new StadiumBlockName2().name().toString(),
        new StadiumBlockName3().name().toString(),
        new StadiumBlockName4().name().toString(),
      ],
      [
        new GameKindLeague().name().toString(),
        new GameKindFriendly().name().toString(),
        new GameKindCup().name().toString(),
      ],
      {
        [new GameKindLeague().name().toString()]: "epreis",
        [new GameKindFriendly().name().toString()]: "epreisfr",
        [new GameKindCup().name().toString()]: "epreispok",
      },
    );
  }
}
