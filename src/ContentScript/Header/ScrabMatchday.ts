import { IMatchdays } from '../../Common/IMatchdays';
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

  public scrab(): void {
    this.matchdays.add(
      this.hostname,
      this.season.value(),
      this.day.value(),
      new Date(),
    )
  }
}
