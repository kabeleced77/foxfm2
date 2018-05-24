import { IMessagingMessageTypeDataModel } from './MessagingMessageType';

export class MessagingMessageTypeIndexedDbAddMatchday implements IMessagingMessageTypeDataModel {
  public name: String;

  constructor() {
    this.name = "/indexedDb/addMatchday";
  }
}
