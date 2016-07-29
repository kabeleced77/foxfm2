class SettingMessage {
	public settingKey: string;
	public settingAction: SettingAction;
	public appSettings: AppSettings;
}	

enum SettingAction { Load, Save };
