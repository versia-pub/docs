import clsx from "clsx";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import {
    type CSSProperties,
    type ElementRef,
    type ReactNode,
    forwardRef,
} from "react";

import { Button } from "./Button";
import { Logo } from "./Logo";
import {
    MobileNavigation,
    useIsInsideMobileNavigation,
} from "./MobileNavigation";
import { useMobileNavigationStore } from "./MobileNavigation";
import { MobileSearch, Search } from "./Search";
import { ThemeToggle } from "./ThemeToggle";

function TopLevelNavItem({
    href,
    children,
}: {
    href: string;
    children: ReactNode;
}) {
    return (
        <li>
            <Link
                href={href}
                className="text-sm leading-5 text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
            >
                {children}
            </Link>
        </li>
    );
}

export const Header = forwardRef<ElementRef<"div">, { className?: string }>(
    function Header({ className }, ref) {
        const { isOpen: mobileNavIsOpen } = useMobileNavigationStore();
        const isInsideMobileNavigation = useIsInsideMobileNavigation();

        const { scrollY } = useScroll();
        const bgOpacityLight = useTransform(scrollY, [0, 72], [0.5, 0.9]);
        const bgOpacityDark = useTransform(scrollY, [0, 72], [0.2, 0.8]);

        return (
            <motion.div
                ref={ref}
                className={clsx(
                    className,
                    // Add bg-construction bg-opacity-10 [background-size:57px_57px] classes to make it striped
                    "fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between gap-2 px-4 transition sm:px-6 lg:left-72 lg:z-30 lg:px-8 xl:left-80",
                    !isInsideMobileNavigation &&
                        "backdrop-blur-sm lg:left-72 xl:left-80 dark:backdrop-blur",
                    isInsideMobileNavigation
                        ? "bg-white dark:bg-zinc-900"
                        : "bg-white/[var(--bg-opacity-light)] dark:bg-zinc-900/[var(--bg-opacity-dark)]",
                )}
                style={
                    {
                        "--bg-opacity-light": bgOpacityLight,
                        "--bg-opacity-dark": bgOpacityDark,
                    } as CSSProperties
                }
            >
                <div
                    className={clsx(
                        "absolute inset-x-0 top-full h-px transition",
                        (isInsideMobileNavigation || !mobileNavIsOpen) &&
                            "bg-zinc-900/7.5 dark:bg-white/7.5",
                    )}
                />
                <Search />
                <div className="flex items-center gap-5 lg:hidden">
                    <MobileNavigation />
                    <Link href="/" aria-label="Home">
                        <Logo className="h-6" />
                    </Link>
                </div>
                <div className="flex items-center gap-5">
                    <nav
                        className="hidden md:block"
                        aria-label="Main navigation"
                    >
                        <ul className="flex items-center gap-8">
                            <TopLevelNavItem href="/">API</TopLevelNavItem>
                        </ul>
                    </nav>
                    <div className="hidden md:block md:h-5 md:w-px md:bg-zinc-900/10 md:dark:bg-white/15" />
                    <div className="flex gap-4">
                        <MobileSearch />
                        <ThemeToggle />
                    </div>
                    <div className="hidden min-[500px]:contents">
                        <Button href="/changelog">Working Draft 5</Button>
                    </div>
                </div>
            </motion.div>
        );
    },
);
