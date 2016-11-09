export interface IStorage<T> {
  key(): String;
  save(value: T): Promise<void>;
  value(): Promise<String>;
}

export class StorageLocal<T> implements IStorage<T> {
  private storageKey: String;

  constructor(key: String) {
    this.storageKey = key;
  }

  public key() {
    return this.storageKey;
  }
  public save(value: T): Promise<void> {
    var obj: { [key: string]: T } = {};
    obj[this.storageKey.toString()] = value;
    return new Promise((resolve, reject) => {
      chrome.storage.local.set(obj, () => {
        console.debug("saved in storage [" + this.key() + "]: " + JSON.stringify(obj));
        resolve();
      });
    });
  }
  public value(): Promise<String> {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get(this.storageKey, (items: { [key: string]: String }) => {
        var value = items[this.storageKey.toString()];
        console.debug("loaded from storage [" + this.key() + "]: " + JSON.stringify(value));
        resolve(value);
      });
    });
  }
}