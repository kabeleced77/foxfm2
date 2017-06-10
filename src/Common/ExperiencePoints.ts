import { IHtmlTableColumnElementsByXpath } from "./Toolkit/HtmlTableColumnElementsByXpath";
import { NumberHelper } from "./Toolkit/NumberHelper";

export interface IExperiencePoints {
  points(): Number[];
}

export class ExperiencePoints implements IExperiencePoints {
  private columnValues: IHtmlTableColumnElementsByXpath;

  constructor(
    columnValues: IHtmlTableColumnElementsByXpath
  ) {
    this.columnValues = columnValues;
  }

  public points(): Number[] {
    return this.columnValues.values().map(element => NumberHelper.getNumberFromNode(element));
  }
}
