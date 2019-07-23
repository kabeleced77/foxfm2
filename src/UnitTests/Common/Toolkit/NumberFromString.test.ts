import { NumberFromString } from "../../../Common/Toolkit/NumberFromString";
import { IValue } from "../../../Common/Toolkit/IValue";

const mockValue = jest.genMockFromModule<IValue<String>>("../../../Common/Toolkit/IValue");

test("Get number from string with decimal seperator ','", () => {
  mockValue.value = jest.fn(() => "123");
  expect(new NumberFromString(mockValue, ",").value()).toBe(123);

  mockValue.value = jest.fn(() => "123,00");
  expect(new NumberFromString(mockValue, ",").value()).toBe(123);

  mockValue.value = jest.fn(() => "123,45");
  expect(new NumberFromString(mockValue, ",").value()).toBe(123.45);
});

test("Get number from string with decimal seperator ','", () => {
  mockValue.value = jest.fn(() => "123");
  expect(new NumberFromString(mockValue, ".").value()).toBe(123);

  mockValue.value = jest.fn(() => "123.00");
  expect(new NumberFromString(mockValue, ".").value()).toBe(123);

  mockValue.value = jest.fn(() => "123.45");
  expect(new NumberFromString(mockValue, ".").value()).toBe(123.45);
});

test("Get number from string using default decimal seperator '.'", () => {
  mockValue.value = jest.fn(() => "123");
  expect(new NumberFromString(mockValue).value()).toBe(123);

  mockValue.value = jest.fn(() => "123.00");
  expect(new NumberFromString(mockValue).value()).toBe(123);

  mockValue.value = jest.fn(() => "123.45");
  expect(new NumberFromString(mockValue).value()).toBe(123.45);
});

test("Get number from string with thousands separator '.' and decimal seperator ','", () => {
  mockValue.value = jest.fn(() => "123.000");
  expect(new NumberFromString(mockValue, ",").value()).toBe(123000);

  mockValue.value = jest.fn(() => "123.000,00");
  expect(new NumberFromString(mockValue, ",").value()).toBe(123000);

  mockValue.value = jest.fn(() => "123.000,45");
  expect(new NumberFromString(mockValue, ",").value()).toBe(123000.45);
});

test("Get number from string with thousands separator ',' using default decimal seperator '.'", () => {
  mockValue.value = jest.fn(() => "123,000");
  expect(new NumberFromString(mockValue).value()).toBe(123000);

  mockValue.value = jest.fn(() => "123,000.00");
  expect(new NumberFromString(mockValue).value()).toBe(123000);

  mockValue.value = jest.fn(() => "123,000.45");
  expect(new NumberFromString(mockValue).value()).toBe(123000.45);
});

