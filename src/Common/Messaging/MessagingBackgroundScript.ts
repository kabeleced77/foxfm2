import { Clubs } from '../Clubs';
import { IClubMessagingDataModel } from '../DataModel/ClubMessagingDataModel';
import { IMatchdayMessagingDataModel } from '../DataModel/MatchdayMessagingDataModel';
import { FoxfmIndexedDb } from '../IndexedDb/FoxfmIndexedDb';
import { Matchdays } from '../IndexedDb/MatchdaysIndexedDb';
import { IEasyLogger } from '../Logger/EasyLogger';
import { IMessaging } from './Messaging';
import { IMessagingMessage } from './MessagingMessage';
import { MessagingMessageTypeAddMatchdayToIndexedDb } from './MessagingMessageTypeAddMatchdayToIndexedDb';
import { MessagingMessageTypeIndexedDbAddClub } from './MessagingMessageTypeIndexedDbAddClub';

export class MessagingBackgroundScript implements IMessaging<Object> {
  private portName: String;
  private logger: IEasyLogger;
  private indexedDb: FoxfmIndexedDb;

  constructor(
    portName: String,
    logger: IEasyLogger) {
    this.portName = portName;
    this.logger = logger;
    this.indexedDb = new FoxfmIndexedDb();
  }

  public send(message: Object) {
    let port = chrome.runtime.connect({ name: this.portName.toString() });
    port.postMessage(message);
  }

  public connect() {
    chrome.runtime.onConnect.addListener((port: chrome.runtime.Port) => {
      this.logger.info(`received connection request on port ${port.name}`);
      this.logger.debug(`sender: ${JSON.stringify(port.sender)}`);
      port.onMessage.addListener((message: IMessagingMessage<Object>, p: chrome.runtime.Port) => {
        this.logger.info(`received message from type: ${message.type.name}`);
        this.logger.info(`received message with content: ${JSON.stringify(message.content)}`);
        switch (message.type.name) {
          case new MessagingMessageTypeAddMatchdayToIndexedDb().name:
            this.addMatchdayToIndexedDb(<IMatchdayMessagingDataModel>message.content);
            break;
          case new MessagingMessageTypeIndexedDbAddClub().name:
            this.addClubToIndexedDb(<IClubMessagingDataModel>message.content);
            break;
          default:
            this.logger.error(`Unsupported messaging message type: ${message.type.name}`);
        }
      });
    });
  }

  private addMatchdayToIndexedDb(matchday: IMatchdayMessagingDataModel): void {
    let day = matchday.day.valueOf();
    let season = matchday.season.valueOf();
    let hostname = matchday.gameServerUrl;
    this.indexedDb.transaction("rw", this.indexedDb.gameServers, this.indexedDb.matchdays, async () => {
      let gameServers = this.indexedDb.gameServers.filter(gs => gs.uri === hostname);
      if (await gameServers.count() === 1) {
        let gameServer = await gameServers.first();
        let matchdays = new Matchdays(this.indexedDb);
        await matchdays.add(gameServer!.id!, season, day, new Date())
      } else {
        throw `could not add matchday to database: given game server is not supported: ${hostname}`;
      }
    });
  }
  private addClubToIndexedDb(club: IClubMessagingDataModel): void {
    let hostname = club.gameServerUrl;
    let name = club.name;
    let externalId = club.externalId.valueOf();

    this.indexedDb.transaction("rw", this.indexedDb.gameServers, this.indexedDb.clubs, async () => {
      let gameServers = this.indexedDb.gameServers.filter(gs => gs.uri === hostname);
      if (await gameServers.count() === 1) {
        let gameServer = await gameServers.first();
        let clubs = new Clubs(this.indexedDb);
        await clubs.add(gameServer!.id!, name, externalId);
      } else {
        throw `could not add club to database: given game server is not supported: ${hostname}`;
      }
    });
  }
}
