/**
 * Data model description for 
 * imported player transfers of a certain matchday.
 * 
 * If such an entry exists, transfers of the matchday have already been imported.
 * 
 */
export interface IDataModelIDbImportedTransfersOfMatchday {
  id?: Number;

  /**
   * @public property @param matchdayId id of the matchday object the transfers have been imported at
   */
  matchdayId: Number;
  /**
   * @public property @param dateTime date and time the transfers have been imported at
   */
  dateTime: Date;
}

export class DataModelIDbImportedTransfersOfMatchday implements IDataModelIDbImportedTransfersOfMatchday {
  public id: Number;

  constructor(
    public matchdayId: Number,
    public dateTime: Date,
  ) { }
}
