import { IMessagingMessage } from "./IMessagingMessage";
export interface IMessaging<T> {
  send(message: IMessagingMessage<T>);
}
