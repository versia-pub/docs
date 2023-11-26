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
    "contents": [
        {
            "content": "Hello, world!",
            "content_type": "text/plain"
        },
        {
            "content": "Hello, <b>world</b>!",
            "content_type": "text/html"
        }
    ],
    "attachments": [
        [
            {
                "content": "https://cdn.example.com/attachments/ece2f9d9-27d7-457d-b657-4ce9172bdcf8.png",
                "content_type": "image/png"
            },
            {
                "content": "https://cdn.example.com/attachments/ece2f9d9-27d7-457d-b657-4ce9172bdcf8.webp",
                "content_type": "image/webp"
            }
        ]
    ],
    "replies_to": "https://test.com/publications/0b6ecf49-2959-4590-afb6-232f57036fa6",
    "mentions": [
        "https://test.com/users/02e1e3b2-cb1f-4e4a-b82e-98866bee5de7"
    ],
}
```

## Type

Currently available types are:
- [`Note`](/objects/note)
- [`Patch`](/objects/patch)

## Author

The `author` field on a Publication is a string that represents the URI of the user that created the object. It is used to identify the author of the Publication.

The `author` field is required on all publications.

## Contents

The `contents` field on a Publication is an array that contains a list of `ContentFormat` objects.

The `contents` field is not required on all publications. If it is not provided, it is assumed that the publication does not have any content.

It is recommended that servers limit the length of the content from 500 to a couple thousand characters, but it is up to the server to decide how long the content can be. The protocol does not have an upper limit for the length of the content.

The `contents` field **MUST** be a text format, such as `text/plain` or `text/html`. The `contents` field **MUST NOT** be a binary format, such as `image/png` or `video/mp4`. Platforms such as video sharing sites should use the `attachments` field for media instead.

An example value for the `contents` field would be:
```json5
{
    // ...
    "contents": [
        {
            "content": "Hello, world!",
            "content_type": "text/plain"
        },
        {
            "content": "Hello, <b>world</b>!",
            "content_type": "text/html"
        }
    ]
    // ...
}
```

> **Note:** Lysand heavily recommends that servers support the `text/html` content type, as it is the richest content type that is supported by most clients.

> **Note**: Lysand also recommends that servers always include a `text/plain` version of each object, as it is the most basic content type that is supported by all clients, such as command line clients.

It is up to the client to choose which content format to display to the user. The client may choose to display the first content format that it supports, or it may choose to display the content format that it thinks is the most appropriate.

Lysand recommends that clients display the richest content format that they support, such as HTML or more exotic formats such as MFM.

## Attachments

The `attachments` field on a Publication is an array that contains arrays of `ContentFormat` structures. It is used to attach files to a publication.

The `attachments` field is not required on all publications. If it is not provided, it is assumed that the publication does not have any attachments.

It is recommended that servers limit the number of attachments to 20, but it is up to the server to decide how many attachments a publication can have. The protocol does not have an upper limit for the number of attachments.

The `attachments` field **MAY** be in any format, such as `image/png`, `image/webp`, `video/mp4`, or `audio/mpeg`. It is up to the server to decide which formats are allowed.

> **Note:** Lysand recommends that servers let users upload any file as an attachment, but clients should warn users before downloading potentially malicious files, such as `.exe` files.

## Replies To

The `replies_to` field on a Publication is the URI of the `Note` that the publication is replying to. It is used to determine the reply chain of an object.

The `replies_to` field is not required on all publications. If it is not provided, it is assumed that the object is not replying to any other object.

## Quotes

The `quotes` field on a Publication is the URI of the `Note` that the publication is quoting. It is used to determine the quote chain of an object.

Quoting is similar to replying, but it does not (by default) notify the user that they were quoted. It is meant to be used to comment or add context to another publication.

The `quotes` field is not required on all publications. If it is not provided, it is assumed that the object is not quoting any other object.

Example of quoting:
```json5
{
    // ...
    "quotes": "https://test.com/publications/5f886c84-f8f7-4f65-8ac2-4691d385c509",
    // ...
}
```

Quoting **SHOULD BE** rendered differently from replying, such as by adding a quote block to the publication or including the quoted post in the publication.

## Mentions

The `mentions` field on a Publication is an array that contains a list of URIs that represent the users that the publication is mentioning. It is used to determine which users are mentioned in a publication.

The `mentions` field is not required on all publications. If it is not provided, it is assumed that the publication is not mentioning any other users.

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

##  Subject

The `subject` field on a Publication is a **string** that represents the subject of the publication. It may be used as a content warning or spoiler warning.

The `subject` field is not required on all publications. If it is not provided, it is assumed that the publication does not have a subject.

It is recommended that servers limit the length of the subject from 1 to 300 characters, but it is up to the server to decide how long the subject can be. The protocol does not have an upper limit for the length of the subject.

The `subject` field **MUST NOT** be a `ContentFormat` object. It **MUST** be a string, and **MUST** be plain text. It **MUST NOT** contain any HTML or other markup.

> See [ContentFormat](#contentformat) for more information on `ContentFormat` objects.

> Client extensions are welcome to add support for HTML or other markup in the `subject` field, but it is not recommended.

An example value for `subject` would be:
```json5
{
    // ...
    "subject": "This is a subject!"
    // ...
}
```

## Is Sensitive

The `is_sensitive` field on a Publication is a **boolean** that represents whether or not the publication is sensitive. It may be used as a content warning or spoiler warning.

The `is_sensitive` field is not required on all publications. If it is not provided, it is assumed that the publication is not sensitive.

An example value for `is_sensitive` would be:
```json5
{
    // ...
    "is_sensitive": true
    // ...
}
```