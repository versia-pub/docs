# Server Endorsement

The Server Endorsement extension allows servers to endorse other servers. This is useful as an alternative to open-air federation, where servers can endorse other servers that they trust. Only endorsed servers and the servers endorsed by those (up to a configurable depth) will be federated with.

## Endorsement Object

The endorsement object is an object that contains information about the endorsement. It is formatted as follows:

```json5
{
    "type": "Extension",
    "extension_type": "org.lysand:server_endorsement/Endorsement",
    "author": "https://example.com/actor", // Should be the server actor
    "id": "ed480922-b095-4f09-9da5-c995be8f5960",
    "uri": "https://example.com/actions/ed480922-b095-4f09-9da5-c995be8f5960",
    "server": "https://example.com",
}
```

The `server` field is a string that represents the URI of the server that is being endorsed. This URI **MUST** be the URI of the server's root endpoint. For example, `https://example.com`.

This URI **MUST** be HTTPS and **MUST NOT** be an IP address.

The `server` field is required on all Endorsement objects.

Endorsement objects **MUST** be sent to the server actor's inbox, whenever a new endorsement is made by the server admins.

### Author

The `author` field **MUST** be the server actor. This field is required so that servers can cryptographically sign the endorsement with the server actor's `public_key`.

## Endorsement Collection

The URI to the endorsement collection may be specified inside the server's metadata, inside `extensions`:

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

This should return a `Collection` object that contains a list of `Endorsement` objects.

## Behaviour Of Endorsements

When a server receives an endorsement, it **MUST** verify the signature of the endorsement. If the signature is invalid, the server **MUST** discard the endorsement. This goes the same for fetching the endorsement collection.

It is up to the server to decide what it does with the endorsement: Endorsements are designed to apply as a flexible whitelist for servers, with the admins choosing a couple of trusted servers when setting up for the first time and then adding more as they go.

Servers **SHOULD** show the endorsements that they have received to their admins, and allow them to accept or reject the endorsement. Ultimately, it is up to the admins to decide what to do with the endorsement.

Endorsements should be treated as a guarantee of trust: If a server endorses another server, it is saying that it trusts that server. Servers should not endorse servers that they do not trust.

Finally, servers **can** check the endorsed servers of the servers that they have endorsed, up to a configurable depth. This is to create a chain of trust, where servers can endorse servers that they trust, and servers that they trust can endorse servers that they trust, and so on.
