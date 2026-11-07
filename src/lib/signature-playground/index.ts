import { canSign, signingParts } from "../signing";
import { bindTool, type Tool } from "./dom";
import { createSignView } from "./sign-view";
import { createStringView, readMessage } from "./string-view";
import { showVerified } from "./verify-view";

// Enhancement only: without JavaScript the section stays hidden, and the page's static example
// and written steps are all there is.

const setUp = async (tool: Tool) => {
    const { root, field, output } = tool;

    root.hidden = false;
    if (!(await canSign())) {
        output("unsupported").hidden = false;
        return;
    }
    output("modes").hidden = false;
    output("intro").hidden = false;
    output("tool").hidden = false;

    const readMode = () =>
        root.querySelector<HTMLInputElement>('[name="mode"]:checked')?.value ===
        "verify"
            ? "verify"
            : "sign";

    const chooseVerify = () => {
        const radio = root.querySelector<HTMLInputElement>(
            '[name="mode"][value="verify"]',
        );
        if (radio) radio.checked = true;
    };

    const showString = createStringView(tool);
    const signView = await createSignView(tool, () => update());

    // Hashing and signing are asynchronous, so a slow run must not draw over a newer one.
    let latest = 0;
    const update = async () => {
        const run = ++latest;
        const isCurrent = () => run === latest;
        const mode = readMode();
        root.dataset.mode = mode;
        const message = readMessage(tool);
        const parts = await signingParts(message);
        if (!isCurrent()) return;
        showString(parts, message.body);
        await (mode === "sign"
            ? signView.show(parts, isCurrent)
            : showVerified(tool, parts, isCurrent));
    };

    root.addEventListener("input", update);
    root.addEventListener("submit", (event) => event.preventDefault());

    output("now").addEventListener("click", () => {
        field("timestamp").value = String(Math.floor(Date.now() / 1000));
        update();
    });

    output("check-this").addEventListener("click", async () => {
        field("signature").value = signView.lastSignature();
        field("public-key").value = await signView.publicKey();
        chooseVerify();
        update();
    });

    field("public-key").value = await signView.publicKey();
    if (new URLSearchParams(location.search).get("mode") === "verify") {
        chooseVerify();
    }
    update();
};

const section = document.querySelector<HTMLElement>("[data-playground]");
if (section) setUp(bindTool(section));
