import { IMessaging } from "../../Common/Messaging/IMessaging";
import { MessagingMessage } from "../../Common/Messaging/MessagingMessage";
import { IPlayerTransfers } from "../../Common/IPlayerTransfers";
import { IPlayerTransfer } from "../../Common/IPlayerTransfer";
import { MessagingMessageTypeIndexedDbTransferPricesAverage } from "../../Common/Messaging/MessagingMessageTypeIndexedDbTransferPricesAverage";
import { MessagingMessageDataModelTransferPricesAverage } from "../../Common/DataModel/MessagingMessageDataModelTransferPricesAverage";

export class PlayerTransfersMessaging implements IPlayerTransfers {
  constructor(
    private readonly dataSource: IMessaging<Object, Object>,
  ) { }

  public playerTransfers(): Promise<IPlayerTransfer[]> {
    throw new Error("Method not implemented.");
  }

  public add(
    gameServerId: Number,
    matchdayId: Number,
    externalTransferId: Number,
    position: String,
    age: Number,
    strength: Number,
    price: Number,
  ): Promise<void | IPlayerTransfer> {
    throw new Error("Method not implemented.");
  }

  public average(
    gameServerUri: String,
    position: String,
    age: Number,
    strength: Number,
  ): Promise<Number> {

    return <Promise<Number>>this
      .dataSource
      .send(
        new MessagingMessage(
          new MessagingMessageTypeIndexedDbTransferPricesAverage(),
          new MessagingMessageDataModelTransferPricesAverage(
            gameServerUri,
            position,
            age,
            strength,
          )));
  }
}
