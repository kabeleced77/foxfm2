import { IHtmlAttribute } from './HtmlAttribute';

export interface IHtmlElement<T> {
  element(): T;
}

export class HtmlElement<K extends keyof HTMLElementTagNameMap> implements IHtmlElement<HTMLElementTagNameMap[K]> {
  private tag: K;
  private attributes: IHtmlAttribute[];
  private value: String;
  private childElements: IHtmlElement<HTMLElement>[];

  constructor(
    tag: K,
    attributes: IHtmlAttribute[],
    value: String,
    childElements: IHtmlElement<HTMLElement>[],
  ) {
    this.tag = tag;
    this.attributes = attributes;
    this.value = value;
    this.childElements = childElements;
  }

  public element(): HTMLElementTagNameMap[K] {
    let element = window.document.createElement<K>(this.tag);
    this.attributes
      .forEach(attribute =>
        element.setAttribute(attribute.name().toString(), attribute.value().toString()));

    element.innerText = this.value.toString();

    this.childElements.forEach(child => {
      element.appendChild(child.element());
    });

    return element;
  }
}
