import { IHtmlTableColumnByXpath } from "./HtmlTableColumnByXpath";
import { IValues } from "./Values";

export class HtmlTableColumnStringValues implements IValues<String> {
  private columnValues: IHtmlTableColumnByXpath;

  constructor(
    columnValues: IHtmlTableColumnByXpath,
  ) {
    this.columnValues = columnValues;
  }

  public values(): String[] {
    return this.columnValues
      .values()
      .map((element: HTMLTableDataCellElement) => this.firstInnerMost(element));
  }

  private firstInnerMost(element: Node): String {
    if (element && element.nodeType != Node.TEXT_NODE && element.hasChildNodes()) {
      return this.firstInnerMost(element.firstChild!);
    } else {
      return element.textContent!;
    }
  }
}
