import { ISettingName } from "./SettingName";

export interface ISetting<T> {
  key(): ISettingName;
  value(): Promise<T>;
  save(value: T): Promise<void>;
  update(updateFunction: (value: T) => T): Promise<void>;
}
