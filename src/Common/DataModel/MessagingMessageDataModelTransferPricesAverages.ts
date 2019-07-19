import { IMessagingMessageDataModelTransferPricesAverages } from "./IMessagingMessageDataModelTransferPricesAverages";

export class MessagingMessageDataModelTransferPricesAverages implements IMessagingMessageDataModelTransferPricesAverages {
  constructor(
    public gameServerUri: String,
    public positions: String[],
    public minAge: Number,
    public maxAge: Number,
    public minStrength: Number,
    public maxStrength: Number,
  ) { }
}
