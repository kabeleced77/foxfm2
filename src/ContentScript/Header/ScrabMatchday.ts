import { FoxfmIndexedDb } from '../../Common/IndexedDb/FoxfmIndexedDb';
import { Matchdays } from '../../Common/Matchdays';
import { IScrabWebElement } from '../../Common/Toolkit/ScrabWebElement';
import { IUrl } from '../../Common/Toolkit/Url';
import { IValue } from '../../Common/Toolkit/Value';

export class ScrabMatchday implements IScrabWebElement {
  private urlField: IUrl;
  private readonly hostname: String;
  private day: IValue<Number>;
  private season: IValue<Number>;

  constructor(
    url: IUrl,
    hostname: String,
    day: IValue<Number>,
    season: IValue<Number>
  ) {
    this.urlField = url;
    this.hostname = hostname;
    this.day = day;
    this.season = season;
  }

  public targetUrl(): IUrl {
    return this.urlField;
  }
  public async scrab(): Promise<void> {
    let day = this.day.value();
    let season = this.season.value();
    let db = new FoxfmIndexedDb();
    db.transaction("rw", db.gameServers, db.matchdays, async () => {
      let gameServers = db.gameServers.filter(gs => gs.uri === this.hostname);
      if (await gameServers.count() === 1) {
        let gameServer = await gameServers.first();
        let matchdays = new Matchdays(db);
        await matchdays.add(gameServer!.id!, season, day, new Date())
      } else {
        throw `could not add matchday to database: given game server is not supported yet: ${this.hostname}`;
      }
    });
  }
}
