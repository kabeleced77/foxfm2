import { IMatchday } from "./IMatchday";
import { IMatchdays } from "./IMatchdays";
import { IImportedTransfersOfMatchdays } from "./IImportedTransfersOfMatchdays";
import { IEasyLogger } from "./Logger/EasyLogger";
import { IImportTransfers } from "./IImportTransfers";
import { IImportedPlayerTransfers } from "../BackgroundPage/PlayerTransfers/IImportedPlayerTransfers";

/**
 * Import all player transfers of a matchday:
 * 1. add matchday to database
 * 2. import player transfers of matchday
 * 3. save import of matchday as done in database
 */
export class ImportTransfers implements IImportTransfers {
  constructor(
    private matchdaysIDb: IMatchdays,
    private importedTransfers: IImportedPlayerTransfers,
    private importedTransfersOfMatchdaysIDb: IImportedTransfersOfMatchdays,
    private logger: IEasyLogger,
  ) { }

  public async import(matchday: IMatchday): Promise<void> {
    try {
      this.logger.info(`will now prepare import of transfers`);
      // add matchday to database
      const matchdayIDb = await this.matchdaysIDb.add(
        await (await matchday.gameServer()).uri(),
        await matchday.season(),
        await matchday.day(),
        await matchday.date(),
      );

      const matchdayString = await matchday.toString();
      // have the transfers of this matchday already been imported?
      if (!(await this.importedTransfersOfMatchdaysIDb.imported(matchdayIDb))) {
        this.logger.info(`matchday ${matchdayString}: player transfers will be imported`);
        // import transfers of matchday
        await this.importedTransfers.import(matchdayIDb, this.importedTransfersOfMatchdaysIDb);
        this.logger.info(`matchday ${matchdayString}: player transfers imported`);
      } else {
        this.logger.info(`matchday ${matchdayString}: player transfers have already been imported`);
      }
    } catch (error) {
      throw new Error(`Could not import player transfers: ${error}`);
    }
  }
}
