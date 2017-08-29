import { IHtmlTableColumnByXpath } from "./Toolkit/HtmlTableColumnByXpath";
import { NumberHelper } from "./Toolkit/NumberHelper";

export interface IStrengthValues {
  values(): Number[];
}

export class StrengthValues implements IStrengthValues {
  private columnValues: IHtmlTableColumnByXpath;

  constructor(
    columnValues: IHtmlTableColumnByXpath,
  ) {
    this.columnValues = columnValues;
  }

  public values(): Number[] {
    return this
      .columnValues
      .values()
      .map(element => NumberHelper.getNumberFromNode(element));
  }
}
