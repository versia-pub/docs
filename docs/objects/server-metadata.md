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
    "logo": {
        "image/png": {
            "content": "https://cdn.example.com/logo.png"
        },
        "image/webp": {
            "content": "https://cdn.example.com/logo.webp"
        }
    },
    "banner": {
        "image/png": {
            "content": "https://cdn.example.com/banner.png"
        },
        "image/webp": {
            "content": "https://cdn.example.com/banner.webp"
        }
    },
    "supported_extensions": [ "org.lysand:reactions" ],
    "extensions": {
        // Example extension
        "org.joinmastodon:monthly_active_users": 1000
    }
}
```

## Fields

### Type

| Name | Type   | Required | Notes                    |
| :--- | :----- | :------- | ------------------------ |
| type | String | Yes      | Must be "ServerMetadata" |

### Name

| Name | Type   | Required |
| :--- | :----- | :------- |
| name | String | Yes      |

Represents the name of the server. The `name` field is required on all Server Metadata objects. This should be the name of the server instance itself, such as "Rosie's Lysand Server", not the software name such as "Mastodon".

It is recommended that servers limit the length of the name from 1 to 50 characters, but it is up to the server to decide how long the name can be. The protocol does not have an upper limit for the length of the name.

### Version

| Name    | Type   | Required | Notes                   |
| :------ | :----- | :------- | ----------------------- |
| version | String | Yes      | Should be SemVer format |

Represents the version of the server software. It is recommended that servers use [SemVer](https://semver.org) to version their servers, but it is not required.

### Description

| Name        | Type   | Required |
| :---------- | :----- | :------- |
| description | String | No       |


This is a short description of this particular server. It should include information about the server, such as what it is about and what it is used for.

For example, a server focused on a specific topic may include information about that topic in the description.

It is recommended that servers limit the length of the description from 1 to 500 characters, but it is up to the server to decide how long the description can be. The protocol does not have an upper limit for the length of the description.

### Website

| Name    | Type   | Required |
| :------ | :----- | :------- |
| website | String | No       |

Represents the website of the server. This may be used to link to the server's website, such as a status page or a public modlog.

### Moderators

| Name       | Type            | Required |
| :--------- | :-------------- | :------- |
| moderators | Array of String | No       |

Rrray of URIs to the server moderators.

If it is not provided, it is assumed that the server does not have any moderators, or is not willing to provide a list.

### Admins

| Name   | Type            | Required |
| :----- | :-------------- | :------- |
| admins | Array of String | No       |

The `admins` field on a Server Metadata object is an array of URIs that represent the admins of the server.

The `admins` field is not required on all Server Metadata objects. If it is not provided, it is assumed that the server does not have any admins, or is not willing to provide a list.

### Logo

| Name | Type          | Required |
| :--- | :------------ | :------- |
| logo | ContentFormat | No       |


The `logo` field on a Server Metadata is a [ContentFormat](../structures/content-format) object.

The logo content_type **MUST** be an image format, such as `image/png` or `image/jpeg` (animated images are permitted). The logo content_type **MUST NOT** be a video format, such as `video/mp4` or `video/webm`.

Lysand heavily recommends that servers provide both the original format and a modern format for each logo, such as WebP, AVIF, JXL, or HEIF. This is to reduce bandwidth usage and improve performance for clients.

Clients should display the most modern format that they support, such as WebP, AVIF, JXL, or HEIF. If the client does not support any modern formats, it should display the original format.

> [!NOTE]
> Servers may find it useful to use a CDN that can automatically convert images to modern formats, such as Cloudflare. This will offload image processing from the server, and improve performance for clients.

### Banner

| Name   | Type          | Required |
| :----- | :------------ | :------- |
| banner | ContentFormat | No       |

The `banner` field on a Server Metadata is a [ContentFormat](../structures/content-format) object.

The banner content_type **MUST** be an image format, such as `image/png` or `image/jpeg` (animated images are permitted). The banner content_type **MUST NOT** be a video format, such as `video/mp4` or `video/webm`.

Lysand heavily recommends that servers provide both the original format and a modern format for each banner, such as WebP, AVIF, JXL, or HEIF. This is to reduce bandwidth usage and improve performance for clients.

Clients should display the most modern format that they support, such as WebP, AVIF, JXL, or HEIF. If the client does not support any modern formats, it should display the original format.

> [!NOTE]
> Servers may find it useful to use a CDN that can automatically convert images to modern formats, such as Cloudflare. This will offload image processing from the server, and improve performance for clients.

### Supported Extensions

| Name                 | Type            | Required                       |
| :------------------- | :-------------- | :----------------------------- |
| supported_extensions | Array of String | Yes, can be empty array (`[]`) |

List of extension names that the server supports, in namespaced format (`"org.lysand:reactions"`).