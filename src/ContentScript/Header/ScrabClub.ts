import { ClubMessagingDataModel, IClubMessagingDataModel } from '../../Common/DataModel/ClubMessagingDataModel';
import { MessagingContentScript } from '../../Common/Messaging/MessagingContentScript';
import { MessagingMessage } from '../../Common/Messaging/MessagingMessage';
import { MessagingMessageTypeIndexedDbAddClub } from '../../Common/Messaging/MessagingMessageTypeIndexedDbAddClub';
import { MessagingPortIndexedDb } from '../../Common/Messaging/MessagingPortIndexedDb';
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
    new MessagingContentScript(
      new MessagingPortIndexedDb()
    ).send(
      new MessagingMessage<IClubMessagingDataModel>(
        new MessagingMessageTypeIndexedDbAddClub(),
        new ClubMessagingDataModel(
          this.hostname,
          this.name.value(),
          this.externalId.value())));
  }
}
