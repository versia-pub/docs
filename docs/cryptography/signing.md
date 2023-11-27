# Cryptography

Lysand uses cryptography to ensure that objects are not tampered with during transit. This is done by signing objects with a private key, and verifying the signature with a public key.

> **Note**: The author of the object is the actor that created the object, indicated by the `author` property on the object body. The server that is sending the object is the server that is sending the object to another server.

All HTTP requests **MUST** be sent over HTTPS. Servers **MUST** not accept HTTP requests, unless it is for development purposes.

HTTP requests **MUST** be signed with the public key of the author of the object. This is done by adding a `Signature` header to the request.

The `Signature` header **MUST** be formatted as follows:
```
Signature: keyId="https://example.com/users/uuid",algorithm="ed25519",headers="(request-target) host date digest",signature="base64_signature"
```

The `keyId` field **MUST** be the URI of the user that is sending the request.

The `algorithm` field **MUST** be `ed25519`.

The `headers` field **MUST** be `(request-target) host date digest`.

The `signature` field **MUST** be the base64-encoded signature of the request.

The signature **MUST** be calculated as follows:

1. Create a string that contains the following:
```
(request-target): post /users/uuid/inbox
host: example.com
date: Fri, 01 Jan 2021 00:00:00 GMT
digest: SHA-256=base64_digest
```

1. Sign the string with the user's private key.

2. Base64-encode the signature.

The `digest` field **MUST** be the SHA-256 digest of the request body, base64-encoded.

The `date` field **MUST** be the date and time that the request was sent, formatted as follows (ISO 8601):
```
Fri, 01 Jan 2021 00:00:00 GMT
```

The `host` field **MUST** be the domain of the server that is receiving the request.

The `request-target` field **MUST** be the request target of the request, formatted as follows:
```
post /users/uuid/inbox
```

Where `/users/uuid/inbox` is the path of the request.

Here is an example of signing a request using TypeScript and the WebCrypto API:

```typescript
/**
 * Convert a string into an ArrayBuffer
 * from https://developers.google.com/web/updates/2012/06/How-to-convert-ArrayBuffer-to-and-from-String
 */
const str2ab = (str: string) => {
	const buf = new ArrayBuffer(str.length);
	const bufView = new Uint8Array(buf);
	for (let i = 0, strLen = str.length; i < strLen; i++) {
		bufView[i] = str.charCodeAt(i);
	}
	return buf;
};

const privateKey = await crypto.subtle.importKey(
    "pkcs8",
    str2ab(atob("base64_private_key")),
    "Ed25519",
    false,
    ["sign"]
);

const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode("request_body")
);

const userInbox = new URL("...");

const date = new Date();

const signature = await crypto.subtle.sign(
    "Ed25519",
    privateKey,
    new TextEncoder().encode(
        `(request-target): post ${userInbox.pathname}\n` +
            `host: ${userInbox.host}\n` +
            `date: ${date.toUTCString()}\n` +
            `digest: SHA-256=${btoa(
                String.fromCharCode(...new Uint8Array(digest))
            )}\n`
    )
);

const signatureBase64 = btoa(
    String.fromCharCode(...new Uint8Array(signature))
);
```

> **Note**: Support for Ed25519 in the WebCrypto API is recent and may not be available in some older runtimes, such as Node.js or older browsers.

The request can then be sent with the `Signature`, `Origin` and `Date` headers as follows:
```ts
await fetch("https://example.com/users/uuid/inbox", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        Date: date.toUTCString(),
        Origin: "https://example.com",
        Signature: `keyId="${...}",algorithm="ed25519",headers="(request-target) host date digest",signature="${signatureBase64}"`,
    },
    body: JSON.stringify({
        // ...
    })
});
```

Example of validation on the server side:

```typescript
// request is a Request object containing the previous request
// public_key is the user's public key in raw base64 format

const signatureHeader = request.headers.get("Signature");

const signature = signatureHeader.split("signature=")[1].replace(/"/g, "");

const origin = request.headers.get("Origin");

const date = request.headers.get("Date");

const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(await request.text())
);

const expectedSignedString = `(request-target): ${request.method.toLowerCase()} ${request.url}\n` +
    `host: ${request.url}\n` +
    `date: ${date}\n` +
    `digest: SHA-256=${btoa(digest)}`;

// Check if signed string is valid
const isValid = await crypto.subtle.verify(
    "Ed25519",
    publicKey,
    new TextEncoder().encode(signature),
    new TextEncoder().encode(expectedSignedString)
);

if (!isValid) {
    throw new Error("Invalid signature");
}
```

Signature is **REQUIRED** on **ALL** outbound requests. If the request is not signed, the server **MUST** respond with a `401 Unauthorized` response code. However, the receiving server is not required to validate the signature, it just must be provided.

If a request is made by the server and not by a server actor, the [Server Actor](/federation/server-actor) **MUST** be used in the `author` field.
