# Publications

Publications are the main building blocks of the Lysand protocol. They are JSON objects that represent a publication, such as a post or a comment.

Here is an example publication:
```json5
{
    "type": "Note",
    "id": "f08a124e-fe90-439e-8be4-15a428a72a19",
    "uri": "https://example.com/publications/f08a124e-fe90-439e-8be4-15a428a72a19",
    "author": "https://example.com/users/6e0204a2-746c-4972-8602-c4f37fc63bbe",
    "created_at": "2021-01-01T00:00:00.000Z",
    "content": {
        "text/plain": {
            "content": "Hello, world! I own this website: https://google.com"
        },
        "text/html": {
            "content": "Hello, <b>world</b>! I own this website! <a href=\"https://google.com\">https://google.com</a>"
        }
    },
    "category": "microblog",
    "device": {
        "name": "Megalodon for Android",
        "version": "1.3.89",
        "url": "https://sk22.github.io/megalodon"
    },
    "previews": [
        {
            "link": "https://google.com",
            "title": "Google",
            "description": "The world's most popular search engine",
            "image": "https://cdn.example.com/previews/6e0204a2-746c-4972-8602-c4f37fc63bbe.png",
            "icon": "https://google.com/favicon.ico"
        }
    ],
    "group": "public",
    "attachments": [
        {
            "image/png": {
                "content": "https://cdn.example.com/attachments/ece2f9d9-27d7-457d-b657-4ce9172bdcf8.png"
            },
            "image/webp": {
                "content": "https://cdn.example.com/attachments/ece2f9d9-27d7-457d-b657-4ce9172bdcf8.webp"
            }
        }
    ],
    "replies_to": "https://test.com/publications/0b6ecf49-2959-4590-afb6-232f57036fa6",
    "mentions": [
        "https://test.com/users/02e1e3b2-cb1f-4e4a-b82e-98866bee5de7"
    ],
}
```

## Fields

### Type

Currently available types are:
- [`Note`](./note)
- [`Patch`](./patch)

### Author

| Name   | Type   | Required |
| :----- | :----- | :------- |
| author | String | Yes      |

URI of the user that created the object.

### Content

| Name    | Type          | Required |
| :------ | :------------ | :------- |
| content | ContentFormat | No       |

Content of the Publication, such as note text for [Notes](./note). If it is not provided, it is assumed that the publication does not have any content.

It is recommended that servers limit the length of the content from 500 to a couple thousand characters, but it is up to the server to decide how long the content can be. The protocol does not have an upper limit for the length of the content.

The `content` field **MUST** be a text format, such as `text/plain` or `text/html`. The `content` field **MUST NOT** be a binary format, such as `image/png` or `video/mp4`. Platforms such as video sharing sites should use the `attachments` field for media instead.

An example value for the `content` field would be:
```json5
{
    // ...
    "content": {
        "text/plain": {
            "content": "Hello, world!"
        },
        "text/html": {
            "content": "Hello, <b>world</b>!"
        }
    }
    // ...
}
```

> [!NOTE]
> Lysand heavily recommends that servers support the `text/html` content type, as it is the richest content type that is supported by most clients.
> 
> Lysand also recommends that servers always include a `text/plain` version of each object, as it is the most basic content type that is supported by all clients, such as command line clients.

> [!WARNING]
> Servers should not trust the `text/html` content type, as it could contain malicious code. Servers should always sanitize the content before displaying it to the user.
>
> Additionally, frontends should warn users before clicking on links that do not match the link text, such as `<a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">https://google.com</a>`

It is up to the client to choose which content format to display to the user. The client may choose to display the first content format that it supports, or it may choose to display the content format that it thinks is the most appropriate.

Clients should display the richest content format that they support, such as HTML or more exotic formats such as MFM.

### Category

| Name     | Type         | Required |
| :------- | :----------- | :------- |
| category | CategoryType | No       |

Category of the publication. Used for clients to possibly display notes in different ways, for example a note with the `microblog` category could be displayed in a timeline, while a note with the `forum` category could be displayed Reddit-style.

