// Enhancement only: without JavaScript, keys still link to fields and `:target` highlights them.
for (const sheet of document.querySelectorAll<HTMLElement>(".sheet")) {
    const panel = sheet.querySelector<HTMLElement>(".sheet-example");
    const fields = sheet.querySelectorAll<HTMLElement>(
        ".sheet-fields > .field",
    );
    const keyFor = (field: HTMLElement) =>
        sheet.querySelector<HTMLElement>(
            `.field-key[data-key="${CSS.escape(field.dataset.field ?? "")}"]`,
        );

    for (const field of fields) {
        const key = keyFor(field);
        if (!key) continue;

        field.addEventListener("pointerenter", () => {
            key.classList.add("is-linked");
            // Only the panel scrolls, and only when it is scrollable beside the fields.
            if (panel && getComputedStyle(panel).position === "sticky") {
                const top =
                    key.getBoundingClientRect().top -
                    panel.getBoundingClientRect().top +
                    panel.scrollTop;
                panel.scrollTo({
                    top: top - panel.clientHeight / 3,
                    behavior: "smooth",
                });
            }
        });
        field.addEventListener("pointerleave", () =>
            key.classList.remove("is-linked"),
        );
        key.addEventListener("pointerenter", () =>
            field.classList.add("is-linked"),
        );
        key.addEventListener("pointerleave", () =>
            field.classList.remove("is-linked"),
        );
    }
}
