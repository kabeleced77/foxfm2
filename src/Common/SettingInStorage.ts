import { ISetting } from './Setting'
import { StorageLocal } from './Storage'
import { ISettingName } from "./Toolkit/SettingName";

export interface ISettingInStorageType<T> {
  fromJson(jsonString: String): T;
}

export class SettingInStorage<T extends ISettingInStorageType<T>> implements ISetting<T> {
  private storage: ISetting<T>;
  private settingKey: ISettingName;
  private settingDefaultValue: T;

  constructor(key: ISettingName, defaultValue: T) {
    this.settingKey = key;
    this.storage = new StorageLocal<T>(key, defaultValue);
    this.settingDefaultValue = defaultValue;
  }

  public key(): ISettingName {
    return this.storage.key();
  }

  public update(updateCurrentValue: (currentValue: T) => T): Promise<void> {
    return this.storage.update((currentValue: T) => {
      var updatedValue = updateCurrentValue(currentValue);
      return updatedValue;
    });
  }

  public value(): Promise<T> {
    return this.storage.value()
      .catch(e => { throw new Error(`SettingInStorage: Cannot get the value of ${this.key()}: ${e}`); });
  }
}
