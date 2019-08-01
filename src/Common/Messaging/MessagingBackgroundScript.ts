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
import { IMatchdayWithId } from "../IMatchdayWithId";
import { UserInteractionImportPlayerTransfers } from '../../BackgroundPage/PlayerTransfers/UserInteractionImportPlayerTransfers';
import { RegisteredLoggingModule } from '../Logger/RegisteredLoggingModule';
import { LogLevelError } from '../Logger/LogLevel';
import { MessagingMessageTypeIndexedDbTransferPricesAverage } from './MessagingMessageTypeIndexedDbTransferPricesAverage';
import { IMessagingMessageDataModelTransferPricesAverage } from "../DataModel/IMessagingMessageDataModelTransferPricesAverage";
import { PlayerTransfersIDb } from '../IndexedDb/PlayerTransfersIDb';
import { MessagingMessageTypeIndexedDbTransferPricesAverages } from './MessagingMessageTypeIndexedDbTransferPricesAverages';
import { IMessagingMessageDataModelTransferPricesAverages } from '../DataModel/IMessagingMessageDataModelTransferPricesAverages';
import { DataModelMessagingTypeImportTransfers } from './DataModelMessagingTypeImportTransfers';
import { MatchdayConst } from '../MatchdayConst';
import { IDataModelMessagingContentImportTransfers } from '../DataModel/DataModelMessagingContentImportTransfers';
import { GameServerConst } from '../GameServerConst';
import { Value } from '../Toolkit/Value';

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
        let messageToSend: Object = {};
        switch (message.type.name) {
          case new MessagingMessageTypeIndexedDbAddMatchday().name:
            await this.addMatchdayToIndexedDb(<IPersistMatchdayMessagingDataModel>message.content);
            break;

          case new DataModelMessagingTypeImportTransfers().name:
            const contentImportTransfers = <IDataModelMessagingContentImportTransfers>message.content;
            const md = new MatchdayConst(
              new GameServerConst(
                contentImportTransfers.gameServerUrl,
              ),
              new Value(contentImportTransfers.day),
              new Value(contentImportTransfers.season),
              contentImportTransfers.date,
            );
            new UserInteractionImportPlayerTransfers(
              this.indexedDb,
              new EasyLogger(
                this.logger.logger(),
                new RegisteredLoggingModule(
                  nameof(UserInteractionImportPlayerTransfers),
                  new LogLevelError())))
              .import(md);

            break;
          case new MessagingMessageTypeIndexedDbAddClub().name:
            messageToSend = await this.addClubToIndexedDb(<IPersistClubMessagingDataModel>message.content);
            break;
          case new MessagingMessageTypeIndexedDbTransferPricesAverage().name:
            const c = <IMessagingMessageDataModelTransferPricesAverage>message.content;

            messageToSend = await new PlayerTransfersIDb(this.indexedDb).average(c.gameServerUri, c.position, c.age, c.strength);
            break;
          case new MessagingMessageTypeIndexedDbTransferPricesAverages().name:
            const c2 = <IMessagingMessageDataModelTransferPricesAverages>message.content;
            messageToSend = await new PlayerTransfersIDb(this.indexedDb).averages(c2.gameServerUri, c2.positions, c2.minAge.valueOf(), c2.maxAge.valueOf(), c2.minStrength.valueOf(), c2.maxStrength.valueOf())

            break;
          default:
            const errMsg = `Unsupported messaging message type: ${message.type.name}`;
            this.logger.error(errMsg);
            throw errMsg;
        }
        if (messageToSend !== undefined) {
          this.logger.info(`send message with content: ${JSON.stringify(messageToSend)}`);
          p.postMessage(messageToSend);
        }
      });
    });
  }

  private async addMatchdayToIndexedDb(matchday: IPersistMatchdayMessagingDataModel): Promise<IMatchdayWithId> {
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
