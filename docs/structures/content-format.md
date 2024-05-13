# ContentFormat

The `ContentFormat` structure, as represented below in TypeScript, is a flexible and robust way to handle various types of content. It is designed to accommodate a wide range of content types and provide additional metadata about the content.

```ts
interface ContentFormat {
    [contentType: string]: {
        content: string;
        description?: string;
        size?: number; // unsigned 64-bit integer
        hash?: {
            sha256?: string;
            sha512?: string;
            [key: string]: string | undefined;
        };
        blurhash?: string;
        fps?: number; // unsigned 64-bit integer
        width?: number; // unsigned 64-bit integer
        height?: number; // unsigned 64-bit integer
        duration?: number; // unsigned 64-bit integer
    }
}
```

Here's an example of how this structure can be used:

```json
{
    "text/plain": {
        "content": "Hello, world!"
    }
}
```

And another example:

```json
{
    "image/png": {
        "content": "https://cdn.example.com/attachments/ece2f9d9-27d7-457d-b657-4ce9172bdcf8.png",
        "description": "A jolly horse running through mountains",
        "size": 123456,
        "hash": {
            "sha256": "91714fc336210d459d4f9d9233de663be2b87ffe923f1cfd76ece9d06f7c965d"
        }
    }
}
```

The `content` field holds the actual content of the object. This content can be either a string containing plaintext, or a URI to the actual content when it cannot be encoded as this format.

The `description` field provides a brief summary of the content. This is particularly useful for accessibility purposes, such as for visually impaired users, or when the content fails to load. It's an optional field, and if not provided, it's assumed that the content doesn't have a description.

The `size` field, also optional, indicates the size of the content in bytes. While it's not necessary for text content, it's recommended for binary content like images, videos, and audio. This information helps clients decide whether to download the content based on its size.

The `ContentFormat` structure is designed to handle multiple formats of the same file. For instance, a PNG image and a WebP image. However, it's not intended for formats that can't be converted to others, like PDFs. These should only be stored once.

Here's an acceptable use case:

```json
{
    "image/png": {
        "content": "https://cdn.example.com/attachments/ece2f9d9-27d7-457d-b657-4ce9172bdcf8.png",
        "description": "A jolly horse running through mountains",
        "hash": {
            "sha256": "91714fc336210d459d4f9d9233de663be2b87ffe923f1cfd76ece9d06f7c965d"
        }
    },
    "image/webp": {
        "content": "https://cdn.example.com/attachments/ece2f9d9-27d7-457d-b657-4ce9172bdcf8.webp",
        "description": "A jolly horse running through mountains",
        "hash": {
            "sha256": "b493d48364afe44d11c0165cf470a4164d1e2609911ef998be868d46ade3de4e"
        }
    }
}
```

However, this is not:

```json
{
    "image/png": {
        "content": "https://cdn.example.com/attachments/ece2f9d9-27d7-457d-b657-4ce9172bdcf8.png",
        "description": "A jolly horse running through mountains"
    },
    "image/webp": {
        "content": "https://cdn.example.com/attachments/ece2f9d9-27d7-457d-b657-4ce9172bdcf8.webp",
        "description": "A jolly horse running through mountains"
    },
    "application/pdf": {
        "content": "https://cdn.example.com/attachments/anotherfile.pdf",
        "description": "An informative PDF document on macroeconomics"
    }
}
```

Each `ContentFormat` object should be treated as a **single file in multiple optional formats**, not as multiple files. The multiple formats are intended to optimize bandwidth usage.

If optional fields are provided for one object in the `ContentFormat`, they should be provided for all objects in the `ContentFormat`. For instance, if the `description` field is provided for one object, it should be provided for all objects, as they represent the same file.