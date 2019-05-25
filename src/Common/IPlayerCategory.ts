/**
 * A player category is used to group / categorise player by their
 * - position
 * - age
 * - strength
 */
export interface IPlayerCategory {
  position(): String;
  age(): Number;
  strength(): Number;
}
