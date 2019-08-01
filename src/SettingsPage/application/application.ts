import { RessourceSettingsPageApplicationHeader, RessourceCommonButtonApply, RessourceSettingsPageApplicationImportTransfers } from "../../Common/Ressource"
import { IFoxfmSetting, FoxfmSetting } from "../../Common/Settings/FoxfmSetting";
import { StorageLocal } from "../../Common/Toolkit/StorageLocal";
import { FoxfmSettingName } from "../../Common/Settings/FoxfmSettingName";
import { ISetting } from "../../Common/Toolkit/Setting";

export class Application {
  private moFoxfmSetting: ISetting<IFoxfmSetting>;

  public heading: String;
  public ressourceButtonApply: String;
  public ressourceImportTransfers: String;

  public importTransfersActivated: Boolean;

  constructor() {
    // get the settings displayed on the HTML view
    this.moFoxfmSetting = new StorageLocal<IFoxfmSetting>(
      new FoxfmSettingName(),
      new FoxfmSetting(
        false,
      ),
    );
    this.moFoxfmSetting.value().then(v => {
      this.importTransfersActivated = v.importTransfers();
    });

    // get all resources needed for the HTML view
    this.heading = new RessourceSettingsPageApplicationHeader().value().valueOf();
    this.ressourceButtonApply = new RessourceCommonButtonApply().value();
    this.ressourceImportTransfers = new RessourceSettingsPageApplicationImportTransfers().value();
  }

  public submit() {
    this.moFoxfmSetting.save(
      new FoxfmSetting(
        this.importTransfersActivated,
      )
    )
  }
}
