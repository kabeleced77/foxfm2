import { IMessaging } from './Messaging';
import { IMessagingPort } from './MessagingPort';

export class MessagingContentScript implements IMessaging {
  private port: IMessagingPort;

  constructor(
    port: IMessagingPort,
  ) {
    this.port = port;
  }

  public send(message: Object) {
    let port = chrome.runtime.connect({ name: this.port.name().toString() });
    port.postMessage(message);
  }
}
