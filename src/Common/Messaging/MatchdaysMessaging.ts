import {
  IPersistMatchdayMessagingDataModel,
  PersistMatchdayMessagingDataModel,
} from '../DataModel/PersistMatchdayMessagingDataModel';
import { IMatchday } from '../IMatchday';
import { IMatchdays } from '../IMatchdays';
import { IMessaging } from "./IMessaging";
import { MessagingMessage } from './MessagingMessage';
import { MessagingMessageTypeIndexedDbAddMatchday } from './MessagingMessageTypeIndexedDbAddMatchday';

export class MatchdaysMessaging implements IMatchdays {
  constructor(
    private readonly dataSource: IMessaging<Object>,
  ) { }

  public matchdays(): Promise<IMatchday[]> {
    return new Promise(() => new Object());
  }

  public add(
    gameServerName: String,
    gameSeason: Number,
    gameDay: Number,
    date: Date,
  ): Promise<IMatchday> {
    this.dataSource.send(
      new MessagingMessage<IPersistMatchdayMessagingDataModel>(
        new MessagingMessageTypeIndexedDbAddMatchday(),
        new PersistMatchdayMessagingDataModel(
          gameServerName,
          gameSeason,
          gameDay,
        )));
    return new Promise(() => new Object());
  }
}
