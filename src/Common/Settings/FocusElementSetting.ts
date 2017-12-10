import { IRessource, Ressource } from "../Ressource";

export interface IFocusElementSetting {
  focusElement(): Boolean;
  changeFocusElementStatus(status: Boolean): void;
  xPathToElement(): string;
  ressourceOfElement(): IRessource;
  fromJson(jsonString: String): IFocusElementSetting;
}

export class FocusElementSetting implements IFocusElementSetting {
  private focus: Boolean;
  private readonly xPath: string;
  private readonly ressource: IRessource;

  constructor(
    focusElement: Boolean,
    xPath: string,
    ressource: IRessource
  ) {
    this.focus = focusElement;
    this.xPath = xPath;
    this.ressource = ressource;
  }

  public focusElement(): Boolean {
    return this.focus;
  }
  public changeFocusElementStatus(status: Boolean): void {
    this.focus = status;
  }
  public xPathToElement(): string {
    return this.xPath;
  }
  public ressourceOfElement(): IRessource {
    return this.ressource;
  }
  public fromJson(jsonString: String): FocusElementSetting {
    return new FocusElementSetting(
      jsonString["focus"],
      jsonString["xPath"],
      this.ressource.fromJson(jsonString["ressource"])
    )
  }
}
