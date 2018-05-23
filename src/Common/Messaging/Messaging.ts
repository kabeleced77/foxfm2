import { IMessagingMessage } from "./MessagingMessage";

export interface IMessaging {
  send(message: IMessagingMessage);
}
