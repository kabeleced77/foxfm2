import {LoggerInterface, LogLevel} from "../CrossCutting/Logger/LoggerInterface"
import {SettingMessage, SettingAction} from "../CrossCutting/Messageing/SettingMessage"
import {AppSettings} from "../CrossCutting/Settings/AppSettings"
import {SettingsManagerInterface} from "./SettingsManagerInterface"

export class SettingsManager implements SettingsManagerInterface {
	public appSettings: AppSettings = new AppSettings();

	private log: LoggerInterface;
	private thisModule: string = "SettingsManager";
	private appSettingsKey: string = "AppSettings";

	constructor(logger: LoggerInterface) {
		this.log = logger;
	}

	public saveAppSettingsMessaging(as: AppSettings): void {
		this.debug("Save app settings: app settings:" + JSON.stringify(as));
		var message = new SettingMessage();
		message.settingKey = this.appSettingsKey;
		message.settingAction = SettingAction.Save;
		message.appSettings = as;
		this.debug("Request app settings using messaging: message:" + JSON.stringify(message));

		chrome.runtime.sendMessage(message, (response) => {
			this.debug("Response: " + JSON.stringify(response));
		});
	}

	public loadAppSettingsMessaging(callback: (as: AppSettings) => void): void {
		var message = new SettingMessage();
		message.settingKey = "AppSettings";
		message.settingAction = SettingAction.Load;
		this.debug("Request app settings using messaging: " + JSON.stringify(message));

		chrome.runtime.sendMessage(message, (as: AppSettings) => {
			this.synchroniseObjects(this.appSettings, as);
			callback(this.appSettings);
		});
	}

	public getCategoriesAsync(): PromiseLike<string[]> {
		return this.getOrSetAppSettingsAsync()
			.then((appSettings: AppSettings) => {
				var categories = Object.getOwnPropertyNames(appSettings).map(element => {
					if (appSettings != null && appSettings != undefined && typeof (appSettings[element]) === "object") {
						return element;
					}
				});

				return categories;
			});
	}

	public getSettingsByCategoryAsync(category: string): PromiseLike<Object> {
		return this.getOrSetAppSettingsAsync()
			.then((appSettings: AppSettings) => {
				return appSettings[category];
			});
	}

	public setAppSettingsAsync(): PromiseLike<AppSettings> {
		var message = new SettingMessage();
		message.settingKey = this.appSettingsKey;
		message.settingAction = SettingAction.Save;
		message.appSettings = this.appSettings;

		this.debug("Save app settings using messaging: " + JSON.stringify(message));

		return this.sendMessage(message).then((appSettings: AppSettings) => {
			return appSettings;
		});
	}

	public getOrSetAppSettingsAsync(): PromiseLike<AppSettings> {
		var message = new SettingMessage();
		message.settingKey = this.appSettingsKey;
		message.settingAction = SettingAction.Load;
		this.debug("Request app settings using messaging: " + JSON.stringify(message));

		return this.sendMessage(message)
			.then((appSettings: AppSettings) => {
				if (appSettings === null || appSettings === undefined) {
					this.debug("App settings were empty - save them now (async)");
					return this.setAppSettingsAsync();
				}
				return appSettings;
			});
	}

	private sendMessage(message: SettingMessage): PromiseLike<AppSettings> {
		return new Promise((resolve, reject) => {
			chrome.runtime.sendMessage(message, (appSettings: AppSettings) => {
				this.debug("Received message with app settings: " + JSON.stringify(appSettings));
				resolve(appSettings);
			});
		});
	}

	private info(msg: string): void {
		this.log.info(this.thisModule, msg);
	}
	private debug(msg: string): void {
		this.log.debug(this.thisModule, msg);
	}
	private warn(msg: string): void {
		this.log.warn(this.thisModule, msg);
	}


	// overwrite obj1 with content of same properties of obj2
	private synchroniseObjects(obj1: any, obj2: any): any {
		this.info("syncObjects(): started");

		if (obj1 === undefined || obj1 === null) {
			this.warn("syncObjects(): obj1 is undefined or null");
			return;
		}
		if (obj2 === undefined || obj2 === null) {
			this.warn("syncObjects(): obj2 is undefined or null");
			return;
		}

		var propNames1 = Object.getOwnPropertyNames(obj1);
		propNames1.forEach((propName) => {
			var propNames2 = Object.getOwnPropertyNames(obj2);
			if (propNames2.some(prop => {
				var prop1Type = typeof (obj1[propName]);
				var prop2Type = typeof (obj2[propName]);
				return (prop === propName) && (prop1Type === prop2Type);
			})) {
				var prop1Value = obj1[propName];
				var prop2Value = obj2[propName];
				var propType = typeof (prop1Value);
				if (propType === "object") {
					this.synchroniseObjects(prop1Value, prop2Value);
				} else {
					this.debug(propName + ": " + propType + ": " + prop1Value + ": " + prop2Value);
					obj1[propName] = prop2Value;
				}
			}
		});
	}
}
