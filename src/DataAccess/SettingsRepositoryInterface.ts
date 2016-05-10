/// <reference path="../allReferences.ts" />

"use strict";

interface SettingsRepositoryInterface {
//	getSetting(key: string): any;
	saveAppSettings(appSettings: AppSettings): void;
	loadAppSettings(callback: (appSettings: AppSettings) => void): void;
	loadAppSettingsAsync(): PromiseLike<AppSettings>;
}
