/**
 * NumberHelper
 */
export class NumberHelper {
  public static coerce(limitMin: number, limitMax: number, value: number): number {
    var coercedValue = value;
    if (value > limitMax) coercedValue = limitMax;
    else if (value < limitMin) coercedValue = limitMin;
    return coercedValue;
  }

  public static getNumberFromNode(node, decimalPoint = ",") {
    var i, num;
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
      num = this.getNumberFromString(node.innerHTML, decimalPoint);
    } else {
      num = this.getNumberFromString(node, decimalPoint);
    }
    return num;
  }

  public static getNumberFromString(str, decimalPoint = ","): Number {
    var sNum;
    var num: Number = 0;
    // infoMessage(4, 'getNumberFromString(): started: string: ' + str);
    if (str) {
      switch (decimalPoint) {
        case '.':
          sNum = str;
          break;
        case ',':
        /* falls through */
        default:
          sNum = str.replace(/\./g, '');
          sNum = sNum.replace(/\,/g, '.');
          break;
      }
      var startNum = sNum.search(/[0-9]/);
      sNum = sNum.substr(startNum);
      num = parseFloat(sNum);
    }
    return num;
  }

  public static getAWP(ep, tp) {
    return Number(Math.round(2 * ep * tp / (ep + tp)));
  }
}
