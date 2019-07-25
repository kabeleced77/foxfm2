import { IEasyLogger } from '../Logger/EasyLogger';
import { IScrapeWebElement } from './ScrapeWebElement';
import { IUrl } from './Url';

export interface IScrapeWebPage {
  scrape(log: IEasyLogger): void;
}

export class ScrapeWebPage implements IScrapeWebPage {
  private currentUrl: IUrl;
  private webElements: Array<IScrapeWebElement>;

  constructor(
    currentUrl: IUrl,
    elements: Array<IScrapeWebElement>,
  ) {
    this.currentUrl = currentUrl;
    this.webElements = elements;
  }

  public scrape(log: IEasyLogger): void {
    this.webElements.forEach(webElement => {
      var currentUrl = this.currentUrl.url().toString();
      var targetUrl = webElement.targetUrl().url();
      var scrape = currentUrl.match(targetUrl) !== null;
      log.info(`called from: ${currentUrl} compared to ${targetUrl}: ${scrape}`);
      if (scrape) webElement.scrape();
    });
  }
}
