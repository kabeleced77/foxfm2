import { Clubs } from '../../Common/Clubs';
import { FoxfmIndexedDb } from '../../Common/IndexedDb/FoxfmIndexedDb';
import { IScrabWebElement } from '../../Common/Toolkit/ScrabWebElement';
import { IUrl } from '../../Common/Toolkit/Url';
import { IValue } from '../../Common/Toolkit/Value';

export class ScrabClub implements IScrabWebElement {
  private urlField: IUrl;
  private readonly name: IValue<String>;
  private readonly externalId: IValue<Number>;

  constructor(
    url: IUrl,
    clubName: IValue<String>,
    externalId: IValue<Number>,
  ) {
    this.urlField = url;
    this.name = clubName;
    this.externalId = externalId;
  }

  public targetUrl(): IUrl {
    return this.urlField;
  }
  public async scrab(): Promise<void> {
    let name = this.name.value();
    let externalId = this.externalId.value();
    let db = new FoxfmIndexedDb();
    let clubs = new Clubs(db);
    await clubs.add(name, externalId);
  }
}
