import { IMatchdayDataModel } from "./MatchdayDataModel";
import { IGameServerDataModel } from "./GameServerDataModel";

export interface IPlayerTransferDataModel {
  id?: Number;
  gameServer: IGameServerDataModel;
  matchday: IMatchdayDataModel;
  position: String;
  age: Number;
  strength: Number;
  price: Number;
}

export class PlayerTransferDateModel implements IPlayerTransferDataModel {
  public id: Number;
  gameServer: IGameServerDataModel;
  matchday: IMatchdayDataModel;
  position: String;
  age: Number;
  strength: Number;
  price: Number;

  constructor(
    gameServer: IGameServerDataModel,
    matchday: IMatchdayDataModel,
    position: String,
    age: Number,
    strength: Number,
    price: Number,
  ) {
    this.gameServer = gameServer;
    this.matchday = matchday;
    this.position = position;
    this.age = age;
    this.strength = strength;
    this.price = price;
  }
}
