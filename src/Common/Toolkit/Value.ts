export interface IValue<T> {
  value(): T;
}

export class StringValue implements IValue<String> {
  private readonly stringValue: String;

  constructor(value: String) {
    this.stringValue = value;
  }
  public value(): String {
    return this.stringValue;
  }
}
