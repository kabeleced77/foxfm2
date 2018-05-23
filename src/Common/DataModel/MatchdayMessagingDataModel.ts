export interface IMatchdayMessagingDataModel {
  gameServerUrl: String;
  day: Number;
  season: Number;
}

export class MatchdayMessagingDataModel implements IMatchdayMessagingDataModel {
  public gameServerUrl: String;
  public day: Number;
  public season: Number;

  constructor(
    gameServerUrl: String,
    season: Number,
    day: Number,
  ) {
    this.gameServerUrl = gameServerUrl;
    this.season = season;
    this.day = day;
  }
}
