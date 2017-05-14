import { IXPathString } from "./XPathString"

export interface IExtendExistingColumn {
  xPath(): IXPathString;
  additionalInformationActivated(): Boolean;
  activateAdditionalInformation(status: Boolean): void;
  fromJson(jsonString: String): IExtendExistingColumn;
}
