/// <reference path="../../typings/main.d.ts" />
/// <reference path="../CrossCutting/Logger/LoggerInterface.ts" />
/// <reference path="../CrossCutting/Messageing/SettingMessage.ts" />

class SettingsManager {
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

	private info(msg: string): void {
		this.log.info(this.thisModule, msg);
	}
	private debug(msg: string): void {
		this.log.debug(this.thisModule, msg);
	}

	// overwrite obj1 with content of same properties of obj2
	private synchroniseObjects(obj1: any, obj2: any): any {
		this.info("syncObjects(): started");

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