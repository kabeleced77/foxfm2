import { IValue } from "./IValue";

export class SplitStringToString implements IValue<String> {
  private readonly string: IValue<String>;
  private readonly splitBy: string | RegExp;
  private readonly elementPosition: Number;

  /**
    * Split a string into substrings using the specified separator.
    * @param string which is shall be split by separator.
    * @param separator used to split given string.
    * @param elementPosition number of element of the splitted string method value() will return; counting starts at 1
    */
  constructor(
    string: IValue<String>,
    separator: string | RegExp,
    element: Number,
  ) {
    this.string = string;
    this.splitBy = separator;
    this.elementPosition = element;
  }

  public value(): String {
    let elements = this.string.value().split(this.splitBy);
    let s: String;
    if (elements.length === 0) {
      s = this.string.value();
    } else {
      if (this.elementPosition > 0) {
        s = elements[this.elementPosition.valueOf() - 1];
      } else{
        throw new Error(`Number given for the element must be greater than 0, got: ${this.elementPosition}`);
      }
    }
    return s;
  }
}