See [the Types section](#types) for more information on the `CategoryType` enum.

### Device

| Name   | Type   | Required |
| :----- | :----- | :------- |
| device | Device | No       |

Device that the publication was created on. If it is not provided, it is assumed that the publication was created on a generic device.

Servers should avoid collecting any information that could be used to identify the user, such as IP addresses or user agents. A simple name is recommended.

### Previews

| Name     | Type                 | Required |
| :------- | :------------------- | :------- |
| previews | Array of LinkPreview | No       |

Previews for links in the publication. Optional. This is to avoid the [stampeding mastodon problem](https://github.com/mastodon/mastodon/issues/23662) where a link preview is fetched by every server that sees the publication, creating an accidental DDOS attack.

> [!WARNING]
> Servers should make sure not to trust the previews, as they could be faked by remote servers. This is not a very good attack vector, but it is still possible to redirect users to malicious links.

### Group

| Name  | Type   | Required |
| :---- | :----- | :------- |
| group | String | No       |

URI of a [Group](../groups.md), or `public` or `followers`.

Refer to the [Groups](../groups.md) page for more information on groups, their implementation and what to do if this value is not provided.

### Attachments

| Name        | Type                   | Required |
| :---------- | :--------------------- | :------- |
| attachments | Array of ContentFormat | No       |

Contains list of attachments for the publication in [ContentFormat](../structures/content-format) structure. f it is not provided, it is assumed that the publication does not have any attachments.

It is recommended that servers limit the number of attachments to 20, but it is up to the server to decide how many attachments a publication can have. The protocol does not have an upper limit for the number of attachments.

The `attachments` field **MAY** be in any format, such as `image/png`, `image/webp`, `video/mp4`, or `audio/mpeg`. It is up to the server to decide which formats are allowed.

> [!NOTE]
> Lysand recommends that servers let users upload any file as an attachment, but clients should warn users before downloading potentially malicious files, such as `.exe` files.

### Replies To

| Name       | Type   | Required |
| :--------- | :----- | :------- |
| replies_to | String | No       |

URI of the `Note` that the publication is replying to, if any. Used to determine the reply chain of an object.

### Quotes

| Name   | Type   | Required |
| :----- | :----- | :------- |
| quotes | String | No       |

URI of the `Note` that the publication is quoting, if any. It is used to determine the quote chain of an object.

Quoting is similar to replying, but it does not (by default) notify the user that they were quoted. It is meant to be used to comment or add context to another publication.

Example of quoting:
```json5
{
    // ...
    "quotes": "https://test.com/publications/5f886c84-f8f7-4f65-8ac2-4691d385c509",
    // ...
}
```

Quoting **SHOULD BE** rendered differently from replying, such as by adding a quote block to the publication or including the quoted post in the publication.

### Mentions

| Name     | Type            | Required |
| :------- | :-------------- | :------- |
| mentions | Array of String | No       |

URIs of users that the publication is mentioning. (such as `@username@server.social` in a note). If it is not provided, it is assumed that the publication is not mentioning any other users.

An example value for `mentions` would be:
```json5
{
    // ...
    "mentions": [
        "https://test.com/users/02e1e3b2-cb1f-4e4a-b82e-98866bee5de7"
    ]
    // ...
}
```

### Subject

| Name    | Type   | Required |
| :------ | :----- | :------- |
| subject | String | No       |

Subject of the publication. May be used as a content warning or spoiler warning. If not provided or is empty, there is no subject.

It is recommended that servers limit the length of the subject from 1 to 300 characters, but it is up to the server to decide how long the subject can be. The protocol does not have an upper limit for the length of the subject.

The `subject` field **MUST NOT** be a `ContentFormat` object. It **MUST** be a string, and **MUST** be plain text. It **MUST NOT** contain any HTML or other markup.

See [ContentFormat](/structures/content-format) for more information on `ContentFormat` objects.

Client extensions are welcome to add support for HTML or other markup in the `subject` field, but it is not made this way by design (although [Custom Emojis](../extensions/custom-emojis) are supported)

An example value for `subject` would be:
```json5
{
    // ...
    "subject": "This is a subject!"
    // ...
}
```

### Is Sensitive

| Name         | Type   | Required |
| :----------- | :----- | :------- |
| is_sensitive | String | No       |

Whether or not the publication contains sensitive content, whether in the content or in attachments or emojis. May be used as a content warning or spoiler warning. If not provided, it is assumed that the publication is not sensitive.

An example value for `is_sensitive` would be:
```json5
{
    // ...
    "is_sensitive": true
    // ...
}
```

### Visibility

| Name       | Type       | Required |
| :--------- | :--------- | :------- |
| visibility | Visibility | Yes      |

Can be `public`, `unlisted`, `followers`, or `direct`. If not provided, it is assumed that the publication is public.

- `public`: The publication is visible to everyone, including anonymous users.
- `unlisted`: The publication is visible to everyone, but it should not appear in public timelines or search results.
- `followers`: The publication is visible to followers only.
- `direct`: The publication is a direct message, and is visible only to the mentioned users.

Servers **MUST** respect the visibility of the publication and **MUST NOT** show the publication to users who are not allowed to see it.

## Types

```typescript
interface Publication extends Entity {
    type: "Note" | "Patch";
    author: string;
    content?: ContentFormat;
    category?: CategoryType;
    device?: Device;
    previews?: LinkPreview[];
    group?: string | "public" | "followers";
    attachments?: ContentFormat[];
    replies_to?: string;
    quotes?: string;
    mentions?: string[];
    subject?: string;
    is_sensitive?: boolean;
    visibility: Visibility;
    extensions?: Entity["extensions"] & {
        "org.lysand:reactions"?: {
            reactions: string;
        };
        "org.lysand:polls"?: {
            poll: {
                options: ContentFormat[];
                votes: number[]; // unsigned 64-bit integer
                multiple_choice?: boolean;
                expires_at: string;
            };
        };
    };
}
```

```typescript
enum Visibility {
    Public = "public",
    Unlisted = "unlisted",
    Followers = "followers",
    Direct = "direct"
}
```

```typescript
interface LinkPreview {
    link: string;
    title: string;
    description?: string;
    image?: string;
    icon?: string;
}
```

```typescript
interface Device {
    name: string;
    version?: string;
    url?: string;
}
```

```typescript
/*
 * UI examples for each category:
 * microblog -> Twitter, Mastodon
 * forum -> Reddit
 * blog -> Wordpress, WriteFreely
 * image -> Instagram
 * video -> YouTube
 * audio -> SoundCloud, Spotify
 * messaging -> Discord, Matrix, Signal
 */
type CategoryType = "microblog" | "forum" | "blog" | "image" | "video" | "audio" | "messaging"
```
