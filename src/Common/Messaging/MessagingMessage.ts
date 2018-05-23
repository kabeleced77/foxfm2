import { IMessagingMessageTypeDataModel } from './MessagingMessageType';

export interface IMessagingMessage {
  type: IMessagingMessageTypeDataModel;
  content: Object;
}
