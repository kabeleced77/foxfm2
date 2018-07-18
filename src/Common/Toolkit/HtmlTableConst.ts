import { ITable } from './Table';

export class HtmlTableConst implements ITable<HTMLTableElement> {
  constructor(
    private tableValue: HTMLTableElement,
  ) { }

  public table(): HTMLTableElement {
    return this.tableValue;
  }
}
