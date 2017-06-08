import { IHtmlTableColumnElements } from "./Toolkit/HtmlTableColumnValues";
import { NumberHelper } from "./Toolkit/NumberHelper";

export interface ITrainingPoints {
  points(): Number[];
}

export class TrainingPoints implements ITrainingPoints {
  private columnValues: IHtmlTableColumnElements;

  constructor(
    columnValues: IHtmlTableColumnElements,
  ) {
    this.columnValues = columnValues;
  }

  public points(): Number[] {
    return this.columnValues.values().map(element => NumberHelper.getNumberFromNode(element));
  }
}
