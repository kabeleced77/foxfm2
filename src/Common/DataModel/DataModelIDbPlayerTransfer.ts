export interface IDataModelIDbPlayerTransfer {
  id?: Number;
  gameServerId: Number;
  matchdayId: Number;
  externalTransferId: Number;
  position: String;
  age: Number;
  strength: Number;
  price: Number;
}

export class DataModelIDbPlayerTransfer implements IDataModelIDbPlayerTransfer {
  public id: Number;
  public gameServerId: Number;
  public matchdayId: Number;
  public externalTransferId: Number;
  public position: String;
  public age: Number;
  public strength: Number;
  public price: Number;

  constructor(
    gameServerId: Number,
    matchdayId: Number,
    externalTransferId: Number,
    position: String,
    age: Number,
    strength: Number,
    price: Number,
  ) {
    this.gameServerId = gameServerId;
    this.matchdayId = matchdayId;
    this.externalTransferId = externalTransferId;
    this.position = position;
    this.age = age;
    this.strength = strength;
    this.price = price;
  }
}
