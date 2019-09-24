import { IImportedTransfersOfMatchdaysMessaging } from './IImportedTransfersOfMatchdaysMessaging';
import { IMessaging } from './Messaging/IMessaging';
import { IMatchday } from './IMatchday';
import { MessagingMessage } from './Messaging/MessagingMessage';
import { IDataModelMessagingContentTransfersImported, DataModelMessagingContentTransfersImported } from './DataModel/DataModelMessagingContentTransfersImported';
import { DataModelMessagingTypeTransfersImported } from './Messaging/DataModelMessagingTypeTransfersImported';

export class ImportedTransfersOfMatchdaysMessaging implements IImportedTransfersOfMatchdaysMessaging {
  constructor(
    private readonly messaging: IMessaging<object, object>,
  ) { }

  public async imported(
    matchday: IMatchday,
  ): Promise<Boolean> {
    return <Promise<Boolean>>this
      .messaging
      .send(
        new MessagingMessage<IDataModelMessagingContentTransfersImported>(
          new DataModelMessagingTypeTransfersImported(),
          new DataModelMessagingContentTransfersImported(
            await (await matchday.gameServer()).uri(),
            await matchday.day(),
            await matchday.season(),
            await matchday.date(),
          ),
        )
      );
  }
}
