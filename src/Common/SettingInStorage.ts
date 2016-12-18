import { ISetting } from './Setting'
import { IStorage } from './Storage'
import { StorageLocal } from './Storage'

export interface ISettingInStorageType<T> {
  fromJson(jsonString: String): T;
}

export class SettingInStorage<T extends ISettingInStorageType<T>> implements ISetting<T> {
  private storage: IStorage<T>;
  private settingKey: String;
  private settingDefaultValue: T;

  constructor(key: String, defaultValue: T) {
    this.settingKey = key;
    this.storage = new StorageLocal<T>(key);
    this.settingDefaultValue = defaultValue;
  }

  public key(): String {
    return this.storage.key();
  }

  public defaultValue(): T {
    return this.settingDefaultValue;
  }

  public value(): Promise<T> {
    return this.storage.value().then((value: string) => {
      return value == undefined ? this.settingDefaultValue : this.settingDefaultValue.fromJson(value);
    });
  }

  public change(value: T): Promise<void> {
    return this.storage.save(value);
  }
}
