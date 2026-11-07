import { bindTool } from "../signature-playground/dom.ts";
import type { EntitySchema } from "./types.ts";
import { showCheck } from "./view.ts";

// Enhancement only: without JavaScript the section stays hidden, and the field list above is the
// whole definition.

for (const root of document.querySelectorAll<HTMLElement>(
    "[data-entity-checker]",
)) {
    const { field, output } = bindTool(root);
    const schema = JSON.parse(root.dataset.schema ?? "{}") as EntitySchema;
    const box = field("entity");
    // The box starts with the example, and keeps it as its default when edited.
    const example = box.defaultValue;

    const reset = output("use-example") as HTMLButtonElement;
    const update = () => {
        showCheck(output, schema, box.value);
        reset.disabled = box.value === example;
    };

    root.hidden = false;
    box.addEventListener("input", update);
    root.querySelector("form")?.addEventListener("submit", (event) =>
        event.preventDefault(),
    );
    reset.addEventListener("click", () => {
        box.value = example;
        update();
    });
    update();
}
