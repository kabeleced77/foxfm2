import { IDomNodes } from './DomNodes';
import { IXPathAllResults } from './XPathAllResults';

export class DomNodesByXpath<T extends Node> implements IDomNodes<T> {
  private xPathAllResults: IXPathAllResults;

  constructor(xPathAllResults: IXPathAllResults) {
    this.xPathAllResults = xPathAllResults;
  }

  public nodes(): Array<T> {
    let elements = new Array();
    let res = this.xPathAllResults.xPathAllResults();
    for (let i = 0; i < res.snapshotLength; i++) {
      elements.push(res.snapshotItem(i));
    }
    return elements;
  }
}
