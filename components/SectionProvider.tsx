"use client";

import {
    createContext,
    type ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";

import { remToPx } from "../lib/remToPx";

export interface Section {
    id: string;
    title: string;
}

const HEADING_OFFSET_REM = 6;

const SectionContext = createContext<{
    sections: Section[];
    visibleSections: string[];
}>({ sections: [], visibleSections: [] });

function getVisibleSections(sections: Section[]) {
    const { innerHeight, scrollY } = window;
    const offset = remToPx(HEADING_OFFSET_REM);
    const visibleSections: string[] = [];
    const getTop = (section?: Section) => {
        const element = section && document.getElementById(section.id);
        return element && element.getBoundingClientRect().top + scrollY;
    };

    for (const [index, section] of sections.entries()) {
        const top = getTop(section);
        if (top === undefined || top === null) {
            continue;
        }

        if (index === 0 && top - offset > scrollY) {
            visibleSections.push("_top");
        }

        const nextTop = getTop(sections[index + 1]);
        const bottom = (nextTop ?? Number.POSITIVE_INFINITY) - offset;

        if (
            (top > scrollY && top < scrollY + innerHeight) ||
            (bottom > scrollY && bottom < scrollY + innerHeight) ||
            (top <= scrollY && bottom >= scrollY + innerHeight)
        ) {
            visibleSections.push(section.id);
        }
    }

    return visibleSections;
}

export function SectionProvider({
    sections,
    children,
}: {
    sections: Section[];
    children: ReactNode;
}) {
    const [visibleSections, setVisibleSections] = useState<string[]>([]);

    useEffect(() => {
        function update() {
            const next = getVisibleSections(sections);
            setVisibleSections((current) =>
                current.join() === next.join() ? current : next,
            );
        }

        const raf = window.requestAnimationFrame(update);
        window.addEventListener("scroll", update, { passive: true });
        window.addEventListener("resize", update);

        return () => {
            window.cancelAnimationFrame(raf);
            window.removeEventListener("scroll", update);
            window.removeEventListener("resize", update);
        };
    }, [sections]);

    return (
        <SectionContext.Provider value={{ sections, visibleSections }}>
            {children}
        </SectionContext.Provider>
    );
}

export function useSections() {
    return useContext(SectionContext);
}
