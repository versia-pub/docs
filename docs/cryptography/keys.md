# Public Key Cryptography

Lysand uses public key cryptography to sign objects. It is used to verify that an object was created by the user that claims to have created it.

All public keys in Lysand **MUST** be encoded using the [ed25519](https://ed25519.cr.yp.to/) algorithm. This algorithm is used because it is fast, secure, and has a small key size. Legacy algorithms such as RSA are not supported, and **SHOULD NOT** be implemented using extensions for security.

Other encryption algorithms could be implemented using extensions, but it is not recommended.

Here is an example of generating a public-private key pair in TypeScript using the WebCrypto API:
```ts
const keyPair = await crypto.subtle.generateKey(
    "Ed25519",
    true,
    ["sign", "verify"]
);

// Encode both to base64
const publicKey = btoa(String.fromCharCode(...new Uint8Array(await crypto.subtle.exportKey("spki", keyPair.publicKey))));

const privateKey = btoa(String.fromCharCode(...new Uint8Array(await crypto.subtle.exportKey("pkcs8", keyPair.privateKey))));

// Store the public and private key somewhere in your user data
```

> **Note**: Support for Ed25519 in the WebCrypto API is recent and may not be available in some older runtimes, such as Node.js or older browsers.

Public key data is represented as such across the protocol:

```ts
interface ActorPublicKeyData {
    public_key: string;
    actor: string;
}
```

The `public_key` field is a string that contains the public key of the user. It **MUST** be encoded using base64.

The `actor` field is a string that contains the URI of the user. It is required.