import { IImportedTransfersOfMatchday } from './IImportedTransfersOfMatchday';
import { IMatchdayWithId } from "./IMatchdayWithId";
import { IMatchday } from './IMatchday';

export interface IImportedTransfersOfMatchdays {
  imported(
    matchday: IMatchdayWithId,
  ): Promise<Boolean>;
  importedOfMatchday(
    matchday: IMatchday,
  ): Promise<Boolean>;
  add(
    matchday: IMatchdayWithId,
    dateTime: Date,
  ): Promise<IImportedTransfersOfMatchday>;
}
