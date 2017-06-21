import { IHtmlElement, HtmlElement } from "./HtmlElement";
import { IColumnValuesAsync } from "./ColumnValuesAsync";
import { IHtmlAttribute } from "./HtmlAttribute";
import { IHtmlElements, HtmlElements } from "./HtmlElements";

export interface IHtmlElementsAsync {
  elements(): Promise<IHtmlElements>;
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

  public elements(): Promise<IHtmlElements> {
    return this.columnValues
      .values()
      .then(values => {
        return new HtmlElements(values, this.tagName, this.attributes);
      });
  }
}
