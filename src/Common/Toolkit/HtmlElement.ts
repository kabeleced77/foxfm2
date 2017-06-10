import { IHtmlAttribute } from "./HtmlAttribute";

export interface IHtmlElement {
  element(): HTMLElement;
}

export class HtmlElement implements IHtmlElement {
  private tag: String;
  private attributes: IHtmlAttribute[];
  private value: String;

  constructor(
    tag: String,
    attributes: IHtmlAttribute[],
    value: String
  ) {
    this.tag = tag;
    this.attributes = attributes;
    this.value = value;
  }

  public element(): HTMLElement {
    var element = window.document.createElement(this.tag.toString());
    this.attributes
      .forEach(attribute =>
        element.setAttribute(attribute.name().toString(), attribute.value().toString()));

    var textNode = window.document.createTextNode(this.value.toString());
    element.appendChild(textNode);

    return element;
  }
}
