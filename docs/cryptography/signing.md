# Cryptography in Lysand

Lysand employs cryptography to safeguard objects from being altered during transit. This is achieved by signing objects using a private key, and then verifying the signature with a corresponding public key.

> [!NOTE]
> The 'author' of the object refers to the entity (usually an [Actor](objects/actors)) that created the object. This is indicated by the `author` property on the object body.

All HTTP requests **MUST** be sent over HTTPS for security reasons. Servers **MUST NOT** accept HTTP requests, unless it is for development purposes.

HTTP requests **MUST** be signed with the public key of the object's author. This is done by adding a `Signature` header to the request.

The `Signature` header is too be formatted as follows:
```
Signature: keyId="https://example.com/users/uuid",algorithm="ed25519",headers="(request-target) host date digest",signature="base64_signature"
```

Here, the `keyId` field **MUST** be the URI of the user that is sending the request.

The `algorithm` field **MUST** be `ed25519`.

The `headers` field **MUST** be `(request-target) host date digest`.

The `signature` field **MUST** be the base64-encoded signature of the request.

The signature is calculated as follows:

1. Create a string that contains the following, replacing the placeholders with the actual values of the request:
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
const privateKey = await crypto.subtle.importKey(
    "pkcs8",
    atob("base64_private_key"),
    "Ed25519",
    false,
    ["sign"]
);

const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode("request_body")
);

const signature = await crypto.subtle.sign(
    "Ed25519",
    privateKey,
    new TextEncoder().encode(
        "(request-target): post /users/uuid/inbox\n" +
        "host: example.com\n" +
        "date: Fri, 01 Jan 2021 00:00:00 GMT\n" +
        "digest: SHA-256=" + btoa(digest)
    )
);

const signatureBase64 = base64Encode(signature);
```

> [!WARNING]
> Support for Ed25519 in the WebCrypto API is recent and may not be available in some older runtimes, such as Node.js or older browsers.

The request can then be sent with the `Signature`, `Origin` and `Date` headers as follows:
```ts
await fetch("https://example.com/users/uuid/inbox", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Date": "Fri, 01 Jan 2021 00:00:00 GMT",
        "Origin": "https://example.com",
        "Signature": `keyId="https://example.com/users/uuid",algorithm="ed25519",headers="(request-target) host date digest",signature="${signatureBase64}"`
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

## Security Considerations

When implementing cryptography in Lysand, it is important to consider the following security considerations:
- **Key Management**: Ensure that private keys are stored securely and are not exposed to unauthorized parties.
- **Key Export**: Do not export private keys to untrusted environments, but allow users to export their private keys to secure locations.
- **Key Import**: Allow users to import private keys when creating new account, but ensure that the keys are not exposed to unauthorized parties.

Most implementations should not roll their own cryptography, but instead use well-established libraries such as the WebCrypto API. (See the [WebCrypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API) documentation for more information). Libraries written in unsafe languages, such as C, or that are a frequent source of security issues (e.g., OpenSSL) should be avoided.