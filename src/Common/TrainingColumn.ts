import { IExistingColumn } from "./Toolkit/ExisitingColumn"
import { IXPathString } from "./Toolkit/XPathString"
import { IXPathHtmlTableCell2 } from "./Toolkit/XPathHtmlTableCell";

export class TrainingColumn implements IExistingColumn {
  private columnXPath: IXPathHtmlTableCell2;

  constructor(
    xPath: IXPathHtmlTableCell2
  ) {
    this.columnXPath = xPath;
  }

  public index(doc: Document): Number {
    return this.columnXPath.columnIndex(doc);
  }
  public fromJson(jsonString: String): IExistingColumn {
    return new TrainingColumn(
      this.columnXPath.fromJson(jsonString["columnXPath"])
    );
  }
}
