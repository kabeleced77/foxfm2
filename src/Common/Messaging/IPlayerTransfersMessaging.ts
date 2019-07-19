import { IPlayerCategory } from "../IPlayerCategory";

export interface IPlayerTransfersMessaging {
  averages(): Promise<{}>;
  average(category: IPlayerCategory): Promise<Number>;
}
