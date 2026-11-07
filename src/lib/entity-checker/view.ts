import { checkEntity, withArticle } from "./check";
import { readJson } from "./json";
import type { EntitySchema, Finding } from "./types";

type Output = (name: string) => HTMLElement;

/** Text with `code` spans, built as nodes so nothing pasted is read as HTML. */
const withCode = (text: string) =>
    text.split(/(`[^`]*`)/).map((part) => {
        if (!part.startsWith("`")) return document.createTextNode(part);
        const code = document.createElement("code");
        code.textContent = part.slice(1, -1);
        return code;
    });

const findingItem = ({ path, href, message }: Finding) => {
    const item = document.createElement("li");
    const link = document.createElement("a");
    link.href = href;
    if (path === "") {
        link.textContent = "The entity";
    } else {
        const code = document.createElement("code");
        code.textContent = path;
        link.append(code);
    }
    item.append(link, " ", ...withCode(message));
    return item;
};

const showList = (output: Output, name: string, findings: Finding[]) => {
    output(name).replaceChildren(...findings.map(findingItem));
    output(`${name}-section`).hidden = findings.length === 0;
};

const verdict = (
    output: Output,
    state: "pass" | "fail" | "",
    text: string,
    detail: string | Node[] = "",
) => {
    const element = output("verdict");
    element.dataset.state = state;
    element.textContent = text;
    output("detail").replaceChildren(
        ...(typeof detail === "string" ? withCode(detail) : detail),
    );
    output("detail").hidden = detail.length === 0;
};

/** "2 problems. See Validation.", linking the page on why a receiver rejects them. */
const rejection = (count: number) => {
    const link = document.createElement("a");
    link.href = "/validation";
    link.textContent = "Validation";
    return [
        document.createTextNode(
            `${count === 1 ? "1 problem" : `${count} problems`}. See `,
        ),
        link,
        document.createTextNode("."),
    ];
};

/** Checks what is in the box and shows the result. */
export const showCheck = (
    output: Output,
    schema: EntitySchema,
    source: string,
) => {
    if (source.trim() === "") {
        showList(output, "problems", []);
        showList(output, "notes", []);
        return verdict(output, "", "Nothing to check.");
    }

    const parsed = readJson(source);
    if ("message" in parsed) {
        showList(output, "problems", []);
        showList(output, "notes", []);
        return verdict(
            output,
            "fail",
            "This is not JSON.",
            `${parsed.message} at line ${parsed.line}, column ${parsed.column}.`,
        );
    }

    const { problems, notes, otherType } = checkEntity(schema, parsed.value);
    if (otherType !== undefined) {
        showList(output, "problems", []);
        showList(output, "notes", []);
        const entity = withArticle(schema.name);
        return verdict(
            output,
            "",
            `This is not ${entity}.`,
            `Its \`type\` is \`"${otherType}"\`.`,
        );
    }
    const all = [...parsed.problems, ...problems];
    showList(output, "problems", all);
    showList(output, "notes", notes);
    if (all.length > 0) {
        verdict(
            output,
            "fail",
            "A receiver would reject this.",
            rejection(all.length),
        );
    } else {
        verdict(output, "pass", "No problems found.");
    }
};
