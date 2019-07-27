import { IValue } from "./IValue";
import { IXPathFirstResult } from './IXPathFirstResult';

export class HtmlNodeTextContent<T extends Node> implements IValue<String> {
  constructor(
    private readonly element: IXPathFirstResult<T>) {
  }
  public value(): String {
    return new String(this.element.node().textContent);
  }
}
