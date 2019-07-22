import { IMessaging } from "../../Common/Messaging/IMessaging";
import { MessagingMessage } from "../../Common/Messaging/MessagingMessage";
import { IPlayerTransfersMessaging } from "../../Common/Messaging/IPlayerTransfersMessaging";
import { IPlayerCategory } from "../../Common/IPlayerCategory";
import { MessagingMessageTypeIndexedDbTransferPricesAverages } from "../../Common/Messaging/MessagingMessageTypeIndexedDbTransferPricesAverages";
import { MessagingMessageDataModelTransferPricesAverages } from "../../Common/DataModel/MessagingMessageDataModelTransferPricesAverages";
import { IValues } from "../../Common/Toolkit/Values";
import { IValue } from "../../Common/Toolkit/IValue";

export class PlayerTransfersMessaging implements IPlayerTransfersMessaging {
  private mcAverages: {};

  constructor(
    private readonly dataSource: IMessaging<Object, Object>,
    private readonly gameServerUri: String,
    private readonly positions: IValues<String>,
    private readonly minAge: IValue<Number>,
    private readonly maxAge: IValue<Number>,
    private readonly minStrength: IValue<Number>,
    private readonly maxStrength: IValue<Number>,
  ) { }

  public async averages(): Promise<{}> {
    if (!this.mcAverages) {
      this.mcAverages = await this.marketValues();
    }
    return this.mcAverages;
  }

  public async average(category: IPlayerCategory): Promise<Number> {
    const cAverages = await this.averages();
    let average = cAverages[JSON.stringify(category)];
    return average ? average : 0;
  }

  private marketValues(): Promise<Object> {
    return <Promise<Object>>this
      .dataSource
      .send(new MessagingMessage(
        new MessagingMessageTypeIndexedDbTransferPricesAverages(),
        new MessagingMessageDataModelTransferPricesAverages(
          this.gameServerUri,
          this.positions.values(),
          this.minAge.value(),
          this.maxAge.value(),
          this.minStrength.value(),
          this.maxStrength.value(),
        )));
  }
}
