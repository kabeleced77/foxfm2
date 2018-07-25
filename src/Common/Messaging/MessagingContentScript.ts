import { IMessaging } from './Messaging';
import { IMessagingPort } from './MessagingPort';
import { IEasyLogger } from '../Logger/EasyLogger';

export class MessagingContentScript implements IMessaging<Object> {
  constructor(
    private port: IMessagingPort,
    private logger: IEasyLogger,
  ) { }

  public send(message: Object) {
    let port = chrome.runtime.connect({ name: this.port.name().toString() });
    port.postMessage(message);

    port.onMessage.addListener(message => {
      this.logger.info(`received message: ${JSON.stringify(message)}`);
    });
  }
}
