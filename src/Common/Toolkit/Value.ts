export interface IValue<T> {
  value(): T;
}

export class Value<T> implements IValue<T> {
  private readonly v: T;

  constructor(value: T) {
    this.v = value;
  }

  public value(): T {
    return this.v;
  }
}
