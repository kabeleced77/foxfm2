import { IHtmlTableColumnHeader } from "./HtmlTableColumnHeader";
import { IHtmlElements } from "./HtmlElements";
import { IHtmlTable } from "./HtmlTable";
import { IHtmlElement } from "./HtmlElement";

export interface IHtmlTableColumn {
  add(table: IHtmlTable): void;
}

export class HtmlTableColumn implements IHtmlTableColumn {
  private header: IHtmlTableColumnHeader;
  private columnValues: IHtmlElements;
  private columnNumber: Number;

  constructor(
    header: IHtmlTableColumnHeader,
    columnValues: IHtmlElements,
    columnNumber: Number
  ) {
    this.header = header;
    this.columnValues = columnValues;
    this.columnNumber = columnNumber;
  }

  public add(table: IHtmlTable): void {
    // add header values
    let newCell = table.tableHeader().rows[0].insertCell(this.columnNumber.valueOf());
    newCell.className = "textCenter";
    newCell.appendChild(this.header.element());

    // add column values
    this.columnValues.elements().forEach((element: IHtmlElement, i: number) => {
      let newCell = table.firstTableBody().rows[i].insertCell(this.columnNumber.valueOf());
      newCell.appendChild(element.element());
    });
  }
}
