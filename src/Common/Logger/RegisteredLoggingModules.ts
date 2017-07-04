import { IRegisteredLoggingModule } from "./RegisteredLoggingModule"
import { RegisteredLoggingModule } from "./RegisteredLoggingModule"
import { LogLevelOff } from "./LogLevel"

export interface IRegisteredLoggingModules {
  modules(): Array<IRegisteredLoggingModule>;
  moduleByName(name: String): IRegisteredLoggingModule | undefined;
  add(module: IRegisteredLoggingModule): void;
  update(module: IRegisteredLoggingModule): void;
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

  public moduleByName(moduleName: String): IRegisteredLoggingModule | undefined {
    var modules = this.modulesByName(moduleName);
    if (modules.length === 1) return modules[0];
    if (modules.length === 0) throw `"Did not find following Logging Module: ${moduleName}"`;
    if (modules.length > 1) throw `"Found more than one of the following Logging Module: ${moduleName}"`;
  }

  public add(module: IRegisteredLoggingModule): void {
    if (this.moduleIndex(module) === -1) this.loggingModules.push(module);
  }

  public update(module: IRegisteredLoggingModule): void {
    var moduleIndex = this.moduleIndex(module);
    if (moduleIndex !== -1) {
      this.loggingModules[moduleIndex] = module;
    } else {
      throw Error(`Could not update module as it is not registered: ${module.name()}.`);
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
