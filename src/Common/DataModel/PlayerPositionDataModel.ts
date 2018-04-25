export interface IPlayerPositionDataModel {
  id?: Number;
  i18nName: String;
  i18nShortName: String;
}

export class PlayerPositionDataModel implements IPlayerPositionDataModel {
  public id: Number;
  public i18nName: String;
  public i18nShortName: String;

  constructor(
    i18nName: String,
    i18nShortName: String,
  ) {
    this.i18nName = i18nName;
    this.i18nShortName = i18nShortName;
  }
}
