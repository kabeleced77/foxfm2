import { IUrl } from "./Url";

export interface IExtendWebElement {
  extend(): void;
  targetUrl(): IUrl;
}
