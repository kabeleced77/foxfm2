import { IUrl } from './Url';
import { IValueAsync } from './ValueAsync';

export class TextByXmlHttpRequest implements IValueAsync<String> {
  private targetUrl: IUrl;
  private method: String;
  private async: Boolean;

  constructor(
    target: IUrl,
    method: String,
    async: Boolean,
  ) {
    this.targetUrl = target;
    this.method = method;
    this.async = async;
  }

  public value(): Promise<String> {
    return new Promise<String>((resolve, reject) => {
      try {
        let xhr = new XMLHttpRequest();
        xhr.open(this.method.toString(), this.targetUrl.url().toString(), this.async.valueOf());
        xhr.responseType = "text";

        xhr.onload = () => {
          if (xhr.status === 200) {
            resolve(xhr.responseText);
          }
          else {
            reject('Request failed.  Returned status of ' + xhr.status);
          }
        };
        xhr.send();
      } catch (error) {
        reject(`Error in requesting response text from '${this.targetUrl.url()}: ${error}`);
      }
    });
  }
}
