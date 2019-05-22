import { IDomNodes } from './DomNodes';
import { IValue } from "./IValue";

export class TextContentFromNode<T extends Node> implements IValue<String> {
  private readonly nodes: IDomNodes<T>;

  constructor(nodes: IDomNodes<T>) {
    this.nodes = nodes;
  }
  public value(): String {
    let numberOfElements = this.nodes.nodes().length;
    if (numberOfElements === 1) {
      return new String(this.nodes.nodes()[0].textContent);
    } else {
      throw new Error(`No or to many elements found: number of elements: ${numberOfElements}.`);
    }
  }
}
