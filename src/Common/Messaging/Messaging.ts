import { IMessagingMessage } from "./MessagingMessage";

export interface IMessaging<T> {
  send(message: IMessagingMessage<T>);
}
