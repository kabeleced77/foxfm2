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
    return this.columnValues.values().map(element => element.innerHTML);
  }
}
