export interface IClubDataModel {
  id?: Number;
  gameServerId: Number;
  name: String;
  externalId: Number;
}

export class ClubDataModel implements IClubDataModel {
  public id: Number;
  public gameServerId: Number;
  public name: String;
  public externalId: Number;

  constructor(
    gameServerId: Number,
    name: String,
    externalId: Number,
  ) {
    this.gameServerId = gameServerId;
    this.name = name;
    this.externalId = externalId;
  }
}
