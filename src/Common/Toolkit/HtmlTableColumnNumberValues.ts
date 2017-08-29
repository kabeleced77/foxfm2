import { IHtmlTableColumnByXpath } from "./HtmlTableColumnByXpath";
import { NumberHelper } from "./NumberHelper";
import { IValues } from "./Values";

export class HtmlTableColumnNumberValues implements IValues<Number> {
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
