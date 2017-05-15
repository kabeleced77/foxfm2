import { IEasyLogger } from "../Logger/EasyLogger";

export interface IWebElementToExtend {
  extend(logger: IEasyLogger): void;
}
