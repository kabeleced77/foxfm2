export interface INumberFromString {
  number(): Number;
}

export class NumberFromString implements INumberFromString {
  private readonly string: String;
  private readonly decimalPoint: String;

  constructor(
    string: String,
    decimalPoint: String
  ) {
    this.string = string;
    this.decimalPoint = decimalPoint;
  }

  public number(): Number {
    return this.getNumberFromString(this.string, this.decimalPoint.valueOf());
  }

  private getNumberFromString(str, decimalPoint): Number {
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
