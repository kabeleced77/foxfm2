import { IHtmlTableColumnHeader } from "./HtmlTableColumnHeader";
import { IHtmlElements } from "./HtmlElements";
import { IHtmlTable } from "./HtmlTable";
import { IHtmlElement } from "./HtmlElement";
import { IHtmlElementsAsync } from "./HtmlElementsAsync";

export interface IHtmlTableColumn {
  add(table: IHtmlTable): void;
}

export class HtmlTableColumn implements IHtmlTableColumn {
  private header: IHtmlTableColumnHeader;
  private columnValues: IHtmlElements;
  private columnNumber: Number;
  private addColumn: IHtmlTableColumnAddNewColumn;

  constructor(
    header: IHtmlTableColumnHeader,
    columnValues: IHtmlElements,
    columnNumber: Number,
    addColumn: IHtmlTableColumnAddNewColumn
  ) {
    this.header = header;
    this.columnValues = columnValues;
    this.columnNumber = columnNumber;
    this.addColumn = addColumn;
  }

  public add(table: IHtmlTable): void {
    this.addColumn.add(table, this.header, this.columnValues.elements(), this.columnNumber)
  }
}

export class HtmlTableColumnAsync implements IHtmlTableColumn {
  private header: IHtmlTableColumnHeader;
  private columnValues: IHtmlElementsAsync;
  private columnNumber: Number;
  private addColumn: IHtmlTableColumnAddNewColumn;

  constructor(
    header: IHtmlTableColumnHeader,
    columnValues: IHtmlElementsAsync,
    columnNumber: Number,
    addColumn: IHtmlTableColumnAddNewColumn
  ) {
    this.header = header;
    this.columnValues = columnValues;
    this.columnNumber = columnNumber;
    this.addColumn = addColumn;
  }

  public add(table: IHtmlTable): void {
    this.columnValues
      .elements()
      .then(elements =>
        this.addColumn.add(table, this.header, elements, this.columnNumber)
      );
  }
}

export interface IHtmlTableColumnAddNewColumn {
  add(table: IHtmlTable, header: IHtmlTableColumnHeader, values: IHtmlElement[], column: Number): void;
}

export class HtmlTableColumnAddNewColumn implements IHtmlTableColumnAddNewColumn {
  private column: IHtmlTableColumn;
  // TODO: add attributes for header
  // TODO: add attributes for values

  constructor() { }

  public add(table: IHtmlTable, header: IHtmlTableColumnHeader, values: IHtmlElement[], column: Number): void {
    // add header values
    let newCell = table.tableHeader().rows[0].insertCell(column.valueOf());
    newCell.className = "textCenter";
    newCell.appendChild(header.element());

    // add column values
    values
      .forEach((element: IHtmlElement, i: number) => {
        let newCell = table.firstTableBody().rows[i].insertCell(column.valueOf());
        newCell.appendChild(element.element());
      });
  }
}
