import { IMatchday } from './IMatchday';

export interface IPlayerTransfer {
  id(): Number;
  externalTransferId(): Promise<Number>;
  matchdayId(): Promise<Number>;
  matchday(): Promise<IMatchday>;
  position(): Promise<String>;
  age(): Promise<Number>;
  strength(): Promise<Number>;
  price(): Promise<Number>;
}
