import { IMessagingMessageTypeDataModel } from "./IMessagingMessageTypeDataModel";

export class DataModelMessagingTypeImportTransfers implements IMessagingMessageTypeDataModel {
  public name: String;

  constructor() {
    this.name = "/import/transfers";
  }
}
