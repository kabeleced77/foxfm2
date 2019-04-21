/**
 * Interface describing the data model of a messaging message used to
 * get the average transfer price of based on the imported transfer prices.
 *
 * Required properties
 * - URI of the game server of the imported transfers
 * - Player position
 * - Player age
 * - Player strength
 */
export interface IMessagingMessageDataModelTransferPricesAverage {
  gameServerUri: String;
  position: String;
  age: Number;
  strength: Number;
}
