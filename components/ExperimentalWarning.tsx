import type { FC } from "react";

export const ExperimentalWarning: FC = () => (
    <>
        <aside className="pointer-events-none z-50 fixed inset-x-0 bottom-0 sm:flex sm:justify-start sm:px-6 sm:pb-5 lg:px-8">
            <div className="pointer-events-auto flex items-center justify-between gap-x-6 bg-zinc-900 sm:dark:shadow-brand-600 shadow-glow px-6 py-2.5 sm:rounded-md ring-1 ring-white/10 sm:py-3 sm:pl-4 sm:pr-3.5">
                <p className="text-sm leading-6 text-white">
                    <strong className="font-semibold">Warning!</strong>
                    <svg
                        viewBox="0 0 2 2"
                        className="mx-2 inline h-0.5 w-0.5 fill-current"
                        aria-hidden="true"
                    >
                        <circle cx={1} cy={1} r={1} />
                    </svg>
                    This site is experimental and under active development.
                </p>
            </div>
        </aside>
    </>
);
