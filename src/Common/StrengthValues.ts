import { IHtmlTableColumnByXpath } from "./Toolkit/HtmlTableColumnByXpath";
import { NumberHelper } from "./Toolkit/NumberHelper";
import { IHtmlTableColumnValues } from "./Toolkit/HtmlTableColumnValues";

export interface IStrengthValues {
  values(): Number[];
}

// TODO: double check the interface -> it is NOT IStrengthValues!
export class StrengthValues implements IHtmlTableColumnValues<Number> {
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
