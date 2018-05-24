export interface IClubMessagingDataModel {
  gameServerUrl: String;
  name: String;
  externalId: Number;
}

export class ClubMessagingDataModel implements IClubMessagingDataModel {
  public gameServerUrl: String;
  public name: String;
  public externalId: Number;

  constructor(
    gameServerUrl: String,
    name: String,
    externalId: Number,
  ) {
    this.gameServerUrl = gameServerUrl;
    this.name = name;
    this.externalId = externalId;
  }
}
