import { IHtmlElement } from "./HtmlElement";

export class HtmlElementWrapped<T> implements IHtmlElement<T> {
  private wrappedElement: T;

  constructor(
    element: T
  ) {
    this.wrappedElement = element;
  }

  public element(): T {
    return this.wrappedElement;
  }
}
