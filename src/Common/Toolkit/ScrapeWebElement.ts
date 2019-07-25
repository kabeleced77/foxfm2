import { IUrl } from "./Url";

export interface IScrapeWebElement {
  scrape(): void;
  targetUrl(): IUrl;
}
