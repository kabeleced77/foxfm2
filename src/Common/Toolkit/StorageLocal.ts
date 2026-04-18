import browser from "webextension-polyfill";
import { ISettingName } from "./SettingName";
import { ISetting } from "./Setting";
import { ITypeInStorage } from "../TypeInStorage";

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

  public async update(
    updateCurrentValue: (currentValue: T) => T,
  ): Promise<void> {
    var updatedValue = updateCurrentValue(await this.value());
    this.save(updatedValue);
  }

  public save(value: T): Promise<void> {
    var obj: { [key: string]: T } = {};
    obj[this.storageKey.name().toString()] = value;
    return browser.storage.local.set(obj).then(() => {
      // console.debug("saved in storage [" + this.key().name() + "]: " + JSON.stringify(obj));
    });
  }

  public value(): Promise<T> {
    return browser.storage.local
      .get(this.storageKey.name().toString())
      .then((items: { [key: string]: any }) => {
        var value = items[this.storageKey.name().toString()];
        // console.debug("loaded from storage [" + this.key().name() + "]: " + JSON.stringify(value));
        if (value === undefined) {
          // console.debug(`${this.key().name()}: will use default value: ${JSON.stringify(this.defaultValue)}`);
          this.save(this.defaultValue);
          return this.defaultValue;
        } else {
          // console.debug(`${this.key().name()}: will create object from JSON value: ${JSON.stringify(value)}`);
          return this.defaultValue.fromJson(value);
        }
      }).catch((e) => { throw new Error(`ERROR: Cannot get value of storage key ${this.storageKey.name()}`); });
  }
}
