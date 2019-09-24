import { IMatchdayWithId } from "../IMatchdayWithId";
import { IEasyLogger, EasyLogger } from '../Logger/EasyLogger';
import { FoxfmIndexedDb } from './FoxfmIndexedDb';
import { IImportedTransfersOfMatchdays } from '../IImportedTransfersOfMatchdays';
import { IImportedTransfersOfMatchday } from '../IImportedTransfersOfMatchday';
import { ImportedTransfersOfMatchdayIDb } from './ImportedTransfersOfMatchdayIDb';
import { DataModelIDbImportedTransfersOfMatchday, IDataModelIDbImportedTransfersOfMatchday } from '../DataModel/DataModelIDbImportedTransfersOfMatchday';
import { IMatchday } from "../IMatchday";
import { MatchdaysIDb } from "./MatchdaysIDb";
import { RegisteredLoggingModule } from "../Logger/RegisteredLoggingModule";
import { LogLevelError } from "../Logger/LogLevel";
import { GameServersIDb } from "./GameServersIDb";

export class ImportedTransfersOfMatchdaysIDb implements IImportedTransfersOfMatchdays {
  constructor(
    private dataBase: FoxfmIndexedDb,
    private logger: IEasyLogger,
  ) { }

  public async importedOfMatchday(
    matchday: IMatchday,
  ): Promise<Boolean> {
    const matchdayString = await matchday.toString();
    this.logger.debug(`will look up if transfers of matchday '${matchdayString}' have already been imported`);
    let imported: Boolean = false;
    const gameServers = await new GameServersIDb(
      this.dataBase,
      new EasyLogger(
        this.logger.logger(),
        new RegisteredLoggingModule(
          nameof(GameServersIDb),
          new LogLevelError(),
        )
      ),
    ).gameServersByUri(await (await matchday.gameServer()).uri());
    if (gameServers.length === 1) {
      const matchdays = await new MatchdaysIDb(
        this.dataBase,
        new EasyLogger(
          this.logger.logger(),
          new RegisteredLoggingModule(
            nameof(MatchdaysIDb),
            new LogLevelError(),
          ),
        ),
      ).matchdaysByServerSeasonDay(
        gameServers[0],
        await matchday.season(),
        await matchday.day(),
      );
      if (matchdays.length > 0) {
        imported = await this.imported(matchdays[0]);
      }
    }
    this.logger.debug(`have transfers of matchday '${matchdayString}' already been imported: ${imported}`);
    return imported;
  }

  public imported(
    matchday: IMatchdayWithId,
  ): Promise<Boolean> {

    return new Promise<Boolean>((resolve, reject) => {
      const count = this.dataBase
        .importedTransfersOfMatchdays
        .where(nameof<IDataModelIDbImportedTransfersOfMatchday>(o => o.matchdayId))
        .equals(matchday.id().valueOf())
        .count();

      resolve(count.then(c => c > 0));
    });
  }

  public add(
    matchday: IMatchdayWithId,
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
