import { FoxfmIndexedDb } from './FoxfmIndexedDb';
import { IMatchday } from '../IMatchday';
import { IDataModelIDbImportedTransfersOfMatchday } from '../DataModel/DataModelIDbImportedTransfersOfMatchday';
import { MatchdayIDb } from './MatchdayIDb';
import { IImportedTransfersOfMatchday } from '../IImportedTransfersOfMatchday';

export class ImportedTransfersOfMatchdayIDb implements IImportedTransfersOfMatchday {
  constructor(
    private database: FoxfmIndexedDb,
    private idValue: Number,
  ) {
  }

  public id(): Number {
    return this.idValue;
  }

  public matchday(): Promise<IMatchday> {
    return this.database.transaction(
      "r",
      this.database.importedTransfersOfMatchdays,
      this.database.matchdays,
      async () => {
        const importedTransfer = await this.database.importedTransfersOfMatchdays.get(this.id());
        const matchdaysInDb = this.database.matchdays.filter(md => md.id === importedTransfer!.matchdayId);
        if (await matchdaysInDb.count() === 1) {
          return new MatchdayIDb(
            this.database,
            (await matchdaysInDb.first())!.id!
          );
        } else {
          throw `no matchday found imported transfers`;
        }
      });
  }

  public dateTime(): Promise<Date> {
    return this.database
      .importedTransfersOfMatchdays
      .get(this.idValue)
      .then((result: IDataModelIDbImportedTransfersOfMatchday) => result.dateTime);
  }
}
