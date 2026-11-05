// Keys are pink and values use the companion colour, the same as field names and enum values
// on the sheets. Everything else stays in the text colour. `key` and `value` match `--accent`
// and `--value` in `tokens.css`, since Shiki needs literal colours.
interface Palette {
    text: string;
    comment: string;
    key: string;
    value: string;
    punctuation: string;
}

const theme = (name: string, type: "light" | "dark", c: Palette) => ({
    name,
    type,
    colors: { "editor.background": "#00000000", "editor.foreground": c.text },
    tokenColors: [
        {
            scope: ["comment", "punctuation.definition.comment"],
            settings: { foreground: c.comment },
        },
        {
            scope: [
                "string",
                "string.quoted",
                "constant.numeric",
                "constant.language",
                "constant.character",
            ],
            settings: { foreground: c.value },
        },
        {
            scope: ["support.type.property-name", "meta.object-literal.key"],
            settings: { foreground: c.key },
        },
        {
            scope: ["punctuation", "meta.brace"],
            settings: { foreground: c.punctuation },
        },
    ],
});

export const codeThemeLight = theme("versia-light", "light", {
    text: "#1a1a1a",
    comment: "#6e6e6e",
    key: "#b5175a",
    value: "#0b6f66",
    punctuation: "#6e6e6e",
});

export const codeThemeDark = theme("versia-dark", "dark", {
    text: "#f2f2f2",
    comment: "#949494",
    key: "#ff5fa8",
    value: "#4fd1c0",
    punctuation: "#949494",
});
