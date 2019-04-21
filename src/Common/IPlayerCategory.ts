import { IStrengthLevel } from "./StrengthLevel";

/**
 * A player category is used to group / categorise player by their
 * - position
 * - age
 * - strength level
 */
export interface IPlayerCategory {
  position(): String;
  age(): Number;
  strengthLevel(): IStrengthLevel;
}
