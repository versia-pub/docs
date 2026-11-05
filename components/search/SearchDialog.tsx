import type { AutocompleteState } from "@algolia/autocomplete-core";
import {
    Dialog,
    DialogPanel,
    DialogTitle,
    Transition,
    TransitionChild,
} from "@headlessui/react";
import clsx from "clsx";
import { type Ref, useEffect, useRef } from "react";

import type { Result } from "@/lib/search";
import { LoadingIcon, SearchIcon } from "./icons";
import { SearchResults } from "./SearchResults";
import { type Autocomplete, useAutocomplete } from "./useAutocomplete";

type EmptyObject = Record<string, never>;

function SearchInput({
    ref,
    autocomplete,
    autocompleteState,
    onClose,
}: {
    ref: Ref<HTMLInputElement>;
    autocomplete: Autocomplete;
    autocompleteState: AutocompleteState<Result> | EmptyObject;
    onClose: () => void;
}) {
    const inputProps = autocomplete.getInputProps({ inputElement: null });

    return (
        <div className="group relative flex h-12">
            <SearchIcon className="pointer-events-none absolute left-3 top-0 h-full w-5 stroke-zinc-500" />
            <input
                ref={ref}
                data-autofocus={true}
                className={clsx(
                    "flex-auto appearance-none bg-transparent pl-10 text-zinc-900 outline-hidden placeholder:text-zinc-500 focus:w-full focus:flex-none sm:text-sm dark:text-white [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden [&::-webkit-search-results-button]:hidden [&::-webkit-search-results-decoration]:hidden",
                    autocompleteState.status === "stalled" ? "pr-11" : "pr-4",
                )}
                {...inputProps}
                onInput={(event) => {
                    if (
                        event.currentTarget.value
                            .toLowerCase()
                            .includes("barrel roll")
                    ) {
                        event.currentTarget.value = "";
                        document.body.classList.add("animate-roll");
                        setTimeout(
                            () =>
                                document.body.classList.remove("animate-roll"),
                            2000,
                        );
                    }
                }}
                onKeyDown={(event) => {
                    if (
                        event.key === "Escape" &&
                        !autocompleteState.isOpen &&
                        autocompleteState.query === ""
                    ) {
                        // In Safari, closing the dialog with the escape key can sometimes cause the scroll position to jump to the
                        // bottom of the page. This is a workaround for that until we can figure out a proper fix in Headless UI.
                        if (document.activeElement instanceof HTMLElement) {
                            document.activeElement.blur();
                        }

                        onClose();
                    } else {
                        inputProps.onKeyDown(event);
                    }
                }}
            />
            {autocompleteState.status === "stalled" && (
                <div className="absolute inset-y-0 right-3 flex items-center">
                    <LoadingIcon className="h-5 w-5 animate-spin stroke-zinc-200 text-zinc-900 dark:stroke-zinc-800 dark:text-brand-400" />
                </div>
            )}
        </div>
    );
}

export function SearchDialog({
    open,
    setOpen,
    className,
}: {
    open: boolean;
    setOpen: (open: boolean) => void;
    className?: string;
}) {
    const inputRef = useRef<HTMLInputElement>(null);
    const { autocomplete, autocompleteState, indexMissing } = useAutocomplete({
        close() {
            setOpen(false);
        },
    });

    useEffect(() => {
        if (open) {
            return;
        }

        function onKeyDown(event: KeyboardEvent) {
            if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
                event.preventDefault();
                setOpen(true);
            }
        }

        window.addEventListener("keydown", onKeyDown);

        return () => {
            window.removeEventListener("keydown", onKeyDown);
        };
    }, [open, setOpen]);

    return (
        <Transition show={open} afterLeave={() => autocomplete.setQuery("")}>
            <Dialog
                onClose={setOpen}
                className={clsx("fixed inset-0 z-50", className)}
            >
                <TransitionChild
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-zinc-400/25 backdrop-blur-xs dark:bg-black/40" />
                </TransitionChild>

                <div className="fixed inset-0 overflow-y-auto px-4 py-4 sm:px-6 sm:py-20 md:py-32 lg:px-8 lg:py-[15vh]">
                    <TransitionChild
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <DialogPanel className="mx-auto transform-gpu overflow-hidden rounded-lg bg-zinc-50 shadow-xl ring-1 ring-zinc-900/7.5 sm:max-w-xl dark:bg-zinc-900 dark:ring-zinc-800">
                            <div {...autocomplete.getRootProps({})}>
                                <DialogTitle className="sr-only">
                                    Search
                                </DialogTitle>
                                <form
                                    {...autocomplete.getFormProps({
                                        inputElement: inputRef.current,
                                    })}
                                >
                                    <SearchInput
                                        ref={inputRef}
                                        autocomplete={autocomplete}
                                        autocompleteState={autocompleteState}
                                        onClose={() => setOpen(false)}
                                    />
                                    <div
                                        className="border-t border-zinc-200 bg-white empty:hidden dark:border-zinc-100/5 dark:bg-white/2.5"
                                        {...autocomplete.getPanelProps({})}
                                    >
                                        {autocompleteState.isOpen &&
                                            autocompleteState
                                                .collections[0] && (
                                                <SearchResults
                                                    autocomplete={autocomplete}
                                                    query={
                                                        autocompleteState.query
                                                    }
                                                    collection={
                                                        autocompleteState
                                                            .collections[0]
                                                    }
                                                    indexMissing={indexMissing}
                                                />
                                            )}
                                    </div>
                                </form>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </Dialog>
        </Transition>
    );
}
