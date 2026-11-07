import type { RootContent } from "mdast";
import type { Extension } from "../extensions";
import { libraries } from "../libraries";
import { API_PREFIX } from "../spec";
import { inheritedFieldHref, inheritedFields } from "../spec-fields";
import { type Block, item, list, md } from "./build";
import { type Jsx, needed, prop, slotsOf, unwrap } from "./jsx";

export type Context = {
    /** Converts what a component holds. */
    body: (node: Jsx) => Block[];
    extensions: Extension[];
};

type Component = (node: Jsx, context: Context) => Block[];

/** `name` (`type`, details), as both listed and inherited fields show it. */
const fieldHead = (name: string, type?: string, ...details: string[]) => {
    const parts = [...(type ? [`\`${type}\``] : []), ...details];
    return parts.length > 0 ? `${name} (${parts.join(", ")})` : name;
};

/** A `Field` as a list item. The walker in `page.ts` joins neighbors into one list. */
export const fieldItem = (node: Jsx, { body }: Context) => {
    const head = fieldHead(
        `\`${needed(node, "name")}\``,
        prop(node, "type"),
        ...[
            prop(node, "numberType"),
            prop(node, "required") && "required",
        ].filter((detail) => typeof detail === "string"),
    );
    const blocks = body(node);
    return item(blocks[0]?.type === "paragraph" ? `${head}:` : head, blocks);
};

/** Facts about the sheet, then its fields under a label, then its example. */
const sheet = (
    node: Jsx,
    { body }: Context,
    label: string,
    facts: Parameters<typeof list>[0],
) => {
    const { main, slots } = slotsOf(node);
    const fields = body(main);
    return [
        ...list(facts),
        ...(fields.length > 0 ? [...md(`**${label}**`), ...fields] : []),
        ...(slots.example ? body(slots.example) : []),
    ];
};

const Entity: Component = (node, context) => {
    const type = needed(node, "type");
    const fetch = prop<{ path: string }>(node, "fetch")?.path;
    const { collections } = slotsOf(node).slots;
    return sheet(node, context, "Fields", [
        item(`Type: \`"${type}"\``),
        prop(node, "transient")
            ? item("Lifetime: [Transient Entity](/entities#transient-entities)")
            : item(
                  `Fetch: \`GET ${fetch ?? `${API_PREFIX}/entities/${type}/{id}`}\``,
              ),
        collections && item("Collections:", context.body(collections)),
    ]);
};

const Fields: Component = (node, context) => {
    const extension = prop(node, "extension");
    const on = prop(node, "on");
    return sheet(node, context, prop(node, "label") ?? "Fields", [
        extension !== undefined && item(`Extension ID: \`${extension}\``),
        on !== undefined &&
            item(`Extends: [${on}](/entities/${on.toLowerCase()})`),
    ]);
};

const Endpoint: Component = (node, { body }) => {
    const { parameters, response, example } = slotsOf(node).slots;
    const accept = prop(node, "accept");
    const signature =
        prop(node, "signature") === "exempt"
            ? "Not required for requests or responses."
            : "Required for requests and responses.";
    return [
        ...md(`\`${needed(node, "method")} ${needed(node, "path")}\``),
        ...list([
            item(`[Signature](/signatures): ${signature}`),
            accept !== undefined && item(`Accept: \`${accept}\``),
            parameters && item("Parameters:", body(parameters)),
            response && item("Response:", body(response)),
        ]),
        ...(example ? body(example) : []),
    ];
};

const Inherits: Component = (node) => {
    // `remark-spec` adds `omit`, as it does for the HTML.
    const omitted = prop(node, "omit")?.split(",") ?? [];
    return [
        ...md("Inherited from [Entity](/entities):"),
        ...list(
            inheritedFields
                .filter((field) => !omitted.includes(field.name))
                .map((field) =>
                    item(
                        fieldHead(
                            `[\`${field.name}\`](${inheritedFieldHref(field.name)})`,
                            field.type,
                            ...(field.required ? ["required"] : []),
                        ),
                    ),
                ),
        ),
    ];
};

const Values: Component = (node) =>
    list(
        Object.entries(needed<Record<string, string>>(node, "values")).map(
            ([value, description]) => item(`\`"${value}"\`: ${description}`),
        ),
    );

const WireTrace: Component = (node, { body }) => {
    const lanes: Record<string, string> = {
        a: needed(node, "a"),
        b: needed(node, "b"),
    };
    const steps = unwrap(node.children as RootContent[]).map((child) => {
        const message = child as Jsx;
        const from = needed(message, "from");
        const route = prop(message, "local")
            ? `${lanes[from]}:`
            : `${lanes[from]} to ${lanes[from === "a" ? "b" : "a"]}:`;
        const label = prop(message, "label");
        return item(label ? `${route} \`${label}\`.` : route, body(message));
    });
    return list(steps, true);
};

const SigningString: Component = (node) => {
    const parts = needed<[string, string, string][]>(node, "parts");
    const whole = parts.map(([, , value]) => value).join(" ");
    return [
        ...list(
            parts.map(([placeholder, what, value]) =>
                item(`\`${placeholder}\` ${what}: \`${value}\``),
            ),
        ),
        ...md(`Full string: \`${whole}\``),
    ];
};

const Guides: Component = (node) =>
    list(
        unwrap(node.children as RootContent[]).map((child) => {
            const guide = child as Jsx;
            return item(
                `[${needed(guide, "name")}](${needed(guide, "href")}): ${needed(guide, "description")}`,
            );
        }),
    );

const Libraries: Component = () =>
    list(
        libraries.map(({ name, href, description }) =>
            item(`[${name}](${href}): ${description}`),
        ),
    );

const ExtensionList: Component = (node, { extensions }) =>
    list(
        extensions.map(({ name, href, extension, description }) =>
            item(
                `[${name}](${href}) (\`${extension}\`)${prop(node, "descriptions") ? `: ${description}` : ""}`,
            ),
        ),
    );

const Button: Component = (node) => [
    {
        type: "paragraph",
        children: [
            {
                type: "link",
                url: needed(node, "href"),
                children: node.children as never,
            },
        ],
    },
];

const Note: Component = (node, { body }) => [
    { type: "blockquote", children: body(node) },
];

/** Components that only wrap their content. */
const Wrapper: Component = (node, { body }) => body(node);

/** Add a new component here, or the build fails on any page that uses it. */
export const components: Record<string, Component> = {
    Button,
    Endpoint,
    Entity,
    Example: Wrapper,
    ExtensionList,
    Fields,
    Guides,
    Inherits,
    Libraries,
    Note,
    SigningString,
    Values,
    WireTrace,
    div: Wrapper,
};
