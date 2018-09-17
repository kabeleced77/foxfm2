import { IUrl } from './Url';
import { IValueAsync } from './ValueAsync';

export class TextByXmlHttpRequest implements IValueAsync<String> {
  constructor(
    private target: IUrl,
  ) { }

  public async value(): Promise<String> {
    try {
      return (await fetch(this.target.url().toString())).text();
    }
    catch (e) {
      throw new Error(`Could not download '${this.target.url()}': ${e}`);
    }
  }
}
