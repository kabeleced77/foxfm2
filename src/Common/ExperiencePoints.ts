import { IHtmlTableColumnElements } from "./Toolkit/HtmlTableColumnValues";
import { NumberHelper } from "./Toolkit/NumberHelper";

export interface IExperiencePoints {
  points(): Number[];
}

export class ExperiencePoints implements IExperiencePoints {
  private columnValues: IHtmlTableColumnElements;

  constructor(
    columnValues: IHtmlTableColumnElements
  ) {
    this.columnValues = columnValues;
  }

  public points(): Number[] {
    return this.columnValues.values().map(element => NumberHelper.getNumberFromNode(element));
  }
}
