import { IMatchday } from './IMatchday';

export interface IImportedTransfersOfMatchdaysMessaging {
  imported(
    matchday: IMatchday,
  ): Promise<Boolean>;
}
