import { IExtendWebPage } from "./ExtendWebPage";
import { IEasyLogger } from "../Logger/EasyLogger";

export interface IExtendWebPages {
  extend(): void;
}

export class ExtendWebPages implements IExtendWebPages {
  private webPages: Array<IExtendWebPage>;

  constructor(
    page: Array<IExtendWebPage>
  ) {
    this.webPages = page;
  }

  public extend(): void {
    this.webPages.forEach(webPage => {
      webPage.extend();
    });
  }
}
