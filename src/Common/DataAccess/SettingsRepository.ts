import {LoggerInterface, LogLevel} from "../CrossCutting/Logger/LoggerInterface"
import {AppSettings} from "../CrossCutting/Settings/AppSettings"
import {SettingMessage, SettingAction} from "../CrossCutting/Messageing/SettingMessage"
import {SettingsRepositoryInterface} from "./SettingsRepositoryInterface"

export class SettingsRepository implements SettingsRepositoryInterface {
	private log: LoggerInterface;
	private thisModule: string = "SettingsRepository";
	private appSettings: AppSettings;
	private appSettingsKey: string = "AppSettings";

	constructor(logger: LoggerInterface) {
		this.log = logger;
		this.getSettingListener();
	}

	/*
		private updateSettings(): void {
			this.log.debug(this.thisModule, "update appSettings: " + JSON.stringify(this.appSettings));
			var item = { "foxfm": this.appSettings };
			chrome.storage.local.get(this.appSettingsKey, (items: any) => {
				if (items !== null && items !== undefined) {
					var appSettings = items.foxfm2;
					if (appSettings !== null && appSettings !== undefined) {
						this.log.debug(this.thisModule, "received '" + this.appSettingsKey + "' items: " + JSON.stringify(items.foxfm));
						chrome.storage.local.set(item, () => {
							this.log.debug(this.thisModule, "setting updated");
							this.loadAppSettings();
						});
					} else {
						this.error("Could not retrieve app settings.");
					}
				} else {
					this.error("Could not retrieve items from chrome.storage: " + chrome.runtime.lastError);
				}
			});
		}
		*/

	public saveAppSettings(as: AppSettings): void {
		var obj: any = {};
		obj[this.appSettingsKey] = as;
		chrome.storage.local.set(obj, () => {
			this.debug("Saved application settings into chrome.storage:" + JSON.stringify(obj));
		});
	}

	public loadAppSettings(callback: (appSettings: AppSettings) => void): void {
		this.debug("Load application settings from chrome.storage.");
		chrome.storage.local.get(this.appSettingsKey, (items: any) => {
			this.debug("items: " + JSON.stringify(items));
			this.appSettings = items.AppSettings;
			this.debug("AppSettings: " + JSON.stringify(this.appSettings));
			callback(this.appSettings);
		});
	}


	public loadAppSettingsAsync(): PromiseLike<AppSettings> {
		var settings: AppSettings;
		return this.getFromStorage(this.appSettingsKey)
			.then((appSettings: AppSettings) => {
				this.debug("AppSettings in promise:" + JSON.stringify(appSettings));
				return appSettings;
			});
		// return settings;
	}

	private getFromStorage(key: string): PromiseLike<AppSettings> {
		return new Promise((resolve, reject) => {
			chrome.storage.local.get(key, (items: any) => {
				this.debug("items: " + JSON.stringify(items));
				this.appSettings = items.AppSettings;
				this.debug("AppSettings: " + JSON.stringify(this.appSettings));
				resolve(this.appSettings);
			});
		});
	}

	public getSettingListener(): any {
		this.info("Start listener.");
		chrome.runtime.onMessage.addListener((message: SettingMessage, sender: any, sendResponse: any) => {
			this.debug("Received message: " + JSON.stringify(message));
			if (message.settingAction === SettingAction.Load) {
				this.debug("Will load app settings from chrome.storage.");
				chrome.storage.local.get(message.settingKey, (items) => {
					var setting = items[message.settingKey];
					sendResponse(setting);
					this.debug("Load response has been sent: " + JSON.stringify(setting));
				});
			} else if (message.settingAction === SettingAction.Save) {
				var appSettings = message.appSettings;
				this.debug("Will save app settings to chrome.storage: app settings: " + JSON.stringify(appSettings));
				var obj: any = {};
				obj[this.appSettingsKey] = appSettings;
				chrome.storage.local.set(obj, () => {
					sendResponse(appSettings);
					this.debug("Save response has been sent: " + JSON.stringify(appSettings));
				});
			} else {
				var msgResponse = "Wrong message action!";
				sendResponse(msgResponse);
				this.error(msgResponse);
			}
			return true; // <-- Required if you want to use sendResponse asynchronously!
		});
	}

	info(msg: string): void {
		this.log.info(this.thisModule, msg);
	}

	debug(msg: string): void {
		this.log.debug(this.thisModule, msg);
	}

	error(msg: string): void {
		this.log.error(this.thisModule, msg);
	}
}
