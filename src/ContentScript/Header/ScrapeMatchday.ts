import { IMatchdays } from '../../Common/IMatchdays';
import { IScrapeWebElement } from '../../Common/Toolkit/ScrapeWebElement';
import { IUrl } from '../../Common/Toolkit/Url';
import { IValue } from "../../Common/Toolkit/IValue";

export class ScrapeMatchday implements IScrapeWebElement {
  private urlField: IUrl;
  private readonly hostname: String;
  private day: IValue<Number>;
  private season: IValue<Number>;

  constructor(
    url: IUrl,
    hostname: String,
    day: IValue<Number>,
    season: IValue<Number>,
    private readonly matchdays: IMatchdays,
  ) {
    this.urlField = url;
    this.hostname = hostname;
    this.day = day;
    this.season = season;
  }

  public targetUrl(): IUrl {
    return this.urlField;
  }

  public scrape(): void {
    this.matchdays.add(
      this.hostname,
      this.season.value(),
      this.day.value(),
      new Date(),
    )
  }
}
