export default function typographyStyles() {
    return {
        DEFAULT: {
            css: {
                "--tw-prose-body": "var(--color-zinc-700)",
                "--tw-prose-headings": "var(--color-zinc-900)",
                "--tw-prose-links": "var(--color-brand-500)",
                "--tw-prose-links-hover": "var(--color-brand-600)",
                "--tw-prose-links-underline":
                    "color-mix(in oklab, var(--color-brand-500) 30%, transparent)",
                "--tw-prose-bold": "var(--color-zinc-900)",
                "--tw-prose-counters": "var(--color-zinc-500)",
                "--tw-prose-bullets": "var(--color-zinc-300)",
                "--tw-prose-hr":
                    "color-mix(in oklab, var(--color-zinc-900) 5%, transparent)",
                "--tw-prose-quotes": "var(--color-zinc-900)",
                "--tw-prose-quote-borders": "var(--color-zinc-200)",
                "--tw-prose-captions": "var(--color-zinc-500)",
                "--tw-prose-code": "var(--color-zinc-900)",
                "--tw-prose-code-bg": "var(--color-zinc-100)",
                "--tw-prose-code-ring": "var(--color-zinc-300)",
                "--tw-prose-th-borders": "var(--color-zinc-300)",
                "--tw-prose-td-borders": "var(--color-zinc-200)",

                "--tw-prose-invert-body": "var(--color-zinc-400)",
                "--tw-prose-invert-headings": "var(--color-white)",
                "--tw-prose-invert-links": "var(--color-brand-400)",
                "--tw-prose-invert-links-hover": "var(--color-brand-500)",
                "--tw-prose-invert-links-underline":
                    "color-mix(in oklab, var(--color-brand-500) 30%, transparent)",
                "--tw-prose-invert-bold": "var(--color-white)",
                "--tw-prose-invert-counters": "var(--color-zinc-400)",
                "--tw-prose-invert-bullets": "var(--color-zinc-600)",
                "--tw-prose-invert-hr":
                    "color-mix(in oklab, var(--color-white) 5%, transparent)",
                "--tw-prose-invert-quotes": "var(--color-zinc-100)",
                "--tw-prose-invert-quote-borders": "var(--color-zinc-700)",
                "--tw-prose-invert-captions": "var(--color-zinc-400)",
                "--tw-prose-invert-code": "var(--color-white)",
                "--tw-prose-invert-code-bg":
                    "color-mix(in oklab, var(--color-zinc-700) 15%, transparent)",
                "--tw-prose-invert-code-ring":
                    "color-mix(in oklab, var(--color-white) 10%, transparent)",
                "--tw-prose-invert-th-borders": "var(--color-zinc-600)",
                "--tw-prose-invert-td-borders": "var(--color-zinc-700)",

                // Base
                color: "var(--tw-prose-body)",
                fontSize: "var(--text-base)",
                lineHeight: "--spacing(8)",

                // Text
                p: {
                    marginTop: "--spacing(8)",
                    marginBottom: "--spacing(8)",
                },
                '[class~="lead"]': {
                    fontSize: "var(--text-base)",
                    lineHeight: "var(--text-base--line-height)",
                },

                // Lists
                ol: {
                    listStyleType: "decimal",
                    marginTop: "--spacing(5)",
                    marginBottom: "--spacing(5)",
                    paddingLeft: "1.625rem",
                },
                'ol[type="A"]': {
                    listStyleType: "upper-alpha",
                },
                'ol[type="a"]': {
                    listStyleType: "lower-alpha",
                },
                'ol[type="A" s]': {
                    listStyleType: "upper-alpha",
                },
                'ol[type="a" s]': {
                    listStyleType: "lower-alpha",
                },
                'ol[type="I"]': {
                    listStyleType: "upper-roman",
                },
                'ol[type="i"]': {
                    listStyleType: "lower-roman",
                },
                'ol[type="I" s]': {
                    listStyleType: "upper-roman",
                },
                'ol[type="i" s]': {
                    listStyleType: "lower-roman",
                },
                'ol[type="1"]': {
                    listStyleType: "decimal",
                },
                ul: {
                    listStyleType: "disc",
                    marginTop: "--spacing(5)",
                    marginBottom: "--spacing(5)",
                    paddingLeft: "1.625rem",
                },
                li: {
                    marginTop: "--spacing(2)",
                    marginBottom: "--spacing(2)",
                },
                ":is(ol, ul) > li": {
                    paddingLeft: "--spacing(1.5)",
                },
                "ol > li::marker": {
                    fontWeight: "400",
                    color: "var(--tw-prose-counters)",
                },
                "ul > li::marker": {
                    color: "var(--tw-prose-bullets)",
                },
                "> ul > li p": {
                    marginTop: "--spacing(3)",
                    marginBottom: "--spacing(3)",
                },
                "> ul > li > *:first-child": {
                    marginTop: "--spacing(5)",
                },
                "> ul > li > *:last-child": {
                    marginBottom: "--spacing(5)",
                },
                "> ol > li > *:first-child": {
                    marginTop: "--spacing(5)",
                },
                "> ol > li > *:last-child": {
                    marginBottom: "--spacing(5)",
                },
                "ul ul, ul ol, ol ul, ol ol": {
                    marginTop: "--spacing(3)",
                    marginBottom: "--spacing(3)",
                },

                // Horizontal rules
                hr: {
                    borderColor: "var(--tw-prose-hr)",
                    borderTopWidth: 1,
                    marginTop: "--spacing(16)",
                    marginBottom: "--spacing(16)",
                    maxWidth: "none",
                    marginLeft: "--spacing(-4)",
                    marginRight: "--spacing(-4)",
                    "@screen sm": {
                        marginLeft: "--spacing(-6)",
                        marginRight: "--spacing(-6)",
                    },
                    "@screen lg": {
                        marginLeft: "--spacing(-8)",
                        marginRight: "--spacing(-8)",
                    },
                },

                // Quotes
                blockquote: {
                    fontWeight: "500",
                    fontStyle: "italic",
                    color: "var(--tw-prose-quotes)",
                    borderLeftWidth: "0.25rem",
                    borderLeftColor: "var(--tw-prose-quote-borders)",
                    quotes: '"\\201C""\\201D""\\2018""\\2019"',
                    marginTop: "--spacing(8)",
                    marginBottom: "--spacing(8)",
                    paddingLeft: "--spacing(5)",
                },
                "blockquote p:first-of-type::before": {
                    content: "open-quote",
                },
                "blockquote p:last-of-type::after": {
                    content: "close-quote",
                },

                // Headings
                h1: {
                    color: "var(--tw-prose-headings)",
                    fontWeight: "700",
                    fontSize: "var(--text-4xl)",
                    lineHeight: "var(--text-4xl--line-height)",
                    marginBottom: "--spacing(6)",
                },
                h2: {
                    color: "var(--tw-prose-headings)",
                    fontWeight: "600",
                    fontSize: "var(--text-2xl)",
                    lineHeight: "var(--text-2xl--line-height)",
                    marginTop: "--spacing(16)",
                    marginBottom: "--spacing(8)",
                },
                h3: {
                    color: "var(--tw-prose-headings)",
                    fontSize: "var(--text-lg)",
                    lineHeight: "var(--text-lg--line-height)",
                    fontWeight: "600",
                    marginTop: "--spacing(10)",
                    marginBottom: "--spacing(2)",
                },

                // Media
                "img, video, figure": {
                    marginTop: "--spacing(8)",
                    marginBottom: "--spacing(8)",
                },
                "figure > *": {
                    marginTop: "0",
                    marginBottom: "0",
                },
                figcaption: {
                    color: "var(--tw-prose-captions)",
                    fontSize: "var(--text-sm)",
                    lineHeight: "var(--text-sm--line-height)",
                    marginTop: "--spacing(2)",
                },

                // Tables
                table: {
                    width: "100%",
                    tableLayout: "auto",
                    textAlign: "left",
                    marginTop: "--spacing(8)",
                    marginBottom: "--spacing(8)",
                    lineHeight: "--spacing(8)",
                },
                thead: {
                    borderBottomWidth: "1px",
                    borderBottomColor: "var(--tw-prose-th-borders)",
                },
                "thead th": {
                    color: "var(--tw-prose-headings)",
                    fontWeight: "600",
                    verticalAlign: "bottom",
                    paddingRight: "--spacing(2)",
                    paddingBottom: "--spacing(2)",
                    paddingLeft: "--spacing(2)",
                },
                "thead th:first-child": {
                    paddingLeft: "0",
                },
                "thead th:last-child": {
                    paddingRight: "0",
                },
                "tbody tr": {
                    borderBottomWidth: "1px",
                    borderBottomColor: "var(--tw-prose-td-borders)",
                },
                "tbody tr:last-child": {
                    borderBottomWidth: "0",
                },
                "tbody td": {
                    verticalAlign: "baseline",
                },
                tfoot: {
                    borderTopWidth: "1px",
                    borderTopColor: "var(--tw-prose-th-borders)",
                },
                "tfoot td": {
                    verticalAlign: "top",
                },
                ":is(tbody, tfoot) td": {
                    paddingTop: "--spacing(2)",
                    paddingRight: "--spacing(2)",
                    paddingBottom: "--spacing(2)",
                    paddingLeft: "--spacing(2)",
                },
                ":is(tbody, tfoot) td:first-child": {
                    paddingLeft: "0",
                },
                ":is(tbody, tfoot) td:last-child": {
                    paddingRight: "0",
                },

                // Inline elements
                a: {
                    color: "var(--tw-prose-links)",
                    textDecoration: "underline transparent",
                    fontWeight: "500",
                    transitionProperty: "color, text-decoration-color",
                    transitionDuration: "0.15s",
                    transitionTimingFunction: "var(--ease-in-out)",
                    "&:hover": {
                        color: "var(--tw-prose-links-hover)",
                        textDecorationColor: "var(--tw-prose-links-underline)",
                    },
                },
                ":is(h1, h2, h3) a": {
                    fontWeight: "inherit",
                },
                strong: {
                    color: "var(--tw-prose-bold)",
                    fontWeight: "600",
                },
                ":is(a, blockquote, thead th) strong": {
                    color: "inherit",
                },
                code: {
                    color: "var(--tw-prose-code)",
                    borderRadius: "var(--radius-lg)",
                    paddingTop: "--spacing(1.5)",
                    paddingRight: "--spacing(1.5)",
                    paddingBottom: "--spacing(1)",
                    paddingLeft: "--spacing(1.5)",
                    boxShadow: "inset 0 0 0 1px var(--tw-prose-code-ring)",
                    backgroundColor: "var(--tw-prose-code-bg)",
                    // If gets too long, split into multiple lines
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-all",
                    fontSize: "var(--text-xs)",
                },
                ":is(a, h1, h2, h3, blockquote, thead th) code": {
                    color: "inherit",
                },
                "h2 code": {
                    fontSize: "var(--text-base)",
                    fontWeight: "inherit",
                },
                "h3 code": {
                    fontSize: "var(--text-sm)",
                    fontWeight: "inherit",
                },

                // Overrides
                ":is(h1, h2, h3) + *": {
                    marginTop: "0",
                },
                "> :first-child": {
                    marginTop: "0 !important",
                },
                "> :last-child": {
                    marginBottom: "0 !important",
                },
            },
        },
        invert: {
            css: {
                "--tw-prose-body": "var(--tw-prose-invert-body)",
                "--tw-prose-headings": "var(--tw-prose-invert-headings)",
                "--tw-prose-links": "var(--tw-prose-invert-links)",
                "--tw-prose-links-hover": "var(--tw-prose-invert-links-hover)",
                "--tw-prose-links-underline":
                    "var(--tw-prose-invert-links-underline)",
                "--tw-prose-bold": "var(--tw-prose-invert-bold)",
                "--tw-prose-counters": "var(--tw-prose-invert-counters)",
                "--tw-prose-bullets": "var(--tw-prose-invert-bullets)",
                "--tw-prose-hr": "var(--tw-prose-invert-hr)",
                "--tw-prose-quotes": "var(--tw-prose-invert-quotes)",
                "--tw-prose-quote-borders":
                    "var(--tw-prose-invert-quote-borders)",
                "--tw-prose-captions": "var(--tw-prose-invert-captions)",
                "--tw-prose-code": "var(--tw-prose-invert-code)",
                "--tw-prose-code-bg": "var(--tw-prose-invert-code-bg)",
                "--tw-prose-code-ring": "var(--tw-prose-invert-code-ring)",
                "--tw-prose-th-borders": "var(--tw-prose-invert-th-borders)",
                "--tw-prose-td-borders": "var(--tw-prose-invert-td-borders)",
            },
        },
    };
}
