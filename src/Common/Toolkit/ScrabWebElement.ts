import { IUrl } from "./Url";

export interface IScrabWebElement {
  scrab(): void;
  targetUrl(): IUrl;
}
