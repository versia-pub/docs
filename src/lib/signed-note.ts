import { noteText, sample, sampleSignatureCovers } from "./signed-sample.ts";
import { canSign } from "./signing.ts";

// Enhancement only: without JavaScript, the message on the home page is a plain code block.
const setUp = async () => {
    const status = document.querySelector<HTMLElement>("[data-note-status]");
    const value = [
        ...document.querySelectorAll<HTMLElement>(".message .value"),
    ].find((token) => token.textContent === `"${noteText}"`);
    if (!status || !value || !(await canSign())) return;

    const label = status.querySelector<HTMLElement>("[data-label]");
    const hint = status.querySelector<HTMLElement>("[data-hint]");
    const restore = status.querySelector<HTMLButtonElement>("button");
    if (!label || !hint || !restore) return;

    const editable = document.createElement("span");
    editable.className = "note-text";
    editable.textContent = noteText;
    editable.setAttribute("role", "textbox");
    editable.setAttribute("aria-label", "Text of the note");
    editable.spellcheck = false;
    try {
        editable.contentEditable = "plaintext-only";
    } catch {
        editable.contentEditable = "true";
    }
    value.replaceChildren('"', editable, '"');

    let latest = 0;
    const check = async () => {
        const run = ++latest;
        const text = editable.textContent ?? "";
        const valid = await sampleSignatureCovers({
            ...sample,
            body: sample.body.replace(noteText, () => text),
        });
        if (run !== latest) return;
        status.dataset.valid = String(valid);
        label.textContent = valid ? "Signature valid." : "Signature invalid.";
        hint.textContent = valid
            ? "Edit the underlined text of the note and watch this line."
            : "The body is no longer what a.example signed, so b.example would refuse it.";
        restore.hidden = valid;
    };

    editable.addEventListener("input", check);
    // The note is one line of JSON.
    editable.addEventListener("keydown", (event) => {
        if (event.key === "Enter") event.preventDefault();
    });
    restore.addEventListener("click", () => {
        editable.textContent = noteText;
        void check();
    });

    await check();
    status.hidden = false;
};

void setUp();
