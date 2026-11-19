export interface IElementPicker {
  /** resolves with the clicked element or with null if the picking has been cancelled */
  pick(): Promise<Element | null>;
  cancel(): void;
}

/** events which are swallowed while picking, so the page does not react on the clicks */
const blockedEvents = ["mousedown", "mouseup", "pointerdown", "pointerup", "dblclick", "auxclick"];

/**
 * Lets the user pick an element of the web page: the element below the mouse
 * pointer is highlighted, a click chooses it and Esc cancels the picking.
 */
export class ElementPicker implements IElementPicker {
  private overlay: HTMLDivElement | null = null;
  private hovered: Element | null = null;
  private finish: ((element: Element | null) => void) | null = null;

  constructor(private readonly doc: Document) { }

  public pick(): Promise<Element | null> {
    this.cancel();
    return new Promise((resolve) => {
      this.finish = resolve;
      this.overlay = this.createOverlay();
      this.doc.documentElement.appendChild(this.overlay);
      blockedEvents.forEach((type) => this.doc.addEventListener(type, this.onBlocked, true));
      this.doc.addEventListener("click", this.onClick, true);
      this.doc.addEventListener("mouseover", this.onMouseOver, true);
      this.doc.addEventListener("keydown", this.onKeyDown, true);
      this.doc.defaultView?.addEventListener("scroll", this.onViewChanged, true);
      this.doc.defaultView?.addEventListener("resize", this.onViewChanged, true);
    });
  }

  public cancel(): void {
    this.complete(null);
  }

  private complete(element: Element | null): void {
    const finish = this.finish;
    this.finish = null;
    this.teardown();
    if (finish) finish(element);
  }

  private teardown(): void {
    blockedEvents.forEach((type) => this.doc.removeEventListener(type, this.onBlocked, true));
    this.doc.removeEventListener("click", this.onClick, true);
    this.doc.removeEventListener("mouseover", this.onMouseOver, true);
    this.doc.removeEventListener("keydown", this.onKeyDown, true);
    this.doc.defaultView?.removeEventListener("scroll", this.onViewChanged, true);
    this.doc.defaultView?.removeEventListener("resize", this.onViewChanged, true);
    this.overlay?.remove();
    this.overlay = null;
    this.hovered = null;
  }

  private readonly onBlocked = (event: Event): void => {
    event.preventDefault();
    event.stopImmediatePropagation();
  };

  private readonly onClick = (event: Event): void => {
    this.onBlocked(event);
    this.complete(event.target instanceof Element ? event.target : null);
  };

  private readonly onMouseOver = (event: Event): void => {
    if (event.target instanceof Element) {
      this.hovered = event.target;
      this.updateOverlay();
    }
  };

  private readonly onKeyDown = (event: KeyboardEvent): void => {
    if (event.key === "Escape") {
      this.onBlocked(event);
      this.complete(null);
    }
  };

  private readonly onViewChanged = (): void => this.updateOverlay();

  private updateOverlay(): void {
    if (!this.overlay || !this.hovered) return;
    const rect = this.hovered.getBoundingClientRect();
    this.overlay.style.left = `${rect.left}px`;
    this.overlay.style.top = `${rect.top}px`;
    this.overlay.style.width = `${rect.width}px`;
    this.overlay.style.height = `${rect.height}px`;
    this.overlay.style.display = "block";
  }

  private createOverlay(): HTMLDivElement {
    const overlay = this.doc.createElement("div");
    overlay.setAttribute("data-foxfm-element-picker", "true");
    overlay.style.cssText =
      "position:fixed;z-index:2147483647;pointer-events:none;box-sizing:border-box;" +
      "border:2px solid #f44336;background:rgba(244,67,54,0.15);display:none;";
    return overlay;
  }
}
