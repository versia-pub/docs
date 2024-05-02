# API Security

This document details the security requirements for Lysand API implementations.

It is a **MUST** for all Lysand-compatible servers to adhere to the guidelines marked as `Server API`.

The guidelines marked as `Client API` are optional but recommended for client software.

## Server API

**Server API routes** are the endpoints of the server used by federation. These endpoints must **ONLY** be accessible by other servers and not by client software.

> [!NOTE]
> You may notice that most of these guidelines are redundant or useless for a simple JSON API system. However, they are mandated to encourage good security practices, so that developers don't overlook them on the important Client API routes.

### HTTP Security

All HTTP requests/responses **MUST** be transmitted using the **Hypertext Transfer Protocol Secure Extension** (HTTPS). Servers **MUST NOT** send responses without TLS (HTTPS), except for development purposes (e.g., if a server is operating on localhost or another local network).

Servers should support HTTP/2 and HTTP/3 for enhanced performance and security. Servers **MUST** support HTTP/1.1 at a minimum, however TLS 1.2 is not allowed.

Additionally, IPv6 is **RECOMMENDED** for all servers for enhanced security and performance. In the (far away) future, IPv4 will be removed, and servers that do not support IPv6 may face connectivity issues. (Whenever possible, servers should support both IPv4 and IPv6.)

### Content Security Policy

Servers **MUST** set a Content Security Policy (CSP) header to all their Server API routes to prevent XSS attacks. The CSP must be as restrictive as possible:

```
Content-Security-Policy: default-src 'none'; frame-ancestors 'none'
```

### Security headers

Servers **MUST** set the following security headers to all their Lysand API routes:

```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: no-referrer
Strict-Transport-Security: max-age=31536000;
```

## Object Storage

Object storage may be abused to store fake Lysand objects if the object storage is on the same origin as the server. To prevent this, servers must sign all valid objects with the author's private key, in the same way as described in the [Signing](signing.md) spec for outbound requests. This signature **MUST** be verified by any requesting server before accepting the object.

This behaviour is also documented in the [Signing](signing.md) spec and [general spec](../spec.md). It is duplicated here in case you missed it the first time.

## Client API

**Client API routes** are the endpoints of the server used by client software. These endpoints must **ONLY** be accessible by client software and not by other servers. As an example, the [Mastodon API](https://docs.joinmastodon.org/api/) is a Client API.

### Rate Limiting

Servers **SHOULD** implement rate limiting on all Client API routes to prevent abuse. The rate limit **SHOULD** be set to a reasonable value, such as 100 requests per minute per IP address. This is left to the server administrator's discretion.

### Authentication

Client API routes **SHOULD** require authentication to prevent unauthorized access. The authentication method **SHOULD** be OAuth 2.0, as it is a widely-used and secure authentication method.

Servers should also use either cryptographically secure random access tokens (via OAuth 2.0) or JWTs for authentication. The access tokens **MUST** be stored securely and **MUST NOT** be exposed to unauthorized parties.

### Content Security Policy

Servers **SHOULD** set a Content Security Policy (CSP) header to all their Client API routes to prevent XSS attacks. The CSP must be as restrictive as possible.

No example is provided here, as this specification does not mandate a specific client API for servers.

### Security headers

Servers **SHOULD** set the following security headers to all their Client API routes:

```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: no-referrer
```

If the server supports CORS, the `Access-Control-Allow-Origin` header **SHOULD** be set (usually to `*`), and the `Access-Control-Allow-Methods` header **SHOULD** be set to the allowed methods.

`Permissions-Policy` headers are **RECOMMENDED** for all Client API routes that serve JS/HTML content (the "frontend"). The permissions policy should be as restrictive as possible.

## Security Considerations

When implementing security in your server, it is important to consider the following security considerations:

### Authentication

- Tokens/JWTs should expire after a reasonable amount of time (e.g., a week) to prevent unauthorized access. Additionally, they should be invalidated after a user logs out or changes their password.
- Passwords **SHOULD** be hashed using a secure hashing algorithm, such as Argon2 or bcrypt. They **SHOULD NOT** be stored in plaintext or using weak hashing algorithms such as MD5 or SHA-1. Be also aware of weak default rounds for these algorithms.
- Servers **SHOULD** implement multi-factor authentication (MFA) to provide an additional layer of security for users.
  - Passkeys/WebAuthn are **RECOMMENDED** for MFA, as they are more secure than SMS or email-based MFA.
- Servers **SHOULD** implement very strict rate limiting on login attempts to prevent brute force attacks.
- CSRF tokens **SHOULD** be used to prevent CSRF attacks on sensitive endpoints.

### Key Management

- Ensure that private keys are stored securely and are not exposed to unauthorized parties.
- Allow exporting private keys by users in secure formats, such as encrypted files. Do not allow exporting private keys to untrusted environments. Additionally, indicate that this is a security-sensitive operation.

> [!NOTE]
> The importation of private keys is not recommended, as it can lead to security issues. However, if you choose to implement this feature, warn any users that this is probably a bad idea.

### Cryptography

- Do not roll your own security, but instead use well-established libraries such as the [WebCrypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API).
- Cryptographic libraries written in unsafe languages, such as C, or that are a frequent source of security issues (e.g., OpenSSL) should be avoided.
- Configure your server to only accept TLS 1.3 or higher, as older versions of TLS are vulnerable to attacks.

### General Security

- Have your server regularly audited for security vulnerabilities by professionals.
- Keep all packages, dependencies, and libraries up-to-date. This also includes OS libraries (OSes that don't update packages often except for security patches such as Debian can be a risk, as often times a lot of vulnerabilities are missed).
- Consider providing a container image for your server that does not run as the root user, and has all the necessary security configurations in place.
- Open-source your server software, as it allows for more eyes on the code and can help identify security vulnerabilities faster.

