import { IMatchdayWithId } from "./IMatchdayWithId";

export interface IImportedTransfersOfMatchday {
  id(): Number;
  matchday(): Promise<IMatchdayWithId>;
  dateTime(): Promise<Date>;
}
