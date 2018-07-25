import { ClubMessagingDataModel, IClubMessagingDataModel } from '../DataModel/ClubMessagingDataModel';
import { IClub } from '../IClub';
import { IClubs } from '../IClubs';
import { IMessaging } from './Messaging';
import { MessagingMessage } from './MessagingMessage';
import { MessagingMessageTypeIndexedDbAddClub } from './MessagingMessageTypeIndexedDbAddClub';

export class ClubsMessaging implements IClubs {
  constructor(
    private readonly dataSource: IMessaging<Object>,
  ) { }

  public clubs(): Promise<IClub[]> {
    return new Promise(() => new Object());
  }

  public add(gameServerName: String, clubName: String, externalClubId: Number):
    Promise<IClub> {
    this.dataSource.send(
      new MessagingMessage<IClubMessagingDataModel>(
        new MessagingMessageTypeIndexedDbAddClub(),
        new ClubMessagingDataModel(
          gameServerName,
          clubName,
          externalClubId,
        )));
    return new Promise(() => new Object());
  }
}
