export interface IMatchdayDataModel {
  id?: Number;
  gameServerId: Number;
  dayValue: Number;
  seasonValue: Number;
  dateValue: Date;
}

export class MatchdayDataModel implements IMatchdayDataModel {
  public id: Number;
  public gameServerId: Number;
  public dayValue: Number;
  public seasonValue: Number;
  public dateValue: Date;

  constructor(
    gameServerId: Number,
    season: Number,
    day: Number,
    date: Date,
  ) {
    this.gameServerId = gameServerId;
    this.seasonValue = season;
    this.dayValue = day;
    this.dateValue = date;
  }
}
