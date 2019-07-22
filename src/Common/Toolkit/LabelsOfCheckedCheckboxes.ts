import { IValues } from "./Values";
import { IXPathAllResults } from "./XPathAllResults";

export class LabelsOfCheckedCheckboxes implements IValues<String> {
  constructor(
    private readonly mcXPathAllResults: IXPathAllResults,
  ) { }

  public values(): String[] {
    return this.mcXPathAllResults
      .allNodes()
      .filter((checkbox: HTMLInputElement) => true
        && checkbox.checked
        && checkbox.parentNode
        && checkbox.parentNode.textContent)
      .map(checkbox => checkbox.parentNode!.textContent!.trim());
  }
}
