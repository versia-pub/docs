# Custom Emojis

Lysand supports custom emojis. They are represented as such in TypeScript:

```ts
interface Emoji {
    name: string;
    alt?: string;
    url: ContentFormat[];
}
```

Lysand custom emojis are implemented as part of an official optional extension to the protocol. See [Protocol Extensions](#protocol-extensions) for more information.

Servers **MAY** choose not to implement custom emojis, but it is recommended that they do so.

An example value would be:
```json
{
    "name": "happy_face",
    "alt": "A happy face emoji.",
    "url": [
        {
            "content": "https://cdn.example.com/emojis/happy_face.webp",
            "content_type": "image/webp"
        }
    ]
}
```

The `name` field **MUST** be a string that contains only alphanumeric characters, underscores, and dashes. It **MUST NOT** contain any spaces or other special characters.

It **MUST** match this regex: `/^[a-zA-Z0-9_-]+$/`

---

The `url` field is an array that contains a list of `ContentFormat` objects. It is meant to serve as a list of URLs that the emoji can be accessed at. It is required on all emojis, and **MUST** contain at least one URL.

The `url` field **MUST** be a binary image format, such as `image/png` or `image/jpeg`. The `url` field **MUST NOT** be a text format, such as `text/plain` or `text/html`.

---

The `alt` field is a string that contains the alt text for the emoji. It is used to describe the emoji to users that cannot see the emoji, such as users that are blind, or when the emoji does not load properly.

The `alt` field is not required on all emojis. If it is not provided, it is assumed that the emoji does not have an alt text.

---

Emojis normally do not need to be transcoded into more modern formats, as they are typically small and do not take up much bandwidth. However, servers **MAY** choose to transcode emojis into more modern formats, such as WebP, AVIF, JXL, or HEIF.

Clients should display the most modern format that they support, such as WebP, AVIF, JXL, or HEIF. If the client does not support any modern formats, it should display the original format.

> **Note:** Servers may find it useful to use a CDN that can automatically convert images to modern formats, such as Cloudflare. This will offload image processing from the server, and improve performance for clients.

Emoji size is not standardized, and is up to the server to decide. Servers **MAY** choose to limit the size of emojis, but it is not required. Generally, an upper limit of a few hundred kilobytes is recommended so as to not take up too much bandwidth.