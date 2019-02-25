export interface IMessagingMessageDataModelAverageTransferPrices {
  positions: String[];
  minAge: Number;
  maxAge: Number;
  minStrength: Number;
  maxStrength: Number;
}

export class MessagingMessageDataModelAverageTransferPrices implements IMessagingMessageDataModelAverageTransferPrices {
  constructor(
    public positions: String[],
    public minAge: Number,
    public maxAge: Number,
    public minStrength: Number,
    public maxStrength: Number,
  ) { }
}
