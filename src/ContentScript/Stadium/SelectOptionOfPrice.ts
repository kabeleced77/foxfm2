import { IValue } from "../../Common/Toolkit/IValue";

/**
 * Index of the option of an OFM price select element which shows the given price.
 * The options are matched by the leading number of their text. If no option
 * matches, the price is expected to be the (1-based) position of the option.
 * Value is -1 if there is no suitable option.
 */
export class SelectOptionOfPrice implements IValue<number> {
  constructor(
    private readonly select: HTMLSelectElement,
    private readonly price: number,
  ) { }

  public value(): number {
    const options = Array.from(this.select.options);
    const byText = options.findIndex((option) => {
      const match = /^\s*(\d+)/.exec(option.text);
      return match !== null && Number(match[1]) === this.price;
    });
    if (byText >= 0) return byText;
    const byPosition = this.price - 1;
    return byPosition >= 0 && byPosition < options.length ? byPosition : -1;
  }
}
