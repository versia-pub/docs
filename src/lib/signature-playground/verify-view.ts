import { fromBase64, importPublicKey, verify } from "../signing";
import type { Tool } from "./dom";

const MAX_CLOCK_SKEW = 5 * 60;

const describeAge = (seconds: number) => {
    const units: [string, number][] = [
        ["year", 31_536_000],
        ["day", 86_400],
        ["hour", 3_600],
        ["minute", 60],
        ["second", 1],
    ];
    const [unit, size] = units.find(
        ([, size]) => Math.abs(seconds) >= size,
    ) ?? ["second", 1];
    const count = Math.floor(Math.abs(seconds) / size);
    return `${count} ${unit}${count === 1 ? "" : "s"}`;
};

// Separate from the signature's result: a good signature on a stale message is still refused.
const describeTimestamp = (timestamp: string, now: number) => {
    if (!/^\d+$/.test(timestamp)) {
        return {
            fresh: false,
            result: "Timestamp not readable.",
            detail: "It is not a Unix timestamp in whole seconds, so a receiver would refuse this message.",
        };
    }
    const age = now - Number(timestamp);
    const distance = `${describeAge(age)} ${age < 0 ? "from now" : "old"}.`;
    if (Math.abs(age) <= MAX_CLOCK_SKEW) {
        return {
            fresh: true,
            result: "Timestamp current.",
            detail: `${distance} That is within the 5 minutes a receiver allows.`,
        };
    }
    return {
        fresh: false,
        result: age > 0 ? "Timestamp too old." : "Timestamp too far ahead.",
        detail: `${distance} A receiver would refuse this message for that alone, whatever the signature says.`,
    };
};

const fill = (item: HTMLElement, result: string, detail: string) => {
    const resultText = item.querySelector<HTMLElement>("[data-result]");
    const detailText = item.querySelector<HTMLElement>("[data-detail]");
    if (resultText) resultText.textContent = result;
    if (detailText) detailText.textContent = detail;
};

const setCheck = (
    item: HTMLElement,
    passed: boolean | null,
    detail: string,
) => {
    item.dataset.state = passed === null ? "skip" : passed ? "pass" : "fail";
    fill(item, passed === null ? "Not run" : passed ? "Pass" : "Fail", detail);
};

const showTimestamp = (clock: HTMLElement, timestamp: string) => {
    const { fresh, result, detail } = describeTimestamp(
        timestamp,
        Math.floor(Date.now() / 1000),
    );
    clock.dataset.state = fresh ? "pass" : "warn";
    fill(clock, result, detail);
};

export const showVerified = async (
    { field, output }: Tool,
    parts: string[],
    isCurrent: () => boolean,
) => {
    const signature = fromBase64(field("signature").value.trim());
    const decoded = signature?.length === 64;
    const key = await importPublicKey(field("public-key").value.trim());
    const matches =
        decoded && key
            ? await verify(key, signature as Uint8Array<ArrayBuffer>, parts)
            : null;
    if (!isCurrent()) return;

    setCheck(
        output("check-decode"),
        decoded,
        decoded
            ? ""
            : signature
              ? `It decodes to ${signature.length} bytes, and an Ed25519 signature is 64.`
              : "It is not standard base64 with padding.",
    );
    setCheck(
        output("check-key"),
        key !== null,
        key ? "" : "It is not an Ed25519 public key in base64 SPKI.",
    );
    setCheck(
        output("check-signature"),
        matches,
        matches === null
            ? "This needs a readable signature and public key."
            : matches
              ? ""
              : "The signature does not cover this string, for this key.",
    );

    const verdict = output("verdict");
    verdict.dataset.state = matches ? "pass" : "fail";
    verdict.textContent = matches ? "Signature valid." : "Signature invalid.";
    output("mismatch").hidden = matches !== false;

    showTimestamp(output("clock"), field("timestamp").value.trim());
};
