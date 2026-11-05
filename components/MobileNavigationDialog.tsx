"use client";

import {
    Dialog,
    DialogPanel,
    DialogTitle,
    Transition,
    TransitionChild,
} from "@headlessui/react";
import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import { type MouseEvent, useEffect, useRef } from "react";

import { Header } from "./Header";
import {
    IsInsideMobileNavigationContext,
    useMobileNavigation,
} from "./MobileNavigation";
import { Navigation } from "./Navigation";

export function MobileNavigationDialog() {
    const { isOpen, close } = useMobileNavigation();
    const pathname = usePathname();
    const initialPathname = useRef(pathname).current;

    // Also covers leaving the page with the browser's back and forward buttons
    useEffect(() => {
        if (pathname !== initialPathname) {
            close();
        }
    }, [pathname, close, initialPathname]);

    function onClickDialog(event: MouseEvent<HTMLDivElement>) {
        if (event.target instanceof Element && event.target.closest("a")) {
            close();
        }
    }

    return (
        <IsInsideMobileNavigationContext.Provider value={true}>
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
        </IsInsideMobileNavigationContext.Provider>
    );
}
