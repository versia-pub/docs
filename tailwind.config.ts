import headlessuiPlugin from "@headlessui/tailwindcss";
import typographyPlugin from "@tailwindcss/typography";
import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

import typographyStyles from "./typography";

export default {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: "selector",
    theme: {
        fontSize: {
            "2xs": ["0.75rem", { lineHeight: "1.25rem" }],
            xs: ["0.8125rem", { lineHeight: "1.5rem" }],
            sm: ["0.875rem", { lineHeight: "1.5rem" }],
            base: ["1rem", { lineHeight: "1.75rem" }],
            lg: ["1.125rem", { lineHeight: "1.75rem" }],
            xl: ["1.25rem", { lineHeight: "1.75rem" }],
            "2xl": ["1.5rem", { lineHeight: "2rem" }],
            "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
            "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
            "5xl": ["3rem", { lineHeight: "1" }],
            "6xl": ["3.75rem", { lineHeight: "1" }],
            "7xl": ["4.5rem", { lineHeight: "1" }],
            "8xl": ["6rem", { lineHeight: "1" }],
            "9xl": ["8rem", { lineHeight: "1" }],
        },
        typography: typographyStyles,
        extend: {
            boxShadow: {
                glow: "0 0 4px rgb(0 0 0 / 0.1)",
            },
            colors: {
                brand: colors.pink,
                secondary: colors.purple,
            },
            maxWidth: {
                lg: "33rem",
                "2xl": "40rem",
                "3xl": "50rem",
                "5xl": "66rem",
            },
            opacity: {
                1: "0.01",
                // biome-ignore lint/style/useNamingConvention: <explanation>
                2.5: "0.025",
                // biome-ignore lint/style/useNamingConvention: <explanation>
                7.5: "0.075",
                15: "0.15",
            },
            animation: {
                roll: "roll 2s 1 ease-in-out",
            },
            backgroundImage: {
                construction:
                    "linear-gradient(45deg, rgb(255 195 0 / var(--tw-bg-opacity)) 25%, rgb(46 39 37 / var(--tw-bg-opacity)) 25%, rgb(46 39 37 / var(--tw-bg-opacity)) 50%, rgb(255 195 0 / var(--tw-bg-opacity)) 50%, rgb(255 195 0 / var(--tw-bg-opacity)) 75%, rgb(46 39 37 / var(--tw-bg-opacity)) 75%, rgb(46 39 37 / var(--tw-bg-opacity)) 100%)",
            },
            keyframes: {
                roll: {
                    "0%": { transform: "rotate(0deg)" },
                    "100%": { transform: "rotate(360deg)" },
                },
            },
        },
    },
    plugins: [typographyPlugin, headlessuiPlugin],
} satisfies Config;
