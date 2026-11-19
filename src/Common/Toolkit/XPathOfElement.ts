import { IValue } from "./IValue";

/**
 * Creates an XPath string identifying the given element within its document.
 *
 * Preference: unique id, then unique name attribute, then a path of
 * indexed tag names starting at the nearest ancestor having a unique id.
 */
export class XPathOfElement implements IValue<string> {
  constructor(
    private readonly doc: Document,
    private readonly element: Element,
  ) { }

  public value(): string {
    const candidates: string[] = [];
    const id = this.element.getAttribute("id");
    const idLiteral = id ? this.literal(id) : null;
    if (idLiteral) candidates.push(`//*[@id=${idLiteral}]`);
    const name = this.element.getAttribute("name");
    const nameLiteral = name ? this.literal(name) : null;
    if (nameLiteral) candidates.push(`//${this.element.localName}[@name=${nameLiteral}]`);

    const unique = candidates.find((candidate) => this.identifies(candidate, this.element));
    return unique ?? this.pathTo(this.element);
  }

  private pathTo(element: Element): string {
    const segments: string[] = [];
    let node: Element | null = element;
    while (node) {
      if (node !== element) {
        const id = node.getAttribute("id");
        const idLiteral = id ? this.literal(id) : null;
        const anchor = idLiteral ? `//*[@id=${idLiteral}]` : null;
        if (anchor && this.identifies(anchor, node)) {
          return `${anchor}/${segments.join("/")}`;
        }
      }
      segments.unshift(`${node.localName}[${this.position(node)}]`);
      node = node.parentElement;
    }
    return `/${segments.join("/")}`;
  }

  /** position of the element among its siblings having the same tag name (starting at 1) */
  private position(element: Element): number {
    let position = 1;
    for (let s = element.previousElementSibling; s; s = s.previousElementSibling) {
      if (s.localName === element.localName) position++;
    }
    return position;
  }

  private identifies(xPath: string, element: Element): boolean {
    try {
      const result = this.doc.evaluate(
        xPath,
        this.doc,
        null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null,
      );
      return result.snapshotLength === 1 && result.snapshotItem(0) === element;
    } catch {
      return false;
    }
  }

  /** XPath string literal; null if the text contains both kinds of quotes */
  private literal(text: string): string | null {
    if (!text.includes('"')) return `"${text}"`;
    if (!text.includes("'")) return `'${text}'`;
    return null;
  }
}
