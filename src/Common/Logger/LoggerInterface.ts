"use strict";

import {ILoggerLogLevelSetting} from "./LoggerLogLevelSetting"
import {IRegisteredLoggingModule} from "./RegisteredLoggingModule"
import {IRegisteredLoggingModulesSetting} from "./RegisteredLoggingModulesSetting"

export interface LoggerInterface {
	registerModuleForLogging(module: IRegisteredLoggingModule): Promise<void>;
  registeredModulesSetting(): IRegisteredLoggingModulesSetting;
  loggerLogLevelSetting(): ILoggerLogLevelSetting;
	info(module: String, msg: string): void;
	debug(module: String, msg: string): void;
	warn(module: String, msg: string): void;
	error(module: String, msg: string): void;
}
