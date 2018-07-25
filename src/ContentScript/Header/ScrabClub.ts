import { IClubs } from '../../Common/IClubs';
import { IScrabWebElement } from '../../Common/Toolkit/ScrabWebElement';
import { IUrl } from '../../Common/Toolkit/Url';
import { IValue } from '../../Common/Toolkit/Value';

export class ScrabClub implements IScrabWebElement {
  private urlField: IUrl;
  private readonly hostname: String;
  private readonly name: IValue<String>;
  private readonly externalId: IValue<Number>;

  constructor(
    url: IUrl,
    hostname: String,
    clubName: IValue<String>,
    externalId: IValue<Number>,
    private readonly clubs: IClubs,
  ) {
    this.urlField = url;
    this.hostname = hostname;
    this.name = clubName;
    this.externalId = externalId;
  }

  public targetUrl(): IUrl {
    return this.urlField;
  }
  public scrab(): void {
    this.clubs.add(
      this.hostname,
      this.name.value(),
      this.externalId.value(),
    );
  }
}
