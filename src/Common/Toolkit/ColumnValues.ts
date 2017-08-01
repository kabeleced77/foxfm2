export interface IColumnValues<T> {
  values(): Array<T>;
}

export class ColumnValues<T> implements IColumnValues<T> {
  private valueArray: T[];

  constructor(values: T[]) {
    this.valueArray = values;
  }

  public values(): T[] {
    return this.valueArray;
  }
}
