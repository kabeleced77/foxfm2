import { IHtmlTableColumnElementsByXpath } from "./Toolkit/HtmlTableColumnElementsByXpath";
import { NumberHelper } from "./Toolkit/NumberHelper";
import { IHtmlTableColumnValues } from "./Toolkit/HtmlTableColumnValues";

export interface IStrengthValues {
  values(): Number[];
}

export class StrengthValues implements IHtmlTableColumnValues<Number> {
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
