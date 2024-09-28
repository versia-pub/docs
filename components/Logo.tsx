import clsx from "clsx";
import type { ComponentPropsWithoutRef } from "react";
import { Badge } from "./Metadata";

export function Logo(props: ComponentPropsWithoutRef<"div">) {
    return (
        <div
            {...props}
            className={clsx(
                "flex flex-row gap-x-2 items-center",
                props.className,
            )}
        >
            <img
                src="https://cdn.versia.pub/branding/icon.svg"
                alt="Logo"
                className="h-full rounded-sm"
            />
            <span className="fill-zinc-900 dark:fill-white font-semibold text-lg">
                Versia Protocol <Badge className="!h-6">Dev</Badge>
            </span>
        </div>
    );
}
