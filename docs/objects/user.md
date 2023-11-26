# User

Users are Actors that represent a user on the server. They are the only type of Actor.

Here is an example user:

```json5
{
    "type": "User",
    "id": "02e1e3b2-cb1f-4e4a-b82e-98866bee5de7",
    "uri": "https://test.com/users/02e1e3b2-cb1f-4e4a-b82e-98866bee5de7",
    "created_at": "2021-01-01T00:00:00.000Z",
    "display_name": "Gordon Ramsay",
    "username": "gordonramsay",
    "avatar": [
        {
            "content": "https://cdn.test.com/avatars/ab5081cf-b11f-408f-92c2-7c246f290593.png",
            "content_type": "image/png"
        },
        {
            "content": "https://cdn.test.com/avatars/ab5081cf-b11f-408f-92c2-7c246f290593.webp",
            "content_type": "image/webp"
        }
    ],
    "header": [
        {
            "content": "https://cdn.test.com/banners/ab5081cf-b11f-408f-92c2-7c246f290593.png",
            "content_type": "image/png"
        },
        {
            "content": "https://cdn.test.com/banners/ab5081cf-b11f-408f-92c2-7c246f290593.webp",
            "content_type": "image/webp"
        }
    ],
    "indexable": true,
    "public_key": {
        "public_key": "...",
        "actor": "https://test.com/users/02e1e3b2-cb1f-4e4a-b82e-98866bee5de7"
    },
    "bio": [
        {
            "content": "My name is Gordon Ramsay, I'm a silly quirky little pony that LOVES to roleplay in the bedroom!",
            "content_type": "text/plain"
        },
        {
            "content": "My name is <b>Gordon Ramsay</b>, I'm a silly quirky little pony that <i>LOVES</i> to roleplay in the bedroom!",
            "content_type": "text/html"
        }
    ],
    "fields": [
        {
            "key": [
                {
                    "content": "Where I live",
                    "content_type": "text/plain"
                }
            ],
            "value": [
                {
                    "content": "Portland, Oregon",
                    "content_type": "text/plain"
                }
            ],
        }
    ],
    "featured": "https://test.com/users/02e1e3b2-cb1f-4e4a-b82e-98866bee5de7/featured",
    "followers": "https://test.com/users/02e1e3b2-cb1f-4e4a-b82e-98866bee5de7/followers",
    "following": "https://test.com/users/02e1e3b2-cb1f-4e4a-b82e-98866bee5de7/following",
    "likes": "https://test.com/users/02e1e3b2-cb1f-4e4a-b82e-98866bee5de7/likes",
    "dislikes": "https://test.com/users/02e1e3b2-cb1f-4e4a-b82e-98866bee5de7/dislikes",
    "inbox": "https://test.com/users/02e1e3b2-cb1f-4e4a-b82e-98866bee5de7/inbox",
    "outbox": "https://test.com/users/02e1e3b2-cb1f-4e4a-b82e-98866bee5de7/outbox",
}
```

## Fields

### Type

The `type` of a `User` is always `User`.

###  ID

The `id` field on an Actor is a UUID that represents the unique identifier of the actor as a string. It is used to identify the actor, and **MUST** be unique across all actors of the server.

### Public Key

The `public_key` field on an Actor is an [`ActorPublicKeyData`](/cryptography/keys) object. It is used to verify that the actor is who they say they are. The key **MUST** be encoded in base64.

All actors **MUST** have a `public_key` field. All servers **SHOULD** verify that the actor is who they say they are using the `public_key` field, which is used to encode any HTTP requests emitted on behalf of the actor.

> For more information on cryptographic signing, please see the [Signing](/cryptography/signing) page.

Example of encoding the key in TypeScript:
```ts
// Where keyPair is your key pair
const publicKey = btoa(String.fromCharCode(...new Uint8Array(await crypto.subtle.exportKey("spki", keyPair.publicKey))));
```

### Display Name

The `display_name` field on an Actor is a string that represents the display name of the actor. It is used to display the actor's name to the user.

The `display_name` field is not required on all actors. If it is not provided, it is assumed that the actor does not have a display name, and the actor's username should be used instead

Display names **MUST** be treated as changeable, and **MUST NOT** be used to identify the actor.

It is recommended that servers limit the length of the display name from 1 to 50 characters, but it is up to the server to decide how long the display name can be. The protocol does not have an upper limit for the length of the display name.

### Username

The `username` field on an Actor is a string that represents the username of the actor. It is used to loosely identify the actor, and **MUST** be unique across all actors of a server.

The `username` field is required on all actors.

The `username` field **MUST NOT** be used to identify the actor internally or across the protocol. It is only meant to be used as a display name, and as such is changeable by the user.

The `username` field **MUST** be a string that contains only alphanumeric characters, underscores, and dashes. It **MUST NOT** contain any spaces or other special characters.

It **MUST** match this regex: `/^[a-zA-Z0-9_-]+$/`

It is recommended that servers limit the length of the username from 1 to 20 characters, but it is up to the server to decide how long the username can be. The protocol does not have an upper limit for the length of the username.

