import { IMessagingMessageTypeDataModel } from "./IMessagingMessageTypeDataModel";

export class MessagingMessageTypeIndexedDbTransferPricesAverages implements IMessagingMessageTypeDataModel {
  constructor(
    public name = "/indexedDb/transferprices/averages",
  ) { }
}
