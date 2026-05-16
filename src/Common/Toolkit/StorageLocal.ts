import browser from "webextension-polyfill";
import { ISettingName } from "./SettingName";
import { ISetting } from "./Setting";
import { ITypeInStorage } from "../TypeInStorage";

export class StorageLocal<T extends ITypeInStorage<T>> implements ISetting<T> {
  private storageKey: ISettingName;
  private defaultValue: T;
  private logger: Console | undefined;

  constructor(key: ISettingName, defaultValue: T) {
    this.storageKey = key;
    this.defaultValue = defaultValue;
    this.logger = undefined; // console;
  }

  public key(): ISettingName {
    return this.storageKey;
  }

  public async update(
    updateCurrentValue: (currentValue: T) => T,
  ): Promise<void> {
    this.logger?.debug(
      `update in storage [${this.key().name()}]: ${JSON.stringify(this.value())}`,
    );
    var updatedValue = updateCurrentValue(await this.value());
    this.save(updatedValue);
  }

  public save(value: T): Promise<void> {
    var obj: { [key: string]: T } = {};
    obj[this.storageKey.name().toString()] = value;
    this.logger?.debug(
      `saved in storage [${this.key().name()}]: ${JSON.stringify(obj)}`,
    );
    return browser.storage.local.set(obj).then(() => {
      this.logger?.debug(
        `saved in storage [${this.key().name()}]: ${JSON.stringify(obj)}`,
      );
    });
  }

  public value(): Promise<T> {
    return browser.storage.local
      .get(this.storageKey.name().toString())
      .then((items: { [key: string]: any }) => {
        var value = items[this.storageKey.name().toString()];
        this.logger?.debug(
          `loaded from storage [${this.key().name()}]: ${JSON.stringify(value)}`,
        );
        if (value === undefined) {
          this.logger?.debug(
            `${this.key().name()}: will use default value: ${JSON.stringify(this.defaultValue)}`,
          );
          this.save(this.defaultValue);
          return this.defaultValue;
        } else {
          const updatedValue = this.defaultValue.fromJson(value);
          this.logger?.debug(
            `${this.key().name()}: will create object from JSON value: ${JSON.stringify(value)} => ${JSON.stringify(updatedValue)} `,
          );
          return updatedValue;
        }
      })
      .catch((e) => {
        throw new Error(
          `ERROR: Cannot get value of storage key ${this.storageKey.name()}: ${e.message}`,
        );
      });
  }
}
