import { NumberFromString } from "../../../Common/Toolkit/NumberFromString";
import { IValue } from "../../../Common/Toolkit/IValue";

const mockValue = jest.genMockFromModule<IValue<String>>("../../../Common/Toolkit/IValue");

test("Get number from string with decimal separtor ','", () => {
  mockValue.value = jest.fn(() => "123");
  expect(new NumberFromString(mockValue, ",").value()).toBe(123);

  mockValue.value = jest.fn(() => "123,00");
  expect(new NumberFromString(mockValue, ",").value()).toBe(123);

  mockValue.value = jest.fn(() => "123,45");
  expect(new NumberFromString(mockValue, ",").value()).toBe(123.45);
});

test("Get number from string with decimal separtor ','", () => {
  mockValue.value = jest.fn(() => "123.00");
  expect(new NumberFromString(mockValue, ".").value()).toBe(123);

  mockValue.value = jest.fn(() => "123.45");
  expect(new NumberFromString(mockValue, ".").value()).toBe(123.45);
});
