import { MatchdayMessagingDataModel } from '../../Common/DataModel/MatchdayMessagingDataModel';
import { MessagingContentScript } from '../../Common/Messaging/MessagingContentScript';
import { MessagingMessageAddMatchdayToIndexedDb } from '../../Common/Messaging/MessagingMessageAddMatchdayToIndexedDb';
import {
  MessagingMessageTypeAddMatchdayToIndexedDb,
} from '../../Common/Messaging/MessagingMessageTypeAddMatchdayToIndexedDb';
import { MessagingPortIndexedDb } from '../../Common/Messaging/MessagingPortIndexedDb';
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
    new MessagingContentScript(
      new MessagingPortIndexedDb()
    ).send(
      new MessagingMessageAddMatchdayToIndexedDb(
        new MessagingMessageTypeAddMatchdayToIndexedDb(),
        new MatchdayMessagingDataModel(
          this.hostname,
          this.season.value(),
          this.day.value())));
  }
}
