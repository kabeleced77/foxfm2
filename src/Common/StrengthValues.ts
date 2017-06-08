import { IHtmlTableColumnElements } from "./Toolkit/HtmlTableColumnValues";
import { NumberHelper } from "./Toolkit/NumberHelper";

export interface IStrengthValues {
  values(): Number[];
}

export class StrengthValues implements IStrengthValues {
  private columnValues: IHtmlTableColumnElements;

  constructor(
    columnValues: IHtmlTableColumnElements,
  ) {
    this.columnValues = columnValues;
  }

  public values(): Number[] {
    return this.columnValues.values().map(element => NumberHelper.getNumberFromNode(element));
  }
}
