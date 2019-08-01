import { IMatchdayWithId } from "../../Common/IMatchdayWithId";

export interface IUserInteractionImportPlayerTransfers {
  import(matchday: IMatchdayWithId): void;
}
