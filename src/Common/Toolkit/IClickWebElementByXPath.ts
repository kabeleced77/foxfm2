import { IClickWebElement } from "./IClickWebElement";

export interface IClickWebElementXPath extends IClickWebElement {
  xPath(): String;
}
