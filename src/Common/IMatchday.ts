export interface IMatchday {
  id(): Number;
  gameServerId(): Promise<Number>;
  day(): Promise<Number>;
  season(): Number;
  date(): Date;
}
