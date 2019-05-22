import { Awp } from "../../../Common/Toolkit/Awp";

test('AWP by non-calculated given AWP', () => {
  expect(new Awp(123).awpPoints()).toBe(123);
});
