import Uwuifier from "uwuifier";

const uwuifier = new Uwuifier();

// Comic Neue, from Fontsource, is in public/fonts. It is added from here rather
// than with CSS so that pages do not carry its @font-face rules.
const addFont = (): void => {
    const faces = [
        ["400-normal", "normal", "400"],
        ["400-italic", "italic", "400"],
        ["700-normal", "normal", "700"],
        ["700-italic", "italic", "700"],
    ];
    for (const [file, style, weight] of faces) {
        const url = `/fonts/comic-neue/comic-neue-latin-${file}.woff2`;
        document.fonts.add(
            new FontFace("Comic Neue", `url(${url}) format("woff2")`, {
                style,
                weight,
                display: "swap",
            }),
        );
    }
};

export const uwuifyDocument = (): void => {
    // Uwuifying text that is already uwuified mangles it further, so run once.
    const root = document.documentElement;
    if (root.dataset.uwu !== undefined) {
        return;
    }
    root.dataset.uwu = "";

    addFont();
    root.style.setProperty(
        "--font-prose",
        '"Comic Neue", "Comic Sans MS", cursive',
    );

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
