# Server Endorsement

The Server Endorsement extension provides a mechanism for servers to vouch for the credibility of other servers. This is a valuable alternative to unrestricted federation, enabling servers to endorse those they deem trustworthy. Federation will only occur with endorsed servers and their subsequent endorsements, up to an admin-defined depth.

## Endorsement Entity

The endorsement entity encapsulates the details of an endorsement. It adheres to the following structure:

```json5
{
    "type": "Extension",
    "extension_type": "org.lysand:server_endorsement/Endorsement",
    "author": "https://example.com/actor", // The endorsing server's actor
    "id": "ed480922-b095-4f09-9da5-c995be8f5960",
    "uri": "https://example.com/actions/ed480922-b095-4f09-9da5-c995be8f5960",
    "server": "https://example.com",
}
```

Endorsement entities **MUST** be dispatched to the endorsing server actor's inbox whenever the server administrators create a new endorsement.

### Server

| Name   | Type   | Required |
| :----- | :----- | :------- |
| server | String | Yes      |

URI of the endorsed server. This URI **MUST** correspond to the server's root endpoint, such as `https://example.com`.

This URI **MUST NOT** be an IP address, except for development purposes.

### Author

| Name   | Type   | Required |
| :----- | :----- | :------- |
| author | String | Yes      |

The `author` field **MUST** represent the endorsing server actor. This requirement ensures that endorsements can be cryptographically signed using the server actor's `public_key`.

## Endorsement Collection

The URI for the endorsement collection can be specified within the server's metadata, under `extensions`:

```json5
{
    // ...
    "extensions": {
        "org.lysand:server_endorsement": {
            "endorsements": "https://example.com/endorsements"
        }
    }
    // ...
}
```

This should return a [Collection](../structures/collection) of `Endorsement` entities.

## Endorsement Protocol Behavior

Upon receiving an endorsement, a server **MUST** validate the endorsement's signature. If the signature is invalid, the server **MUST** disregard the endorsement. This also applies when fetching the endorsement collection.

The server has the discretion to decide how to handle the endorsement. Endorsements are intended to serve as a dynamic whitelist for servers, with administrators initially selecting a few trusted servers and progressively adding more.

Servers **SHOULD** display received endorsements to their administrators, allowing them to accept or reject the endorsement. Ultimately, the decision on how to handle the endorsement lies with the administrators.

Endorsements should be viewed as a seal of trust: If a server endorses another, it is expressing its trust in that server. Servers should refrain from endorsing servers they do not trust.

Lastly, servers **MAY** verify the endorsements of the servers they have endorsed, up to a user-defined depth. This creates a trust chain, where servers endorse those they trust, and those servers, in turn, endorse servers they trust, and so forth.

## Types

```typescript
interface Endorsement extends Extension {
    extension_type: "org.lysand:server_endorsement/Endorsement";
    author: string;
    server: string;
}
```