import { IMessagingMessageTypeDataModel } from "./IMessagingMessageTypeDataModel";
export class MessagingMessageTypeIndexedDbAggregatedTransferPrices implements IMessagingMessageTypeDataModel {
  public name: String;
  constructor() {
    this.name = "/indexedDb/transferprices/aggregated";
  }
}
