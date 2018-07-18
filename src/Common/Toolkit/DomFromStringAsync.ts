import { IDomAsync } from './IDomAsync';
import { IValueAsync } from './ValueAsync';

export class DomFromStringAsync implements IDomAsync {
  constructor(
    private string: IValueAsync<String>,
  ) { }

  public async dom(): Promise<Document> {
    return new DOMParser().parseFromString((await this.string.value()).toString(), "text/html");
  }
}
