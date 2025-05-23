"use client";

import {
    Dialog,
    DialogPanel,
    DialogTitle,
    Transition,
    TransitionChild,
} from "@headlessui/react";
import { motion } from "framer-motion";
import { usePathname, useSearchParams } from "next/navigation";
import {
    type ComponentPropsWithoutRef,
    type MouseEvent,
    Suspense,
    createContext,
    useContext,
    useEffect,
    useRef,
} from "react";
import { create } from "zustand";

import { Header } from "./Header";
import { Navigation } from "./Navigation";

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

const IsInsideMobileNavigationContext = createContext(false);

function MobileNavigationDialog({
    isOpen,
    close,
}: {
    isOpen: boolean;
    close: () => void;
}) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const initialPathname = useRef(pathname).current;
    const initialSearchParams = useRef(searchParams).current;

    useEffect(() => {
        if (
            pathname !== initialPathname ||
            searchParams !== initialSearchParams
        ) {
            close();
        }
    }, [pathname, searchParams, close, initialPathname, initialSearchParams]);

    function onClickDialog(event: MouseEvent<HTMLDivElement>) {
        if (!(event.target instanceof HTMLElement)) {
            return;
        }

        const link = event.target.closest("a");
        if (
            link &&
            link.pathname + link.search + link.hash ===
                window.location.pathname +
                    window.location.search +
                    window.location.hash
        ) {
            close();
        }
    }

    return (
        <Transition show={isOpen}>
            <Dialog
                onClickCapture={onClickDialog}
                onClose={close}
                className="fixed inset-0 z-50 lg:hidden"
            >
                <TransitionChild
                    enter="duration-300 ease-out"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="duration-200 ease-in"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 top-14 bg-zinc-400/20 backdrop-blur-xs dark:bg-black/40" />
                </TransitionChild>

                <DialogPanel>
                    <DialogTitle className="sr-only">
                        Mobile navigation
                    </DialogTitle>
                    <TransitionChild
                        enter="duration-300 ease-out"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="duration-200 ease-in"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Header />
                    </TransitionChild>

                    <TransitionChild
                        enter="duration-500 ease-in-out"
                        enterFrom="-translate-x-full"
                        enterTo="translate-x-0"
                        leave="duration-500 ease-in-out"
                        leaveFrom="translate-x-0"
                        leaveTo="-translate-x-full"
                    >
                        <motion.div
                            layoutScroll={true}
                            className="fixed bottom-0 left-0 max-w-screen top-14 w-full overflow-y-auto bg-white px-4 pb-4 pt-6 shadow-lg shadow-zinc-900/10 ring-1 ring-zinc-900/7.5 min-[416px]:max-w-sm sm:px-6 sm:pb-10 dark:bg-zinc-900 dark:ring-zinc-800"
                        >
                            <Navigation />
                        </motion.div>
                    </TransitionChild>
                </DialogPanel>
            </Dialog>
        </Transition>
    );
}

export function useIsInsideMobileNavigation() {
    return useContext(IsInsideMobileNavigationContext);
}

export const useMobileNavigationStore = create<{
    isOpen: boolean;
    open: () => void;
    close: () => void;
    toggle: () => void;
}>()((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
    toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export function MobileNavigation() {
    const isInsideMobileNavigation = useIsInsideMobileNavigation();
    const { isOpen, toggle, close } = useMobileNavigationStore();
    const ToggleIcon = isOpen ? XIcon : MenuIcon;

    return (
        <IsInsideMobileNavigationContext.Provider value={true}>
            <button
                type="button"
                className="flex h-6 w-6 items-center justify-center rounded-md transition hover:bg-zinc-900/5 dark:hover:bg-white/5"
                aria-label="Toggle navigation"
                onClick={toggle}
            >
                <ToggleIcon className="w-2.5 stroke-zinc-900 dark:stroke-white" />
            </button>
            {!isInsideMobileNavigation && (
                <Suspense fallback={null}>
                    <MobileNavigationDialog isOpen={isOpen} close={close} />
                </Suspense>
            )}
        </IsInsideMobileNavigationContext.Provider>
    );
}
