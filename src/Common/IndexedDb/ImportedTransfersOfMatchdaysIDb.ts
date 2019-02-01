import { IMatchday } from '../IMatchday';
import { IEasyLogger } from '../Logger/EasyLogger';
import { FoxfmIndexedDb } from './FoxfmIndexedDb';
import { IImportedTransfersOfMatchdays } from '../IImportedTransfersOfMatchdays';
import { IImportedTransfersOfMatchday } from '../IImportedTransfersOfMatchday';
import { ImportedTransfersOfMatchdayIDb } from './ImportedTransfersOfMatchdayIDb';
import { DataModelIDbImportedTransfersOfMatchday } from '../DataModel/DataModelIDbImportedTransfersOfMatchday';

export class ImportedTransfersOfMatchdaysIDb implements IImportedTransfersOfMatchdays {
  constructor(
    private dataBase: FoxfmIndexedDb,
    private logger: IEasyLogger,
  ) { }

  public add(
    matchday: IMatchday,
    dateTime: Date)
    : Promise<IImportedTransfersOfMatchday> {

    return this.dataBase
      .transaction(
        "rw",
        this.dataBase.importedTransfersOfMatchdays,
        this.dataBase.matchdays,
        async () => {
          // get matchday from db 
          let matchdayInDb = await this
            .dataBase
            .matchdays
            .get(matchday.id());

          // look if an import of transfers for given matchday has already been added
          let importedTransfersInDb = this
            .dataBase
            .importedTransfersOfMatchdays
            .filter(it => it.matchdayId === matchdayInDb!.id);

          let importedTransferInDb: IImportedTransfersOfMatchday;
          if (await importedTransfersInDb.count() === 1) {
            // return already imported data record
            importedTransferInDb = new ImportedTransfersOfMatchdayIDb(
              this.dataBase,
              //importedTransferInDb!.id!,
              (await importedTransfersInDb.first())!.id!,
            );
            this.logger.debug(`already in IDb: '${JSON.stringify(importedTransferInDb)}'`);
          } else {
            // add and return new entry
            importedTransferInDb = await this.dataBase
              .importedTransfersOfMatchdays
              .add(new DataModelIDbImportedTransfersOfMatchday(
                matchday.id(),
                dateTime,
              ))
              .then(id => {
                this.logger.debug(`added to IDb: '${JSON.stringify(importedTransfersInDb)}'`);
                return new ImportedTransfersOfMatchdayIDb(
                  this.dataBase,
                  id,
                );
              })
              .catch(
                async e => { throw `Could not add new 'imported-transfer-for-matchday' ${await matchday.season()}-${await matchday.day()}: ${e}` }
              );
          }
          return importedTransferInDb;
        });
  }
}
