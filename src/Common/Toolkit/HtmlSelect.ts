import { ISelect } from "./Select";

export interface IHtmlSelect {
  select(): HTMLSelectElement;
}

export class HtmlSelect implements IHtmlSelect {
  private readonly selectElement: ISelect<HTMLSelectElement>;

  constructor(select: ISelect<HTMLSelectElement>) {
    this.selectElement = select;
  }
  select(): HTMLSelectElement {
    return this.selectElement.select();
  }
}
