# HTTP Signatures

Lysand employs cryptography to safeguard objects from being altered during transit. This is achieved by signing objects using a private key, and then verifying the signature with a corresponding public key.

> [!NOTE]
> The 'author' of the object refers to the entity (usually an [Actor](../objects/actors)) that created the object. This is indicated by the `author` property on the object body.

> [!NOTE]
> Please see the [API Security](api.md) document for security guidelines.

## Creating a Signature

Prerequisites:
- A private key for the author of the object.
- The object to be signed, serialized as a string.

### Signature

The `Signature` is a string, typically sent as part of the `Signature` HTTP header. It contains a signed string signed with a private key.

It is formatted as follows:
```
Signature: keyId="$0",algorithm="ed25519",headers="(request-target) host date digest",signature="$1"
```

- `$0` is the URI of the user that is sending the request. (e.g., `https://example.com/users/uuid`)
- `$1` is the base64-encoded signed string.

The signed string is calculated as follows:

1. Create a string that contains the following, replacing the placeholders with the actual values of the request:
```
(request-target): post $2
host: $3
date: $4
digest: SHA-256=$5
```

- `$2` is the path of the request (e.g., `/users/uuid/inbox`).
- `$3` is the host of the server that is receiving the request.
- `$4` is the date and time that the request was sent (ISO 8601, e.g. `2024-04-10T01:27:24.880Z`).
- `$5` is the SHA-256 digest of the request body, base64-encoded.

> [!WARNING]
> The last line of the signed string **MUST** be terminated with a newline character (`\n`).

2. Sign the string with the user's private key.

2. Base64-encode the signature.

#### Example

Let's imagine a user at `sender.com` wants to send something to a user at `receiver.com`'s inbox.

Here is an example of signing a request using TypeScript and the WebCrypto API.

```typescript
const privateKey = ... // CryptoKey
const body = {...} // Object to be signed
const date = new Date();

const digest = await crypto.subtle.digest(
	"SHA-256",
    // Make sure to follow the JSON object handling guidelines
    // This just uses JSON.stringify as an example
	new TextEncoder().encode(JSON.stringify(body)),
);

const userInbox = new URL(
	"https://receiver.com/users/22a56612-9909-48ca-84af-548b28db6fd5/inbox"
);

const date = new Date();

// Note: the Buffer class is from the Node.js Buffer API, this can be replaced with btoa and atob magic in the browser
const signature = await crypto.subtle.sign(
    "Ed25519",
    privateKey,
    new TextEncoder().encode(
        `(request-target): post ${userInbox.pathname}\n` +
            `host: ${userInbox.host}\n` +
            `date: ${date.toISOString()}\n` +
            `digest: SHA-256=${Buffer.from(new Uint8Array(digest)).toString(
                "base64",
            )}\n`,
    ),
);

const signatureBase64 = Buffer.from(new Uint8Array(signature)).toString(
    "base64",
);
```

> [!WARNING]
> Support for Ed25519 in the WebCrypto API is recent and may not be available in some older runtimes, such as Node.js or older browsers.

The request can then be sent with the `Signature`, `Origin` and `Date` headers as follows:
```ts
await fetch("https://receiver.com/users/22a56612-9909-48ca-84af-548b28db6fd5/inbox", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        Date: date.toISOString(),
        Origin: "sender.com",
        Signature: `keyId="https://sender.com/users/caf18716-800d-4c88-843d-4947ab39ca0f",algorithm="ed25519",headers="(request-target) host date digest",signature="${signatureBase64}"`,
    },
    // Once again, make sure to follow the JSON object handling guidelines
    body: JSON.stringify(body),
});
```

Example of validation on the receiving server side:

```typescript
// req is a Request object
const signatureHeader = req.headers.get("Signature");
const origin = req.headers.get("Origin");
const date = req.headers.get("Date");

if (!signatureHeader) {
	return errorResponse("Missing Signature header", 400);
}

if (!origin) {
	return errorResponse("Missing Origin header", 400);
}

if (!date) {
	return errorResponse("Missing Date header", 400);
}

const signature = signatureHeader
	.split("signature=")[1]
	.replace(/"/g, "");

const digest = await crypto.subtle.digest(
	"SHA-256",
	new TextEncoder().encode(JSON.stringify(body)),
);

const keyId = signatureHeader
	.split("keyId=")[1]
	.split(",")[0]
	.replace(/"/g, "");

// TODO: Fetch sender using WebFinger if not found
const sender = ... // Get sender from your database via its URI (inside the keyId variable)

const public_key = await crypto.subtle.importKey(
    "spki",
    // Buffer is a Node.js API, this can be modified to work in browser too
    Buffer.from(sender.publicKey, "base64"),
    "Ed25519",
    false,
    ["verify"],
);


const expectedSignedString =
    `(request-target): ${req.method.toLowerCase()} ${
        new URL(req.url).pathname
    }\n` +
    `host: ${new URL(req.url).host}\n` +
    `date: ${date}\n` +
    `digest: SHA-256=${Buffer.from(new Uint8Array(digest)).toString(
        "base64",
    )}\n`;

// Check if signed string is valid
const isValid = await crypto.subtle.verify(
    "Ed25519",
    public_key,
    Buffer.from(signature, "base64"),
    new TextEncoder().encode(expectedSignedString),
);

if (!isValid) {
    throw new Error("Invalid signature");
}
```

Signature is **REQUIRED** on **ALL** outbound and inbound requests. If the request is not signed, the server **MUST** respond with a `401 Unauthorized` response code. However, the receiving server is not required to validate the signature, it just must be provided.

If a request is made by the server and not by a user, the [Server Actor](/federation/server-actor) **MUST** be used in the `author` field.