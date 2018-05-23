import { IMessagingMessageTypeDataModel } from './MessagingMessageType';

export class MessagingMessageTypeAddMatchdayToIndexedDb implements IMessagingMessageTypeDataModel {
  public name: String;

  constructor() {
    this.name = "/indexedDb/addMatchday";
  }
}
