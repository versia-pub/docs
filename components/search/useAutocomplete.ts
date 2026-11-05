import {
    type AutocompleteApi,
    type AutocompleteState,
    createAutocomplete,
} from "@algolia/autocomplete-core";
import { useRouter } from "next/navigation";
import {
    type MouseEvent,
    type KeyboardEvent as ReactKeyboardEvent,
    type SyntheticEvent,
    useId,
    useState,
} from "react";

import { type Result, search } from "@/lib/search";

type EmptyObject = Record<string, never>;

export type Autocomplete = AutocompleteApi<
    Result,
    SyntheticEvent,
    MouseEvent,
    ReactKeyboardEvent
>;

export function useAutocomplete({ close }: { close: () => void }) {
    const id = useId();
    const router = useRouter();
    const [indexMissing, setIndexMissing] = useState(false);
    const [autocompleteState, setAutocompleteState] = useState<
        AutocompleteState<Result> | EmptyObject
    >({});

    function navigate({ itemUrl }: { itemUrl?: string }) {
        if (!itemUrl) {
            return;
        }

        router.push(itemUrl);
        close();
    }

    const [autocomplete] = useState<Autocomplete>(() =>
        createAutocomplete<
            Result,
            SyntheticEvent,
            MouseEvent,
            ReactKeyboardEvent
        >({
            id,
            placeholder: "Find something...",
            defaultActiveItemId: 0,
            onStateChange({ state }) {
                setAutocompleteState(state);
            },
            shouldPanelOpen({ state }) {
                return state.query !== "";
            },
            navigator: {
                navigate,
            },
            getSources: ({ query }) => [
                {
                    sourceId: "documentation",
                    async getItems() {
                        try {
                            return await search(query);
                        } catch {
                            setIndexMissing(true);
                            return [];
                        }
                    },
                    getItemUrl({ item }) {
                        return item.url;
                    },
                    onSelect: navigate,
                },
            ],
        }),
    );

    return { autocomplete, autocompleteState, indexMissing };
}
