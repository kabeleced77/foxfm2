import { IXPathString } from "./XPathString"

export interface IExistingColumn {
  xPath(): IXPathString;
  additionalInformationActivated(): Boolean;
  activateAdditionalInformation(status: Boolean): void;
  fromJson(jsonString: String): IExistingColumn;
}
