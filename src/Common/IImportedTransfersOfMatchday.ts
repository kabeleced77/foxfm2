import { IMatchday } from "./IMatchday";

export interface IImportedTransfersOfMatchday {
  id(): Number;
  matchday(): Promise<IMatchday>;
  dateTime(): Promise<Date>;
}
