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

  constructor(
    public gameServerId: Number,
    public matchdayId: Number,
    public externalTransferId: Number,
    public position: String,
    public age: Number,
    public strength: Number,
    public price: Number,
  ) { }
}
