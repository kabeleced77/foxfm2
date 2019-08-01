import {
  IPersistMatchdayMessagingDataModel,
  PersistMatchdayMessagingDataModel,
} from '../DataModel/PersistMatchdayMessagingDataModel';
import { IMatchdayWithId } from "../IMatchdayWithId";
import { IMatchdays } from '../IMatchdays';
import { IMessaging } from "./IMessaging";
import { MessagingMessage } from './MessagingMessage';
import { MessagingMessageTypeIndexedDbAddMatchday } from './MessagingMessageTypeIndexedDbAddMatchday';

export class MatchdaysMessaging implements IMatchdays {
  constructor(
    private readonly dataSource: IMessaging<Object, Object>,
  ) { }

  public matchdays(): Promise<IMatchdayWithId[]> {
    return new Promise(() => new Object());
  }

  public add(
    gameServerName: String,
    gameSeason: Number,
    gameDay: Number,
    date: Date,
  ): Promise<IMatchdayWithId> {
    return <Promise<IMatchdayWithId>>this.dataSource.send(
      new MessagingMessage<IPersistMatchdayMessagingDataModel>(
        new MessagingMessageTypeIndexedDbAddMatchday(),
        new PersistMatchdayMessagingDataModel(
          gameServerName,
          gameSeason,
          gameDay,
        )));
  }
}
