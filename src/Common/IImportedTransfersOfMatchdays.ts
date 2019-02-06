import { IImportedTransfersOfMatchday } from './IImportedTransfersOfMatchday';
import { IMatchday } from './IMatchday';

export interface IImportedTransfersOfMatchdays {
  imported(
    matchday: IMatchday,
  ): Promise<Boolean>;
  add(
    matchday: IMatchday,
    dateTime: Date,
  ): Promise<IImportedTransfersOfMatchday>;
}
