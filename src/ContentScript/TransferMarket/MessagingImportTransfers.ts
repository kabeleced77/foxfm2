import { ISetting } from '../../Common/Toolkit/Setting';
import { IImport } from '../../Common/Toolkit/IImport';
import { IMessaging } from '../../Common/Messaging/IMessaging';
import { IDataModelMessagingContentImportTransfers, DataModelMessagingContentImportTransfers } from '../../Common/DataModel/DataModelMessagingContentImportTransfers';
import { MessagingMessage } from '../../Common/Messaging/MessagingMessage';
import { IMatchday } from '../../Common/IMatchday';
import { DataModelMessagingTypeImportTransfers } from '../../Common/Messaging/DataModelMessagingTypeImportTransfers';
import { IUrl } from '../../Common/Toolkit/Url';
import { ISettingImportTransfers } from '../../Common/Settings/ISettingImportTransfers';
import { IRessource, RessourceCommonAppName, RessourceUserInteractionImportPlayerTransfersQuestionStartImport, RessourceUserInteractionImportPlayerTransfersImportingStarted, RessourceUserInteractionImportPlayerTransfersImportingFinished } from '../../Common/Ressource';
import { MyNotification } from '../../Common/Toolkit/MyNotification';
import { IEasyLogger } from '../../Common/Logger/EasyLogger';

export class MessagingImportTransfers implements IImport {
  private resourceAppName: string;
  private resourceQuestionStartImport: IRessource;
  private resourceImportingStarted: IRessource;
  private resourceImportingFinished: IRessource;

  constructor(
    private readonly moUrl: IUrl,
    private readonly settings: ISetting<ISettingImportTransfers>,
    private readonly messaging: IMessaging<Object, Object>,
    private readonly matchday: IMatchday,
    private readonly logger: IEasyLogger,
  ) {
    this.resourceAppName = new RessourceCommonAppName().value().toString();
    this.resourceQuestionStartImport = new RessourceUserInteractionImportPlayerTransfersQuestionStartImport();
    this.resourceImportingStarted = new RessourceUserInteractionImportPlayerTransfersImportingStarted();
    this.resourceImportingFinished = new RessourceUserInteractionImportPlayerTransfersImportingFinished();
  }

  public targetUrl(): IUrl {
    return this.moUrl;
  }
  public async import(): Promise<void> {
    try {
      const mbImport = (await this.settings.value()).activated();
      this.logger.info(`will check if import transfers is activated: ${mbImport ? 'activated' : 'deactivated'}`);
      if (mbImport) {
        const serverUri = await (await this.matchday.gameServer()).uri();
        const season = await this.matchday.season();
        const day = (await this.matchday.day());
        const date = await this.matchday.date();

        this.logger.debug(`matchday ${season}-${day}@${serverUri} from ${date}: base matchday for player transfer import`);

        this.importRecursively(
          serverUri,
          season,
          day,
        );
      }
    } catch (error) {
      throw new Error(`Could not import player transfers: ${error}`);
    }
  }

  private importRecursively(
    serverUri: String,
    season: Number,
    day: Number,
  ) {
    if (day >= 0) {
      // if day is >= 0 notify user to start import by clicking on notification
      const options = this.notificationOptions(
        this.resourceQuestionStartImport.value(`${season}-${day}`).toString(),
        season,
        day);

      new MyNotification(
        this.resourceAppName,
        options,
        async () => {
          await this.importTransfers(
            serverUri,
            season,
            day,
            options,
          );
          // import transfers of next day
          this.importRecursively(
            serverUri,
            season,
            day.valueOf() - 1);
        },
      ).notify();
    }
  }

  private notificationOptions(
    body: string,
    season: Number,
    day: Number,
  ): NotificationOptions {
    return {
      "icon": chrome.runtime.getURL("foxfm64.png"),
      "body": body,
      "tag": `notify-transfer-download-${season}-${day}`
    };
  }

  private async importTransfers(
    gameServerUri: String,
    season: Number,
    day: Number,
    options: NotificationOptions,
  ): Promise<void> {
    // notify user import is about to start
    options.body = this.resourceImportingStarted.value(`${season}-${day}`).toString();
    new MyNotification(
      this.resourceAppName,
      options,
    ).notify();
    // send message to background script to import transfers of matchday
    await this.messaging
      .send(
        new MessagingMessage<IDataModelMessagingContentImportTransfers>(
          new DataModelMessagingTypeImportTransfers(),
          new DataModelMessagingContentImportTransfers(
            gameServerUri,
            day,
            season,
            await this.matchday.date(),
          )));
    // notify user transfer has just beend finished
    options.body = this.resourceImportingFinished.value(`${season}-${day}`).toString();
    new MyNotification(
      this.resourceAppName,
      options,
    ).notify(3);
  }
}
