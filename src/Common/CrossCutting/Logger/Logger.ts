import {LoggerInterface, LogLevel} from "./LoggerInterface"

export class Logger implements LoggerInterface {
	private logLevel: LogLevel;
	private modulesRegisteredToLog: string[];
	private modulesToLog: string[];

	constructor() {
		this.logLevel = LogLevel.Error;
		this.modulesToLog = [];
		this.modulesRegisteredToLog = [];
	}

	setLogLevel(logLevel: LogLevel): void {
		this.logLevel = logLevel;
	}

	registerModuleForLogging(moduleName: string): void {
		this.modulesRegisteredToLog.push(moduleName);
	}

	activateModuleForLogging(moduleName: string): void {
		this.modulesToLog.push(moduleName);
	}

	info(module: string, msg: string): void {
		this.printMessage(module, LogLevel.Info, msg);
	}
	debug(module: string, msg: string): void {
		this.printMessage(module, LogLevel.Debug, msg);
	}
	warn(module: string, msg: string): void {
		this.printMessage(module, LogLevel.Warn, msg);
	}
	error(module: string, msg: string): void {
		this.printMessage(module, LogLevel.Error, msg);
	}

	private printMessage(module: string, logLevel: LogLevel, msg: string): void {
		if (logLevel > this.logLevel) {
			return;
		}
		if (this.modulesToLog.length === 0 || (!this.modulesToLog.some(m => m.toLowerCase() === "all") && !this.modulesToLog.some(m => m === module))) {
			return;
		}
		var prefix = this.getPrefix(module, logLevel);
		switch (logLevel) {
			case LogLevel.Debug:
				console.debug(prefix + msg);
				break;
			case LogLevel.Error:
				console.error(prefix + msg);
				break;
			case LogLevel.Info:
				console.info(prefix + msg);
				break;
			case LogLevel.Warn:
				console.warn(prefix + msg);
				break;
			default:
				console.info(prefix + msg);
		}
	}

	private getPrefix(module: string, logLevel: LogLevel): string {
		var currentDate = new Date();
		return currentDate.toLocaleString('en-GB') + '|' + LogLevel[logLevel] + '| ' + module + ': ';
	}
}
