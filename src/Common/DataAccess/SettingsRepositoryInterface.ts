import {AppSettings} from "../CrossCutting/Settings/AppSettings"

"use strict";

export interface SettingsRepositoryInterface {
//	getSetting(key: string): any;
	saveAppSettings(appSettings: AppSettings): void;
	loadAppSettings(callback: (appSettings: AppSettings) => void): void;
	loadAppSettingsAsync(): PromiseLike<AppSettings>;
}
