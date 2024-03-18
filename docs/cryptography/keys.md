# Public Key Cryptography

Lysand employs public key cryptography for object signing, ensuring the authenticity of the object's origin.

All public keys in Lysand **MUST** be encoded using the [ed25519](https://ed25519.cr.yp.to/) algorithm. This algorithm is favored due to its speed, security, and compact key size. Legacy algorithms such as RSA are not supported and **SHOULD NOT** be implemented using extensions due to security considerations.

While it's technically possible to implement other encryption algorithms using extensions, it's generally discouraged.

In the near future, Lysand will also support quantum-resistant Kyber algorithms, once they are incorporated into the Web Crypto API.

Here's an example of generating a public-private key pair in TypeScript using the WebCrypto API:

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

> [!WARNING]
> Support for Ed25519 in the WebCrypto API is a recent addition and may not be available in some older runtimes, such as Node.js or older browsers.

Public key data is represented as follows across the protocol:

```ts
interface ActorPublicKeyData {
    public_key: string;
    actor: string;
}
```

The `public_key` field is a string that contains the user's public key. It **MUST** be encoded using base64.

Base64 encoding of public and private keys is defined as follows:
- The public key **MUST** be encoded using the `spki` format.
- The private key **MUST** be encoded using the `pkcs8` format.
- Both keys **MUST** be turned from raw bytes to base64 by turning the bytes into a sequence of UTF-16 code units, then encoding them as base64 (as shown in the example above).

The `actor` field is a string that contains the user's URI. This field is mandatory.