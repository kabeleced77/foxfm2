import { IValue } from "./IValue";

export class NumberFromString implements IValue<Number> {
  constructor(
    private readonly string: IValue<String>,
    private readonly decimalPoint: String = '.',
  ) { }

  public value(): Number {
    let num: Number = 0;
    let numberString = this.string.value();
    if (numberString) {
      switch (this.decimalPoint) {
        case '.':
          numberString = numberString
            .replace(/\,/g, '') // remove thousands separator
          break;
        case ',':
        /* falls through */
        default:
          numberString = numberString
            .replace(/\./g, '') // remove thousands separator
            .replace(',', '.'); // replace decimal separator 
          break;
      }
      num = parseFloat(numberString.toString());
    }
    return num;
  }
}
