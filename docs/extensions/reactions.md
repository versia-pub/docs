# Reactions

With the Reactions extension, users can react to objects with emojis. This is similar to how Facebook and Discord work.

Here is an example of a reaction to a post using this extension:

```json5
{
    "type": "Extension",
    "extension_type": "org.lysand:reactions/Reaction",
    "id": "6f27bc77-58ee-4c9b-b804-8cc1c1182fa9",
    "uri": "https://example.com/actions/6f27bc77-58ee-4c9b-b804-8cc1c1182fa9",
    "author": "https://example.com/users/6e0204a2-746c-4972-8602-c4f37fc63bbe",
    "created_at": "2021-01-01T00:00:00.000Z",
    "object": "https://example.com/publications/f08a124e-fe90-439e-8be4-15a428a72a19",
    "content": "😀",
}
```
## Fields

### Type

As with all new objects added by extensions, the `type` field **MUST BE** `Extension`.

The `extension_type` field **MUST** be `org.lysand:reactions/Reaction`.

### Object

The `object` field on a Reaction object is a string that represents the URI of the object that the user is reacting to. The `object` field is required on all Reaction objects.

### Content

The `content` field on a Reaction object is a string that represents the emoji that the user is reacting with. The `content` field is required on all Reaction objects.

Clients **SHOULD** check if the value of `content` is an emoji: if it is not an emoji and instead is text, depending on which other extensions are implemented, it **MAY** be a Custom Emoji.

> Please see [Reactions With Custom Emojis](#reactions-with-custom-emojis) for more information about custom emoji reactions.

### Getting Reactions

Clients can get reactions to an object by sending a `GET` request to the reaction `Collection`'s URI.

The URI of the reaction `Collection` **MUST** be specified as follows, inside a `Publication`:
```json5
{
    // ...
    "extensions": {
        "org.lysand:reactions": {
            "reactions": "https://example.com/publications/f08a124e-fe90-439e-8be4-15a428a72a19/reactions"
        }
    }
}
```

The `reactions` field is a string that represents the URI of the reaction `Collection`.

The server **MUST** respond with a `Collection` object that contains a list of `Reaction` objects, as such:

```json5
{
    "type": "Collection",
    "first": "https://example.com/publications/f08a124e-fe90-439e-8be4-15a428a72a19/reactions?page=1",
    "last": "https://example.com/publications/f08a124e-fe90-439e-8be4-15a428a72a19/reactions?page=1",
    "total_items": 1,
    "items": [
        {
            "type": "Extension",
            "extension_type": "org.lysand:reactions/Reaction",
            "id": "6f27bc77-58ee-4c9b-b804-8cc1c1182fa9",
            "uri": "https://example.com/actions/6f27bc77-58ee-4c9b-b804-8cc1c1182fa9",
            "author": "https://example.com/users/6e0204a2-746c-4972-8602-c4f37fc63bbe",
            "created_at": "2021-01-01T00:00:00.000Z",
            "object": "https://example.com/publications/f08a124e-fe90-439e-8be4-15a428a72a19",
            "content": "😀",
        }
    ]
}
```

### Public Reaction Federation

If a user reacts to a Publication, the user's server **MUST** federate the reaction to all its followers. This is to ensure that all users see the reaction.

Note, however, that this does not mean that the reaction will be displayed to users. If the Publication that was reacted to is not visible to a user, the reaction **MUST NOT** be displayed to the user, even if the user follows the user that reacted to the Publication.

### Private Reaction Federation

If a user reacts to a Publication, the user's server **MUST** federate the reaction to the author of the Publication. This is to ensure that the author of the Publication sees the reaction.

### Reactions With Custom Emojis

If you implement both the Reactions and the Custom Emojis extensions, you can use the Custom Emojis extension to react with custom emojis.

The Reaction object needs to be modified as such:

```json5
{
    "type": "Extension",
    "extension_type": "org.lysand:reactions/Reaction",
    "id": "6f27bc77-58ee-4c9b-b804-8cc1c1182fa9",
    "uri": "https://example.com/actions/6f27bc77-58ee-4c9b-b804-8cc1c1182fa9",
    "author": "https://example.com/users/6e0204a2-746c-4972-8602-c4f37fc63bbe",
    "created_at": "2021-01-01T00:00:00.000Z",
    "object": "https://example.com/publications/f08a124e-fe90-439e-8be4-15a428a72a19",
    "content": ":happy_face:",
    "extensions": {
        "org.lysand:custom_emojis": {
            "emojis": [
                {
                    "name": "happy_face",
                    "url": [
                        {
                            "content": "https://cdn.example.com/emojis/happy_face.webp",
                            "content_type": "image/webp"
                        }
                    ]
                },
                // ...
            ]
        }
    }
}
```

The only addiction to the Reaction object is the `extensions` field, which contains the Custom Emojis extension.

When rendering the Reaction object, clients **MUST** replace the `:emoji_name:` with the appropriate emoji. If the client does not support custom emojis, it **MUST** display the `:emoji_name:` as-is.

When rendered as images, Custom Emoji Reactions **SHOULD** have proper alt text for accessibility. The alt text **SHOULD** be the alt text of the emoji, if it has one. If the emoji does not have an alt text, the alt text **SHOULD** be the name of the emoji.

Example in HTML:
```html
<img src="https://cdn.example.com/emojis/happy_face.webp" alt="A happy face emoji." title="A happy face emoji.">
```