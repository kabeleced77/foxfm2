import { IMatchdayWithId } from "../../Common/IMatchdayWithId";

export interface IImportedPlayerTransfers {
  import(matchday: IMatchdayWithId): Promise<void>;
}
