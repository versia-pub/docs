import { type ComponentPropsWithoutRef, useId } from "react";

export function SearchIcon(props: ComponentPropsWithoutRef<"svg">) {
    return (
        <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12.01 12a4.25 4.25 0 1 0-6.02-6 4.25 4.25 0 0 0 6.02 6Zm0 0 3.24 3.25"
            />
        </svg>
    );
}

export function NoResultsIcon(props: ComponentPropsWithoutRef<"svg">) {
    return (
        <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12.01 12a4.237 4.237 0 0 0 1.24-3c0-.62-.132-1.207-.37-1.738M12.01 12A4.237 4.237 0 0 1 9 13.25c-.635 0-1.237-.14-1.777-.388M12.01 12l3.24 3.25m-3.715-9.661a4.25 4.25 0 0 0-5.975 5.908M4.5 15.5l11-11"
            />
        </svg>
    );
}

export function LoadingIcon(props: ComponentPropsWithoutRef<"svg">) {
    const id = useId();

    return (
        <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
            <circle cx="10" cy="10" r="5.5" strokeLinejoin="round" />
            <path
                stroke={`url(#${id})`}
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.5 10a5.5 5.5 0 1 0-5.5 5.5"
            />
            <defs>
                <linearGradient
                    id={id}
                    x1="13"
                    x2="9.5"
                    y1="9"
                    y2="15"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="currentColor" />
                    <stop offset="1" stopColor="currentColor" stopOpacity="0" />
                </linearGradient>
            </defs>
        </svg>
    );
}
