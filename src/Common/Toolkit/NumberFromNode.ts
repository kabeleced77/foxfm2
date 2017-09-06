import { NumberFromString, INumberFromString } from "./NumberFromString";

export interface INumberFromNode {
  number(): Number;
}

export class NumberFromNode implements INumberFromNode {
  private readonly node: Node;

  constructor(node: Node) {
    this.node = node;
  }
  public number(): Number {
    return this.getNumberFromNode(this.node);
  }

  private getNumberFromNode(node, decimalPoint = ","): Number {
    let i;
    let num: INumberFromString;
    // this.info('getNumberFromNode(): started:\n' + node + '\ndecimalPoint: ' + decimalPoint);
    if (node && node.tagName) {
      // this.info('getNumberFromNode():\nnode: ' + node + '\ntagName: ' + node.tagName + '\ninnerHTML: ' + node.innerHTML);
      for (i = 0; i < node.childNodes.length; i++) {
        var childNode = node.childNodes[i];
        var childNodeType = childNode.nodeType;
        // this.info('getNumberFromNode(): childNode: ' + childNode + '; type of child: ' + childNodeType);
        if (childNodeType == 1) {
          return this.getNumberFromNode(childNode, decimalPoint);
        }
      }
    }
    if (node && node.innerHTML) {
      num = new NumberFromString(node.innerHTML, decimalPoint);
    } else {
      num = new NumberFromString(node, decimalPoint);
    }
    return num.number();
  }
}
