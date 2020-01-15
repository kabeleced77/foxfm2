import { IUrl } from "./Url";

export interface IClickWebElement {
  click(): void;
  targetUrl(): IUrl;
}
