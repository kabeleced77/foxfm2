import { IHtmlTableColumnByXpath } from "./Toolkit/HtmlTableColumnByXpath";
import { NumberHelper } from "./Toolkit/NumberHelper";

export interface IExperiencePoints {
  points(): Number[];
}

export class ExperiencePoints implements IExperiencePoints {
  private columnValues: IHtmlTableColumnByXpath;

  constructor(
    columnValues: IHtmlTableColumnByXpath
  ) {
    this.columnValues = columnValues;
  }

  public points(): Number[] {
    return this.columnValues.values().map(element => NumberHelper.getNumberFromNode(element));
  }
}
