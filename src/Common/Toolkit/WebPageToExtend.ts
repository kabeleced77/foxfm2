import { IEasyLogger } from "../Logger/EasyLogger";
import { IUrl } from "./Url";

export interface IWebPageToExtend {
  pageUrl(): IUrl;
  extend(logger: IEasyLogger): void;
}
