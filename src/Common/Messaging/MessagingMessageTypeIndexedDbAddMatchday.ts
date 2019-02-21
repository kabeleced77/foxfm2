import { IMessagingMessageTypeDataModel } from "./IMessagingMessageTypeDataModel";

export class MessagingMessageTypeIndexedDbAddMatchday implements IMessagingMessageTypeDataModel {
  public name: String;

  constructor() {
    this.name = "/indexedDb/addMatchday";
  }
}
