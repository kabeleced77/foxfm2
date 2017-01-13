import { IRegisteredLoggingModule } from "./RegisteredLoggingModule"
import { RegisteredLoggingModule } from "./RegisteredLoggingModule"
import { LogLevelOff } from "./LogLevel"

export interface IRegisteredLoggingModules {
  modules(): Array<IRegisteredLoggingModule>;
  moduleByName(name: String): IRegisteredLoggingModule;
  add(module: IRegisteredLoggingModule): void;
  change(module: IRegisteredLoggingModule): void;
  fromJson(string: String): IRegisteredLoggingModules;
}

export class RegisteredLoggingModules implements IRegisteredLoggingModules {
  private loggingModules: Array<IRegisteredLoggingModule>;

  constructor(modules: Array<IRegisteredLoggingModule>) {
    this.loggingModules = modules;
  }

  public modules(): Array<IRegisteredLoggingModule> {
    return this.loggingModules;
  }

  public moduleByName(moduleName: String): IRegisteredLoggingModule {
    var modules = this.modulesByName(moduleName);
    if (modules.length === 1) return modules[0];
    throw `"No or more than one Logging Module of given name found: ${moduleName}]"`;
  }

  public add(module: IRegisteredLoggingModule): void {
    if (this.moduleIndex(module) === -1) this.loggingModules.push(module);
  }

  public change(module: IRegisteredLoggingModule): void {
    var moduleIndex = this.moduleIndex(module);
    if (moduleIndex !== -1) {
      this.loggingModules[moduleIndex] = module;
    } else {
      this.add(module);
    }
  }

  public fromJson(string: String): IRegisteredLoggingModules {
    return new RegisteredLoggingModules(
      string["loggingModules"].map((module: String, i: number) => {
        return new RegisteredLoggingModule("", new LogLevelOff()).fromJson(module);
      })
    );
  }

  private moduleIndex(module: IRegisteredLoggingModule): number {
    var moduleIndex = -1;
    this.loggingModules.forEach((element, i) => {
      if (element.name() === module.name()) {
        moduleIndex = i;
        return moduleIndex;
      }
    });
    return moduleIndex;
  }

  private moduleRegistered(module: IRegisteredLoggingModule): Boolean {
    return this.modulesByName(module.name()).length !== 0;
  }

  private modulesByName(moduleName: String): Array<IRegisteredLoggingModule> {
    return this.modules().filter(m => m.name() === moduleName);
  }

}
