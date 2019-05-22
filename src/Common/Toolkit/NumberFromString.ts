import { IValue } from "./IValue";

export class NumberFromString implements IValue<Number> {
  private readonly string: IValue<String>;
  private readonly decimalPoint: String;

  constructor(
    string: IValue<String>,
    decimalPoint: String
  ) {
    this.string = string;
    this.decimalPoint = decimalPoint;
  }

  public value(): Number {
    return this.getNumberFromString(this.string.value(), this.decimalPoint.valueOf());
  }

  private getNumberFromString(str: String, decimalPoint: String): Number {
    let sNum;
    let num: Number = 0;
    // infoMessage(4, 'getNumberFromString(): started: string: ' + str);
    if (str) {
      switch (decimalPoint) {
        case '.':
          sNum = str;
          break;
        case ',':
        /* falls through */
        default:
          sNum = str.replace(/\./g, '');
          sNum = sNum.replace(/\,/g, '.');
          break;
      }
      num = parseFloat(sNum);
    }
    return num;
  }
}
