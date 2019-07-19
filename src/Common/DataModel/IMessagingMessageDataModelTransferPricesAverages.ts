/**
 * Interface describing the data model of a messaging message used to
 * get the average transfer prices for a range of player 
 * categories (position, age, strength).
 * 
 * Tha average transfer prices shall be provided based on
 * - URI of a certain game server
 * - List of player positions
 * - Range of player age (min-max)
 * - Range of player strengths (min-max)
 */
export interface IMessagingMessageDataModelTransferPricesAverages {
  gameServerUri: String;
  positions: String[];
  minAge: Number;
  maxAge: Number;
  minStrength: Number;
  maxStrength: Number;
}
