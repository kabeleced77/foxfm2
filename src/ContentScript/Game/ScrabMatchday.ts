import { FoxfmIndexedDb } from '../../Common/IndexedDb/FoxfmIndexedDb';
import { Matchdays } from '../../Common/Matchdays';
import { IScrabWebElement } from '../../Common/Toolkit/ScrabWebElement';
import { IUrl } from '../../Common/Toolkit/Url';
import { IValue } from '../../Common/Toolkit/Value';

export class ScrabMatchday implements IScrabWebElement {
  private urlField: IUrl;
  private day: IValue<Number>;
  private season: IValue<Number>;

  constructor(
    url: IUrl,
    day: IValue<Number>,
    season: IValue<Number>
  ) {
    this.urlField = url;
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
    let matchdays = new Matchdays(db);
    await matchdays.add("server", season, day, new Date())
  }
}