/// <reference path="../allReferences.ts" />

"use strict";

interface SettingsManagerInterface {
    appSettings: AppSettings;
    //	getSetting(key: string): any;
    saveAppSettingsMessaging(appSettings: AppSettings): void;
    loadAppSettingsMessaging(callback: (appSettings: AppSettings) => void): void;
    setAppSettingsAsync(): PromiseLike<AppSettings>;
    getOrSetAppSettingsAsync(): PromiseLike<AppSettings>;
    getCategoriesAsync(): PromiseLike<string[]>;
    getSettingsByCategoryAsync(category: string): PromiseLike<Object>;
}
