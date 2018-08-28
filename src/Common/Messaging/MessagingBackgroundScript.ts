import { IPersistClubMessagingDataModel } from '../DataModel/PersistClubMessagingDataModel';
import {
  IPersistedClubMessagingDataModel,
  PersistedClubMessagingDataModel,
} from '../DataModel/PersistedClubMessagingDataModel';
import { IPersistMatchdayMessagingDataModel } from '../DataModel/PersistMatchdayMessagingDataModel';
import { IClub } from '../IClub';
import { ClubsIDb } from '../IndexedDb/ClubsIDb';
import { FoxfmIndexedDb } from '../IndexedDb/FoxfmIndexedDb';
import { MatchdaysIDb } from '../IndexedDb/MatchdaysIDb';
import { IEasyLogger } from '../Logger/EasyLogger';
import { IMessaging } from './Messaging';
import { IMessagingMessage } from './MessagingMessage';
import { MessagingMessageTypeIndexedDbAddClub } from './MessagingMessageTypeIndexedDbAddClub';
import { MessagingMessageTypeIndexedDbAddMatchday } from './MessagingMessageTypeIndexedDbAddMatchday';

export class MessagingBackgroundScript implements IMessaging<Object> {
  private portName: String;
  private logger: IEasyLogger;

  constructor(
    portName: String,
    private indexedDb: FoxfmIndexedDb,
    logger: IEasyLogger,
  ) {
    this.portName = portName;
    this.logger = logger;
  }

  public send(message: Object) {
    let port = chrome.runtime.connect({ name: this.portName.toString() });
    port.postMessage(message);
  }

  public connect() {
    chrome.runtime.onConnect.addListener((port: chrome.runtime.Port) => {
      this.logger.info(`received connection request on port ${port.name}`);
      this.logger.debug(`sender: ${JSON.stringify(port.sender)}`);
      port.onMessage.addListener(async (message: IMessagingMessage<Object>, p: chrome.runtime.Port) => {
        this.logger.info(`received message from type: ${message.type.name}`);
        this.logger.info(`received message with content: ${JSON.stringify(message.content)}`);
        switch (message.type.name) {
          case new MessagingMessageTypeIndexedDbAddMatchday().name:
            this.addMatchdayToIndexedDb(<IPersistMatchdayMessagingDataModel>message.content);
            break;
          case new MessagingMessageTypeIndexedDbAddClub().name:
            let addedClub = await this.addClubToIndexedDb(<IPersistClubMessagingDataModel>message.content);
            port.postMessage(addedClub);
            break;
          default:
            this.logger.error(`Unsupported messaging message type: ${message.type.name}`);
        }
      });
    });
  }

  private addMatchdayToIndexedDb(matchday: IPersistMatchdayMessagingDataModel): void {
    this.logger.debug(`add matchday to IDb: ${matchday.gameServerUrl} ${matchday.gameSeason}-${matchday.gameDay}`);
    new MatchdaysIDb(
      this.indexedDb,
      this.logger)
      .add(
        matchday.gameServerUrl,
        matchday.gameSeason,
        matchday.gameDay,
        new Date(),
      );
  }

  private async addClubToIndexedDb(club: IPersistClubMessagingDataModel): Promise<IPersistedClubMessagingDataModel> {
    return new PersistedClubMessagingDataModel(
      (<IClub>(await (new ClubsIDb(this.indexedDb, this.logger).add(club.gameServerUrl, club.name, club.externalId)))).id(),
      club.gameServerUrl,
      club.name,
      club.externalId,
    );
  }
}
