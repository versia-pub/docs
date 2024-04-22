# User

Users, represented as Actors, are unique entities on the server. They are the sole type of Actor.

Here is an example user:

```json5
{
    "type": "User",
    "id": "02e1e3b2-cb1f-4e4a-b82e-98866bee5de7",
    "uri": "https://test.com/users/02e1e3b2-cb1f-4e4a-b82e-98866bee5de7",
    "created_at": "2021-01-01T00:00:00.000Z",
    "display_name": "Gordon Ramsay",
    "username": "gordonramsay",
    "avatar": {
        "image/png": {
            "content": "https://cdn.test.com/avatars/ab5081cf-b11f-408f-92c2-7c246f290593.png",
        },
        "image/webp": {
            "content": "https://cdn.test.com/avatars/ab5081cf-b11f-408f-92c2-7c246f290593.webp",
        }
    },
    "header": {
        "image/png": {
            "content": "https://cdn.test.com/banners/ab5081cf-b11f-408f-92c2-7c246f290593.png",
        },
        "image/webp": {
            "content": "https://cdn.test.com/banners/ab5081cf-b11f-408f-92c2-7c246f290593.webp",
        }
    },
    "indexable": true,
    "public_key": {
        "public_key": "...",
        "actor": "https://test.com/users/02e1e3b2-cb1f-4e4a-b82e-98866bee5de7"
    },
    "bio": {
        "text/plain": {
            "content": "My name is Gordon Ramsay, I'm a silly quirky little pony that LOVES to roleplay in the bedroom!",
        },
        "text/html": {
            "content": "My name is <b>Gordon Ramsay</b>, I'm a silly quirky little pony that <i>LOVES</i> to roleplay in the bedroom!",
        }
    },
    "fields": [
        {
            "key": {
                "text/plain": {
                    "content": "Where I live",
                }
            },
            "value": {
                "text/plain": {
                    "content": "Portland, Oregon",
                }
            }
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

All text fields can incorporate [Custom Emojis](../extensions/custom-emojis) as part of the Custom Emojis protocol extension. If a server doesn't support the Custom Emojis extension, no additional work is required to ensure text field compatibility: custom emojis are denoted as part of the plaintext content using `:emoji-name:` syntax, which won't disrupt text formatting.

### Type

The `type` of a `User` is invariably `User`.

### Public Key

| Name       | Type                                       | Required |
| :--------- | :----------------------------------------- | :------- |
| public_key | [ActorPublicKeyData](../cryptography/keys) | Yes      |

Author public key. Used to authenticate the actor's identity for their posts. The key **MUST** be encoded in base64.

All actors **MUST** have a `public_key` field. All servers **SHOULD** authenticate the actor's identity using the `public_key` field, which is used to encode any HTTP requests emitted on behalf of the actor.

For more information on cryptographic signing, please see the [Signing](/cryptography/signing) page.

Example of encoding the key in TypeScript:
```ts
// Where keyPair is your key pair
const publicKey = btoa(String.fromCharCode(...new Uint8Array(await crypto.subtle.exportKey("spki", keyPair.publicKey))));
```

### Display Name

| Name         | Type   | Required |
| :----------- | :----- | :------- |
| display_name | String | No       |

User's display name. If it is not provided, it is assumed that the actor does not have a display name, and the actor's username should be used instead as a fallback.

Display names **MUST** be treated as mutable, and **MUST NOT** be used to identify the actor.

It is recommended that servers limit the display name length from 1 to 50 characters, but the server has the discretion to decide the display name length. The protocol does not impose an upper limit for the display name length.

### Username

| Name     | Type   | Required |
| :------- | :----- | :------- |
| username | String | Yes      |

Actor's username (`@cpluspatch` for example). It is used to loosely identify the actor, and **MUST** be unique across all actors of a server.

The `username` field **MUST NOT** be used to identify the actor internally or across the protocol. It is only meant to be used as a display name, and as such is mutable by the user.

The `username` field **MUST** be a string that contains only alphanumeric lowercase characters, underscores, and dashes. It **MUST NOT** contain any spaces or other special characters.

It **MUST** match this regex: `/^[a-z0-9_-]+$/`

It is recommended that servers limit the username length from 1 to 20 characters, but the server has the discretion to decide the username length. The protocol does not impose an upper limit for the username length.

#### Implementation Details

Usernames are intended to be mutable, but clients should guard this action with warnings and confirmations to prevent accidental changes. Servers should also rate limit username changes to prevent abuse.

Since user search is done via the username, servers could implement a username history system to be able to find users by their old usernames. However, users might not want to be found by their old usernames, so this feature should be implemented with privacy in mind.

### Indexable

| Name      | Type    | Required |
| :-------- | :------ | :------- |
| indexable | Boolean | Yes      |

Whether or not the actor should be indexed by search engines.

Servers and search engines should respect the `indexable` field, and **SHOULD NOT** index the actor if the `indexable` field is set to `false`. This is to protect the privacy of users that do not want to be indexed by search engines.

#### Implementation Details

This field should also trigger a change in the `robots.txt` file of the server, to prevent search engines from indexing the user's profile, or some other kind of mechanism to prevent indexing (some search engines support using meta tags or headers for example)

### Avatar

| Name   | Type          | Required |
| :----- | :------------ | :------- |
| avatar | ContentFormat | No       |

Profile picture for users. If it is not provided, it is assumed that the actor does not have an avatar.

The avatar content_type **MUST** be an image format, such as `image/png` or `image/jpeg`. The avatar content_type **MUST NOT** be a video format, such as `video/mp4` or `video/webm`.

It is strongly recommended that servers provide both the original format and a modern format for each avatar, such as WebP, AVIF, JXL, or HEIF. This is to reduce bandwidth usage and improve performance for clients.

Clients should display the most modern format that they support, such as WebP, AVIF, JXL, or HEIF. If the client does not support any modern formats, it should display the original format.

### Header

| Name   | Type          | Required |
| :----- | :------------ | :------- |
| header | ContentFormat | No       |

Banner for users. If it is not provided, it is assumed that the actor does not have a header.

The header content_type **MUST** be an image format, such as `image/png` or `image/jpeg` (animated images are permitted). The header content_type **MUST NOT** be a video format, such as `video/mp4` or `video/webm`.

It is strongly recommended that servers provide both the original format and a modern format for each header, such as WebP, AVIF, JXL, or HEIF. This is to reduce bandwidth usage and improve performance for clients.

Clients should display the most modern format that they support, such as WebP, AVIF, JXL, or HEIF. If the client does not support any modern formats, it should display the original format.

### Bio

| Name | Type          | Required |
| :--- | :------------ | :------- |
| bio  | ContentFormat | No       |

Used to display a short description of the actor to cleints. It is recommended that servers limit the bio length from 500 to a couple thousand characters, but the server has the discretion to decide the bio length. The protocol does not impose an upper limit for the bio length.

The `bio` **MUST** be a text format, such as `text/plain` or `text/html`. The `bio` **MUST NOT** be a binary format, such as `image/png` or `video/mp4`.

An example value for the `bio` field would be:
```json5
{
    // ...
    "bio": {
        "text/plain": {
            "content": "This is my bio!",
        },
        "text/html": {
            "content": "This is my <b>bio</b>!",
        }
    }
    // ...
}
```

> [!NOTE]
> Lysand heavily recommends that servers support the `text/html` content type, as it is the most rich content type that is supported by most clients.
> 
> Lysand also recommends that servers always include a `text/plain` version of each object, as it is the most basic content type that is supported by all clients, such as command line clients.

It is up to the client to choose which content format to display to the user. The client may choose to display the first content format that it supports, or it may choose to display the content format that it thinks is the most appropriate.

### Fields

| Name   | Type           | Required |
| :----- | :------------- | :------- |
| fields | Array of Field | No       |

Custom key-value pairs for clients, such as additional metadata. If not provided, it is assumed that the actor does not have any fields.

An example value for the `fields` field would be:
```json5
{
    // ...
    "fields": [
        {
            "key": {
                "text/plain": {
                    "content": "Where I live",
                }
            },
            "value": {
                "text/plain": {
                    "content": "Portland, Oregon",
                }
            }
        }
        // Other fields...
    ]
    // ...
}
```

Fields are formatted as follows:
```ts
interface Field {
    key: ContentFormat;
    value: ContentFormat;
}
```

Both `key` and `value` should be presented to the user as a pair.

The `key` and `value` fields **MUST** be text formats, such as `text/plain` or `text/html`. They **MUST NOT** be binary formats, such as `image/png` or `video/mp4`.

### Featured

| Name     | Type   | Required |
| :------- | :----- | :------- |
| featured | String | Yes      |

Please refer to [Featured Publications](../federation/endpoints) for more information.

### Followers

| Name      | Type   | Required |
| :-------- | :----- | :------- |
| followers | String | Yes      |

Please refer to [User Followers](../federation/endpoints) for more information.

### Following

| Name      | Type   | Required |
| :-------- | :----- | :------- |
| following | String | Yes      |

Please refer to [User Following](../federation/endpoints) for more information.

### Likes

| Name  | Type   | Required |
| :---- | :----- | :------- |
| likes | String | Yes      |

Please refer to [User Likes](../federation/endpoints) for more information.

### Dislikes

| Name     | Type   | Required |
| :------- | :----- | :------- |
| dislikes | String | Yes      |

Please refer to [User Dislikes](../federation/endpoints) for more information.

### Inbox

| Name  | Type   | Required |
| :---- | :----- | :------- |
| inbox | String | Yes      |

The `inbox` field on an Actor is a string that displays the URI of the actor's inbox. It is used to identify the actor's inbox for federation.

Please refer to [Inbox](../federation/endpoints) for more information.

### Outbox

| Name   | Type   | Required |
| :----- | :----- | :------- |
| outbox | String | Yes      |

The `outbox` field on an Actor is a string that displays the URI of the actor's outbox. It is used to identify the actor's outbox for federation.

Please refer to [Outbox](../federation/endpoints) for more information.

## Related Extensions

These extensions might add or affect the User object if used:
- [Custom Emojis](../extensions/custom-emojis)
- [Vanity Profile](../extensions/vanity)

## Types

```typescript
interface User extends Entity {
    type: "User";
    id: string;
    uri: string;
    created_at: string;
    display_name?: string;
    username: string;
    avatar?: ContentFormat;
    header?: ContentFormat;
    indexable: boolean;
    public_key: ActorPublicKeyData;
    bio?: ContentFormat;
    fields?: Field[];
    featured: string;
    followers: string;
    following: string;
    likes: string;
    dislikes: string;
    inbox: string;
    outbox: string;
    extensions?: Entity["extensions"] & {
        "org.lysand:vanity"?: VanityExtension;
    };
}
```

```typescript
interface Field {
    key: ContentFormat;
    value: ContentFormat;
}
```