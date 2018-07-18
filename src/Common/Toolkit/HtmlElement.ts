import { IHtmlAttribute } from './HtmlAttribute';

export interface IHtmlElement<T> {
  element(): T;
}

export class HtmlElement<K extends keyof HTMLElementTagNameMap> implements IHtmlElement<HTMLElementTagNameMap[K]> {
  private tag: K;
  private attributes: IHtmlAttribute[];
  private textContent: String;
  private childElements: IHtmlElement<HTMLElement>[];

  constructor(
    tag: K,
    attributes: IHtmlAttribute[],
    textContent: String,
    childElements: IHtmlElement<HTMLElement>[],
  ) {
    this.tag = tag;
    this.attributes = attributes;
    this.textContent = textContent;
    this.childElements = childElements;
  }

  public element(): HTMLElementTagNameMap[K] {
    let element = window.document.createElement<K>(this.tag);
    this.attributes
      .forEach(attribute =>
        element.setAttribute(attribute.name().toString(), attribute.value().toString()));

    element.textContent = this.textContent.toString();

    this.childElements.forEach(child => {
      element.appendChild(child.element());
    });

    return element;
  }
}
