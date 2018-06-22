import { IHtmlAttribute } from "./HtmlAttribute";

export interface IHtmlElement<T> {
  element(): T;
}

export class HtmlElement<K extends keyof HTMLElementTagNameMap, T extends HTMLElement> implements IHtmlElement<T> {
  private tag: K;
  private attributes: IHtmlAttribute[];
  private value: String;

  constructor(
    tag: K,
    attributes: IHtmlAttribute[],
    value: String
  ) {
    this.tag = tag;
    this.attributes = attributes;
    this.value = value;
  }

  public element(): T {
    let element = <T>window.document.createElement<K>(this.tag);
    this.attributes
      .forEach(attribute =>
        element.setAttribute(attribute.name().toString(), attribute.value().toString()));

    var textNode = window.document.createTextNode(this.value.toString());
    element.appendChild(textNode);

    return element;
  }
}
