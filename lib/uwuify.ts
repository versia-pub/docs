import Uwuifier from "uwuifier";

const uwuifier = new Uwuifier();

const getAllDOMTextNodes = (): Node[] => {
    const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        null,
    );

    const nodes: Node[] = [];

    while (true) {
        const newNode = walker.nextNode();

        if (!newNode) {
            break;
        }

        nodes.push(newNode);
    }

    return nodes;
};

export const uwuifyDocument = (): void => {
    const textNodes = getAllDOMTextNodes();

    for (const node of textNodes) {
        if (node.nodeValue) {
            const newText = uwuifier.uwuifySentence(node.nodeValue);
            node.nodeValue = newText;
        }
    }
};
