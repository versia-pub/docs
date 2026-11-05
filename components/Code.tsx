import { CopyButton } from "./CopyButton";

/** Renders a code block. `mdx/rehype.mjs` provides the highlighted `html`. */
export function Pre({ html, title }: { html: string; title?: string }) {
    return (
        <div className="my-6 overflow-hidden rounded-md bg-zinc-900 shadow-md dark:ring-1 ring-inset dark:ring-white/10">
            <div className="not-prose">
                {title && (
                    <div className="flex min-h-[calc(--spacing(12)+1px)] flex-wrap items-start gap-x-4 border-b border-zinc-700 bg-zinc-800 px-4 dark:border-zinc-800 dark:bg-transparent">
                        <h3 className="mr-auto pt-3 text-xs font-semibold text-white">
                            {title}
                        </h3>
                    </div>
                )}
                <div className="group dark:bg-white/2.5">
                    <div className="relative">
                        <div
                            className="overflow-x-auto p-4 text-sm text-white [&>pre]:bg-transparent!"
                            // biome-ignore lint/style/useNamingConvention: React's API
                            dangerouslySetInnerHTML={{ __html: html }}
                        />
                        <CopyButton />
                    </div>
                </div>
            </div>
        </div>
    );
}
