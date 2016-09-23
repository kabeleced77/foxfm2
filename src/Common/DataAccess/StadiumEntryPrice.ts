import { IGameKind } from "./GameKind"

export interface IStadiumEntryPrice {
  kindOfGame(): IGameKind;
  price(): Number;
  fromJson(jsonString: String): IStadiumEntryPrice;
}

export class StadiumEntryPrice implements IStadiumEntryPrice {
  private kind: IGameKind;
  private entryPrice: Number;

  constructor(kind: IGameKind, price: Number) {
    this.kind = kind;
    this.entryPrice = price;
  }

  public kindOfGame(): IGameKind {
    return this.kind;
  }
  public price(): Number {
    return this.entryPrice;
  }
  public fromJson(jsonString: String): IStadiumEntryPrice {
    return new StadiumEntryPrice(
      this.kind.fromJson(jsonString["kind"]),
      jsonString["entryPrice"]
    );
  }

}
