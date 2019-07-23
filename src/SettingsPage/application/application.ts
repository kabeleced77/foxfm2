import { RessourceSettingsPageIntro } from "../../Common/Ressource"

export class Application {
  public heading: String;

  constructor() {
    this.heading = new RessourceSettingsPageIntro().value().valueOf();
  }
}
