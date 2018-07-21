export interface IClub {
  id(): Number;
  name(): Promise<String>;
  externalId(): Promise<Number>;
}
