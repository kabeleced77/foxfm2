import { IHtmlTableColumnValues } from "./HtmlTableColumnValues";
import { IHtmlTableColumnElementsByXpath } from "./HtmlTableColumnElementsByXpath";
import { NumberHelper } from "./NumberHelper";

export class HtmlTableColumnNumberValues implements IHtmlTableColumnValues<Number> {
  private columnValues: IHtmlTableColumnElementsByXpath;

  constructor(
    columnValues: IHtmlTableColumnElementsByXpath,
  ) {
    this.columnValues = columnValues;
  }

  public values(): Number[] {
    return this.columnValues.values().map(element => NumberHelper.getNumberFromNode(element));
  }
}
