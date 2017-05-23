import { IExtendWebPage } from "./ExtendWebPage";

export interface IExtendWebPages {
  extend(): void;
}

export class ExtendWebPages implements IExtendWebPages {
  private webPagesField: Array<IExtendWebPage>;

  constructor(webPages: Array<IExtendWebPage>) {
    this.webPagesField = webPages;
  }

  public extend(): void {
    this.webPagesField.forEach(page => page.extend());
  }
}
