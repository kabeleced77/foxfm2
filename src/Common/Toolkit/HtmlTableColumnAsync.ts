import { IHtmlTableColumn, HtmlTableColumn } from "./HtmlTableColumn";
import { IHtmlTableColumnHeader } from "./HtmlTableColumnHeader";
import { IHtmlElementsAsync } from "./HtmlElementsAsync";

export interface IHtmlTableColumnAsync {
  column(): Promise<IHtmlTableColumn>;
  header(): IHtmlTableColumnHeader;
  values(): IHtmlElementsAsync;
  index(): Number;
}

export class HtmlTableColumnAsync implements IHtmlTableColumnAsync {
  private columnHeader: IHtmlTableColumnHeader;
  private columnValues: IHtmlElementsAsync;
  private columnNumber: Number;

  constructor(
    header: IHtmlTableColumnHeader,
    columnValues: IHtmlElementsAsync,
    columnNumber: Number,
  ) {
    this.columnHeader = header;
    this.columnValues = columnValues;
    this.columnNumber = columnNumber;
  }

  public header(): IHtmlTableColumnHeader {
    return this.columnHeader;
  }
  public values(): IHtmlElementsAsync {
    return this.columnValues;
  }
  public index(): Number {
    return this.columnNumber;
  }
  public column(): Promise<IHtmlTableColumn> {
    return this.columnValues
      .elements()
      .then(elements => { return new HtmlTableColumn(this.columnHeader, elements, this.columnNumber); });
  }
}
