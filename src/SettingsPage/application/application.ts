import { RessourceSettingsPageApplicationHeader } from "../../Common/Ressource"

export class Application {
  constructor(
    // get all resources needed for the HTML view
    public heading: String = new RessourceSettingsPageApplicationHeader().value().valueOf(),
  ) { }
}
