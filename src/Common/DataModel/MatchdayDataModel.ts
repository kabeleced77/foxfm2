export interface IMatchdayDataModel {
    id?: Number;
    serverValue: String;
    dayValue: Number;
    seasonValue: Number;
    dateValue: Date;
  }
  
  export class MatchdayDataModel implements IMatchdayDataModel {
    public id: Number;
    public serverValue: String;
    public dayValue: Number;
    public seasonValue: Number;
    public dateValue: Date;
  
    constructor(
      server: String,
      season: Number,
      day: Number,
      date: Date,
    ) {
      this.serverValue = server;
      this.seasonValue = season;
      this.dayValue = day;
      this.dateValue = date;
    }
  }
  