import logo from "@/images/branding/logo.webp";
import clsx from "clsx";
import type { ComponentPropsWithoutRef } from "react";

export function Logo(props: ComponentPropsWithoutRef<"div">) {
    return (
        <div
            {...props}
            className={clsx(
                "flex flex-row gap-x-2 items-center",
                props.className,
            )}
        >
            <img src={logo.src} alt="Logo" className="h-full rounded-sm" />
            <span className="fill-zinc-900 dark:fill-white font-semibold text-lg">
                Lysand Protocol
            </span>
        </div>
    );
}
