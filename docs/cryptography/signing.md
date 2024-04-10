# Cryptography in Lysand

Lysand employs cryptography to safeguard objects from being altered during transit. This is achieved by signing objects using a private key, and then verifying the signature with a corresponding public key.

> [!NOTE]
> The 'author' of the object refers to the entity (usually an [Actor](../objects/actors)) that created the object. This is indicated by the `author` property on the object body.

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
date: 2024-04-10T01:27:24.880Z
digest: SHA-256=base64_digest
```

1. Sign the string with the user's private key.

2. Base64-encode the signature.

The `digest` field **MUST** be the SHA-256 digest of the request body, base64-encoded.

The `date` field **MUST** be the date and time that the request was sent, formatted as follows (ISO 8601):
```
2024-04-10T01:27:24.880Z
```

The `host` field **MUST** be the host of the server that is receiving the request.

The `request-target` field **MUST** be the request target of the request, formatted as follows:
```
post /users/uuid/inbox
```

Where `/users/uuid/inbox` is the path of the request (this will depend on implementations).

Let's imagine a user at `example.com` wants to send something to a user at `receiver.com`'s inbox.

Here is an example of signing a request using TypeScript and the WebCrypto API (replace `status_author_private_key`, `full_lysand_object_as_string` and sample text appropriate):

```typescript
const privateKey = await crypto.subtle.importKey(
	"pkcs8",
	Uint8Array.from(atob(status_author_private_key), (c) =>
		c.charCodeAt(0),
	),
	"Ed25519",
	false,
	["sign"],
);

const digest = await crypto.subtle.digest(
	"SHA-256",
	new TextEncoder().encode(full_lysand_object_as_string),
);

const userInbox = new URL(
	"https://receiver.com/users/22a56612-9909-48ca-84af-548b28db6fd5/inbox"
);

const date = new Date();

const signature = await crypto.subtle.sign(
	"Ed25519",
	privateKey,
	new TextEncoder().encode(
		`(request-target): post ${userInbox.pathname}\n` +
			`host: ${userInbox.host}\n` +
			`date: ${date.toISOString()}\n` +
			`digest: SHA-256=${btoa(
				String.fromCharCode(...new Uint8Array(digest)),
			)}\n`,
	),
);

const signatureBase64 = btoa(
	String.fromCharCode(...new Uint8Array(signature)),
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
        Origin: "example.com",
        Signature: `keyId="https://example.com/users/caf18716-800d-4c88-843d-4947ab39ca0f",algorithm="ed25519",headers="(request-target) host date digest",signature="${signatureBase64}"`,
    },
    body: full_lysand_object_as_string,
});
```

Example of validation on the server side:

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
	Uint8Array.from(atob(sender.publicKey), (c) => c.charCodeAt(0)),
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
	`digest: SHA-256=${btoa(
		String.fromCharCode(...new Uint8Array(digest)),
	)}\n`;

// Check if signed string is valid
const isValid = await crypto.subtle.verify(
	"Ed25519",
	public_key,
	Uint8Array.from(atob(signature), (c) => c.charCodeAt(0)),
	new TextEncoder().encode(expectedSignedString),
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
