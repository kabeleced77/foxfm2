import { ISettingName } from "./SettingName";

export interface ISetting<T> {
  key(): ISettingName;
  value(): Promise<T>;
  update(updateFunction: (value: T) => T): Promise<void>;
}
