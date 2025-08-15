"use client";

import { ThemeProvider, useTheme } from "next-themes";
import { type ReactNode, useEffect } from "react";
import { uwuifyDocument } from "@/lib/uwuify";

function ThemeWatcher() {
    const { resolvedTheme, setTheme } = useTheme();

    useEffect(() => {
        const media = window.matchMedia("(prefers-color-scheme: dark)");

        function onMediaChange() {
            const systemTheme = media.matches ? "dark" : "light";
            if (resolvedTheme === systemTheme) {
                setTheme("system");
            }
        }

        onMediaChange();
        media.addEventListener("change", onMediaChange);

        return () => {
            media.removeEventListener("change", onMediaChange);
        };
    }, [resolvedTheme, setTheme]);

    return null;
}

function UwuWatcher() {
    // Uwuify the whole page when ctrl + u is pressed
    useEffect(() => {
        function onKeyDown(event: KeyboardEvent) {
            if (event.key === "u" && (event.metaKey || event.ctrlKey)) {
                event.preventDefault();
                uwuifyDocument();
            }
        }

        window.addEventListener("keydown", onKeyDown);

        return () => {
            window.removeEventListener("keydown", onKeyDown);
        };
    }, []);

    return null;
}

export function Providers({ children }: { children: ReactNode }) {
    return (
        <ThemeProvider attribute="class" disableTransitionOnChange={true}>
            <ThemeWatcher />
            <UwuWatcher />
            {children}
        </ThemeProvider>
    );
}
