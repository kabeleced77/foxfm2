import { IMessaging } from "./IMessaging";
import { IMessagingPort } from './MessagingPort';
import { IEasyLogger } from '../Logger/EasyLogger';

export class MessagingContentScript implements IMessaging<Object, Object> {
  constructor(
    private port: IMessagingPort,
    private logger: IEasyLogger,
  ) { }

  public send(message: Object)
    : Promise<Object> {

    return new Promise((resolve, reject) => {
      let port = chrome.runtime.connect({ name: this.port.name().toString() });
      this.logger.info(`opened port: ${this.port.name()}`);

      port.onMessage.addListener(m => {
        this.logger.info(`received message: ${JSON.stringify(m)}`);
        resolve(m);
      });

      port.postMessage(message);
      this.logger.info(`sent message: ${JSON.stringify(message)}`);
    });
  }
}