### Indexable

The `indexable` field on an Actor is a boolean that represents whether or not the actor should be indexed by search engines. This field is required and must be included.

Servers and search engines should respect the `indexable` field, and **SHOULD NOT** index the actor if the `indexable` field is set to `false`. This is to protect the privacy of users that do not want to be indexed by search engines.

### Avatar

The `avatar` field on an Actor is an array of `ContentFormat` objects.

The `avatar` field is not required on actors. If it is not provided, it is assumed that the actor does not have an avatar.

The avatar content_type **MUST** be an image format, such as `image/png` or `image/jpeg`. The avatar content_type **MUST NOT** be a video format, such as `video/mp4` or `video/webm`.

Lysand heavily recommends that servers provide both the original format and a modern format for each avatar, such as WebP, AVIF, JXL, or HEIF. This is to reduce bandwidth usage and improve performance for clients.

Clients should display the most modern format that they support, such as WebP, AVIF, JXL, or HEIF. If the client does not support any modern formats, it should display the original format.

> **Note:** Servers may find it useful to use a CDN that can automatically convert images to modern formats, such as Cloudflare. This will offload image processing from the server, and improve performance for clients.

### Header

The `header` field on an Actor is an array that an array of`ContentFormat` objects. It is meant to serve as a banner for users.

The `header` field is not required on all actors. If it is not provided, it is assumed that the actor does not have a header.

The header content_type **MUST** be an image format, such as `image/png` or `image/jpeg`. The header content_type **MUST NOT** be a video format, such as `video/mp4` or `video/webm`.

Lysand heavily recommends that servers provide both the original format and a modern format for each header, such as WebP, AVIF, JXL, or HEIF. This is to reduce bandwidth usage and improve performance for clients.

Clients should display the most modern format that they support, such as WebP, AVIF, JXL, or HEIF. If the client does not support any modern formats, it should display the original format.

> **Note:** Servers may find it useful to use a CDN that can automatically convert images to modern formats, such as Cloudflare. This will offload image processing from the server, and improve performance for clients.

### Bio

The `bio` field on an Actor is an array of `ContentFormat` objects.

The `bio` field is not required on all actors. If it is not provided, it is assumed that the actor does not have a bio.

The `bio` field is used to display a short description of the actor to the user. It is recommended that servers limit the length of the bio from 500 to a couple thousand characters, but it is up to the server to decide how long the bio can be. The protocol does not have an upper limit for the length of the bio.

The `bio` **MUST** be a text format, such as `text/plain` or `text/html`. The `bio` **MUST NOT** be a binary format, such as `image/png` or `video/mp4`.

An example value for the `bio` field would be:
```json5
{
    // ...
    "bio": [
        {
            "content": "This is my bio!",
            "content_type": "text/plain"
        },
        {
            "content": "This is my <b>bio</b>!",
            "content_type": "text/html"
        }
    ]
    // ...
}
```

> **Note:** Lysand heavily recommends that servers support the `text/html` content type, as it is the most rich content type that is supported by most clients.

> **Note**: Lysand also recommends that servers always include a `text/plain` version of each object, as it is the most basic content type that is supported by all clients, such as command line clients.

It is up to the client to choose which content format to display to the user. The client may choose to display the first content format that it supports, or it may choose to display the content format that it thinks is the most appropriate.

### Fields

The `fields` field on an Actor is an array that contains a list of `Field` objects. It is used to display custom fields to the user, such as additional metadata.

The `fields` field is not required on all actors. If it is not provided, it is assumed that the actor does not have any fields.

An example value for the `fields` field would be:
```json5
{
    // ...
    "fields": [
        {
            "key": [
                {
                    "content": "Where I live",
                    "content_type": "text/plain"
                }
            ],
            "value": [
                {
                    "content": "Portland, Oregon",
                    "content_type": "text/plain"
                }
            ],
        }
    ]
    // ...
}
```

Fields are formatted as follows:
```ts
interface Field {
    key: ContentFormat[];
    value: ContentFormat[];
}
```

Both `key` and `value` should be presented to the user as a couple.

The `key` and `value` fields **MUST** be text formats, such as `text/plain` or `text/html`. They **MUST NOT** be binary formats, such as `image/png` or `video/mp4`.

### Featured

Please see [Featured Publications](/federation/endpoints) for more information.

### Followers

Please see [User Followers](/federation/endpoints) for more information.

### Following

Please see [User Following](/federation/endpoints) for more information.

### Likes

Please see [User Likes](/federation/endpoints) for more information.

### Dislikes

Please see [User Dislikes](/federation/endpoints) for more information.

### Inbox

The `inbox` field on an Actor is a string that represents the URI of the actor's inbox. It is used to identify the actor's inbox for federation.

Please see [Inbox](/federation/endpoints) for more information.

### Outbox

The `outbox` field on an Actor is a string that represents the URI of the actor's outbox. It is used to identify the actor's outbox for federation.

Please see [Outbox](/federation/endpoints) for more information.