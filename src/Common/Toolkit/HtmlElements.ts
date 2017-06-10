import { IColumnValues } from "./ColumnValues";
import { IHtmlElement, HtmlElement } from "./HtmlElement";
import { IHtmlAttribute } from "./HtmlAttribute";

export interface IHtmlElements {
  elements(): IHtmlElement[];
}

export class HtmlElements<T> implements IHtmlElements {
  private columnValues: IColumnValues;
  private tagName: String;
  private attributes: IHtmlAttribute[];

  constructor(values: IColumnValues, tag: String, attributes: IHtmlAttribute[]) {
    this.columnValues = values;
    this.tagName = tag;
    this.attributes = attributes;
  }

  public elements(): IHtmlElement[] {
    return this.columnValues.values().map(value => new HtmlElement(this.tagName, this.attributes, value));
  }
}
