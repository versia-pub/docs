"use client";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";

import {
    AnimatePresence,
    motion,
    useMotionValue,
    useSpring,
} from "framer-motion";
import { encode } from "qss";
import {
    type MouseEvent as ReactMouseEvent,
    type ReactNode,
    useEffect,
    useState,
} from "react";

import { createPortal } from "react-dom";

type LinkPreviewProps = {
    children: ReactNode;
    url: string;
    className?: string;
    width?: number;
    height?: number;
    quality?: number;
    layout?: string;
} & (
    | { isStatic: true; imageSrc: string }
    | { isStatic?: false; imageSrc?: never }
);

export const LinkPreview = ({
    children,
    url,
    className,
    width = 200,
    height = 125,
    isStatic = false,
    imageSrc = "",
}: LinkPreviewProps) => {
    let src: string;

    if (isStatic) {
        src = imageSrc;
    } else {
        const params = encode({
            url,
            screenshot: true,
            meta: false,
            embed: "screenshot.url",
            colorScheme: "dark",
            "viewport.isMobile": true,
            "viewport.deviceScaleFactor": 1,
            "viewport.width": width * 3,
            "viewport.height": height * 3,
        });
        src = `https://api.microlink.io/?${params}`;
    }

    const [isOpen, setOpen] = useState(false);

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const springConfig = { stiffness: 100, damping: 15 };
    const x = useMotionValue(0);

    const translateX = useSpring(x, springConfig);

    const handleMouseMove = (
        event: ReactMouseEvent<HTMLAnchorElement, MouseEvent>,
    ) => {
        const targetRect = (
            event.target as HTMLAnchorElement
        ).getBoundingClientRect();
        const eventOffsetX = event.clientX - targetRect.left;
        const offsetFromCenter = (eventOffsetX - targetRect.width / 2) / 2; // Reduce the effect to make it subtle
        x.set(offsetFromCenter);
    };

    const [isCurrentOrigin, setIsCurrentOrigin] = useState(true);

    useEffect(() => {
        if (process && URL.canParse(url)) {
            setIsCurrentOrigin(new URL(url).origin === window.location.origin);
        }
    }, [url]);

    return (
        <>
            {isMounted
                ? createPortal(
                      <div className="hidden">
                          <img
                              src={src}
                              width={width}
                              height={height}
                              aria-hidden={true}
                          />
                      </div>,
                      document.body,
                  )
                : null}
            <HoverCardPrimitive.Root
                openDelay={50}
                closeDelay={100}
                onOpenChange={(open) => {
                    setOpen(open);
                }}
            >
                <HoverCardPrimitive.Trigger
                    onMouseMove={handleMouseMove}
                    href={url}
                    className={className}
                >
                    {children}
                </HoverCardPrimitive.Trigger>

                <HoverCardPrimitive.Portal>
                    <HoverCardPrimitive.Content
                        className="[transform-origin:var(--radix-hover-card-content-transform-origin)] not-prose z-100"
                        side="top"
                        align="center"
                        sideOffset={10}
                    >
                        <AnimatePresence>
                            {isOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20, scale: 0.6 }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                        scale: 1,
                                        transition: {
                                            type: "spring",
                                            stiffness: 260,
                                            damping: 20,
                                        },
                                    }}
                                    exit={{ opacity: 0, y: 20, scale: 0.6 }}
                                    className="shadow-xl rounded-xl"
                                    style={{
                                        x: translateX,
                                    }}
                                >
                                    <a
                                        href={url}
                                        className="block p-1 bg-white border-2 border-transparent shadow rounded-xl hover:border-neutral-200 dark:hover:border-neutral-800"
                                        target={
                                            isCurrentOrigin ? "_self" : "_blank"
                                        }
                                        style={{ fontSize: 0 }}
                                    >
                                        <img
                                            src={isStatic ? imageSrc : src}
                                            width={width}
                                            height={height}
                                            className="rounded-lg"
                                            alt={`Preview for ${url}`}
                                        />
                                    </a>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </HoverCardPrimitive.Content>
                </HoverCardPrimitive.Portal>
            </HoverCardPrimitive.Root>
        </>
    );
};
