export interface IClubDataModel {
  id?: Number;
  name: String;
  externalId: Number;
}

export class ClubDataModel implements IClubDataModel {
  public id: Number;
  public name: String;
  public externalId: Number;

  constructor(
    name: String,
    externalId: Number,
  ) {
    this.name = name;
    this.externalId = externalId;
  }
}
