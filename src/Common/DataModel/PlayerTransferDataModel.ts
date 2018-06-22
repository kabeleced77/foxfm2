export interface IPlayerTransferDataModel {
  id?: Number;
  gameServerId: Number;
  matchdayId: Number;
  externalTransferId: Number;
  sellingTeam: String;
  buyingTeam: String;
  name: String;
  position: String;
  age: Number;
  strength: Number;
  price: Number;
}

export class PlayerTransferDateModel implements IPlayerTransferDataModel {
  public id: Number;
  public gameServerId: Number;
  public matchdayId: Number;
  public externalTransferId: Number;
  public sellingTeam: String;
  public buyingTeam: String;
  public name: String;
  public position: String;
  public age: Number;
  public strength: Number;
  public price: Number;

  constructor(
    gameServerId: Number,
    matchdayId: Number,
    externalTransferId: Number,
    sellingTeam: String,
    buyingTeam: String,
    name: String,
    position: String,
    age: Number,
    strength: Number,
    price: Number,
  ) {
    this.gameServerId = gameServerId;
    this.matchdayId = matchdayId;
    this.externalTransferId = externalTransferId;
    this.sellingTeam = sellingTeam;
    this.buyingTeam = buyingTeam;
    this.name = name;
    this.position = position;
    this.age = age;
    this.strength = strength;
    this.price = price;
  }
}
