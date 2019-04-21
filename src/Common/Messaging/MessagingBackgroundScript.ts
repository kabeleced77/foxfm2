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
import { IEasyLogger, EasyLogger } from '../Logger/EasyLogger';
import { IMessaging } from "./IMessaging";
import { IMessagingMessage } from "./IMessagingMessage";
import { MessagingMessageTypeIndexedDbAddClub } from './MessagingMessageTypeIndexedDbAddClub';
import { MessagingMessageTypeIndexedDbAddMatchday } from './MessagingMessageTypeIndexedDbAddMatchday';
import { IMatchday } from '../IMatchday';
import { UserInteractionImportPlayerTransfers } from '../../BackgroundPage/PlayerTransfers/UserInteractionImportPlayerTransfers';
import { RegisteredLoggingModule } from '../Logger/RegisteredLoggingModule';
import { LogLevelError } from '../Logger/LogLevel';
import { MessagingMessageTypeIndexedDbTransferPricesAverage } from './MessagingMessageTypeIndexedDbTransferPricesAverage';
import { IMessagingMessageDataModelTransferPricesAverage } from "../DataModel/IMessagingMessageDataModelTransferPricesAverage";
import { PlayerTransfersIDb } from '../IndexedDb/PlayerTransfersIDb';

export class MessagingBackgroundScript implements IMessaging<Object, Object> {
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

  public send(message: Object)
    : Promise<Object> {

    return new Promise((resolve, reject) => {
      let port = chrome.runtime.connect({ name: this.portName.toString() });
      port.onMessage.addListener((message: Object) => resolve(message));
      port.postMessage(message);
    });
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
            const matchday = await this.addMatchdayToIndexedDb(<IPersistMatchdayMessagingDataModel>message.content);

            new UserInteractionImportPlayerTransfers(
              this.indexedDb,
              new EasyLogger(
                this.logger.logger(),
                new RegisteredLoggingModule(
                  nameof(UserInteractionImportPlayerTransfers),
                  new LogLevelError())))
              .import(matchday);

            break;
          case new MessagingMessageTypeIndexedDbAddClub().name:
            let addedClub = await this.addClubToIndexedDb(<IPersistClubMessagingDataModel>message.content);
            p.postMessage(addedClub);
            break;
          case new MessagingMessageTypeIndexedDbTransferPricesAverage().name:
            const c = <IMessagingMessageDataModelTransferPricesAverage>message.content;

            p.postMessage(
              await new PlayerTransfersIDb(this.indexedDb).average(c.gameServerUri, c.position, c.age, c.strength)
            );
            break;
          default:
            this.logger.error(`Unsupported messaging message type: ${message.type.name}`);
        }
      });
    });
  }

  private async addMatchdayToIndexedDb(matchday: IPersistMatchdayMessagingDataModel): Promise<IMatchday> {
    this.logger.debug(`add matchday to IDb: ${matchday.gameServerUrl} ${matchday.gameSeason}-${matchday.gameDay}`);
    return new MatchdaysIDb(
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
