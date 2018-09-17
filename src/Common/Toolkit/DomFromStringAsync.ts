import { IDomAsync } from './IDomAsync';
import { IValueAsync } from './ValueAsync';

export class DomFromStringAsync implements IDomAsync {
  constructor(
    private string: IValueAsync<String>,
  ) { }

  public async dom(): Promise<Document> {
    try {
      return new DOMParser()
        .parseFromString(
          (await this.string.value()).toString(),
          "text/html",
        );
    } catch (e) {
      throw new Error(`Error parsing dom from string: ${e}`);
    }
  }
}
