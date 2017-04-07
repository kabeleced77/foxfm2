import { IExistingColumn } from "./Toolkit/ExisitingColumn"
import { IXPathString } from "./Toolkit/XPathString"

export class AwpColumn implements IExistingColumn {
  private columnXPath: IXPathString;
  private additionalInformationStatus: Boolean;

  constructor(
    xPath: IXPathString,
    additionalInformationStatus: Boolean
  ) {
    this.columnXPath = xPath;
    this.additionalInformationStatus = additionalInformationStatus;
  }

  public xPath(): IXPathString {
    return this.columnXPath;
  }
  public additionalInformationActivated(): Boolean {
    return this.additionalInformationStatus;
  }
  public activateAdditionalInformation(status: Boolean): void {
    this.additionalInformationStatus = status;
  }
  public fromJson(jsonString: String): IExistingColumn {
    return new AwpColumn(
      this.columnXPath.fromJson(jsonString["columnXPath"]),
      jsonString["additionalInformationStatus"]
    );
  }
}
