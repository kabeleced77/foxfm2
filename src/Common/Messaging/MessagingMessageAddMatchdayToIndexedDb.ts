import { IMatchdayMessagingDataModel } from '../DataModel/MatchdayMessagingDataModel';
import { IMessagingMessage } from './MessagingMessage';
import { IMessagingMessageTypeDataModel } from './MessagingMessageType';

export class MessagingMessageAddMatchdayToIndexedDb implements IMessagingMessage {
  public type: IMessagingMessageTypeDataModel;
  public content: IMatchdayMessagingDataModel;

  constructor(type: IMessagingMessageTypeDataModel, content: IMatchdayMessagingDataModel) {
    this.type = type;
    this.content = content;
  }
}


