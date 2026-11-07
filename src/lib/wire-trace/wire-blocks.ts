// A step can open the code block that shows its message. The block is copied from the section
// further down the page, so the page holds one version of the text and search indexes it once.

/** Finds a block from `heading-id:index`, counting blocks up to the next heading. */
const findBlock = (reference: string) => {
    const [id, index] = reference.split(":");
    const heading = id ? document.getElementById(id) : null;
    const blocks: Element[] = [];
    let next = heading?.nextElementSibling;
    while (next && !/^H[1-6]$/.test(next.tagName)) {
        if (next.matches("pre.astro-code")) blocks.push(next);
        next = next.nextElementSibling;
    }
    return blocks[Number(index)];
};

const copyBlock = (block: Element) => {
    const copy = block.cloneNode(true) as Element;
    copy.querySelector(".copy-code")?.remove();
    return copy;
};

export const setUpWireBlocks = (trace: HTMLElement, onOpen: () => void) => {
    for (const step of trace.querySelectorAll<HTMLElement>("[data-wire]")) {
        const reference = step.dataset.wire ?? "";
        const source = findBlock(reference);
        const holder = step.querySelector<HTMLElement>("[data-wire-holder]");
        const block = step.querySelector<HTMLElement>("[data-wire-block]");
        const toggle = step.querySelector<HTMLElement>(
            '[data-output="toggle-wire"]',
        );
        if (!source || !holder || !block || !toggle) {
            console.warn(`No code block for the trace step "${reference}".`);
            continue;
        }

        block.id = `wire-${reference.replace(":", "-")}`;
        toggle.setAttribute("aria-controls", block.id);
        toggle.setAttribute("aria-expanded", "false");
        toggle.addEventListener("click", () => {
            const opening = block.hidden;
            if (opening && !block.firstChild) block.append(copyBlock(source));
            block.hidden = !opening;
            toggle.setAttribute("aria-expanded", String(opening));
            toggle.textContent = opening
                ? "Hide the message"
                : "Show the message";
            if (opening) onOpen();
        });
        holder.hidden = false;
    }
};
