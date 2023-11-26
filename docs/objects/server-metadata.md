# Server Metadata

Server metadata is metadata that servers can provide to clients to help them determine how to interact with the server. It is meant to be a simple way for servers to provide information to other servers and clients.

Unlike other objects, server metadata is not meant to be federated. The `id`, `uri` and `created_at` fields are not required on server metadata objects.

Here is an example server metadata object:
```json5
{
    "type": "ServerMetadata",
    "name": "Example Server",
    "version": "1.0.0",
    "description": "This is an example server.",
    "website": "https://example.com",
    "moderators": [
        "https://example.com/users/02e1e3b2-cb1f-4e4a-b82e-98866bee5de7",
        // ...
    ],
    "admins": [
        // ...
    ],
    "logo": [
        {
            "content": "https://cdn.example.com/logo.png",
            "content_type": "image/png"
        },
        {
            "content": "https://cdn.example.com/logo.webp",
            "content_type": "image/webp"
        }
    ],
    "banner": [
        {
            "content": "https://cdn.example.com/banner.png",
            "content_type": "image/png"
        },
        {
            "content": "https://cdn.example.com/banner.webp",
            "content_type": "image/webp"
        }
    ],
    "supported_extensions": [ "org.lysand:reactions" ],
    "extensions": {
        // Example extension
        "org.joinmastodon:monthly_active_users": 1000
    }
}
```

## Fields

### Type

The `type` field on a Server Metadata object is a string that represents the type of the object. It is used to determine how the object should be displayed to the user. It should be `ServerMetadata`.

### Name

The `name` field on a Server Metadata object is a string that represents the name of the server. The `name` field is required on all Server Metadata objects.

It is recommended that servers limit the length of the name from 1 to 50 characters, but it is up to the server to decide how long the name can be. The protocol does not have an upper limit for the length of the name.

### Version

The `version` field on a Server Metadata object is a string that represents the version of the server. It is recommended that servers use [SemVer](https://semver.org) to version their servers, but it is not required. The protocol does not have any requirements for the format of the version.

The `version` field is not required on all Server Metadata objects. If it is not provided, it is assumed that the server does not have a version.

### Description

The `description` field on a Server Metadata object is a string that represents the description of the server. It should include information about the server, such as what it is about and what it is used for.

For example, a server focused on a specific topic may include information about that topic in the description.

The `description` field is not required on all Server Metadata objects. If it is not provided, it is assumed that the server does not have a description.

It is recommended that servers limit the length of the description from 1 to 500 characters, but it is up to the server to decide how long the description can be. The protocol does not have an upper limit for the length of the description.

### Website

The `website` field on a Server Metadata object is a string that represents the website of the server. his may be used to link to the server's website, such as a status page or a public modlog.

The `website` field is not required on Server Metadata objects. If it is not provided, it is assumed that the server does not have a website.

### Moderators

The `moderators` field on a Server Metadata object is an array of URIs that represent the moderators of the server.

The `moderators` field is not required on all Server Metadata objects. If it is not provided, it is assumed that the server does not have any moderators, or is not willing to provide a list.

### Admins

The `admins` field on a Server Metadata object is an array of URIs that represent the admins of the server.

The `admins` field is not required on all Server Metadata objects. If it is not provided, it is assumed that the server does not have any admins, or is not willing to provide a list.

### Logo

The `logo` field on a Server Metadata object is an array of `ContentFormat` objects. It is meant to serve as a logo for the server.

The `logo` field is not required on all Server Metadata objects. If it is not provided, it is assumed that the server does not have a logo.

The logo content_type **MUST** be an image format, such as `image/png` or `image/jpeg`. The logo content_type **MUST NOT** be a video format, such as `video/mp4` or `video/webm`.

Lysand heavily recommends that servers provide both the original format and a modern format for each logo, such as WebP, AVIF, JXL, or HEIF. This is to reduce bandwidth usage and improve performance for clients.

Clients should display the most modern format that they support, such as WebP, AVIF, JXL, or HEIF. If the client does not support any modern formats, it should display the original format.

> **Note:** Servers may find it useful to use a CDN that can automatically convert images to modern formats, such as Cloudflare. This will offload image processing from the server, and improve performance for clients.

### Banner

The `banner` field on a Server Metadata object is an array of `ContentFormat` objects. It is meant to serve as a banner for the server.

The `banner` field is not required on all Server Metadata objects. If it is not provided, it is assumed that the server does not have a banner.

The banner content_type **MUST** be an image format, such as `image/png` or `image/jpeg`. The banner content_type **MUST NOT** be a video format, such as `video/mp4` or `video/webm`.

Lysand heavily recommends that servers provide both the original format and a modern format for each banner, such as WebP, AVIF, JXL, or HEIF. This is to reduce bandwidth usage and improve performance for clients.

Clients should display the most modern format that they support, such as WebP, AVIF, JXL, or HEIF. If the client does not support any modern formats, it should display the original format.

> **Note:** Servers may find it useful to use a CDN that can automatically convert images to modern formats, such as Cloudflare. This will offload image processing from the server, and improve performance for clients.

### Supported Extensions

The `supported_extensions` field on a Server Metadata object is an array that contains a list of extension names that the server supports.

The `supported_extensions` field is not required on all Server Metadata objects. If it is not provided, it is assumed that the server does not support any extensions.