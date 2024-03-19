# Custom Emojis in Lysand

Lysand supports the use of custom emojis. Here's how they are represented in TypeScript:

```ts
interface Emoji {
    name: string;
    alt?: string;
    url: ContentFormat;
}
```

Custom emojis in Lysand are part of an optional extension to the protocol. For more details, refer to the [Protocol Extensions](../extensions) section.

While servers have the discretion to implement custom emojis, it is highly recommended for a richer user interaction.

Here's an example of a custom emoji representation:

```json
{
    "name": "happy_face",
    "alt": "A happy face emoji.",
    "url": {
        "image/webp": {
            "content": "https://cdn.example.com/emojis/happy_face.webp",
        }
    }
}
```

The `name` field is a string that should only contain alphanumeric characters, underscores, and dashes. Spaces or other special characters are not allowed. It should match the following regex: `/^[a-zA-Z0-9_-]+$/`.

The `url` field is a [ContentFormat](./content-format), serving as a list of URLs where the emoji can be accessed. It is mandatory for all emojis and should contain at least one URL. The `url` field should be a binary image format, such as `image/png` or `image/jpeg`. Text formats like `text/plain` or `text/html` are not acceptable.

The `alt` field is an optional string that provides the alt text for the emoji. This is particularly useful for visually impaired users or when the emoji fails to load. If not provided, it's assumed that the emoji doesn't have an alt text.

While emojis are typically small and don't consume much bandwidth, servers may choose to transcode emojis into more modern formats like WebP, AVIF, JXL, or HEIF for optimization. Clients should display the most modern format they support. If they don't support any modern formats, they should display the original format.

> [!NOTE]
> Servers might find it beneficial to use a CDN like Cloudflare that can automatically convert images to modern formats. This approach offloads image processing from the server and enhances performance for clients.

The size of emojis is not standardized and is left to the server's discretion. Servers may choose to limit the size of emojis, but it's not mandatory. As a general guideline, an upper limit of a few hundred kilobytes is recommended to avoid excessive bandwidth usage.