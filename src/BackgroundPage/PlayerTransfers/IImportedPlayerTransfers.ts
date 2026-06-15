import { IImportedTransfersOfMatchdays } from "../../Common/IImportedTransfersOfMatchdays";
import { IMatchdayWithId } from "../../Common/IMatchdayWithId";

export interface IImportedPlayerTransfers {
  import(
    matchday: IMatchdayWithId,
    importedTransfersOfMatchdaysIDb: IImportedTransfersOfMatchdays,
  ): Promise<void>;
}
