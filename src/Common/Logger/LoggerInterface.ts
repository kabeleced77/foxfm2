"use strict";

export enum LogLevel { Off, Error, Warn, Info, Debug, All };

export interface LoggerInterface {
	setLogLevel(logLevel: LogLevel): void;
	registerModuleForLogging(moduleName: string): void;
	activateModuleForLogging(moduleName: string): void;
	info(module: string, msg: string): void;
	debug(module: string, msg: string): void;
	warn(module: string, msg: string): void;
	error(module: string, msg: string): void;
}
