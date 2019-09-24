import { IMessagingMessageTypeDataModel } from "./IMessagingMessageTypeDataModel";

export class DataModelMessagingTypeTransfersImported implements IMessagingMessageTypeDataModel {
  public name: String;

  constructor() {
    this.name = "/transfers/imported";
  }
}
