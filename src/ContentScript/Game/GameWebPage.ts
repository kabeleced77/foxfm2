import { IWebPageToExtend } from "../../Common/Toolkit/WebPageToExtend";
import { IUrl } from "../../Common/Toolkit/Url";
import { FoxfmIndexedDb } from "../../Common/IndexedDb/FoxfmIndexedDb";
import { Matchdays } from "../../Common/Matchdays";

export class GameWebPage implements IWebPageToExtend {
  private urlField: IUrl;

  constructor(
    url: IUrl,
  ) {
    this.urlField = url;
  }

  public pageUrl(): IUrl {
    return this.urlField;
  }
  public async extend(): Promise<void> {
    let db = new FoxfmIndexedDb();
    let matchdays = new Matchdays(db);
    for (let i = 0; i < 10; i++) {
      await matchdays
        .add("server", 157, i, new Date())
        .catch(e => console.error(e.stack || e));
    }
    await matchdays
      .matchdays()
      .then(mds => mds
        .forEach(async md =>
          console.info(`Server (id: ${JSON.stringify(md.id())}: ${await md.server()}, day: ${await md.day()}`)))
      .catch(e => console.error(e.stack || e));
  }
}
