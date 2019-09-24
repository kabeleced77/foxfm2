import {
  IPersistMatchdayMessagingDataModel,
  PersistMatchdayMessagingDataModel,
} from '../DataModel/PersistMatchdayMessagingDataModel';
import { IMatchdayWithId } from "../IMatchdayWithId";
import { IMatchdays } from '../IMatchdays';
import { IMessaging } from "./IMessaging";
import { MessagingMessage } from './MessagingMessage';
import { MessagingMessageTypeIndexedDbAddMatchday } from './MessagingMessageTypeIndexedDbAddMatchday';
import { IGameServerWithId } from '../IGameServerWithId';

export class MatchdaysMessaging implements IMatchdays {
  constructor(
    private readonly dataSource: IMessaging<Object, IMatchdayWithId>,
  ) { }

  public matchdays(): Promise<IMatchdayWithId[]> {
    return new Promise(() => new Object());
  }

  matchdaysByServerSeasonDay(
    gameServer: IGameServerWithId,
    season: Number,
    day: Number,
  ): Promise<IMatchdayWithId[]> {
    throw new Error("Method not implemented.");
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
