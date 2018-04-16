import { SplitStringToNumbers } from './SplitString';
import { IValues, Values } from './Values';

export interface ISplitStrings<T1, T2> {
  firstValues(): IValues<T1>;
  secondValues(): IValues<T2>;
}

export class SplitStringsToNumbers implements ISplitStrings<Number, Number> {
  private readonly strings: IValues<String>;
  private readonly splitBy: String;
  private readonly decimalPoint: String;
  private firstValuesOfStrings: Number[];
  private secondValuesOfStrings: Number[];

  constructor(
    strings: IValues<String>,
    splitBy: String,
    decimalPoint: String
  ) {
    this.strings = strings;
    this.splitBy = splitBy;
    this.decimalPoint = decimalPoint;
    this.firstValuesOfStrings = [];
    this.secondValuesOfStrings = [];
  }

  firstValues(): IValues<Number> {
    if (this.strings.values().length !== this.firstValuesOfStrings.length) this.split();
    return new Values<Number>(this.firstValuesOfStrings);
  }
  secondValues(): IValues<Number>{
    if (this.strings.values().length !== this.secondValuesOfStrings.length) this.split();
    return new Values<Number>(this.secondValuesOfStrings);
  }
  private split(): void {
    this.strings.values().forEach(string => {
      let values = new SplitStringToNumbers(string, this.splitBy, this.decimalPoint);
      this.firstValuesOfStrings.push(values.firstValue());
      this.secondValuesOfStrings.push(values.secondValue());
    });
  }
}
