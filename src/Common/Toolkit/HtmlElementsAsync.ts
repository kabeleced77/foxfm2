import { IHtmlElement, HtmlElement } from "./HtmlElement";
import { IColumnValuesAsync } from "./ColumnValuesAsync";
import { IHtmlAttribute } from "./HtmlAttribute";

export interface IHtmlElementsAsync {
  elements(): Promise<IHtmlElement[]>;
}

export class HtmlElementsAsync<T> implements IHtmlElementsAsync {
  private columnValues: IColumnValuesAsync<T>;
  private tagName: String;
  private attributes: IHtmlAttribute[];

  constructor(
    values: IColumnValuesAsync<T>,
    tag: String,
    attributes: IHtmlAttribute[]
  ) {
    this.columnValues = values;
    this.tagName = tag;
    this.attributes = attributes;
  }

  public elements(): Promise<IHtmlElement[]> {
    return this.columnValues
      .values()
      .then(values => { return values.map(value => new HtmlElement(this.tagName, this.attributes, value.toString())); });
  }
}
