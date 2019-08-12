import { ISetting } from '../../Common/Toolkit/Setting';
import { IImport } from '../../Common/Toolkit/IImport';
import { IMessaging } from '../../Common/Messaging/IMessaging';
import { IDataModelMessagingContentImportTransfers, DataModelMessagingContentImportTransfers } from '../../Common/DataModel/DataModelMessagingContentImportTransfers';
import { MessagingMessage } from '../../Common/Messaging/MessagingMessage';
import { IMatchday } from '../../Common/IMatchday';
import { DataModelMessagingTypeImportTransfers } from '../../Common/Messaging/DataModelMessagingTypeImportTransfers';
import { IUrl } from '../../Common/Toolkit/Url';
import { ISettingImportTransfers } from '../../Common/Settings/ISettingImportTransfers';

export class MessagingImportTransfers implements IImport {
  constructor(
    private readonly moUrl: IUrl,
    private readonly settings: ISetting<ISettingImportTransfers>,
    private readonly messaging: IMessaging<Object, Object>,
    private readonly matchday: IMatchday,
  ) { }

  public targetUrl(): IUrl {
    return this.moUrl;
  }
  public async import(): Promise<void> {
    try {
      if ((await this.settings.value()).activated()) {
        this.messaging
          .send(
            new MessagingMessage<IDataModelMessagingContentImportTransfers>(
              new DataModelMessagingTypeImportTransfers(),
              new DataModelMessagingContentImportTransfers(
                await (await this.matchday.gameServer()).uri(),
                await this.matchday.day(),
                await this.matchday.season(),
                await this.matchday.date(),
              )));
      }
    } catch (error) {
      throw new Error(`Could not import player transfers: ${error}`);
    }
  }
}
