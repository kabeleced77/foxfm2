import { NumberFromString } from './NumberFromString';
import { Value } from './Value';

export interface ISplitString<T1, T2> {
  firstValue(): T1;
  secondValue(): T2;
}

export class SplitStringToNumbers implements ISplitString<Number, Number> {
  private readonly string: String;
  private readonly splitBy: String;
  private readonly decimalPoint: String;

  constructor(
    string: String,
    splitBy: String,
    decimalPoint: String
  ) {
    this.string = string;
    this.splitBy = splitBy;
    this.decimalPoint = decimalPoint;
  }

  public firstValue(): Number {
    const splittedString = this.split();
    return new NumberFromString(
      new Value<String>(splittedString.length >= 1 ? splittedString[0].trim() : ""),
      this.decimalPoint).value();
  }
  public secondValue(): Number {
    const splittedString = this.split();
    return new NumberFromString(
      new Value<String>(splittedString.length >= 2 ? splittedString[1].trim() : ""),
      this.decimalPoint).value();
  }

  private split(): string[] {
    return this.string.split(this.splitBy.valueOf());
  }
}
