"use client";

import {
    type ComponentPropsWithoutRef,
    createContext,
    type ReactNode,
    useCallback,
    useContext,
    useMemo,
    useState,
} from "react";

function MenuIcon(props: ComponentPropsWithoutRef<"svg">) {
    return (
        <svg
            viewBox="0 0 10 9"
            fill="none"
            strokeLinecap="round"
            aria-hidden="true"
            {...props}
        >
            <path d="M.5 1h9M.5 8h9M.5 4.5h9" />
        </svg>
    );
}

function XIcon(props: ComponentPropsWithoutRef<"svg">) {
    return (
        <svg
            viewBox="0 0 10 9"
            fill="none"
            strokeLinecap="round"
            aria-hidden="true"
            {...props}
        >
            <path d="m1.5 1 7 7M8.5 1l-7 7" />
        </svg>
    );
}

const MobileNavigationContext = createContext({
    isOpen: false,
    toggle: () => {},
    close: () => {},
});

export const IsInsideMobileNavigationContext = createContext(false);

export function useMobileNavigation() {
    return useContext(MobileNavigationContext);
}

export function useIsInsideMobileNavigation() {
    return useContext(IsInsideMobileNavigationContext);
}

export function MobileNavigationProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = useCallback(() => setIsOpen((open) => !open), []);
    const close = useCallback(() => setIsOpen(false), []);
    const value = useMemo(
        () => ({ isOpen, toggle, close }),
        [isOpen, toggle, close],
    );

    return (
        <MobileNavigationContext.Provider value={value}>
            {children}
        </MobileNavigationContext.Provider>
    );
}

export function MobileNavigationButton() {
    const { isOpen, toggle } = useMobileNavigation();
    const ToggleIcon = isOpen ? XIcon : MenuIcon;

    return (
        <button
            type="button"
            className="no-js:hidden! flex h-6 w-6 items-center justify-center rounded-md transition hover:bg-zinc-900/5 dark:hover:bg-white/5"
            aria-label="Toggle navigation"
            onClick={toggle}
        >
            <ToggleIcon className="w-2.5 stroke-zinc-900 dark:stroke-white" />
        </button>
    );
}
