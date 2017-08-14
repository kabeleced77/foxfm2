import { IHtmlElementWithChilds } from "./HtmlElementWithChilds";

export interface IHtmlTableColumn {
  header(): IHtmlElementWithChilds;
  columnElements(): IHtmlElementWithChilds[];
  index(): Number;
}

export class HtmlTableColumn implements IHtmlTableColumn {
  private columnHeader: IHtmlElementWithChilds;
  private columnElementsArray: IHtmlElementWithChilds[];
  private columnNumber: Number;

  constructor(
    header: IHtmlElementWithChilds,
    columnElements: IHtmlElementWithChilds[],
    columnNumber: Number,
  ) {
    this.columnHeader = header;
    this.columnElementsArray = columnElements;
    this.columnNumber = columnNumber;
  }

  public index(): Number {
    return this.columnNumber;
  }
  public header(): IHtmlElementWithChilds {
    return this.columnHeader;
  }
  public columnElements(): IHtmlElementWithChilds[] {
    return this.columnElementsArray;
  }
}
