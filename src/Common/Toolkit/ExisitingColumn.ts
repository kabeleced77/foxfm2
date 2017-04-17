import { IXPathString, IXPathInformation } from "./XPathString"

export interface IExistingColumn {
  xPath(): IXPathString;
  additionalInformationActivated(): Boolean;
  activateAdditionalInformation(status: Boolean): void;
  fromJson(jsonString: String): IExistingColumn;
}

export interface IExistingColumn2 {
  xPath(): IXPathInformation;
  additionalInformationActivated(): Boolean;
  activateAdditionalInformation(status: Boolean): void;
  fromJson(jsonString: String): IExistingColumn;
}
