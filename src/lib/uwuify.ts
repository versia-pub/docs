import Uwuifier from "uwuifier";

const uwuifier = new Uwuifier();

export const uwuifyDocument = (): void => {
    const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        {
            // Inline styles and scripts are text nodes too, and they must keep working.
            acceptNode: (node) =>
                node.parentElement?.closest("script, style")
                    ? NodeFilter.FILTER_REJECT
                    : NodeFilter.FILTER_ACCEPT,
        },
    );

    while (walker.nextNode()) {
        const node = walker.currentNode;
        if (node.nodeValue?.trim()) {
            node.nodeValue = uwuifier.uwuifySentence(node.nodeValue);
        }
    }
};
