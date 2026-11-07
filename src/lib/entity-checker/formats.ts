// The formats the pages define, as checks that return what is wrong, or nothing. Each message is
// written to follow the name of what it checks, as in "Its domain has a port number".

/** /entities: an `id` holds `a-z`, `A-Z`, `0-9`, `-` and `_`, at least one of them. */
const idProblem = (id: string) => {
    if (id === "") return "is empty";
    if (!/^[A-Za-z0-9_-]+$/.test(id)) {
        return "has characters other than `a-z`, `A-Z`, `0-9`, `-` and `_`";
    }
    return undefined;
};

/** /entities#domain, which lists valid and invalid examples. */
export const domainProblem = (domain: string) => {
    if (domain === "") return "is empty";
    if (domain.includes("://")) return "has a protocol";
    if (domain.includes("/")) return "has a path";
    if (/[^\x21-\x7e]/.test(domain)) {
        return "is not in its ASCII `xn--` form";
    }
    if (domain.includes(":")) return "has a port, or is an IPv6 address";
    if (domain !== domain.toLowerCase()) return "has uppercase letters";
    if (domain.endsWith(".")) return "ends with a dot";
    const labels = domain.split(".");
    if (labels.includes("")) return "has an empty label";
    if (labels.length < 2) return "is a single label";
    if (/^[0-9]+$/.test(labels.at(-1) ?? "")) {
        return "is an IP address";
    }
    // RFC 1123 hostnames: letters, digits and inner hyphens, at most 63 to a label.
    if (
        labels.some(
            (label) => !/^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?$/.test(label),
        )
    ) {
        return "is not a valid hostname";
    }
    return undefined;
};

const lower = (text: string) => text.charAt(0).toLowerCase() + text.slice(1);

/** /entities#reference: `domain:id`, with the domain always present. */
export const referenceProblem = (reference: string) => {
    const separator = reference.indexOf(":");
    if (separator === -1) {
        return "has no domain, as in `domain:id`";
    }
    const domain = domainProblem(reference.slice(0, separator));
    if (domain) return `its domain ${lower(domain)}`;
    const id = idProblem(reference.slice(separator + 1));
    if (id) return `its id ${id}`;
    return undefined;
};

const RFC3339 =
    /^(\d{4})-(\d{2})-(\d{2})[Tt](\d{2}):(\d{2}):(\d{2})(\.\d+)?(?:[Zz]|[+-](\d{2}):(\d{2}))$/;

/** RFC 3339 syntax only. Whether a date is plausible is up to the receiver, as /validation says. */
export const timestampProblem = (text: string) => {
    const match = RFC3339.exec(text);
    if (!match) return "is not RFC 3339, such as `2021-01-01T00:00:00Z`";
    const [
        year,
        month,
        day,
        hour,
        minute,
        second,
        ,
        offsetHour = 0,
        offsetMinute = 0,
    ] = match
        .slice(1)
        .map((part) =>
            part === undefined ? undefined : Number(part.replace(".", "")),
        );
    const days = new Date(
        Date.UTC(Number(year), Number(month), 0),
    ).getUTCDate();
    const inRange =
        Number(month) >= 1 &&
        Number(month) <= 12 &&
        Number(day) >= 1 &&
        Number(day) <= days &&
        Number(hour) <= 23 &&
        Number(minute) <= 59 &&
        Number(second) <= 60 &&
        Number(offsetHour) <= 23 &&
        Number(offsetMinute) <= 59;
    return inRange ? undefined : "has a date, time or offset out of range";
};

/** /json#numbers: an `integer` is a whole number from 0 to 2⁵³-1, in any form JSON allows. */
export const integerProblem = (value: number) =>
    Number.isInteger(value) && value >= 0 && value <= Number.MAX_SAFE_INTEGER
        ? undefined
        : "is not a whole number from 0 to 2⁵³-1";

/** /validation: URIs are run through a URL parser. */
export const uriProblem = (text: string) => {
    try {
        new URL(text);
        return undefined;
    } catch {
        return "is not a valid URI";
    }
};

/** /extensions#naming: a reversed domain, a colon, and a name in `snake_case`. */
export const extensionNameProblem = (name: string) =>
    /^[a-z0-9-]+(\.[a-z0-9-]+)+:[a-z0-9]+(_[a-z0-9]+)*$/.test(name)
        ? undefined
        : "is not an extension name, such as `pub.versia:likes`";

/** /structures/content-format: keys are media types. */
export const MEDIA_TYPE = /^[\w.+-]+\/[\w.+-]+$/;

/** Rules a field's description states, for the fields that `format` marks. */
export const formatProblems: Record<
    string,
    (value: unknown) => string | undefined
> = {
    id: (value) => (typeof value === "string" ? idProblem(value) : undefined),
    sha256: (value) =>
        typeof value === "string" && !/^[0-9a-f]{64}$/.test(value)
            ? "is not a SHA-256 hash in lowercase hex"
            : undefined,
    base64: (value) =>
        typeof value === "string" &&
        !/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(
            value,
        )
            ? "is not standard base64 with padding"
            : undefined,
    "non-negative": (value) =>
        typeof value === "number" && value < 0 ? "is negative" : undefined,
};
