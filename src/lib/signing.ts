// The signing steps from `/signatures`, for the pieces of the site that run them in the browser.

/** The published key from `/guides/signing-requests`. It is public, so it is safe to ship. */
const EXAMPLE_PRIVATE_KEY =
    "MC4CAQAwBQYDK2VwBCIEILrNXhbWxC/MhKQDsJOAAF1FH/R+Am5G/eZKnqNum5ro";

export type Message = {
    method: string;
    domain: string;
    path: string;
    timestamp: string;
    body: string;
};

const encode = (text: string) => new TextEncoder().encode(text);

const toBase64 = (bytes: ArrayBuffer) =>
    btoa(String.fromCharCode(...new Uint8Array(bytes)));

/** Standard alphabet with padding only, as `/signatures` requires. Null if it is anything else. */
export const fromBase64 = (text: string) => {
    if (text.length % 4 !== 0 || !/^[A-Za-z0-9+/]*={0,2}$/.test(text)) {
        return null;
    }
    return Uint8Array.from(atob(text), (char) => char.charCodeAt(0));
};

/** `$0` to `$4`, in order. */
export const signingParts = async ({
    method,
    domain,
    path,
    timestamp,
    body,
}: Message) => [
    method.toLowerCase(),
    domain.toLowerCase(),
    path,
    timestamp,
    toBase64(await crypto.subtle.digest("SHA-256", encode(body))),
];

export const verify = (
    key: CryptoKey,
    signature: Uint8Array<ArrayBuffer>,
    parts: string[],
) => crypto.subtle.verify("Ed25519", key, signature, encode(parts.join(" ")));

/** The example key pair. */
export const exampleKeys = async () => {
    const privateKey = await crypto.subtle.importKey(
        "pkcs8",
        Uint8Array.from(atob(EXAMPLE_PRIVATE_KEY), (char) =>
            char.charCodeAt(0),
        ),
        "Ed25519",
        true,
        ["sign"],
    );
    const { x } = await crypto.subtle.exportKey("jwk", privateKey);
    const publicKey = await crypto.subtle.importKey(
        "jwk",
        { kty: "OKP", crv: "Ed25519", x },
        "Ed25519",
        true,
        ["verify"],
    );
    return { privateKey, publicKey };
};

/** Chrome 137, Firefox 129, Safari 17 and later, in a secure context. */
export const canSign = async () => {
    try {
        await exampleKeys();
        return true;
    } catch {
        return false;
    }
};
