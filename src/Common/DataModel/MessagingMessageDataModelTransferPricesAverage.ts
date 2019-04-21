import { IMessagingMessageDataModelTransferPricesAverage } from "./IMessagingMessageDataModelTransferPricesAverage";

export class MessagingMessageDataModelTransferPricesAverage implements IMessagingMessageDataModelTransferPricesAverage {
  constructor(
    public gameServerUri: String,
    public position: String,
    public age: Number,
    public strength: Number,
  ) { }
}
