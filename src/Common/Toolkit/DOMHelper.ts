/**
 * DOMHelper
 */
export class DOMHelper {
  public static createElement(elementType: string, elementId: string, elementName: string, elementClass: string, elementStyle: string, elementTooltip: string, elementOnclick: string): HTMLElement {
    var newElement = document.createElement(elementType);
    newElement.id = elementId;
    newElement.setAttribute('name', elementName);
    newElement.setAttribute('class', elementClass);
    newElement.setAttribute('style', elementStyle);
    if (elementTooltip) newElement.setAttribute('title', elementTooltip);
    newElement.setAttribute('onclick', elementOnclick);
    return newElement;
  }
  public static createTable(cellSpacing?: string, cellPadding?: string, className?: string): HTMLTableElement {
    var newTable = document.createElement('table');
    if (className) newTable.className = className;
    if (cellSpacing) newTable.cellSpacing = cellSpacing;
    if (cellPadding) newTable.cellPadding = cellPadding;
    return newTable;
  }
  public static createCell(verticalAlign?: string, height?: string, value?: string, cellText?: string, child?: Node, className?: string): HTMLTableDataCellElement {
    var newCell = document.createElement('td');
    if (verticalAlign) newCell.vAlign = verticalAlign;
    if (height) newCell.height = height;
    if (value) newCell.nodeValue = value;
    if (cellText) {
      var newTextNode = document.createTextNode(cellText);
      newCell.appendChild(newTextNode);
    }
    if (child) newCell.appendChild(child);
    if (className) newCell.className = className;
    return newCell;
  }
  public static createRow(verticalAlign?: string, height?: string): HTMLTableRowElement {
    var newRow = document.createElement('tr');
    if (verticalAlign) newRow.vAlign = verticalAlign;
    if (height) newRow.height = height;
    return newRow;
  }
  public static createDropdown(id: string, name: string, className: string, style: string, tooltip: string, onChange?: (e: Event) => any): HTMLSelectElement {
    var newSelect = document.createElement('select');
    newSelect.id = id;
    newSelect.setAttribute('name', name);
    newSelect.setAttribute('style', style);
    newSelect.size = 1;
    newSelect.title = tooltip;
    newSelect.className = className;
    if (onChange) newSelect.onchange = onChange;
    if (onChange) newSelect.onkeyup = onChange;
    return newSelect;
  }
}
