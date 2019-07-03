import { IPlayerCategory } from "./IPlayerCategory";
import { IStrengthLevel } from "./StrengthLevel";

/**
 * The player is defined by its 
 * - category
 * - strength level
 * - average market value
 */
export interface IPlayer {
  category(): IPlayerCategory;
  strengthLevel(): IStrengthLevel;
  averageTransferPrice(): Promise<Number>;
}
