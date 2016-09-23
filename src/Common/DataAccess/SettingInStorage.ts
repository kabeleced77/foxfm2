import { ISetting } from './Setting'
import { IStorage } from './Storage'
import { StorageLocal } from './Storage'

export class SettingInStorage<T> implements ISetting<T> {
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
  public value(): Promise<String> {
    return this.storage.value().then((value: string) => {
      return value == undefined ? this.settingDefaultValue : value;
    });
  }
  public change(value: T): Promise<void> {
    return this.storage.save(value);
  }
}