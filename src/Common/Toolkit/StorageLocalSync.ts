import { ISetting } from "../Settings/Setting";
import { IMutex } from "./Mutex";
import { ISettingName } from "../Settings/SettingName";
import { ITypeInStorage } from "../TypeInStorage";

export class StorageLocalSync<T extends ITypeInStorage<T>> implements ISetting<T> {
  private mutex: IMutex<T>;
  private storageLocal: ISetting<T>;

  constructor(mutex: IMutex<T>, storageLocal: ISetting<T>) {
    this.mutex = mutex;
    this.storageLocal = storageLocal;
  }

  public key(): ISettingName {
    return this.storageLocal.key();
  }

  public update(updateCurrentValue: (currentValue: T) => T): Promise<void> {
    return this.value()
      .then((currentValue: T) => {
        // update and save must be done in one then-block
        var updatedValue = updateCurrentValue(currentValue);
        return this.save(updatedValue);
      });
  }

  public save(value: T): Promise<void> {
    return this.storageLocal.save(value);
  }

  public value(): Promise<T> {
    return this.mutex.synchronize(() => {
      return this.storageLocal.value();
    });
  }
}
