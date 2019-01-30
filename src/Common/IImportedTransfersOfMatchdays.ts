import { IImportedTransfersOfMatchday } from './IImportedTransfersOfMatchday';
import { IMatchday } from './IMatchday';

export interface IImportedTransfersOfMatchdays {
  add(
    matchday: IMatchday,
    dateTime: Date,
  ): Promise<IImportedTransfersOfMatchday>;
}
