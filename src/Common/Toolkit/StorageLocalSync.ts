import { ISettingInStorageType } from "../Settings/SettingInStorage";
import { ISetting } from "../Settings/Setting";
import { IMutex } from "./Mutex";
import { ISettingName } from "../Settings/SettingName";

export class StorageLocalSync<T extends ISettingInStorageType<T>> implements ISetting<T> {
  private mutex: IMutex<T>;
  private storageKey: ISettingName;
  private defaultValue: T;

  constructor(mutex: IMutex<T>, key: ISettingName, defaultValue: T) {
    this.mutex = mutex;
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
        // console.debug("[SYNCED] saved in storage [" + this.key().name() + "]: " + JSON.stringify(obj));
        resolve();
      });
    });
  }

  public value(): Promise<T> {
    return this.mutex.synchronize(() => {
      return new Promise<T>((resolve, reject) => {
        chrome.storage.local.get(this.storageKey.name(), (items: { [key: string]: String }) => {
          var value = items[this.storageKey.name().toString()];
          if (value === undefined) {
            resolve(this.defaultValue);
          } else {
            // console.debug("[SYNC] loaded from storage [" + this.key().name() + "]: " + JSON.stringify(value));
            resolve(this.defaultValue.fromJson(value));
          }
        });
      });
    });
  }
}
