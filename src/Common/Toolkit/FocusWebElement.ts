import { IUrl } from "./Url";

export interface IFocusWebElement {
  focus(): void;
  targetUrl(): IUrl;
}
