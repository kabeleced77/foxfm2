"use strict";

import {ILoggerLogLevelSetting} from "./LoggerLogLevelSetting"
import {IRegisteredLoggingModule} from "./RegisteredLoggingModule"
import {IRegisteredLoggingModulesSetting} from "./RegisteredLoggingModulesSetting"

export interface LoggerInterface {
	registerModuleForLogging(module: IRegisteredLoggingModule): void;
  registeredModulesSetting(): IRegisteredLoggingModulesSetting;
  loggerLogLevelSetting(): ILoggerLogLevelSetting;
	info(module: string, msg: string): void;
	debug(module: string, msg: string): void;
	warn(module: string, msg: string): void;
	error(module: string, msg: string): void;
}
