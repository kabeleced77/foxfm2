import { ILogger } from "./Logger";
import { IRegisteredLoggingModule } from "./RegisteredLoggingModule";

export interface IEasyLogger {
  info(msg: String): void;
  warn(msg: String): void;
  debug(msg: String): void;
  error(msg: String): void;
}

export class EasyLogger implements IEasyLogger {
  private log: ILogger;
  private loggingModule: IRegisteredLoggingModule;

  constructor(logger: ILogger, loggingModule: IRegisteredLoggingModule) {
    this.log = logger;
    this.loggingModule = loggingModule;
    this.log.registerModuleForLogging(loggingModule);
  }

  info(msg: String): void {
    this.log.info(this.loggingModule.name().toString(), msg.toString());
  }
  warn(msg: String): void {
    this.log.warn(this.loggingModule.name().toString(), msg.toString());
  }
  debug(msg: String): void {
    this.log.debug(this.loggingModule.name().toString(), msg.toString());
  }
  error(msg: String): void {
    this.log.error(this.loggingModule.name().toString(), msg.toString());
  }
}
