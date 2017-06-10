import { IHtmlElement } from "./HtmlElement";

export interface IHtmlTableColumnHeader {
  element(): HTMLElement;
}

export class HtmlTableColumnHeader implements IHtmlTableColumnHeader {
  private headerElement: IHtmlElement;

  constructor(
    element: IHtmlElement
  ) {
    this.headerElement = element;
  }

  public element(): HTMLElement {
    return this.headerElement.element();
  }
}
