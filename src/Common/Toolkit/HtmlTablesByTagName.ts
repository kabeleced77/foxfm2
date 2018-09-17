import { ITables } from '../../ContentScript/TransferMarket/ITables';
import { HtmlTableConst } from './HtmlTableConst';
import { ITable } from './Table';

export class HtmlTablesByTagName implements ITables<HTMLTableElement> {
  constructor(
    private element: HTMLElement,
  ) { }

  public tables(): ITable<HTMLTableElement>[] {
    try {
      let tables = this.element.getElementsByTagName("table");
      let tablesArray = new Array<ITable<HTMLTableElement>>();
      for (let i = 0; i < tables.length; i++) {
        tablesArray.push(new HtmlTableConst(<HTMLTableElement>tables[i]));
      }
      return tablesArray;
    } catch (e) {
      throw `Error getting HTML table by tag name: ${e}`;
    }
  }
}
