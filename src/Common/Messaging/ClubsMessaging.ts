import { PersistClubMessagingDataModel, IPersistClubMessagingDataModel } from '../DataModel/PersistClubMessagingDataModel';
import { IClub } from '../IClub';
import { IClubs } from '../IClubs';
import { IMessaging } from "./IMessaging";
import { MessagingMessage } from './MessagingMessage';
import { MessagingMessageTypeIndexedDbAddClub } from './MessagingMessageTypeIndexedDbAddClub';

export class ClubsMessaging implements IClubs {
  constructor(
    private readonly dataSource: IMessaging<Object, Object>,
  ) { }

  public clubs(): Promise<IClub[]> {
    return new Promise(() => new Object());
  }

  public add(gameServerName: String, clubName: String, externalClubId: Number):
    Promise<IClub> {

    return <Promise<IClub>>this.dataSource.send(
      new MessagingMessage<IPersistClubMessagingDataModel>(
        new MessagingMessageTypeIndexedDbAddClub(),
        new PersistClubMessagingDataModel(
          gameServerName,
          clubName,
          externalClubId,
        )));
  }
}
