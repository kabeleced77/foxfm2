import { IMessagingMessageTypeDataModel } from './MessagingMessageType';

export interface IMessagingMessage<T> {
  type: IMessagingMessageTypeDataModel;
  content: T;
}

export class MessagingMessage<T> implements IMessagingMessage<T> {
  public type: IMessagingMessageTypeDataModel;
  public content: T;

  constructor(type: IMessagingMessageTypeDataModel, content: T) {
    this.type = type;
    this.content = content;
  }
}
