import { IMessagingMessageTypeDataModel } from "./IMessagingMessageTypeDataModel";

export class MessagingMessageTypeIndexedDbTransferPricesAverage implements IMessagingMessageTypeDataModel {
  constructor(
    public name = "/indexedDb/transferprices/average",
  ) { }
}
