# ContentFormat

A `ContentFormat` structure can be represented as such in TypeScript:

```ts
interface ContentFormat {
    content: string;
    content_type: string;
    description?: string;
    size?: number;
    hash?: {
        md5?: string;
        sha1?: string;
        sha256?: string;
        sha512?: string;
        [key: string]: string | undefined;
    };
    blurhash?: string;
    fps?: number;
    width?: number;
    height?: number;
    duration?: number;
}
```

An example value would be:
```json
{
    "content": "Hello, world!",
    "content_type": "text/plain"
}
```

Another example:
```json
{
    "content": "https://cdn.example.com/attachments/ece2f9d9-27d7-457d-b657-4ce9172bdcf8.png",
    "content_type": "image/png",
    "description": "A jolly horse running in the mountains",
    "size": 123456,
    "hash": {
        "sha256": "91714fc336210d459d4f9d9233de663be2b87ffe923f1cfd76ece9d06f7c965d"
    }
}
```

The `contents` field is a string that contains the actual content of the object. The `content_type` field is a string that contains the MIME type of the content.

The `content` and `content_type` fields are required on all `ContentFormat` objects, but other fields are optional.

The `description` field is a string that contains a description of the content. It is used to describe the content to users that cannot see the content, such as users that are blind, or when the content does not load properly. It is not required on all `ContentFormat` objects. If it is not provided, it is assumed that the content does not have a description.

The `size` field is a number that contains the size of the content in bytes. It is not required on all `ContentFormat` objects. If it is not provided, it is assumed that the content size is not specified.

It is generally not needed to provide content size for text content, but it is recommended to provide content size for binary content, such as images, videos, and audio. This is useful for clients to determine if they should download the content or not.

It is expected that files in an array of `ContentFormat` objects (when used to store URLs to files) are the same file, but in different formats. For example, a PNG image and a WebP image. Files in formats such as PDF that cannot be converted to other formats should only be stored once.

For example, this is acceptable:
```json
[
    {
        "content": "https://cdn.example.com/attachments/ece2f9d9-27d7-457d-b657-4ce9172bdcf8.png",
        "content_type": "image/png",
        "description": "A jolly horse running in the mountains",
        "hash": {
            "sha256": "91714fc336210d459d4f9d9233de663be2b87ffe923f1cfd76ece9d06f7c965d"
        }
    },
    {
        "content": "https://cdn.example.com/attachments/ece2f9d9-27d7-457d-b657-4ce9172bdcf8.webp",
        "content_type": "image/webp",
        "description": "A jolly horse running in the mountains",
        "hash": {
            "sha256": "b493d48364afe44d11c0165cf470a4164d1e2609911ef998be868d46ade3de4e"
        },
    }
]
```

But this is not:
```json
[
    {
        "content": "https://cdn.example.com/attachments/ece2f9d9-27d7-457d-b657-4ce9172bdcf8.png",
        "content_type": "image/png",
        "description": "A jolly horse running in the mountains"
    },
    {
        "content": "https://cdn.example.com/attachments/ece2f9d9-27d7-457d-b657-4ce9172bdcf8.webp",
        "content_type": "image/webp",
        "description": "A jolly horse running in the mountains",
    },
    {
        "content": "https://cdn.example.com/attachments/anotherfile.pdf",
        "content_type": "application/pdf",
        "description": "A PDF file about macroeconomics"
    }
]
```

Each array of ContentFormat objects should be considered as a SINGLE FILE, and not multiple files. The multiple formats are only meant to save bandwidth.

If optional fields are provided on one object in the array, they should be provided on all objects in the array. For example, if the `description` field is provided on one object, it should be provided on all objects (since they are the same file).