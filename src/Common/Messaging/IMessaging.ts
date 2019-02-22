import { IMessagingMessage } from "./IMessagingMessage";

export interface IMessaging<T, R> {
  send(message: IMessagingMessage<T>): Promise<R>;
}
