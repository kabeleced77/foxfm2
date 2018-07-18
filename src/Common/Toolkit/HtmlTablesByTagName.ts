import { ITables } from '../../ContentScript/TransferMarket/ITables';
import { HtmlTableConst } from './HtmlTableConst';
import { ITable } from './Table';

export class HtmlTablesByTagName implements ITables<HTMLTableElement> {
  constructor(
    private element: HTMLElement,
    private tagName: String,
  ) { }

  public tables(): ITable<HTMLTableElement>[] {
    let tables = this.element.getElementsByTagName(this.tagName.toString());
    let tablesArray = new Array<ITable<HTMLTableElement>>();
    for (let i = 0; i < tables.length; i++) {
      tablesArray.push(new HtmlTableConst(<HTMLTableElement>tables[i]));
    }
    return tablesArray;
  }
}
