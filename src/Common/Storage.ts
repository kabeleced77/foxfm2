import { ISettingName } from "./Settings/SettingName";
import { ISetting } from "./Settings/Setting";
import { ITypeInStorage } from "./TypeInStorage";

export class StorageLocal<T extends ITypeInStorage<T>> implements ISetting<T> {
  private storageKey: ISettingName;
  private defaultValue: T;

  constructor(key: ISettingName, defaultValue: T) {
    this.storageKey = key;
    this.defaultValue = defaultValue;
  }

  public key(): ISettingName {
    return this.storageKey;
  }

  public update(updateCurrentValue: (currentValue: T) => T): Promise<void> {
    return this.value()
      .then((currentValue: T) => {
        var updatedValue = updateCurrentValue(currentValue);
        this.save(updatedValue)
      });
  }

  public save(value: T): Promise<void> {
    var obj: { [key: string]: T } = {};
    obj[this.storageKey.name().toString()] = value;
    return new Promise<void>((resolve, reject) => {
      chrome.storage.local.set(obj, () => {
        // console.debug("saved in storage [" + this.key().name() + "]: " + JSON.stringify(obj));
        resolve();
      });
    });
  }

  public value(): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      chrome.storage.local.get(this.storageKey.name(), (items: { [key: string]: String }) => {
        var value = items[this.storageKey.name().toString()];
        // console.debug("loaded from storage [" + this.key().name() + "]: " + JSON.stringify(value));
        if (value === undefined) {
          // console.debug(`${this.key().name()}: will use default value: ${JSON.stringify(this.defaultValue)}`);
          this.save(this.defaultValue);
          resolve(this.defaultValue);
        } else {
          // console.debug(`${this.key().name()}: will create object from JSON value: ${JSON.stringify(this.defaultValue)}`);
          resolve(this.defaultValue.fromJson(value));
        }
      });
    }).catch((e) => { Error(`ERROR: Cannot get value of storage key ${this.storageKey.name()}`); });
  }
}
