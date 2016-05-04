/// <reference path="../_all.ts" />

"use strict";

interface SettingsManagerInterface {
    appSettings: AppSettings;
    //	getSetting(key: string): any;
    saveAppSettingsMessaging(appSettings: AppSettings): void;
    loadAppSettingsMessaging(callback: (appSettings: AppSettings) => void): void;

    getAppSettingsAsync(): PromiseLike<AppSettings>;
    getCategoriesAsync(): PromiseLike<string[]>;
}
