import { IClubs } from '../../Common/IClubs';
import { IScrapeWebElement } from '../../Common/Toolkit/ScrapeWebElement';
import { IUrl } from '../../Common/Toolkit/Url';
import { IValue } from "../../Common/Toolkit/IValue";

export class ScrapeClub implements IScrapeWebElement {
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
  public scrape(): void {
    this.clubs.add(
      this.hostname,
      this.name.value(),
      this.externalId.value(),
    );
  }
}
