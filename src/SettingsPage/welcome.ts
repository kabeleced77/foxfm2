import { RessourceSettingsPageIntro } from "../Common/Ressource"

export class Welcome {
  public heading: String;

  constructor() {
    this.heading = new RessourceSettingsPageIntro().value().valueOf();
  }
}
