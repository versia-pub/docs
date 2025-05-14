import Image from "next/image";

import logoTypescript from "@/images/logos/typescript.svg";
import { Button } from "./Button";
import { Heading } from "./Heading";

const libraries = [
    {
        href: "https://github.com/versia-pub/api/tree/main/federation",
        name: "@versia/federation",
        description:
            "Fully-featured federation toolkit with validation, signatures, parsing, and more.",
        logo: logoTypescript,
    },
];

export function Libraries() {
    return (
        <div className="my-16 xl:max-w-none">
            <Heading level={2} id="official-libraries">
                Official libraries
            </Heading>
            <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-10 border-t border-zinc-900/5 pt-10 sm:grid-cols-2 xl:max-w-none xl:grid-cols-3 dark:border-white/5">
                {libraries.map((library) => (
                    <div
                        key={library.name}
                        className="flex flex-row-reverse gap-6"
                    >
                        <div className="flex-auto">
                            <h3 className="mt-0 text-sm font-semibold text-zinc-900 dark:text-white">
                                <code>{library.name}</code>
                            </h3>
                            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                                {library.description}
                            </p>
                            <p className="mt-4">
                                <Button
                                    href={library.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    variant="text"
                                    arrow="right"
                                >
                                    Read more
                                </Button>
                            </p>
                        </div>
                        <Image
                            src={library.logo}
                            alt=""
                            className="h-12 w-12 rounded-sm m-0"
                            unoptimized={true}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
