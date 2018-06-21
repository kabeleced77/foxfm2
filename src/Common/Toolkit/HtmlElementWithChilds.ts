import { IHtmlAttribute } from './HtmlAttribute';
import { IHtmlElement } from './HtmlElement';

export interface IHtmlElementWithChilds {
  attributes(): IHtmlAttribute[];
  childElements(): IHtmlElement<HTMLElement>[];
}

export class HtmlElementWithChilds implements IHtmlElementWithChilds {
  private readonly columnElemenAttributes: IHtmlAttribute[];
  private readonly columnChildElements: IHtmlElement<HTMLElement>[];

  constructor(
    attributes: IHtmlAttribute[],
    childElements: IHtmlElement<HTMLElement>[]
  ) {
    this.columnElemenAttributes = attributes;
    this.columnChildElements = childElements;
  }

  public attributes(): IHtmlAttribute[] {
    return this.columnElemenAttributes;
  }
  public childElements(): IHtmlElement<HTMLElement>[] {
    return this.columnChildElements;
  }
}
