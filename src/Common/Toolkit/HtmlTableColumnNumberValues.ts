import { IHtmlTableColumnValues } from "./HtmlTableColumnValues";
import { IHtmlTableColumnByXpath } from "./HtmlTableColumnByXpath";
import { NumberHelper } from "./NumberHelper";

export class HtmlTableColumnNumberValues implements IHtmlTableColumnValues<Number> {
  private columnValues: IHtmlTableColumnByXpath;

  constructor(
    columnValues: IHtmlTableColumnByXpath,
  ) {
    this.columnValues = columnValues;
  }

  public values(): Number[] {
    return this.columnValues.values().map(element => NumberHelper.getNumberFromNode(element));
  }
}
