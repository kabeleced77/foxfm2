import { IMessagingMessageTypeDataModel } from "./IMessagingMessageTypeDataModel";
import { IMessagingMessage } from "./IMessagingMessage";

/**
 * Implementation of the interface of a message which can be sent through a messaging system.
 * 
 * An instance of this type will be serialised and sent. As the serialisation will serialise 
 * only properties they are defined public.
 */
export class MessagingMessage<T> implements IMessagingMessage<T> {
  public type: IMessagingMessageTypeDataModel;
  public content: T;

  constructor(type: IMessagingMessageTypeDataModel, content: T) {
    this.type = type;
    this.content = content;
  }
}
