import { AwpByEpTp } from "../../../Common/Toolkit/Awp";

test('AWP calculated where expierence and traning points > 0', () => {
  expect(new AwpByEpTp(123, 456).awpPoints()).toBe(194);
});

test('AWP calculated where expierence and traning points == 0', () => {
  expect(new AwpByEpTp(0, 0).awpPoints()).toBe(NaN);
});
