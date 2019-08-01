import { IMatchday } from "./IMatchday";

export interface IMatchdayWithId extends IMatchday {
  id(): Number;
  gameServerId(): Promise<Number>;
}
