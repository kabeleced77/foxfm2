import { IValue } from "./IValue";
import { IXPathFirstResult } from "./IXPathFirstResult";

export class HtmlSelectValue implements IValue<String> {
  constructor(
    private readonly moSelect: IXPathFirstResult<HTMLSelectElement>,
  ) { }

  public value(): String {
    return this.moSelect
      .result()
      .value;
  }
}
