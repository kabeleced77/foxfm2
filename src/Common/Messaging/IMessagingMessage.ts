import { IMessagingMessageTypeDataModel } from "./IMessagingMessageTypeDataModel";

/**
 * Interface of a message sent via a messaging system.
 * 
 * A messaging message has a certain type and transports a generic content. 
 */
export interface IMessagingMessage<T> {
  type: IMessagingMessageTypeDataModel;
  content: T;
}
