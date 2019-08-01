import { IImportedTransfersOfMatchday } from './IImportedTransfersOfMatchday';
import { IMatchdayWithId } from "./IMatchdayWithId";

export interface IImportedTransfersOfMatchdays {
  imported(
    matchday: IMatchdayWithId,
  ): Promise<Boolean>;
  add(
    matchday: IMatchdayWithId,
    dateTime: Date,
  ): Promise<IImportedTransfersOfMatchday>;
}
