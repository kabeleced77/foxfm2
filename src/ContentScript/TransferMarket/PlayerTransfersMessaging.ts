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

  public all(): Promise<IPlayerTransfer[]> {
    throw new Error("Method not implemented.");
  }

  // TODO: method (probably) not needed here -> new interface? => sub type(s) for database access?
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
  // TODO: method (probably) not needed here -> new interface? => sub type(s) for database access?
  public averages(
    gameServerUri: String,
    positions: String[],
    minAge: Number,
    maxAge: Number,
    minStrength: Number,
    maxStrength: Number,
  ): Promise<Map<String, Number>> {
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
