import { IMatchday } from '../../Common/IMatchday';

export interface IImportedPlayerTransfers {
  import(matchday: IMatchday): void;
}
