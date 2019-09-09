import { IMatchday } from "./IMatchday";

export interface IImportTransfers {
  import(matchday: IMatchday): Promise<void>;
}
