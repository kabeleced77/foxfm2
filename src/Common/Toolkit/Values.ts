export interface IValues<T> {
  values(): T[];
}

export class Values<T> implements IValues<T>{
  private readonly vals: T[];

  constructor(
    values: T[]
  ) {
    this.vals = values;
  }

  public values(): T[] {
    return this.vals;
  }
}
