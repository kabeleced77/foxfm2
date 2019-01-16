import { IMatchday } from '../../Common/IMatchday';

export interface IUserInteractionImportPlayerTransfers {
  import(matchday: IMatchday): void;
}
