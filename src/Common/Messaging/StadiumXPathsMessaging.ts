import { IStadiumXPathsReader } from "../StadiumXPaths";
import { IMessaging } from "./IMessaging";
import { MessagingMessage } from "./MessagingMessage";
import { MessagingMessageTypeIndexedDbStadiumXPaths } from "./MessagingMessageTypeIndexedDbStadiumXPaths";

export class StadiumXPathsMessaging implements IStadiumXPathsReader {
  constructor(private readonly dataSource: IMessaging<Object, Object>) { }

  public async xPaths(): Promise<{ [name: string]: string }> {
    return <{ [name: string]: string }>await this.dataSource.send(
      new MessagingMessage<Object>(
        new MessagingMessageTypeIndexedDbStadiumXPaths(),
        {},
      ));
  }

  public async xPath(name: string): Promise<string> {
    const all = await this.xPaths();
    if (!(name in all)) throw new Error(`Unknown stadium XPath name '${name}'.`);
    return all[name];
  }
}
