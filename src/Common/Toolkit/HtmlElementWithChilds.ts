import { IHtmlAttribute } from "./HtmlAttribute";

export interface IHtmlElementWithChilds {
  attributes(): IHtmlAttribute[];
  childElements(): HTMLElement[];
}

export class HtmlElementWithChilds implements IHtmlElementWithChilds {
  private readonly columnElemenAttributes: IHtmlAttribute[];
  private readonly columnChildElements: HTMLElement[];

  constructor(
    attributes: IHtmlAttribute[],
    childElements: HTMLElement[]
  ) {
    this.columnElemenAttributes = attributes;
    this.columnChildElements = childElements;
  }

  public attributes(): IHtmlAttribute[] {
    return this.columnElemenAttributes;
  }
  public childElements(): HTMLElement[] {
    return this.columnChildElements;
  }
}
