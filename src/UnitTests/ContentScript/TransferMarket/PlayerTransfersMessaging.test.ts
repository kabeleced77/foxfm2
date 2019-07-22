import { IMessaging } from "../../../Common/Messaging/IMessaging";
import { PlayerCategory } from "../../../Common/PlayerCategory";
import { PlayerTransfersMessaging } from "../../../ContentScript/TransferMarket/PlayerTransfersMessaging";
import { Values } from "../../../Common/Toolkit/Values";

const mockMessaging = jest.genMockFromModule<IMessaging<Object, Object>>("../../../Common/Messaging/IMessaging");
const gameServerUri = "www.unit.test.org";

test("Get average transfer price of exisiting player category", async () => {
  const marketValues = {};
  const playerCategory1 = new PlayerCategory("TW", 18, 5);
  const playerCategory1MarketValue = 1000;
  const playerCategory2 = new PlayerCategory("LM", 19, 6);
  const playerCategory2MarketValue = 2000;
  marketValues[JSON.stringify(playerCategory1)] = playerCategory1MarketValue;
  marketValues[JSON.stringify(playerCategory2)] = playerCategory2MarketValue;
  mockMessaging.send = jest.fn(() => new Promise((resolve, reject) => resolve(marketValues)));

  const sut = new PlayerTransfersMessaging(
    mockMessaging,
    gameServerUri,
    new Values([""]),
    17,
    27,
    1,
    5);

  const average = await sut
    .average(
      playerCategory2
    );
  expect(average).toBe(playerCategory2MarketValue);
});

test("Get '0' when player category is not existing", async () => {
  const marketValues = {};
  mockMessaging.send = jest.fn(() => new Promise((resolve, reject) => resolve(marketValues)));

  const sut = new PlayerTransfersMessaging(
    mockMessaging,
    gameServerUri,
    new Values([""]),
    17,
    27,
    1,
    5);

  const playerCategory3 = new PlayerCategory("RM", 19, 6);
  const average = await sut
    .average(
      playerCategory3
    );
  expect(average).toBe(0);
});
