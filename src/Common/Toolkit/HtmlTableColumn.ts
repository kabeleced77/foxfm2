import { IHtmlElement } from './HtmlElement';

export interface IHtmlTableColumn {
  header(): IHtmlElement<HTMLTableHeaderCellElement>;
  columnElements(): IHtmlElement<HTMLTableCellElement>[];
  index(): Number;
}

export class HtmlTableColumn implements IHtmlTableColumn {
  private columnHeader: IHtmlElement<HTMLTableHeaderCellElement>;
  private columnElementsArray: IHtmlElement<HTMLTableCellElement>[];
  private columnNumber: Number;

  constructor(
    header: IHtmlElement<HTMLTableHeaderCellElement>,
    columnElements: IHtmlElement<HTMLTableCellElement>[],
    columnNumber: Number,
  ) {
    this.columnHeader = header;
    this.columnElementsArray = columnElements;
    this.columnNumber = columnNumber;
  }

  public index(): Number {
    return this.columnNumber;
  }
  public header(): IHtmlElement<HTMLTableHeaderCellElement> {
    return this.columnHeader;
  }
  public columnElements(): IHtmlElement<HTMLTableCellElement>[] {
    return this.columnElementsArray;
  }
}
