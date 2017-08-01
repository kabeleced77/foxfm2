import { IHtmlTableColumnByXpath } from "./Toolkit/HtmlTableColumnByXpath";
import { NumberHelper } from "./Toolkit/NumberHelper";

export interface ITrainingPoints {
  points(): Number[];
}

export class TrainingPoints implements ITrainingPoints {
  private columnValues: IHtmlTableColumnByXpath;

  constructor(
    columnValues: IHtmlTableColumnByXpath,
  ) {
    this.columnValues = columnValues;
  }

  public points(): Number[] {
    return this
      .columnValues
      .values()
      .map(element => NumberHelper.getNumberFromNode(element));
  }
}
