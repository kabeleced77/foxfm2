import { IHtmlTableColumnHeader } from "./HtmlTableColumnHeader";
import { IHtmlElements } from "./HtmlElements";

export interface IHtmlTableColumn {
  header(): IHtmlTableColumnHeader;
  values(): IHtmlElements;
  index(): Number;
}

export class HtmlTableColumn implements IHtmlTableColumn {
  private columnHeader: IHtmlTableColumnHeader;
  private columnValues: IHtmlElements;
  private columnNumber: Number;

  constructor(
    header: IHtmlTableColumnHeader,
    columnValues: IHtmlElements,
    columnNumber: Number,
  ) {
    this.columnHeader = header;
    this.columnValues = columnValues;
    this.columnNumber = columnNumber;
  }

  public index(): Number {
    return this.columnNumber;
  }
  public header(): IHtmlTableColumnHeader {
    return this.columnHeader;
  }
  public values(): IHtmlElements {
    return this.columnValues;
  }
}
