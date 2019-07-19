import { IPlayerCategory } from "./IPlayerCategory";
import { IStrengthLevel } from "./StrengthLevel";

/**
 * The player is defined by its 
 * - category
 * - strength level
 */
export interface IPlayer {
  category(): IPlayerCategory;
  strengthLevel(): IStrengthLevel;
}
