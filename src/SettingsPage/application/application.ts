import { RessourceSettingsPageApplicationHeader, RessourceCommonButtonApply, RessourceSettingsPageApplicationScrape } from "../../Common/Ressource"
import { IFoxfmSetting, FoxfmSetting } from "../../Common/Settings/FoxfmSetting";
import { StorageLocal } from "../../Common/Toolkit/StorageLocal";
import { FoxfmSettingName } from "../../Common/Settings/FoxfmSettingName";
import { ISetting } from "../../Common/Toolkit/Setting";

export class Application {
  private moFoxfmSetting: ISetting<IFoxfmSetting>;

  public heading: String;
  public ressourceButtonApply: String;
  public ressourceScrape: String;

  public scrapingActivated: Boolean;

  constructor() {
    // get the settings displayed on the HTML view
    this.moFoxfmSetting = new StorageLocal<IFoxfmSetting>(
      new FoxfmSettingName(),
      new FoxfmSetting(false),
    );
    this.moFoxfmSetting.value().then(v => this.scrapingActivated = v.scrape());

    // get all resources needed for the HTML view
    this.heading = new RessourceSettingsPageApplicationHeader().value().valueOf();
    this.ressourceButtonApply = new RessourceCommonButtonApply().value();
    this.ressourceScrape = new RessourceSettingsPageApplicationScrape().value();
  }

  public submit() {
    this.moFoxfmSetting.save(
      new FoxfmSetting(
        this.scrapingActivated,
      )
    )
  }
}
