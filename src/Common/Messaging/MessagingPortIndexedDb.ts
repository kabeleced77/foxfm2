import { IMessagingPort } from './MessagingPort';

export class MessagingPortIndexedDb implements IMessagingPort {
  private portName: String;
  constructor() {
    this.portName = "indexedDb";
  }

  public name(): String {
    return this.portName;
  }
}
