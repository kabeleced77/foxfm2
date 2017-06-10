import { IHtmlTableColumnElementsByXpath } from "./Toolkit/HtmlTableColumnElementsByXpath";
import { NumberHelper } from "./Toolkit/NumberHelper";

export interface ITrainingPoints {
  points(): Number[];
}

export class TrainingPoints implements ITrainingPoints {
  private columnValues: IHtmlTableColumnElementsByXpath;

  constructor(
    columnValues: IHtmlTableColumnElementsByXpath,
  ) {
    this.columnValues = columnValues;
  }

  public points(): Number[] {
    return this.columnValues.values().map(element => NumberHelper.getNumberFromNode(element));
  }
}
