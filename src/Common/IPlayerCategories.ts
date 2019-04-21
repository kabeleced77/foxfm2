import { IPlayerCategory } from "./IPlayerCategory";

export interface IPlayerCategories {
  categories(): Promise<IPlayerCategory[]>;
}
