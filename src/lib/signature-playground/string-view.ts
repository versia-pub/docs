import type { Message } from "../signing";
import type { Tool } from "./dom";

export const readMessage = ({ field }: Tool): Message => ({
    method: field("method").value,
    domain: field("domain").value,
    path: field("path").value,
    timestamp: field("timestamp").value,
    body: field("body").value,
});

const describeBody = (body: string) => {
    const size = new TextEncoder().encode(body).length;
    const notes = [`${size} byte${size === 1 ? "" : "s"}`];
    if (size === 0) notes.push("no body, so this is the hash of zero bytes");
    if (/\s$/.test(body)) notes.push("the whitespace at the end is signed too");
    return `${notes.join(", ")}.`;
};

// Each field lights up its part of the string, and each part its field.
const linkPartsToFields = (root: HTMLElement, partCodes: HTMLElement[]) => {
    const highlight = (index: string | undefined) => {
        for (const element of root.querySelectorAll<HTMLElement>(
            "[data-part]",
        )) {
            element.classList.toggle(
                "part-active",
                element.dataset.part === index,
            );
        }
    };

    root.addEventListener("focusin", (event) => {
        highlight((event.target as HTMLElement).dataset.part);
    });
    root.addEventListener("focusout", () => highlight(undefined));
    partCodes.forEach((code, index) => {
        code.dataset.part = String(index);
        const holder = code.closest("div");
        holder?.addEventListener("pointerenter", () =>
            highlight(String(index)),
        );
        holder?.addEventListener("pointerleave", () => highlight(undefined));
    });
};

/** Sets up the signing string and the note under the body, and returns what redraws them. */
export const createStringView = (tool: Tool) => {
    const partCodes = [
        ...tool.root.querySelectorAll<HTMLElement>(".signing-string dd code"),
    ];
    const whole = tool.root.querySelector<HTMLElement>(
        ".signing-string p code",
    );
    linkPartsToFields(tool.root, partCodes);

    return (parts: string[], body: string) => {
        parts.forEach((part, index) => {
            const code = partCodes[index];
            if (code) code.textContent = part;
        });
        whole?.replaceChildren(
            ...parts.flatMap((part, index) => {
                const span = document.createElement("span");
                span.dataset.part = String(index);
                span.textContent = part;
                return index === 0 ? [span] : [" ", span];
            }),
        );
        tool.output("body-size").textContent = describeBody(body);
    };
};
