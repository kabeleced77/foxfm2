import { IMessagingMessageTypeDataModel } from './MessagingMessageType';

export class MessagingMessageTypeIndexedDbAddClub implements IMessagingMessageTypeDataModel {
  public name: String;

  constructor() {
    this.name = "/indexedDb/addClub";
  }
}
