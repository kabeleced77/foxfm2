import { ISetting } from "../Setting"
import { SettingInStorage } from "../SettingInStorage"
import { IRegisteredLoggingModule } from "./RegisteredLoggingModule"
import { RegisteredLoggingModule } from "./RegisteredLoggingModule"
import { IRegisteredLoggingModules } from "./RegisteredLoggingModules"
import { RegisteredLoggingModules } from "./RegisteredLoggingModules"

export interface IRegisteredLoggingModulesSetting {
  modules(): Promise<IRegisteredLoggingModules>;
  moduleByName(name: String): Promise<IRegisteredLoggingModule>;
  findOrAdd(module: IRegisteredLoggingModule): Promise<IRegisteredLoggingModule>;
  changeModule(module: IRegisteredLoggingModule): Promise<void>;
  changeModules(modules: Array<IRegisteredLoggingModule>): void;
  addModule(module: IRegisteredLoggingModule): void;
}

export class RegisteredLoggingModulesSetting implements IRegisteredLoggingModulesSetting {
  private registeredLoggingModules: ISetting<IRegisteredLoggingModules>;

  constructor() {
    this.registeredLoggingModules = new SettingInStorage<IRegisteredLoggingModules>(
      "foxfm2.logger.loggingModules",
      new RegisteredLoggingModules(new Array<IRegisteredLoggingModule>())
    );
  }

  public modules(): Promise<IRegisteredLoggingModules> {
    return this.registeredLoggingModules.value();
  }

  public moduleByName(name: String): Promise<IRegisteredLoggingModule> {
    return this.modules().then(modules => modules.moduleByName(name));
  }

  public findOrAdd(module: IRegisteredLoggingModule): Promise<IRegisteredLoggingModule> {
    return this.modules().then(registeredLoggingModules => {
      var foundModule = registeredLoggingModules.modules().find(m => m.name() === module.name());
      if (foundModule === undefined) {
        this.addModule(module);
      }
      return module;
    });
  }

  public changeModules(modules: Array<IRegisteredLoggingModule>): void {
    this.modules().then(registeredLoggingModules => {
      modules.forEach(m => {
        registeredLoggingModules.change(m);
        this.saveModules(registeredLoggingModules);
      });
    });
  }

  public changeModule(module: IRegisteredLoggingModule): Promise<void> {
    return this.modules().then(registeredLoggingModules => {
      registeredLoggingModules.change(module);
      this.saveModules(registeredLoggingModules).then(() =>
        // console.info(JSON.stringify(registeredLoggingModules))
      );
    });
  }

  public addModule(module: IRegisteredLoggingModule): void {
    this.modules().then(registeredLoggingModules => {
      registeredLoggingModules.add(module);
      this.saveModules(registeredLoggingModules);
    });
  }

  private saveModules(registeredLoggingModules: IRegisteredLoggingModules): Promise<void> {
    return this.registeredLoggingModules.change(registeredLoggingModules);
  }
}
