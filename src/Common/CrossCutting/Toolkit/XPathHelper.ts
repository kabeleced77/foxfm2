/**
 * XPathHelper
 */
class XPathHelper {
    public static getXpathResult(xpath: string): XPathResult {
        var xpathresult: XPathResult;
        try {
            if (document && xpath) {
                xpathresult = document.evaluate(xpath, document.documentElement, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
            }
        } catch (e) {
            console.error(e);
        }
        return xpathresult;
    }
    public static getTableByXpath(xpath: string): HTMLTableElement {
        var table: HTMLTableElement;
        try {
            if (xpath !== null && xpath.length > 0) {
                var xpathresult = this.getXpathResult(xpath);
                if (xpathresult && xpathresult.snapshotLength == 1) {
                    table = <HTMLTableElement>this.get1stOccurenceOfParentNode(xpathresult.snapshotItem(0), 'table');
                }
            }
        } catch (e) {
            console.error(e);
        }
        return table;
    }
    public static getColumnNumberByXPATH(document: Document, xpath: string): number {
        var columnNumber: number;
        try {
            var xpathresult = document.evaluate(xpath, document.documentElement, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
            if (xpathresult && xpathresult.snapshotLength == 1) {
                var parentCell = <HTMLTableCellElement>this.get1stOccurenceOfParentNode(xpathresult.snapshotItem(0), 'td');
                columnNumber = parentCell.cellIndex;
            }
        } catch (e) {
            console.error(e);
        }
        return columnNumber;
    }
    public static getRowNumberByXPATH(document: Document, xpath: string): number {
        var rowNumber: number;
        try {
            var xpathresult = document.evaluate(xpath, document.documentElement, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
            if (xpathresult && xpathresult.snapshotLength == 1) {
                var parentCell = <HTMLTableRowElement>this.get1stOccurenceOfParentNode(xpathresult.snapshotItem(0), 'tr');
                rowNumber = parentCell.rowIndex;
            }
        } catch (e) {
            console.error(e);
        }
        return rowNumber;
    }
    private static get1stOccurenceOfParentNode(node: Node, parentTagName: string): Node {
        var parentNode: Node;
        try {
            if (node && node.parentNode) {
                var parent = node.parentNode;
                do {
                    if (parent.nodeName.toUpperCase() == parentTagName.toUpperCase()) {
                        parentNode = parent;
                    }
                    if (parent.parentNode) {
                        parent = parent.parentNode;
                    } else {
                        break;
                    }
                } while (!parentNode);
            }
        } catch (e) {
            console.error(e);
        }
        return parentNode;
    }
}