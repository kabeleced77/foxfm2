import { RessourceSettingsPageApplicationHeader } from "../../Common/Ressource"

export class Application {
  public heading: String;

  constructor() {
    this.heading = new RessourceSettingsPageApplicationHeader().value().valueOf();
  }
}
